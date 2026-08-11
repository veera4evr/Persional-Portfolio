import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  className?: string;
  elementType?: React.ElementType;
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({ 
  text, 
  className = '', 
  elementType: Element = 'div' 
}) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.char');

    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        y: 40, 
        rotateX: -40, 
        filter: 'blur(10px)' 
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.03, // fast typing effect
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [text]);

  // Split by words first to preserve word spacing, then by characters
  const words = text.split(' ');

  return (
    <Element ref={textRef} className={className} style={{ display: 'inline-block' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}>
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="char"
              style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Element>
  );
};

export default SplitTextReveal;
