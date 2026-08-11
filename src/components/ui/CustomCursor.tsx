import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device uses touch pointer
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      setIsTouchDevice(true);
      return;
    }
  }, []);


  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Track mouse position
    const mouse = { x: 0, y: 0 };
    
    // Set initial GSAP QuickSetters for performance
    const xSet = gsap.quickSetter(cursor, 'x', 'px');
    const ySet = gsap.quickSetter(cursor, 'y', 'px');

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Instantly move the dot
      xSet(mouse.x);
      ySet(mouse.y);
      
      // Smoothly move the follower ring
      gsap.to(follower, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const addHoverState = () => {
      gsap.to(follower, { scale: 1.5, borderColor: 'var(--orange-primary)', background: 'rgba(244,228,208,0.1)', duration: 0.3 });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const removeHoverState = () => {
      gsap.to(follower, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', background: 'transparent', duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    // Attach listeners
    window.addEventListener('mousemove', onMouseMove);

    // Find all links and buttons to attach hover states
    const interactables = document.querySelectorAll('a, button, input, textarea, select, details, .magnetic-target');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', addHoverState);
      el.addEventListener('mouseleave', removeHoverState);
    });

    // Observer to attach hover states to dynamically added elements (like routes changing)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const newInteractables = document.querySelectorAll('a, button, input, textarea, select, details, .magnetic-target');
          newInteractables.forEach((el) => {
            // Remove first to avoid duplicates
            el.removeEventListener('mouseenter', addHoverState);
            el.removeEventListener('mouseleave', removeHoverState);
            el.addEventListener('mouseenter', addHoverState);
            el.addEventListener('mouseleave', removeHoverState);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverState);
        el.removeEventListener('mouseleave', removeHoverState);
      });
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        style={{
          position: 'fixed',
          top: '-4px', // Center dot
          left: '-4px', // Center dot
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--orange-primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <div 
        ref={followerRef}
        style={{
          position: 'fixed',
          top: '-20px', // Center ring
          left: '-20px', // Center ring
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'background 0.3s, border-color 0.3s', // Scale is handled by GSAP
        }}
      />
      <style>{`
        /* Hide default cursor globally */
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
