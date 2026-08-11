import React, { useEffect, useRef } from 'react';
import TiltCard from '../components/ui/TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuredProjectsData = [
  {
    title: "FinGenZAi | AI Financial Advisory Platform",
    description: "A modern, AI-driven financial advisory ecosystem tailored to help Gen Z users build financial autonomy. Developed 'Fin Sensei,' a personalized AI companion that delivers actionable financial insights and automated goal modeling. Integrated smart expense analysis tools.",
    icon: "fa-chart-line",
    color: "#900000",
    tags: ["AI", "Fintech", "Data Analysis"]
  },
  {
    title: "Alloc8 | Hierarchical Capacity-Planning Platform",
    description: "A robust capacity-planning platform built to manage and allocate operational resources efficiently across teams. Architected a role-based access system (Owner, Head, Worker). Developed the front-end and database architecture utilizing a modern React 19 and SQLite tech stack.",
    icon: "fa-sitemap",
    color: "var(--text-main)",
    tags: ["React 19", "SQLite", "RBAC"]
  },
  {
    title: "SSMIET Project Allocation System",
    description: "An institutional management tool designed to streamline the assignment and tracking of academic projects within SSM Institute of Engineering and Technology. Engineered to facilitate efficient workflows between mentors, administration, and student teams. Structured to handle hierarchical approvals.",
    icon: "fa-users-gear",
    color: "var(--orange-primary)",
    tags: ["Institutional Management", "Workflow", "Hierarchy"]
  },
  {
    title: "Nilam.ai | Comprehensive Agritech Platform",
    description: "A digital application framework designed to empower the agricultural sector through real-time data tracking and automated financial assistance matching. Integrated satellite weather tracking, automated subsidy matching, and offline emergency SMS broadcasts.",
    icon: "fa-leaf",
    color: "var(--text-main)",
    tags: ["Agritech", "API Integration", "SMS Broadcasting"]
  },
  {
    title: "SSMIET Online Admission Portal 2026 | Infrastructure Migration",
    description: "A technical deployment and infrastructure management initiative for a large-scale institutional admission tracking portal. Directed the complete migration from Render cloud hosting to a secure, self-hosted local server environment.",
    icon: "fa-server",
    color: "var(--orange-primary)",
    tags: ["DevOps", "Infrastructure", "Migration"]
  },
  {
    title: "Web Development Internship | TecCorps & AppleStudio",
    description: "Completed an intensive web development internship from July 1 to July 31. Developed and optimized scalable web solutions for TecCorps.in and AppleStudio.in, focusing on responsive design, performance optimization, and delivering seamless user experiences.",
    icon: "fa-briefcase",
    color: "#900000",
    tags: ["Internship", "Web Optimization", "Full-Stack"]
  }
];

const ongoingProjectsData = [
  {
    title: "O.D.I.N. | AI-Powered Business Operating System",
    description: "An intelligent, multi-agent business operating system engineered to automate workflow tracking and optimize organizational efficiency. Designed a complex three-tier multi-agent architecture where AI agents communicate autonomously across executive, managerial, and execution levels. Implemented automated task tracking pipelines and real-time bottleneck alerts.",
    icon: "fa-robot",
    color: "var(--orange-primary)",
    tags: ["Multi-Agent AI", "Workflow Automation", "Architecture"]
  },
  {
    title: "B-Link | Emergency Medical Dispatch Ecosystem",
    description: "A hyper-local emergency medical dispatch platform engineered for rapid response. Developed a high-contrast dark mode interface for optimal visibility. Implemented masked privacy bridges. Engineered an automated offline SMS protocol fallback.",
    icon: "fa-truck-medical",
    color: "#900000",
    tags: ["Emergency Tech", "Privacy", "Offline SMS"]
  },
  {
    title: "Student Tech Deployments | Freelance Initiative",
    description: "A technology service initiative bridging the gap between academic theory and practical application for university students. Architect and provide complete, ready-to-deploy technology projects across modern stacks (React, Node.js, FastAPI, Next.js, Arduino).",
    icon: "fa-laptop-code",
    color: "var(--text-main)",
    tags: ["Freelance", "Mentorship", "Multi-Stack"]
  }
];

const Projects: React.FC = () => {
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

      // Project cards animation
      gsap.utils.toArray('.gsap-project-card').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });

      // Scroll trigger generic
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

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Page Header */}
      <section className="page-header">
        <div className="hero-bg-container gsap-fade-in" style={{ height: '40vh', minHeight: '300px' }}>
          <img src="/assets/project_hero.png" alt="Banner" className="hero-bg-image" style={{ objectPosition: 'center', filter: 'brightness(0.9)' }} />
          <div className="hero-overlay-bottom"></div>
        </div>
        <div className="container page-header-content">
          <h1 className="page-title gsap-slide-up"><span className="text-sand">Featured</span> <span className="text-white">Projects</span></h1>
        </div>
      </section>

      {/* Main Body Container */}
      <div className="main-content relative">
        <div className="glow-orb orange-glow orb-1"></div>
        <div className="glow-orb cyan-glow orb-2"></div>
        
        {/* Featured Projects Section */}
        <section className="section projects-section" id="featured-projects">
          <div className="container long-videos-container">
            <div className="long-videos-grid">
              {featuredProjectsData.map((project, index) => (
                <TiltCard key={`featured-${index}`} className="gsap-project-card">
                  <div className="long-video-card glass-card" style={{ height: '100%' }}>
                    <div className="long-video-embed-wrapper" style={{ background: '#111', paddingTop: '30%', position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(20,20,20,1) 0%, rgba(30,30,30,1) 100%)' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--orange-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      </div>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                        <i className={`fa-solid ${project.icon}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: project.color }}></i>
                      </div>
                    </div>
                    <div className="long-video-content" style={{ padding: '20px' }}>
                      <h3 className="long-video-title" style={{ color: 'var(--text-main)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '0.5rem', fontWeight: 600 }}>{project.title}</h3>
                      <p className="long-video-desc" style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)', lineHeight: 1.5 }}>{project.description}</p>
                      <div style={{ marginTop: '15px' }}>
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="stack-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Ongoing Projects Section */}
        <section className="section projects-section" id="ongoing-projects" style={{ paddingTop: '2rem' }}>
          <div className="container gsap-scroll-trigger">
            <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
              <h2 className="section-title"><span className="text-sand">Ongoing</span> <span className="text-white">Projects</span></h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>Active developments and continuous initiatives.</p>
            </div>
          </div>
          <div className="container long-videos-container" style={{ marginTop: 0 }}>
            <div className="long-videos-grid">
              {ongoingProjectsData.map((project, index) => (
                <TiltCard key={`ongoing-${index}`} className="gsap-project-card">
                  <div className="long-video-card glass-card" style={{ height: '100%' }}>
                    <div className="long-video-embed-wrapper" style={{ background: '#111', paddingTop: '30%', position: 'relative', overflow: 'hidden' }}>
                       <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(20,20,20,1) 0%, rgba(30,30,30,1) 100%)' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#900000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                      </div>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                        <i className={`fa-solid ${project.icon}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: project.color }}></i>
                      </div>
                    </div>
                    <div className="long-video-content" style={{ padding: '20px' }}>
                      <h3 className="long-video-title" style={{ color: 'var(--text-main)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', marginBottom: '0.5rem', fontWeight: 600 }}>{project.title}</h3>
                      <p className="long-video-desc" style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)', lineHeight: 1.5 }}>{project.description}</p>
                      <div style={{ marginTop: '15px' }}>
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="stack-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process Section */}
        <section className="section" id="process" style={{ paddingTop: '4rem', paddingBottom: '4rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container gsap-scroll-trigger">
            <div className="section-header text-center">
              <h2 className="section-title"><span className="text-sand">My Development</span> <span className="text-white">Process</span></h2>
              <p style={{ color: 'var(--text-dim)', marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>How I take a project from an initial idea to a deployed application.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem', textAlign: 'center' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--orange-primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem auto' }}>1</div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Ideation & Plan</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Gathering requirements, wireframing in Figma, and defining the system architecture.</p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#900000', color: '#f4e4d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem auto' }}>2</div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Design & UI</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Crafting the visual layout, setting up design tokens, and ensuring responsiveness.</p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--text-main)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem auto' }}>3</div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Development</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Writing clean code, building APIs, integrating databases, and implementing logic.</p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem auto' }}>4</div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Deploy & Test</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Hosting the app on platforms like Vercel or Heroku and performing final QA checks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next / Future Projects */}
        <section className="section" id="upcoming" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="container gsap-stagger-container">
            <div className="section-header text-center">
              <span className="section-tag" style={{ display: 'inline-block', marginBottom: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.75rem' }}><i className="fa-solid fa-flask"></i> COMING SOON</span>
              <h2 className="section-title"><span className="text-sand">What's</span> <span className="text-white">Next</span></h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
              {/* Card 1 */}
              <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(244,228,208,0.1)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--orange-primary)' }}>In Research</div>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(244,228,208,0.1)', color: 'var(--orange-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>AI-Powered Task Manager</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6' }}>An intelligent productivity app that uses machine learning to prioritize tasks and predict deadlines.</p>
              </div>

              {/* Card 2 */}
              <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(244,228,208,0.1)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--orange-primary)' }}>Planning Phase</div>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(244,228,208,0.1)', color: 'var(--orange-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  <i className="fa-solid fa-database"></i>
                </div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Dev Portfolio CMS</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6' }}>A headless CMS designed specifically for developer portfolios with markdown support and API-first architecture.</p>
              </div>

              {/* Card 3 */}
              <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(244,228,208,0.1)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--orange-primary)' }}>Early Development</div>
                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(244,228,208,0.1)', color: 'var(--orange-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  <i className="fa-solid fa-palette"></i>
                </div>
                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Open Source UI Kit</h4>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6' }}>A collection of premium, accessible React components built with TypeScript and styled for dark themes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub CTA Banner */}
        <section className="section gsap-scroll-trigger" id="github-cta" style={{ background: 'rgba(0,0,0,0.3)', padding: '5rem 0', textAlign: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <i className="fa-brands fa-github text-5xl" style={{ color: 'var(--orange-primary)', fontSize: '3rem', marginBottom: '1.5rem' }}></i>
              <h2 className="section-title" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}><span className="text-sand">Explore My</span> <span className="text-white">Code</span></h2>
              <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '1.1rem' }}>All my projects are open-source. Check out the repositories, star them, or contribute.</p>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', borderRadius: '9999px', background: 'var(--orange-primary)', color: '#0d0d0d', fontWeight: 'bold', textDecoration: 'none', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                Visit GitHub <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
