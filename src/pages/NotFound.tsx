import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const NotFound: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch effect on the 404 text
      gsap.to('.glitch-text', {
        x: 'random(-5, 5)',
        y: 'random(-5, 5)',
        opacity: 'random(0.5, 1)',
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'none',
        delay: 2,
        repeatDelay: 1, // Fixed typescript error
      });

      // Entry animations
      gsap.fromTo('.not-found-elem',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden', 
      paddingTop: '65px' 
    }}>
      
      {/* Background with Logo / Brand Elements */}
      <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
         <img src="/assets/new_hero.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.15) saturate(0.5)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'linear-gradient(180deg, transparent 0%, var(--bg-dark) 100%)' }}></div>
      <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'radial-gradient(circle at 50% 50%, rgba(120,10,19,0.2) 0%, transparent 60%)' }}></div>

      <div className="container text-center relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Animated Brand Identity / Logo element */}
        <div className="not-found-elem" style={{ 
          marginBottom: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           <img src="/logo.png" alt="Veera Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 15px rgba(244, 228, 208, 0.2))' }} />
        </div>

        <h1 className="glitch-text not-found-elem" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: 'clamp(6rem, 15vw, 12rem)', 
          fontWeight: 900, 
          lineHeight: 0.9,
          color: 'var(--text-main)',
          textShadow: '0 0 40px rgba(120, 10, 19, 0.6)',
          margin: 0
        }}>
          404
        </h1>
        
        <h2 className="not-found-elem" style={{ 
          fontFamily: 'var(--font-heading)', 
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
          color: 'var(--orange-primary)', 
          fontWeight: 700, 
          marginTop: '1rem',
          marginBottom: '1.5rem'
        }}>
          Page Not Found
        </h2>

        <p className="not-found-elem" style={{ 
          color: 'var(--text-dim)', 
          fontSize: '1.1rem', 
          maxWidth: '500px', 
          lineHeight: 1.6, 
          marginBottom: '3rem' 
        }}>
          The page you're looking for seems to have drifted into the void. It might have been moved, deleted, or perhaps it never existed at all.
        </p>

        <div className="not-found-elem">
          <Link to="/" className="btn btn-primary" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, var(--orange-primary) 0%, #d4c4a0 100%)',
            color: '#0d0d0d',
            fontWeight: 700,
            textDecoration: 'none',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 228, 208, 0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <i className="fa-solid fa-arrow-left"></i> Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
