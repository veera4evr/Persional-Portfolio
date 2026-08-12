import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
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