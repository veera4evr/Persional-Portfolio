import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  q: string;
  a: string | React.ReactNode;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    category: "General & Background",
    questions: [
      {
        q: "What is your current educational background?",
        a: "I am currently an undergraduate student pursuing a degree in Computer Science and Business Systems at the SSM Institute of Engineering and Technology (SSMIET) in Dindigul."
      },
      {
        q: "What is your primary tech stack?",
        a: "I specialize in full-stack web and machine learning development. My go-to technologies include React, Node.js, Next.js, and FastAPI. For database and backend management, I frequently use Firebase, Supabase, Prisma ORM, and SQLite. I also build hardware prototypes using Arduino UNO platforms."
      }
    ]
  },
  {
    category: "Services & Projects",
    questions: [
      {
        q: "Do you offer any services for fellow students?",
        a: "Yes! I run a service that provides complete, ready-to-deploy technology projects specifically designed for 1st, 2nd, and 3rd-year engineering students. If you need a fully functional project for a presentation or submission, feel free to reach out."
      },
      {
        q: "Can you tell me about some of your standout projects?",
        a: (
          <>
            A few of my recent major projects include:<br/><br/>
            <strong>Nilam.ai:</strong> An offline-first agritech platform built with Next.js and FastAPI that offers satellite weather tracking and automated subsidy matching.<br/><br/>
            <strong>B-Link:</strong> A hyper-local emergency medical dispatch ecosystem featuring an automated offline SMS protocol fallback.<br/><br/>
            <strong>Aurenz Fashions:</strong> A complete e-commerce storefront powered by a Firebase backend with custom administrative control panels.
          </>
        )
      },
      {
        q: "Do you participate in hackathons?",
        a: "Absolutely. I actively compete in hackathons and recently won a prize at Hackathon 2K25 with my team, Rogue Mobstars."
      }
    ]
  },
  {
    category: "Development & Work Experience",
    questions: [
      {
        q: "Do you use AI in your development workflow?",
        a: "Yes, I actively leverage AI-assisted development and vibe coding tools like Lovable.ai and Gamma AI to rapidly build, upgrade, and structure software interfaces and presentations."
      },
      {
        q: "Are you open to internships or freelance opportunities?",
        a: "Yes. I recently accepted an internship offer at Teccorps Solutions Private Limited and am continually expanding my machine learning knowledge through programs like the Amazon ML Summer School and Infosys ML foundation courses. I am always open to discussing exciting new freelance builds or collaborative opportunities."
      }
    ]
  },
  {
    category: "Project Services & Offerings",
    questions: [
      {
        q: "What exactly do you offer?",
        a: "I provide complete, ready-to-deploy technology projects tailored specifically for 1st, 2nd, and 3rd-year engineering students. Whether you need a mini-project, a presentation piece, or a hackathon prototype, I deliver fully functional codebases that are ready for immediate use."
      },
      {
        q: "What kinds of tech stacks and projects do you cover?",
        a: (
          <>
            I build across multiple domains depending on your requirements, including:<br/><br/>
            <strong>Full-Stack Web Development:</strong> Dynamic applications using React, Next.js, and Node.js.<br/>
            <strong>Machine Learning:</strong> Python-based ML implementations and APIs using FastAPI.<br/>
            <strong>Hardware & IoT:</strong> Hardware prototypes using Arduino UNO platforms (including WiFi boards and Bluetooth modules).<br/>
            <strong>Database Management:</strong> Scalable backend architectures using Firebase, Supabase, Prisma ORM, and SQLite.
          </>
        )
      },
      {
        q: "Are the projects fully complete?",
        a: "Yes. Every project is delivered as a complete package that is ready to deploy, present, and demonstrate."
      }
    ]
  },
  {
    category: "Trust & Developer Background",
    questions: [
      {
        q: "Who is building these projects?",
        a: "I am an undergraduate student studying Computer Science and Business Systems at SSMIET. I know exactly what professors, evaluators, and hackathon judges look for because I operate in the same environment. I recently won Hackathon 2K25, and I continuously upskill through programs like the Amazon ML Summer School."
      },
      {
        q: "Do you have examples of complex systems you've built?",
        a: (
          <>
            Absolutely. Beyond student projects, I build advanced, real-world systems, such as:<br/><br/>
            <strong>Nilam.ai:</strong> An offline-first agritech platform featuring satellite weather tracking and automated subsidy matching.<br/><br/>
            <strong>B-Link:</strong> A hyper-local emergency medical dispatch ecosystem built with dark mode interfaces and automated offline SMS fallbacks.<br/><br/>
            <strong>Aurenz Fashions:</strong> A complete e-commerce storefront powered by a robust Firebase backend and custom administrative dashboards.
          </>
        )
      },
      {
        q: "How do I request a project?",
        a: "Simply reach out via my Contact page or social links with a brief description of your requirements, your current year of study, and your deadline, and we can get started!"
      }
    ]
  }
];

const FAQSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-faq-fade-up').forEach((elem: any) => {
        gsap.fromTo(elem,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
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

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="section faq-section" ref={containerRef} style={{ background: 'transparent' }}>
      <div className="container">
        <div className="section-header text-center gsap-faq-fade-up" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title"><span className="text-sand">Frequently Asked</span> <span className="text-white">Questions</span></h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '1rem auto 0' }}>Everything you need to know about my projects, services, and background.</p>
        </div>

        <div className="faq-container gsap-faq-fade-up">
          {/* Categories Sidebar/Top */}
          <div className="faq-categories">
            {faqData.map((cat, index) => (
              <button
                key={index}
                className={`faq-cat-btn ${activeCategory === index ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(index);
                  setOpenQuestion(null);
                }}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="faq-accordion">
            {faqData[activeCategory].questions.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${openQuestion === index ? 'open' : ''}`}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openQuestion === index}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-main)', textAlign: 'left' }}>{item.q}</span>
                  <i className={`fa-solid fa-chevron-down faq-icon ${openQuestion === index ? 'rotated' : ''}`}></i>
                </button>
                <div 
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: openQuestion === index ? '1000px' : '0px',
                    opacity: openQuestion === index ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  <div className="faq-answer">
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
