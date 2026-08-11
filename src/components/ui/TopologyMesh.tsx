import React, { useEffect, useState } from 'react';

const TopologyMesh: React.FC = () => {
  const [nodes, setNodes] = useState<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    // Generate random initial nodes
    const numNodes = 40;
    const initialNodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
    }));
    setNodes(initialNodes);

    let animationFrameId: number;

    const animate = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          let { x, y, vx, vy } = node;
          x += vx;
          y += vy;
          
          // Bounce off edges
          if (x < 0 || x > 100) vx *= -1;
          if (y < 0 || y > 100) vy *= -1;

          return { x, y, vx, vy };
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ 
          x: ((e.clientX - rect.left) / rect.width) * 100, 
          y: ((e.clientY - rect.top) / rect.height) * 100 
        });
      }}
      onMouseLeave={() => setMouse({ x: -1000, y: -1000 })}
      style={{ pointerEvents: 'auto' }} // Allow capturing mouse for this layer
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        {/* Draw lines between close nodes */}
        {nodes.map((nodeA, i) =>
          nodes.slice(i + 1).map((nodeB, j) => {
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Interaction: distance to mouse
            const mDx = (nodeA.x + nodeB.x) / 2 - mouse.x;
            const mDy = (nodeA.y + nodeB.y) / 2 - mouse.y;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);

            if (dist < 15) {
              const opacity = 1 - (dist / 15);
              const isNearMouse = mDist < 20;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${nodeA.x}%`} y1={`${nodeA.y}%`}
                  x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
                  stroke={isNearMouse ? 'var(--orange-primary)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isNearMouse ? 1.5 : 0.5}
                  opacity={isNearMouse ? opacity * 2 : opacity}
                  style={{ transition: 'stroke 0.3s' }}
                />
              );
            }
            return null;
          })
        )}
        
        {/* Draw nodes */}
        {nodes.map((node, i) => (
          <circle 
            key={i} 
            cx={`${node.x}%`} 
            cy={`${node.y}%`} 
            r="1.5" 
            fill="var(--orange-primary)" 
            opacity="0.6"
          />
        ))}
      </svg>
    </div>
  );
};

export default TopologyMesh;
