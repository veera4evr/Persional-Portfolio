import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CircuitBoardProps {
  className?: string;
  variant?: 'floor' | 'flat' | 'wall-left' | 'wall-right';
}

const CircuitBoard: React.FC<CircuitBoardProps> = ({ className = '', variant = 'floor' }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('.circuit-path');
    const nodes = svgRef.current.querySelectorAll('.circuit-node');

    // Animate paths drawing in
    gsap.fromTo(paths, 
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { 
        strokeDashoffset: 0, 
        duration: 3, 
        stagger: 0.2, 
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 5,
        yoyo: true
      }
    );

    // Pulse nodes
    gsap.fromTo(nodes,
      { scale: 0.5, opacity: 0.5 },
      {
        scale: 1.5,
        opacity: 1,
        duration: 1.5,
        stagger: {
          each: 0.1,
          from: "random"
        },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center center"
      }
    );

  }, []);

  const getTransform = () => {
    switch(variant) {
      case 'flat': return 'none';
      case 'wall-left': return 'rotateY(60deg) scale(1.5)';
      case 'wall-right': return 'rotateY(-60deg) scale(1.5)';
      case 'floor':
      default: return 'rotateX(60deg) scale(1.5)';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ zIndex: 0, opacity: 0.6, perspective: '1000px' }}>
      <div style={{ width: '100%', height: '100%', transform: getTransform(), transformOrigin: 'center center' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          style={{ filter: 'drop-shadow(0px 0px 8px rgba(244, 228, 208, 0.5))' }}
        >
          <g stroke="var(--orange-primary)" strokeWidth="2" fill="none" opacity="0.6">
            {/* Horizontal and 45-degree circuit lines */}
            <path className="circuit-path" d="M -100 100 L 200 100 L 250 150 L 400 150" />
            <path className="circuit-path" d="M -50 300 L 150 300 L 200 250 L 500 250 L 550 300 L 800 300" />
            <path className="circuit-path" d="M 300 600 L 300 450 L 350 400 L 600 400" />
            <path className="circuit-path" d="M 800 -50 L 800 150 L 750 200 L 600 200" />
            <path className="circuit-path" d="M 100 500 L 150 450 L 250 450 L 300 500 L 500 500" />
            <path className="circuit-path" d="M 900 600 L 900 400 L 800 300 L 600 300" />
            <path className="circuit-path" d="M 1100 100 L 900 100 L 850 150 L 700 150" />
            <path className="circuit-path" d="M 450 150 L 500 100 L 650 100 L 700 50" />
            
            {/* Added more density */}
            <path className="circuit-path" d="M 200 -50 L 200 50 L 150 100 L -50 100" />
            <path className="circuit-path" d="M 500 600 L 500 550 L 550 500 L 700 500 L 750 450 L 900 450" />
            <path className="circuit-path" d="M 1000 200 L 900 200 L 850 250 L 700 250 L 650 200 L 500 200" />
            <path className="circuit-path" d="M 0 400 L 100 400 L 150 350 L 300 350 L 350 400 L 400 400" />
          </g>
          
          <g fill="var(--text-main)">
            <circle className="circuit-node" cx="400" cy="150" r="4" />
            <circle className="circuit-node" cx="200" cy="100" r="3" />
            <circle className="circuit-node" cx="800" cy="300" r="5" />
            <circle className="circuit-node" cx="600" cy="400" r="4" />
            <circle className="circuit-node" cx="600" cy="200" r="4" />
            <circle className="circuit-node" cx="500" cy="500" r="3" />
            <circle className="circuit-node" cx="600" cy="300" r="4" />
            <circle className="circuit-node" cx="700" cy="150" r="5" />
            <circle className="circuit-node" cx="450" cy="150" r="3" />
            <circle className="circuit-node" cx="700" cy="50" r="4" />
            
            <circle className="circuit-node" cx="200" cy="50" r="3" />
            <circle className="circuit-node" cx="150" cy="100" r="4" />
            <circle className="circuit-node" cx="550" cy="500" r="3" />
            <circle className="circuit-node" cx="900" cy="450" r="4" />
            <circle className="circuit-node" cx="850" cy="250" r="5" />
            <circle className="circuit-node" cx="500" cy="200" r="4" />
            <circle className="circuit-node" cx="150" cy="350" r="3" />
            <circle className="circuit-node" cx="400" cy="400" r="4" />
          </g>
        </svg>
      </div>
      
      {/* Fog fade out at the bottom to blend seamlessly */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, var(--bg-dark) 100%)',
          zIndex: 1
        }}
      ></div>
    </div>
  );
};

export default CircuitBoard;
