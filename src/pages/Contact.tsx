import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PremiumFAQItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: '16px', 
        background: isHovered || isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
        border: `1px solid ${isHovered || isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)'}`,
        overflow: 'hidden', 
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered && !isOpen ? 'scale(1.01)' : 'scale(1)',
        boxShadow: isHovered || isOpen ? '0 10px 30px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px',
          color: isHovered || isOpen ? '#ffffff' : 'var(--text-main)', fontWeight: 600, fontSize: '1.05rem', listStyle: 'none',
          transition: 'color 0.3s ease'
        }}
      >
        <span style={{ 
          width: '32px', height: '32px', borderRadius: '50%', 
          background: isOpen ? 'var(--orange-primary)' : 'rgba(244,228,208,0.05)', 
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, 
          color: isOpen ? '#0d0d0d' : 'var(--orange-primary)', fontSize: '0.85rem',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <i className="fa-solid fa-plus"></i>
        </span>
        {q}
      </div>
      <div 
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ padding: '0 1.5rem 1.25rem 4.5rem', color: 'rgba(244,228,208,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {a}
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.fromTo('.contact-hero-word',
        { opacity: 0, y: 80, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );

      // Subtitle fade
      gsap.fromTo('.contact-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.8 }
      );

      // Scroll triggers
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

      // Stagger children
      gsap.utils.toArray('.gsap-stagger-container').forEach((container: any) => {
        const items = container.children;
        gsap.fromTo(items,
          { opacity: 0, y: 50, filter: 'blur(8px)', scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Form fields slide in
      gsap.fromTo('.form-field',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form-wrapper', start: 'top 80%' }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const contactMethods = [
    { icon: 'fa-solid fa-envelope', label: 'Email', value: 'veeramani.4evr@gmail.com', href: 'mailto:veeramani.4evr@gmail.com', accent: 'rgba(244,228,208,0.12)' },
    { icon: 'fa-solid fa-phone', label: 'Phone', value: '+91 7305332275', href: 'tel:+917305332275', accent: 'rgba(144,0,0,0.12)' },
    { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Palani, Tamilnadu', href: '#', accent: 'rgba(244,228,208,0.08)' },
  ];

  const socials = [
    { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/veera-%E2%9C%A6%EF%B8%8E-a6b488327', label: 'LinkedIn' },
    { icon: 'fa-brands fa-instagram', href: 'https://instagram.com/veeramani_4ever', label: 'Instagram' },
    { icon: 'fa-brands fa-github', href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <div ref={containerRef}>
      {/* Cinematic Hero & Split Layout */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: '100px', paddingBottom: '4rem' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
          <img src="/assets/new_hero.jpg" alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.25) saturate(0.8)' }} />
        </div>
        {/* Gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'linear-gradient(180deg, transparent 0%, var(--bg-dark) 100%)' }}></div>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'radial-gradient(ellipse at 30% 50%, rgba(120,10,19,0.3) 0%, transparent 70%)' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
          <div className="contact-grid">
            
            {/* Left Column: Info & Methods */}
            <div className="gsap-scroll-trigger">
              {/* Availability pill */}
              <div className="contact-hero-sub" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 12px rgba(34,197,94,0.6)', animation: 'pulse 2s infinite' }}></span>
                Available for new projects
              </div>
              
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                <span className="contact-hero-word" style={{ display: 'inline-block' }}>Let's &nbsp;</span>
                <span className="contact-hero-word" style={{ display: 'inline-block', color: 'var(--orange-primary)', fontStyle: 'italic' }}>Build&nbsp;</span>
                <br />
                <span className="contact-hero-word" style={{ display: 'inline-block' }}>Something&nbsp;</span>
                <span className="contact-hero-word" style={{ display: 'inline-block' }}>Great.</span>
              </h1>
              
              <p className="contact-hero-sub" style={{ color: 'var(--text-dim)', fontSize: '1.15rem', marginBottom: '3rem', lineHeight: 1.7, maxWidth: '90%' }}>
                Have an idea? A project? Or just want to say hello? I'd  love to hear from you. I usually respond within 24 hours.
              </p>

              <div className="gsap-stagger-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem',
                      background: hoveredCard === idx ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${hoveredCard === idx ? 'rgba(244,228,208,0.2)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '16px', textDecoration: 'none', transition: 'all 0.4s ease',
                      transform: hoveredCard === idx ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredCard === idx ? '0 12px 30px rgba(0,0,0,0.3)' : 'none',
                    }}
                  >
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                      background: `linear-gradient(135deg, ${method.accent} 0%, rgba(144,0,0,0.08) 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--orange-primary)', fontSize: '1.2rem',
                      transition: 'transform 0.3s ease',
                      transform: hoveredCard === idx ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                    }}>
                      <i className={method.icon}></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>{method.label}</div>
                      <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1rem' }}>{method.value}</div>
                    </div>
                  </a>
                ))}
                
                <a
                  href="/assets/veeras_resume.pdf"
                  download="veera's resume.pdf"
                  className="btn btn-primary"
                  style={{ marginTop: '1rem', width: 'fit-content' }}
                >
                  Download Resume <i className="fa-solid fa-download" style={{ marginLeft: '6px' }}></i>
                </a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="gsap-scroll-trigger contact-form-wrapper" style={{
              position: 'relative', padding: '2.5rem', borderRadius: '24px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              {/* Ambient glow */}
              <div style={{ position: 'absolute', top: '-30%', left: '-30%', width: '160%', height: '160%', background: 'radial-gradient(ellipse at 30% 30%, rgba(244,228,208,0.04) 0%, transparent 60%)', pointerEvents: 'none' }}></div>

              <form id="contact-form" className="relative z-10" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', color: focusedField === 'name' ? 'var(--orange-primary)' : 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block', transition: 'color 0.3s ease' }}>Full Name</label>
                    <input
                      type="text" id="user_name" placeholder="John Doe" required
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      style={{
                        width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${focusedField === 'name' ? 'rgba(244,228,208,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: focusedField === 'name' ? '0 0 20px rgba(244,228,208,0.1)' : 'none',
                      }}
                    />
                  </div>
                  <div className="form-field">
                    <label style={{ fontSize: '0.75rem', color: focusedField === 'email' ? 'var(--orange-primary)' : 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block', transition: 'color 0.3s ease' }}>Email Address</label>
                    <input
                      type="email" id="user_email" placeholder="john@example.com" required
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      style={{
                        width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${focusedField === 'email' ? 'rgba(244,228,208,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: focusedField === 'email' ? '0 0 20px rgba(244,228,208,0.1)' : 'none',
                      }}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label style={{ fontSize: '0.75rem', color: focusedField === 'subject' ? 'var(--orange-primary)' : 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block', transition: 'color 0.3s ease' }}>Subject</label>
                  <input
                    type="text" id="subject" placeholder="Project Inquiry"
                    onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                    style={{
                      width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${focusedField === 'subject' ? 'rgba(244,228,208,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: focusedField === 'subject' ? '0 0 20px rgba(244,228,208,0.1)' : 'none',
                    }}
                  />
                </div>

                <div className="form-field">
                  <label style={{ fontSize: '0.75rem', color: focusedField === 'message' ? 'var(--orange-primary)' : 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', display: 'block', transition: 'color 0.3s ease' }}>Message</label>
                  <textarea
                    id="message" rows={4} placeholder="Tell me about your project, goals, and timeline..." required
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    style={{
                      width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${focusedField === 'message' ? 'rgba(244,228,208,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none',
                      transition: 'all 0.3s ease', resize: 'none',
                      boxShadow: focusedField === 'message' ? '0 0 20px rgba(244,228,208,0.1)' : 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="form-field"
                  style={{
                    width: '100%', padding: '14px', border: 'none', borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--orange-primary) 0%, #d4c4a0 100%)',
                    color: '#0d0d0d', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    transition: 'all 0.3s ease', marginTop: '0.5rem',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(244,228,208,0.25)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Send Message <i className="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (Quick info, FAQ, Footer) */}
      <div className="main-content relative">

        {/* Quick Info Strip */}
        <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="gsap-stagger-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { icon: 'fa-solid fa-clock', num: '< 24h', label: 'Response Time' },
                { icon: 'fa-solid fa-globe', num: 'IST', label: 'UTC+5:30' },
                { icon: 'fa-solid fa-laptop', num: 'Remote', label: 'Work Style' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1.5rem 1rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <i className={stat.icon} style={{ color: 'var(--orange-primary)', fontSize: '1.2rem', marginBottom: '0.75rem', display: 'block' }}></i>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{stat.num}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="faq" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          {/* Ambient Glow */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw', height: '300px', background: 'radial-gradient(ellipse at center, rgba(144,0,0,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>
          <div className="container" style={{ maxWidth: '750px', position: 'relative', zIndex: 1 }}>
            <div className="gsap-scroll-trigger text-center" style={{ marginBottom: '3rem' }}>
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}>
                <i className="fa-solid fa-circle-question" style={{ marginRight: '6px', color: 'var(--orange-primary)' }}></i> FAQ
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--text-main)' }}>
                Common <span className="text-sand" style={{ fontStyle: 'italic' }}>Questions</span>
              </h2>
            </div>

            <div className="gsap-stagger-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 2 }}>
              {[
                { q: 'Are you available for freelance work?', a: 'Yes! I am currently accepting freelance projects that align with my skills in full-stack web development.' },
                { q: 'Do you design as well as code?', a: 'Absolutely. While development is my core strength, I have a strong eye for design and often wireframe interfaces in Figma before coding them.' },
                { q: 'What is your typical turnaround time?', a: 'This depends on scope. A standard landing page takes 1-2 weeks, while a complex full-stack web app can take a month or more.' },
                { q: 'What technologies do you work with?', a: 'My core stack includes React, TypeScript, Node.js, Express, MongoDB, and MySQL. I also work with Python, Figma, Git, and Docker.' },
              ].map((faq, i) => (
                <PremiumFAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Social Connect Footer */}
        <section className="section text-center" style={{ paddingTop: '3rem', paddingBottom: '4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container gsap-scroll-trigger" style={{ maxWidth: '600px' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem', marginBottom: '1.5rem', letterSpacing: '0.5px' }}>Or find me on</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-main)', fontSize: '1.2rem', textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244,228,208,0.1)'; e.currentTarget.style.borderColor = 'rgba(244,228,208,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.color = 'var(--orange-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(12px); opacity: 0.3; }
        }
        details[open] summary span i { transform: rotate(45deg); }
        details summary span i { transition: transform 0.3s ease; }
        details summary::-webkit-details-marker { display: none; }
        details[open] { background: rgba(255,255,255,0.04) !important; border-color: rgba(244,228,208,0.12) !important; }
      `}</style>
    </div>
  );
};

export default Contact;
