import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

interface AnimatedBarChartProps {
  skills: Skill[];
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the bars filling up
      gsap.fromTo('.skill-bar-fill',
        { width: '0%' },
        { 
          width: (_, target) => `${target.dataset.level}%`, 
          duration: 1.5, 
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
      
      // Animate the percentage numbers counting up
      gsap.utils.toArray('.skill-percent').forEach((el: any) => {
        const targetValue = parseInt(el.dataset.level, 10);
        gsap.fromTo(el,
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 1.5,
            ease: 'power3.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
            onUpdate: function() {
              el.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {skills.map((skill) => (
        <div key={skill.name} style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: 600, letterSpacing: '0.5px' }}>{skill.name}</span>
            <span className="skill-percent" data-level={skill.level} style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontVariantNumeric: 'tabular-nums' }}>0%</span>
          </div>
          
          <div style={{ 
            width: '100%', 
            height: '10px', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '10px', 
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
          }}>
            <div 
              className="skill-bar-fill"
              data-level={skill.level}
              style={{
                width: '0%',
                height: '100%',
                background: skill.color,
                borderRadius: '10px',
                boxShadow: `0 0 10px ${skill.color}`,
                position: 'relative'
              }}
            >
              {/* Shine effect on the bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
                borderRadius: '10px'
              }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBarChart;
