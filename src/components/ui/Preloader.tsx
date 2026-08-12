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
        scale: 0.8,
        opacity: 0,
      });

      // 2. Single Fluid Animation (Fade In)
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      })
      
      // 3. The Splash Transform (Scale out and fade background)
      .to(logoRef.current, {
        scale: 30, // Massive scale-up
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut"
      }, "+=0.4") // Brief pause at full opacity
      
      // Fade out the black background container simultaneously
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.6");

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
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default Preloader;