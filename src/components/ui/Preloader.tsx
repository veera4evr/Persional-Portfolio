import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Generates a cinematic whoosh & boom using pure Web Audio API (Zero dependencies)
const playCinematicSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.6, now + 1.8); 
    masterGain.gain.setValueAtTime(0.6, now + 2.6);
    masterGain.gain.linearRampToValueAtTime(1, now + 2.8); // Peak at the splash
    masterGain.gain.exponentialRampToValueAtTime(0.01, now + 4.5); // Fade out
    masterGain.connect(ctx.destination);

    // 1. The Low "Boom" / Sub-bass drop at the splash (t=2.8s)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(60, now + 2.8); // Start low boom
    subOsc.frequency.exponentialRampToValueAtTime(20, now + 4.0); // Drop sub bass
    
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0, now + 2.8);
    subGain.gain.linearRampToValueAtTime(1.5, now + 2.85); // Punchy attack
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 4.5);
    
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now + 2.8);
    subOsc.stop(now + 4.5);

    // 2. The Ethereal "Swell" (Whoosh/Breath)
    const bufferSize = ctx.sampleRate * 4; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 2.8); // Open filter as it swells
    filter.frequency.exponentialRampToValueAtTime(50, now + 4.0); // Close after splash

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.3, now + 1.8); // Swell
    noiseGain.gain.linearRampToValueAtTime(0.4, now + 2.6); // Hold
    noiseGain.gain.exponentialRampToValueAtTime(1.2, now + 2.8); // Splash peak wind
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 4.5); // Fade
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);
    noise.stop(now + 4.5);

    // 3. A subtle crystal chime as the logo drifts in (t=0.5s)
    const pingOsc = ctx.createOscillator();
    pingOsc.type = 'sine';
    pingOsc.frequency.setValueAtTime(880, now + 0.5); // A5 note
    const pingGain = ctx.createGain();
    pingGain.gain.setValueAtTime(0, now + 0.5);
    pingGain.gain.linearRampToValueAtTime(0.15, now + 0.55);
    pingGain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
    
    pingOsc.connect(pingGain);
    pingGain.connect(masterGain);
    pingOsc.start(now + 0.5);
    pingOsc.stop(now + 2.0);

    // 4. Second chime chord for depth
    const pingOsc2 = ctx.createOscillator();
    pingOsc2.type = 'sine';
    pingOsc2.frequency.setValueAtTime(1108.73, now + 0.5); // C#6 note
    const pingGain2 = ctx.createGain();
    pingGain2.gain.setValueAtTime(0, now + 0.5);
    pingGain2.gain.linearRampToValueAtTime(0.1, now + 0.55);
    pingGain2.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
    
    pingOsc2.connect(pingGain2);
    pingGain2.connect(masterGain);
    pingOsc2.start(now + 0.5);
    pingOsc2.stop(now + 2.0);

    // Browsers block autoplay unless interacted with, but we attempt anyway
    ctx.resume().catch(() => console.log("Audio autoplay blocked by browser policy"));
  } catch(e) {
    console.log("Web Audio API not supported.", e);
  }
};

const Preloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Fire the cinematic sound effect
    playCinematicSound();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          document.body.style.overflow = '';
        }
      });

      // 1. Initial State Setup
      gsap.set(logoRef.current, {
        scale: 0.85,
        opacity: 0,
        filter: 'blur(12px) drop-shadow(0 0 0px rgba(255,255,255,0))'
      });

      // 2. The Reveal (Apple-style slow drift into focus)
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        filter: 'blur(0px) drop-shadow(0 0 20px rgba(244, 228, 208, 0.4))',
        duration: 1.8,
        ease: "power3.out"
      })
      
      // 3. The Suspense (Hold for a moment with a subtle breathing effect)
      .to(logoRef.current, {
        scale: 1.03,
        filter: 'blur(0px) drop-shadow(0 0 40px rgba(244, 228, 208, 0.6)) brightness(1.2)',
        duration: 0.8,
        ease: "power2.inOut"
      })

      // 4. The Splash / Transform (Logo scales massively to reveal the site)
      .to(logoRef.current, {
        scale: 25, // Massive scale-up
        opacity: 0,
        filter: 'blur(20px)', // Motion blur effect as it zooms
        duration: 1.2,
        ease: "expo.inOut"
      }, "+=0.2")
      
      // Fade out the black background container simultaneously
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050505', // Deep premium black
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img 
        ref={logoRef}
        src="/assets/veera_logo.png" 
        alt="VE Logo" 
        style={{
          width: '120px',
          height: 'auto',
          objectFit: 'contain',
          willChange: 'transform, opacity, filter' 
        }}
      />
    </div>
  );
};

export default Preloader;