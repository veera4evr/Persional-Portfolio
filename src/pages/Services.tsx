import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Professional scroll trigger for general elements (skipping the stack container)
      gsap.utils.toArray('.gsap-scroll-trigger').forEach((elem: any) => {
        if (!elem.classList.contains('services-right-col')) { 
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
        }
      });

      // 3D Services Stack Fanning - Smoothed out
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length > 0) {
        // Initial hidden state
        gsap.set(cards, { rotateZ: 0, rotateY: 0, rotateX: 0, transformOrigin: "bottom center", y: 80, opacity: 0, filter: 'blur(10px)' });

        ScrollTrigger.create({
          trigger: '.services-container-new',
          start: 'top 75%',
          onEnter: () => {
            // Smoothly slide up all cards together first
            gsap.to(cards, {
              y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power3.out',
              onComplete: () => {
                // Then fan them out with a very smooth expo ease (no bouncy elastic)
                cards.forEach((card, index) => {
                  const spread = (index - Math.floor(cards.length / 2)) * 12;
                  gsap.to(card, {
                    rotateZ: spread, 
                    x: spread * 2, 
                    y: Math.abs(spread) * -1.5,
                    duration: 1.2, 
                    ease: 'expo.out', // Extremely smooth, cinematic slide
                    delay: index * 0.08
                  });
                });
              }
            });
          }
        });

        // Smooth Hover states
        cards.forEach((card, index) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: '-=25', scale: 1.08, zIndex: 100, duration: 0.4, ease: 'power3.out' });
          });
          card.addEventListener('mouseleave', () => {
            const spread = (index - Math.floor(cards.length / 2)) * 12;
            gsap.to(card, { y: Math.abs(spread) * -1.5, scale: 1, zIndex: index + 1, duration: 0.5, ease: 'power3.out' });
          });
        });
      }

      // Stagger container
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

      // Proficiency bar fill animation
      gsap.utils.toArray('.gsap-bar').forEach((bar: any) => {
        gsap.to(bar, {
          transform: 'scaleX(1)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Page Header */}
      <section className="page-header">
        <div className="hero-bg-container gsap-fade-in" style={{ height: '40vh', minHeight: '300px' }}>
          <img src="/assets/skills_hero.png" alt="Banner" className="hero-bg-image" style={{ objectPosition: 'center', filter: 'brightness(0.9)' }} />
          <div className="hero-overlay-bottom"></div>
        </div>
        <div className="container page-header-content">
          <h1 className="page-title gsap-slide-up"><span className="text-sand">Skills &</span> <span className="text-white">Services</span></h1>
        </div>
      </section>

      {/* Main Body Container */}
      <div className="main-content relative">
        <div className="glow-orb orange-glow orb-1"></div>
        <div className="glow-orb cyan-glow orb-2"></div>

        {/* Tech Stack Marquee */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '2rem', overflow: 'hidden' }}>
          <div className="video-marquee-container">
            <div className="video-marquee-track" style={{ display: 'flex', gap: '3rem', alignItems: 'center', width: 'max-content' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--orange-primary)', textTransform: 'uppercase', whiteSpace: 'nowrap', letterSpacing: '2px' }}>
                • HTML5 • CSS3 • JAVASCRIPT • REACT.JS • NODE.JS • EXPRESS.JS • MONGODB • MYSQL • PYTHON • JAVA • GIT • GITHUB •
                • HTML5 • CSS3 • JAVASCRIPT • REACT.JS • NODE.JS • EXPRESS.JS • MONGODB • MYSQL • PYTHON • JAVA • GIT • GITHUB •
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section with 5 Fanned Cards */}
        <section className="section services-section" id="services">
          <div className="container services-container-new flex flex-col md:flex-row gap-12 items-center">
            {/* Left Column */}
            <div className="services-left-col gsap-scroll-trigger md:w-1/2">
              <div className="services-header-left">
                <span className="services-tag-sm">WHAT I OFFER</span>
                <h2 className="services-title-sm text-5xl font-heading mt-4 text-white">Skills</h2>
              </div>
              <p className="services-hero-text text-xl text-gray-400 mt-6">
                I build <span className="text-white">scalable</span>, functional &amp; visually pleasing digital experiences.
              </p>
              <a
                href="/assets/veeras_resume.pdf"
                download="veera's resume.pdf"
                className="btn btn-primary mt-8"
                style={{ display: 'inline-flex', width: 'fit-content' }}
              >
                Download Resume <i className="fa-solid fa-download" style={{ marginLeft: '6px' }}></i>
              </a>
            </div>

            {/* Right Column: 5 Cards 3D Fanned Stack Animation */}
            <div className="services-right-col md:w-1/2 h-[500px] relative">
              <div className="services-card-stack relative w-full h-full flex justify-center items-center perspective-1000" id="service-stack">
                {[
                  { title: 'Frontend Dev', sub: 'HTML, CSS, JS, React', icon: 'fa-laptop-code', img: 'frontend_dev_illustration.jpg' },
                  { title: 'Backend APIs', sub: 'Node.js, Express, DBs', icon: 'fa-server', img: 'backend_api_illustration.jpg' },
                  { title: 'UI/UX Design', sub: 'Prototyping & Interaction', icon: 'fa-pen-nib', img: 'ui_ux_illustration.jpg' },
                  { title: 'Version Control', sub: 'Git & GitHub', icon: 'fa-git-alt', img: 'version_control_illustration.jpg', isBrand: true },
                  { title: 'Problem Solving', sub: 'Logic & System Design', icon: 'fa-lightbulb', img: 'problem_solving_illustration.jpg' }
                ].map((card, i) => (
                  <div key={i} ref={el => { cardsRef.current[i] = el; }} className={`stack-card card-${i+1} glass-card absolute w-[260px] h-[360px] p-6 flex flex-col items-center text-center shadow-xl border border-[var(--card-border)] bg-[var(--card-bg)] rounded-[var(--radius-lg)]`}>
                    <div className="stack-card-inner w-full h-full flex flex-col items-center">
                      <div className="stack-icon-box text-3xl text-[var(--orange-primary)] mb-4">
                        <i className={`fa-${card.isBrand ? 'brands' : 'solid'} ${card.icon}`}></i>
                      </div>
                      <h4 className="stack-card-title text-xl font-heading text-white mb-2">{card.title}</h4>
                      <p className="stack-card-sub text-sm text-[var(--text-dim)] mb-6">{card.sub}</p>
                      <div className="stack-card-img-wrapper w-full flex-grow rounded-[var(--radius-md)] overflow-hidden">
                        <img src={`/assets/${card.img}`} className="stack-preview-img w-full h-full object-cover" alt={card.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Detailed Services List */}
        <section className="section" id="detailed-services" style={{ paddingTop: '2rem' }}>
          <div className="container gsap-scroll-trigger">
            <div className="section-header text-center">
              <h2 className="section-title"><span className="text-sand">Service</span> <span className="text-white">Offerings</span></h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>A deeper look into what I can build for you and your business.</p>
            </div>
            <div className="flex flex-col gap-8 mt-12">
              <div className="glass-card group relative overflow-hidden" style={{ padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', transition: 'all 0.4s ease' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, rgba(244,228,208,0.2) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(0deg, rgba(244,228,208,0.2) 1px, transparent 1px) 0 0 / 20px 20px' }}></div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,165,0,0.1)', border: '1px solid var(--orange-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }} className="group-hover:scale-110 group-hover:bg-[rgba(255,165,0,0.2)] transition-all duration-300">
                  <i className="fa-solid fa-code" style={{ fontSize: '2rem', color: 'var(--orange-primary)' }}></i>
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Custom Frontend Development</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>I specialize in building lightning-fast, fully responsive, and highly interactive frontend interfaces. Using frameworks like React and Next.js, combined with GSAP for buttery smooth animations, I ensure that users have an unforgettable visual experience on both mobile and desktop.</p>
                </div>
              </div>
              <div className="glass-card group relative overflow-hidden" style={{ padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', transition: 'all 0.4s ease' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, rgba(144,0,0,0.4) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(0deg, rgba(144,0,0,0.4) 1px, transparent 1px) 0 0 / 20px 20px' }}></div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(144, 0, 0, 0.1)', border: '1px solid #900000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }} className="group-hover:scale-110 group-hover:bg-[rgba(144,0,0,0.25)] transition-all duration-300">
                  <i className="fa-solid fa-server" style={{ fontSize: '2rem', color: '#900000' }}></i>
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Scalable Backend Systems</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>A beautiful frontend is nothing without a robust backend. I develop secure and scalable REST APIs using Node.js and Express. I can design database architectures (SQL/NoSQL like MongoDB and MySQL) tailored to handle high traffic and complex data relationships securely.</p>
                </div>
              </div>
              <div className="glass-card group relative overflow-hidden" style={{ padding: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', transition: 'all 0.4s ease' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(0deg, rgba(255,255,255,0.3) 1px, transparent 1px) 0 0 / 20px 20px' }}></div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(245,245,220,0.1)', border: '1px solid var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', zIndex: 1 }} className="group-hover:scale-110 group-hover:bg-[rgba(255,255,255,0.15)] transition-all duration-300">
                  <i className="fa-solid fa-mobile-screen" style={{ fontSize: '2rem', color: 'var(--text-main)' }}></i>
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>UI/UX & Prototyping</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>Before writing a single line of code, I use tools like Figma to wireframe and prototype applications. I focus heavily on User Experience (UX), ensuring that the software is not just visually appealing (UI) but also incredibly intuitive for end-users to navigate.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools and Workflow */}
        <section className="section" id="tools" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container gsap-scroll-trigger">
            <div className="section-header text-center">
              <h2 className="section-title"><span className="text-sand">My Daily</span> <span className="text-white">Toolkit</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginTop: '3rem', textAlign: 'center' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <i className="fa-brands fa-figma" style={{ fontSize: '3rem', color: '#F24E1E' }}></i>
                <h4 style={{ color: 'var(--text-main)', marginTop: '1rem' }}>Figma</h4>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <i className="fa-solid fa-code" style={{ fontSize: '3rem', color: '#007ACC' }}></i>
                <h4 style={{ color: 'var(--text-main)', marginTop: '1rem' }}>VS Code</h4>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <i className="fa-brands fa-git-alt" style={{ fontSize: '3rem', color: '#F05032' }}></i>
                <h4 style={{ color: 'var(--text-main)', marginTop: '1rem' }}>Git</h4>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <i className="fa-solid fa-network-wired" style={{ fontSize: '3rem', color: '#FF6C37' }}></i>
                <h4 style={{ color: 'var(--text-main)', marginTop: '1rem' }}>Postman</h4>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <i className="fa-brands fa-docker" style={{ fontSize: '3rem', color: '#2496ED' }}></i>
                <h4 style={{ color: 'var(--text-main)', marginTop: '1rem' }}>Docker</h4>
              </div>
            </div>
          </div>
        </section>
        
        {/* Soft Skills Section — Interactive Redesign */}
        <section className="section" id="softskills" style={{ marginBottom: '4rem' }}>
          <div className="container">
            <div className="section-header text-center gsap-scroll-trigger">
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}>
                <i className="fa-solid fa-shapes" style={{ marginRight: '6px', color: 'var(--orange-primary)' }}></i> SOFT SKILLS
              </span>
              <h2 className="section-title"><span className="text-sand">Beyond</span> <span className="text-white">The Code</span></h2>
              <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '1rem auto 0', fontSize: '1.05rem', lineHeight: '1.7' }}>Technical skills get the job done. These are the qualities that make the collaboration exceptional.</p>
            </div>

            <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: '3rem' }}>
              {[
                {
                  num: '01',
                  icon: 'fa-solid fa-brain',
                  title: 'Problem Solving',
                  desc: 'Skilled in analyzing technical challenges and applying logical thinking to deliver efficient coding solutions.',
                  level: 90,
                },
                {
                  num: '02',
                  icon: 'fa-solid fa-comments',
                  title: 'Communication',
                  desc: 'Able to communicate ideas clearly in both technical and non-technical terms for smooth collaboration.',
                  level: 85,
                },
                {
                  num: '03',
                  icon: 'fa-solid fa-bolt',
                  title: 'Adaptability',
                  desc: 'Quick learner who embraces new tools, frameworks, and development trends to stay ahead of the curve.',
                  level: 95,
                },
                {
                  num: '04',
                  icon: 'fa-solid fa-clock',
                  title: 'Time Management',
                  desc: 'Efficient in prioritizing tasks and meeting deadlines for projects and coding competitions under pressure.',
                  level: 80,
                },
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    padding: '2.5rem 2rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(244,228,208,0.25)';
                    el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(244,228,208,0.1)';
                    el.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.boxShadow = 'none';
                    el.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {/* Radial glow on hover */}
                  <div style={{ position: 'absolute', top: '-60%', right: '-60%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(244,228,208,0.06) 0%, transparent 60%)', pointerEvents: 'none', opacity: 0, transition: 'opacity 0.5s ease' }} className="group-hover:opacity-100"></div>

                  {/* Large step number watermark */}
                  <span style={{ position: 'absolute', top: '-10px', right: '15px', fontSize: '6rem', fontWeight: 900, color: 'rgba(244,228,208,0.04)', lineHeight: 1, pointerEvents: 'none', fontFamily: 'var(--font-heading)' }}>{skill.num}</span>

                  {/* Icon */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(244,228,208,0.12) 0%, rgba(144,0,0,0.1) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', color: 'var(--orange-primary)', marginBottom: '1.5rem',
                    transition: 'transform 0.3s ease',
                  }} className="group-hover:scale-110">
                    <i className={skill.icon}></i>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.75rem', fontWeight: 600 }}>{skill.title}</h3>

                  {/* Description */}
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>{skill.desc}</p>

                  {/* Proficiency bar */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Proficiency</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--orange-primary)', fontWeight: 600 }}>{skill.level}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div
                        className="gsap-bar"
                        style={{
                          width: `${skill.level}%`,
                          height: '100%',
                          borderRadius: '2px',
                          background: 'linear-gradient(90deg, var(--orange-primary), #900000)',
                          transform: 'scaleX(0)',
                          transformOrigin: 'left',
                          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Work With Me Section */}
        <section className="relative z-10" id="why-me" style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container gsap-scroll-trigger text-center">
            <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}>
              <i className="fa-solid fa-handshake"></i> WHY ME
            </span>
            <h2 className="section-title"><span className="text-sand">Why</span> <span className="text-white">Work With Me</span></h2>
            
            <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="glass-card text-center p-8">
                <div style={{ width: '70px', height: '70px', background: 'rgba(244,228,208,0.1)', color: 'var(--orange-primary)', fontSize: '2rem', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="rounded-2xl">
                  <i className="fa-solid fa-crosshairs"></i>
                </div>
                <h3 className="text-xl text-white font-heading font-semibold mb-3">Pixel-Perfect Execution</h3>
                <p className="text-[var(--text-dim)] leading-relaxed">Every interface I build is crafted with obsessive attention to detail, from spacing to animations to micro-interactions.</p>
              </div>
              <div className="glass-card text-center p-8">
                <div style={{ width: '70px', height: '70px', background: 'rgba(244,228,208,0.1)', color: 'var(--orange-primary)', fontSize: '2rem', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="rounded-2xl">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <h3 className="text-xl text-white font-heading font-semibold mb-3">Full-Stack Versatility</h3>
                <p className="text-[var(--text-dim)] leading-relaxed">From designing in Figma to deploying on cloud infrastructure, I handle the entire product lifecycle end-to-end.</p>
              </div>
              <div className="glass-card text-center p-8">
                <div style={{ width: '70px', height: '70px', background: 'rgba(244,228,208,0.1)', color: 'var(--orange-primary)', fontSize: '2rem', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="rounded-2xl">
                  <i className="fa-solid fa-gauge-high"></i>
                </div>
                <h3 className="text-xl text-white font-heading font-semibold mb-3">Rapid Delivery</h3>
                <p className="text-[var(--text-dim)] leading-relaxed">I believe in shipping early and iterating fast. Agile methodology is not just a buzzword — it's how I operate.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Start CTA */}
        <section className="relative z-10 gsap-scroll-trigger" id="start-cta" style={{ background: 'transparent', padding: '5rem 0' }}>
          <div className="container">
            <div className="glass-card" style={{ 
              position: 'relative', overflow: 'hidden', padding: '5rem 2rem', 
              textAlign: 'center', borderRadius: '32px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(244,228,208,0.1)' 
            }}>
              {/* Internal Mesh Background */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(rgba(244,228,208,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,228,208,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }}></div>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(120,10,19,0.4) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
              
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  Ready to bring your <span className="text-sand" style={{ fontStyle: 'italic' }}>vision</span> to life?
                </h2>
                <p className="text-[var(--text-dim)] text-lg mb-10 leading-relaxed">
                  Whether it's a landing page, a full-stack application, or a design system — I'm here to help you ship faster and better.
                </p>
                <Link to="/contact" className="inline-flex items-center rounded-full font-bold text-base hover:-translate-y-1 transition-all duration-300" style={{ padding: '0.85rem 1.75rem', gap: '0.5rem', backgroundColor: 'var(--orange-primary)', color: '#0d0d0d', boxShadow: '0 10px 30px rgba(244,228,208,0.2)' }}>
                  Start a Conversation <i className="fa-solid fa-arrow-right text-sm"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Services;
