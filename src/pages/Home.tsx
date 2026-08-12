import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TopologyMesh from '../components/ui/TopologyMesh';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import MagneticButton from '../components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero background
      gsap.fromTo('.gsap-fade-in', 
        { opacity: 0, filter: 'blur(20px)', scale: 1.05 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 2, ease: 'power3.out' }
      );

      // Slide up hero elements
      gsap.fromTo('.gsap-slide-up',
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
      );

      // Scroll trigger animations
      gsap.utils.toArray('.gsap-scroll-trigger').forEach((elem: any) => {
        gsap.fromTo(elem,
          { opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Continuous floating animation for tech cards
      gsap.utils.toArray('.gsap-float').forEach((elem: any, i) => {
        gsap.to(elem, {
          y: -10,
          duration: 2 + Math.random(),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.1
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-bg-container gsap-fade-in">
          <img src="/assets/new_home_bg.jpg" alt="Portfolio Hero Image" className="hero-bg-image" style={{ filter: 'brightness(0.7)' }} />
          <div className="hero-overlay-left"></div>
          <div className="hero-overlay-bottom"></div>
          <div className="hero-ambient-red"></div>
          <div className="hero-ambient-crimson"></div>
        </div>

        <div className="hero-content container">
          <div className="hero-badge gsap-slide-up">
            <span className="badge-dot"></span>
            Available for New Projects
          </div>
          <h1 className="hero-headline-big">
            <span className="text-sand" style={{ display: 'block', fontSize: '0.6em', marginBottom: '0.2em' }}>
              <SplitTextReveal text="Hello, I'm" elementType="span" />
            </span>
            <span className="text-white">
              <SplitTextReveal text="Veera" elementType="span" />
            </span><br />
            <span className="text-white">
              <SplitTextReveal text="Manikandan" elementType="span" />
            </span>
          </h1>
          <p className="hero-description-cinematic gsap-slide-up">
            A passionate Full Stack Developer and CSBS student dedicated to building high-performance, scalable web applications with intuitive design and seamless user experiences.
          </p>
          <div className="hero-actions gsap-slide-up">
            <MagneticButton>
              <Link to="/projects" className="btn btn-primary">
                View My Work <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/contact" className="btn btn-secondary">
                Let's Connect
              </Link>
            </MagneticButton>
          </div>
          <div className="hero-stats gsap-slide-up">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">B-Tech</span>
              <span className="stat-label">Pre-Final Year</span>
            </div>
          </div>
        </div>

      </section>
      
      <div className="section-transition"></div>

      {/* Why Me Section */}
      <section className="section" id="why-me" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="grid-2-col" style={{ alignItems: 'center' }}>
            <div className="why-me-text gsap-scroll-trigger">
              <span className="services-tag-sm">MY PHILOSOPHY</span>
              <h2 className="about-headline" style={{ marginTop: '1rem' }}>
                <span className="text-sand">Driven by</span> <span className="text-white">Impact</span>
              </h2>
              <p className="about-text-p" style={{ marginTop: '1rem' }}>
                As a CSBS student, I approach development not just from a technical standpoint, but with a business systems mindset. I believe code should solve real problems, enhance efficiency, and drive measurable impact.
              </p>
              <p className="about-text-p">
                I am dedicated to writing clean, maintainable, and scalable code. I stay updated with the latest industry trends, ensuring that the solutions I build today are prepared for the challenges of tomorrow.
              </p>
            </div>
            <div className="why-me-stats gsap-scroll-trigger glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <i className="fa-solid fa-check-circle" style={{ fontSize: '2rem', color: 'var(--orange-primary)' }}></i>
                <div>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Clean Architecture</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Writing modular, reusable code.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <i className="fa-solid fa-bolt" style={{ fontSize: '2rem', color: '#900000' }}></i>
                <div>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>Performance First</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Optimizing for speed and efficiency.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <i className="fa-solid fa-users" style={{ fontSize: '2rem', color: 'var(--text-main)' }}></i>
                <div>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}>User-Centric</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Focusing on intuitive user experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Showcase Section */}
      <section className="section relative overflow-hidden" id="tech-stack">
        <TopologyMesh />
        <div className="container relative z-10 gsap-scroll-trigger">
          <div style={{ textAlign: 'center' }}>
            <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}>
              <i className="fa-solid fa-layer-group"></i> TECH ARSENAL
            </span>
            <h2 className="section-title font-heading" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              <span className="text-sand">My</span> <span className="text-white">Tech Stack</span>
            </h2>
          </div>
          
          <div className="gsap-stagger-container flex flex-wrap justify-center gap-6" style={{ marginTop: '3rem' }}>
            {[
              { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#E34F26' },
              { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
              { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#F7DF1E' },
              { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
              { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933' },
              { name: 'MongoDB', icon: 'fa-solid fa-database', color: '#47A248' },
              { name: 'TypeScript', icon: 'fa-solid fa-code', color: '#3178C6' },
              { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' },
              { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
              { name: 'Figma', icon: 'fa-brands fa-figma', color: '#F24E1E' },
              { name: 'Express', icon: 'fa-solid fa-server', color: '#000000' },
              { name: 'MySQL', icon: 'fa-solid fa-database', color: '#4479A1' },
            ].map((tech, idx) => (
              <div key={idx} className="glass-card text-center gsap-float group" style={{ padding: '1.5rem', width: '140px', transition: 'all 0.3s ease', cursor: 'default' }}>
                <i className={tech.icon} style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--orange-primary)', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = tech.color} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--orange-primary)'}></i>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="section" id="featured-work">
        <div className="container gsap-scroll-trigger">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}>
              <i className="fa-solid fa-rocket"></i> FEATURED WORK
            </span>
            <h2 className="section-title font-heading" style={{ fontSize: '2.5rem' }}>
              <span className="text-sand">Selected</span> <span className="text-white">Projects</span>
            </h2>
          </div>

          <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Card 1 */}
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--orange-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>E-Commerce Platform</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                A full-stack shopping experience with real-time cart, secure checkout, and admin dashboard.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {['React', 'Node.js', 'MongoDB'].map((tech) => (
                  <span key={tech} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-sand)' }}>{tech}</span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--orange-primary)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Real-Time Chat App</h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Instant messaging with live typing indicators, read receipts, and media sharing.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {['React', 'Socket.io', 'Express'].map((tech) => (
                  <span key={tech} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-sand)' }}>{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/projects" className="btn btn-primary">
              View All Projects <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="section" id="cta" style={{ background: 'rgba(0,0,0,0.4)', padding: '5rem 0' }}>
        <div className="container gsap-scroll-trigger">
          <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="font-heading" style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Have a project in mind?</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginBottom: '2.5rem' }}>
              Let's collaborate and build something extraordinary together.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
              <Link to="/about" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
