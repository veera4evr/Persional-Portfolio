import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          document.body.style.overflow = '';
        }
      });

      // 1. Subtle, continuous breathing scale for the logo while loading
      // We also initialize a transparent drop-shadow so GSAP knows what to animate
      gsap.to(logoRef.current, {
        scale: 1.03,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1 // Loop this gentle breath until the timeline kills it
      });

      // 2. Fluid physics-based progress counter and bar fill
      const progressObj = { value: 0 };
      
      tl.to(progressObj, {
        value: 100,
        duration: 2.8,
        ease: "power2.inOut", // Smooth acceleration and deceleration
        onUpdate: () => {
          // Update number counter
          setProgress(Math.round(progressObj.value));
          // Update bar width directly for max performance
          if (barFillRef.current) {
            barFillRef.current.style.width = `${progressObj.value}%`;
          }
        }
      })
      
      // 3. ✨ THE APPLE-LEVEL GLOW "BLOOM" ✨
      // Right as it hits 100%, the logo brightens and emits a premium layered glow
      .to(logoRef.current, {
        scale: 1.1,
        // Layered drop shadows create a realistic, volumetric glow instead of a cheap blur
        filter: 'drop-shadow(0 0 15px rgba(244, 228, 208, 0.6)) drop-shadow(0 0 35px rgba(244, 228, 208, 0.3)) brightness(1.25)',
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4") // Start the bloom just a fraction before the progress bar finishes

      // Hold at 100% in its glowing state for a cinematic beat
      .to({}, { duration: 0.5 })

      // 4. Apple-style Exit Animation (Fade out elements smoothly)
      .to([textRef.current, barFillRef.current?.parentElement], {
        opacity: 0,
        y: -10,
        duration: 0.6,
        ease: "power3.inOut",
        stagger: 0.05
      })
      .to(logoRef.current, {
        scale: 1.15,
        opacity: 0,
        filter: 'drop-shadow(0 0 50px rgba(244, 228, 208, 0)) brightness(1)', // Dissolve the glow
        duration: 0.8,
        ease: "power3.inOut",
      }, "-=0.4")
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "-=0.6");
    }, containerRef);

    return () => ctx.revert(); // Cleanup for React 18 Strict Mode
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000', // True black for max contrast with the glow
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px', 
          width: '100%',
          maxWidth: '240px' 
        }}
      >
        {/* Logo */}
        <img 
          ref={logoRef}
          src="/assets/veera_logo.png" 
          alt="VE Logo" 
          style={{
            width: '100px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 0.9,
            // Initial filter state required for smooth GSAP interpolation
            filter: 'drop-shadow(0 0 0px rgba(244, 228, 208, 0)) drop-shadow(0 0 0px rgba(244, 228, 208, 0)) brightness(1)',
            willChange: 'transform, opacity, filter' 
          }}
        />
        
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Ultra-thin Progress Bar */}
          <div style={{
            width: '100%',
            height: '2px', // Crisp, thin line
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div 
              ref={barFillRef}
              style={{
                height: '100%',
                width: '0%',
                background: '#ffffff',
                borderRadius: '4px',
                willChange: 'width'
              }}
            />
          </div>
          
          {/* Refined Typography */}
          <div 
            ref={textRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: 'rgba(255, 255, 255, 0.5)', 
              fontVariantNumeric: 'tabular-nums' // Keeps numbers from jittering left/right
            }}>
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;