import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedBarChart from '../components/ui/AnimatedBarChart';
import CircuitBoard from '../components/ui/CircuitBoard';
import FAQSection from '../components/ui/FAQSection';

gsap.registerPlugin(ScrollTrigger);

const techSkills = [
  { name: 'React & Front-End', level: 90, color: '#f4e4d0' },
  { name: 'Node.js & Backend', level: 85, color: '#f4e4d0' },
  { name: 'Python & Data', level: 75, color: '#f4e4d0' },
  { name: 'UI/UX Design (Figma)', level: 80, color: '#f4e4d0' }
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTag, setHoveredTag] = useState<number | null>(null);

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
      
      // Stagger container items
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Page Header */}
      <section className="page-header">
        <div className="hero-bg-container gsap-fade-in" style={{ height: '40vh', minHeight: '300px' }}>
          <img src="/assets/about_hero.png" alt="About Hero Banner" className="hero-bg-image" style={{ objectPosition: 'center', filter: 'brightness(0.8)' }} />
          <CircuitBoard variant="flat" />
          <div className="hero-overlay-bottom"></div>
        </div>
        <div className="container page-header-content">
          <h1 className="page-title gsap-slide-up"><span className="text-sand">About</span> <span className="text-white">Me</span></h1>
        </div>
      </section>

      {/* Main Body Container */}
      <div className="relative">
        <div className="glow-orb orange-glow orb-1"></div>
        <div className="glow-orb cyan-glow orb-2"></div>
        
        {/* About Section */}
        <section className="section about-section" id="about" style={{ paddingTop: '80px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div className="gsap-stagger-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch' }}>
              
              {/* Left: Profile Card */}
              <div className="glass-card hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300" style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#f4e4d0', border: 'none' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
                <img src="/assets/new_hero.jpg" alt="Veera" style={{ width: '160px', height: '160px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '4px solid #0d0d0d', marginBottom: '1.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2 }} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#0d0d0d', lineHeight: '1.1', marginBottom: '0.5rem', position: 'relative', zIndex: 2 }}>Veeramanikandan.G</h2>
                <span style={{ color: '#780a13', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>(Veera)</span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', textAlign: 'left', position: 'relative', zIndex: 2 }}>
                  <div className="hover:bg-[rgba(0,0,0,0.1)] transition-colors duration-300" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', background: 'rgba(0,0,0,0.05)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f4e4d0', fontSize: '1.2rem' }}>
                      <i className="fa-solid fa-cake-candles"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Born</div>
                      <div style={{ color: '#0d0d0d', fontWeight: 700, fontSize: '1.05rem' }}>13 April 2007</div>
                    </div>
                  </div>
                  <div className="hover:bg-[rgba(0,0,0,0.1)] transition-colors duration-300" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', background: 'rgba(0,0,0,0.05)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f4e4d0', fontSize: '1.2rem' }}>
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Location</div>
                      <div style={{ color: '#0d0d0d', fontWeight: 700, fontSize: '1.05rem' }}>Palani, Tamilnadu</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Bio Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
                <div>
                  <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}><i className="fa-solid fa-user-astronaut" style={{ marginRight: '6px', color: '#900000' }}></i> INTRODUCTION</span>
                  <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', lineHeight: '1.15', marginBottom: '1.5rem' }}>
                    Engineering the <span className="text-sand" style={{ fontStyle: 'italic' }}>Future</span>, One Line at a Time.
                  </h2>
                  <p className="about-text-p" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    I'm a tech-enthusiastic student currently pursuing my Bachelor's in <strong style={{ color: 'var(--text-main)' }}>Computer Science and Business Systems (CSBS)</strong> at SSMIET, Dindigul. 
                  </p>
                </div>
                
                <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--orange-primary)', background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)' }}>
                  <p className="about-text-p" style={{ margin: 0, fontSize: '1.05rem' }}>
                    With a strong interest in full stack development, I'm passionate about building user-friendly, efficient digital solutions. I enjoy solving real-world problems through code and take pride in writing clean, scalable applications.
                  </p>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <span 
                    onMouseEnter={() => setHoveredTag(1)} 
                    onMouseLeave={() => setHoveredTag(null)}
                    style={{ padding: '0.6rem 1.2rem', background: hoveredTag === 1 ? 'var(--orange-primary)' : 'rgba(255,255,255,0.03)', border: `1px solid ${hoveredTag === 1 ? 'var(--orange-primary)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', fontSize: '0.85rem', color: hoveredTag === 1 ? '#0d0d0d' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', transform: hoveredTag === 1 ? 'translateY(-2px)' : 'translateY(0)' }}
                  >
                    <i className="fa-solid fa-rocket"></i> Self-Motivated
                  </span>
                  <span 
                    onMouseEnter={() => setHoveredTag(2)} 
                    onMouseLeave={() => setHoveredTag(null)}
                    style={{ padding: '0.6rem 1.2rem', background: hoveredTag === 2 ? '#900000' : 'rgba(255,255,255,0.03)', border: `1px solid ${hoveredTag === 2 ? '#900000' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', transform: hoveredTag === 2 ? 'translateY(-2px)' : 'translateY(0)' }}
                  >
                    <i className="fa-solid fa-laptop-code"></i> Continuous Learner
                  </span>
                  <span 
                    onMouseEnter={() => setHoveredTag(3)} 
                    onMouseLeave={() => setHoveredTag(null)}
                    style={{ padding: '0.6rem 1.2rem', background: hoveredTag === 3 ? 'var(--orange-primary)' : 'rgba(255,255,255,0.03)', border: `1px solid ${hoveredTag === 3 ? 'var(--orange-primary)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '20px', fontSize: '0.85rem', color: hoveredTag === 3 ? '#0d0d0d' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', transform: hoveredTag === 3 ? 'translateY(-2px)' : 'translateY(0)' }}
                  >
                    <i className="fa-solid fa-lightbulb"></i> Problem Solver
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Proficiency Section */}
        <section className="section" id="proficiency" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container gsap-scroll-trigger">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                  <span className="text-sand">Technical</span> <span className="text-white">Proficiency</span>
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  A blend of design aesthetics and solid engineering. I strive to write code that not only functions perfectly but is also easy to read and scale.
                </p>
              </div>
              <div className="glass-card" style={{ padding: '2.5rem' }}>
                <AnimatedBarChart skills={techSkills} />
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications Timeline */}
        <section className="section education-section" id="education">
          <div className="container">
            <div className="section-header text-center gsap-scroll-trigger">
              <h2 className="section-title"><span className="text-sand">Academic</span> <span className="text-white">Journey</span></h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '1rem' }}>A continuous path of learning, building, and growing.</p>
            </div>

            <div className="gsap-stagger-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch', marginTop: '3rem' }}>
              
              {/* Item 1 */}
              <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden', borderTop: '3px solid var(--orange-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(244, 228, 208, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--orange-primary)' }}>
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px' }}>2024 - Present</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: '1.3' }}>B-Tech Computer Science & Business Systems</h3>
                <p style={{ color: 'var(--orange-primary)', fontSize: '0.95rem', fontWeight: 500 }}>SSM Institute of Engineering and Technology</p>
              </div>

              {/* Item 2 */}
              <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden', borderTop: '3px solid #900000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(144, 0, 0, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: '#900000' }}>
                    <i className="fa-solid fa-school"></i>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px' }}>2018 - 2024</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: '1.3' }}>Higher Secondary Education</h3>
                <p style={{ color: '#c0392b', fontSize: '0.95rem', fontWeight: 500 }}>APM Hr Sec School, Palani</p>
              </div>

              {/* Item 3 */}
              <div className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden', borderTop: '3px solid var(--text-main)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(244, 228, 208, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--text-main)' }}>
                    <i className="fa-solid fa-certificate"></i>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dim)', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px' }}>Ongoing</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.3' }}>Certifications & Bootcamps</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li style={{ fontSize: '0.9rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><i className="fa-solid fa-check" style={{ color: 'var(--orange-primary)', marginTop: '4px' }}></i> Full Stack Web Dev Bootcamp</li>
                  <li style={{ fontSize: '0.9rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><i className="fa-solid fa-check" style={{ color: '#900000', marginTop: '4px' }}></i> Responsive Web Design</li>
                  <li style={{ fontSize: '0.9rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><i className="fa-solid fa-check" style={{ color: 'var(--text-main)', marginTop: '4px' }}></i> Git and GitHub</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Extracurriculars & Leadership */}
        <section className="section" id="extracurriculars" style={{ paddingTop: '2rem' }}>
          <div className="container gsap-scroll-trigger">
            <div className="section-header text-center">
              <h2 className="section-title"><span className="text-sand">Beyond</span> <span className="text-white">Academics</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '1rem' }}><i className="fa-solid fa-users" style={{ color: 'var(--orange-primary)', marginRight: '10px' }}></i>Tech Club Member</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>Active member of the college coding club, organizing weekly problem-solving sessions and collaborative mini-projects to foster a strong developer community within the campus.</p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '1rem' }}><i className="fa-solid fa-microphone" style={{ color: '#900000', marginRight: '10px' }}></i>Hackathon Enthusiast</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: '1.6' }}>Participated in state-level hackathons focusing on building innovative tech solutions under pressure, improving teamwork, rapid prototyping, and presentation skills.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hobbies Section */}
        <section className="section" id="hobbies" style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container gsap-scroll-trigger text-center">
            <h2 className="section-title" style={{ marginBottom: '3rem' }}><span className="text-sand">When I'm Not</span> <span className="text-white">Coding</span></h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-gamepad" style={{ fontSize: '2rem', color: 'var(--orange-primary)' }}></i>
                </div>
                <h4 style={{ color: 'var(--text-main)' }}>Gaming</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-camera" style={{ fontSize: '2rem', color: '#900000' }}></i>
                </div>
                <h4 style={{ color: 'var(--text-main)' }}>Photography</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-book-open" style={{ fontSize: '2rem', color: 'var(--orange-primary)' }}></i>
                </div>
                <h4 style={{ color: 'var(--text-main)' }}>Tech Blogs</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-music" style={{ fontSize: '2rem', color: 'var(--text-main)' }}></i>
                </div>
                <h4 style={{ color: 'var(--text-main)' }}>Music</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-film" style={{ fontSize: '2rem', color: '#900000' }}></i>
                </div>
                <h4 style={{ color: 'var(--text-main)' }}>Editing</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-dumbbell" style={{ fontSize: '2rem', color: 'var(--orange-primary)' }}></i>
                </div>
                <h4 style={{ color: 'var(--text-main)' }}>Fitness</h4>
              </div>
            </div>
          </div>
        </section>
        
        <FAQSection />
        
      </div>
    </div>
  );
};

export default About;
