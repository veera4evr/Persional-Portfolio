import React, { useEffect, useState } from 'react';
import InteractiveCircuitCanvas from '../ui/InteractiveCircuitCanvas';

const DynamicBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let idleTimeout: ReturnType<typeof setTimeout>;
    let baseAngle = 0;
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let clickBurst = 0;

    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => setIsIdle(true), 3000);
    };

    const handleScroll = () => {
      resetIdleTimer();
      targetScroll = window.scrollY;
      setScrollY(window.scrollY);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    const handleMouseMove = (e: MouseEvent) => {
      resetIdleTimer(); setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      resetIdleTimer(); clickBurst = 50; // Give it a massive speed boost on click
    };
    
    const updateLoop = () => {
      if (window.innerWidth < 768) {
        animationFrameId = requestAnimationFrame(updateLoop);
        return;
      }
       // Continuous base rotation (always running)
       let speed = 0.5;

       // Add click burst
       if (clickBurst > 0) {
           speed += clickBurst;
           clickBurst *= 0.92; // smooth decay
           if (clickBurst < 0.1) clickBurst = 0;
       }

       // Add scroll delta
       const scrollDelta = targetScroll - currentScroll;
       currentScroll += scrollDelta * 0.1; // Smooth catchup
       
       // Add scroll velocity to speed, adjusted for mouse wheel and capped
       let scrollSpeed = scrollDelta * 0.05;
       if (scrollSpeed > 15) scrollSpeed = 15;
       if (scrollSpeed < -15) scrollSpeed = -15;
       
       speed += scrollSpeed;

       baseAngle += speed;
       
       document.documentElement.style.setProperty('--scroll-angle', `${baseAngle}deg`);
       
       animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    
    handleScroll();
    updateLoop();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <>
      {/* Global Background Layer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -5, overflow: 'hidden', pointerEvents: 'none' }}>
        <InteractiveCircuitCanvas />
      </div>
      {/* Additional ambient overlay if needed */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -4, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 0%, rgba(13,13,13,0.3) 100%)' }}></div>
      
      <div style={{ position: 'fixed', inset: 0, zIndex: -3, overflow: 'hidden', pointerEvents: 'none' }}>
        
        {/* Deep Red Giant Orb - slow parallax */}
        <div 
          className="floating-orb orb-1"
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(144,0,0,0.4) 0%, transparent 60%)',
            filter: 'blur(100px)',
            transform: `translateY(${scrollY * -0.15}px)`,
            animation: 'floatSlow 20s infinite alternate ease-in-out',
          }}
        ></div>

        {/* Bright Sand Accent Orb - fast parallax */}
        <div 
          className="floating-orb orb-2"
          style={{
            position: 'absolute',
            top: '60%',
            right: '5%',
            width: '30vw',
            height: '30vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,228,208,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translateY(${scrollY * -0.3}px)`,
            animation: 'floatMedium 15s infinite alternate-reverse ease-in-out',
          }}
        ></div>

        {/* Dark Crimson Core Orb - very slow parallax */}
        <div 
          className="floating-orb orb-3"
          style={{
            position: 'absolute',
            top: '80%',
            left: '40%',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13,13,13,0.8) 0%, transparent 60%)',
            filter: 'blur(120px)',
            transform: `translateY(${scrollY * -0.05}px)`,
            animation: 'floatSlow 25s infinite alternate ease-in-out',
          }}
        ></div>

        {/* Option 1: Interactive Cursor Spotlight */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,228,208,0.06) 0%, transparent 70%)',
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'transform 0.1s ease-out',
          }}
        ></div>

        {/* 
          The film grain has been removed as requested.
        */}

        {/* Inline styles for the organic floating animations */}
        <style>{`
          @keyframes floatSlow {
            0% { margin-top: 0px; margin-left: 0px; }
            100% { margin-top: 80px; margin-left: 50px; }
          }
          @keyframes floatMedium {
            0% { margin-top: 0px; margin-left: 0px; }
            100% { margin-top: -60px; margin-left: -40px; }
          }
        `}</style>
      </div>
      {/* High-Tech Circular Scroll Progress Indicator */}
      <div 
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          zIndex: 99,
          pointerEvents: scrollY > 100 && !isIdle ? 'auto' : 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(5px)',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          opacity: scrollY > 100 && !isIdle ? 1 : 0,
          transform: scrollY > 100 && !isIdle ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        onClick={() => window.scrollTo(0, 0)}
        onMouseOver={(e) => {
          if (scrollY > 100) e.currentTarget.style.transform = 'translateY(0) scale(1.1)';
        }}
        onMouseOut={(e) => {
          if (scrollY > 100) e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
        title="Scroll to top"
      >
        {/* Background track */}
        <svg width="60" height="60" viewBox="0 0 100 100" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
          {/* Track background */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(244, 228, 208, 0.1)" strokeWidth="6" />
          
          {/* Outer tech segments */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="6" strokeDasharray="4 8" />
          
          {/* Progress circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="44" 
            fill="none" 
            stroke="var(--orange-primary)" 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray="276"
            strokeDashoffset={276 - (276 * scrollProgress) / 100}
            style={{ 
              transition: 'stroke-dashoffset 0.1s ease-out',
              filter: 'drop-shadow(0 0 6px var(--orange-primary))'
            }} 
          />
          
          {/* Inner ring */}
          <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(244, 228, 208, 0.1)" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
        
        {/* Center Icon */}
        <i className="fa-solid fa-arrow-up" style={{ color: 'var(--text-main)', fontSize: '1.2rem', position: 'absolute', filter: 'drop-shadow(0 0 5px var(--orange-glow))' }}></i>
      </div>
    </>
  );

};

export default DynamicBackground;
