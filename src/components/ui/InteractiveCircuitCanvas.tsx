import React, { useEffect, useRef } from 'react';

const InteractiveCircuitCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Circuit Data
    const nodeSpacing = 60;
    let nodes: { x: number, y: number, connections: number[] }[] = [];
    let packets: { x: number, y: number, targetX: number, targetY: number, progress: number, speed: number }[] = [];
    
    // Set canvas dimensions
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    };

    // Mouse tracking
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    function initGrid() {
      nodes = [];
      packets = [];
      const cols = Math.ceil(width / nodeSpacing) + 1;
      const rows = Math.ceil(height / nodeSpacing) + 1;

      // Create nodes
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add some randomness to position for organic feel
          const x = i * nodeSpacing + (Math.random() - 0.5) * 20;
          const y = j * nodeSpacing + (Math.random() - 0.5) * 20;
          
          // Only keep ~40% of grid points to make it look like a circuit board
          if (Math.random() > 0.6) {
             nodes.push({ x, y, connections: [] });
          }
        }
      }

      // Create connections (horizontal, vertical, diagonal)
      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          // Connect if close enough, max 3 connections per node
          if (dist < nodeSpacing * 1.5 && node.connections.length < 3) {
            // Check if line is purely horizontal/vertical or perfectly 45deg for circuit aesthetic
            const angle = Math.abs(Math.atan2(dy, dx) * 180 / Math.PI);
            const isOrthogonal = angle < 5 || Math.abs(angle - 90) < 5 || Math.abs(angle - 180) < 5;
            const isDiagonal = Math.abs(angle - 45) < 5 || Math.abs(angle - 135) < 5;
            
            if (isOrthogonal || isDiagonal) {
              node.connections.push(j);
            }
          }
        });
      });

      // Spawn some initial data packets
      for (let i = 0; i < 20; i++) spawnPacket();
    }

    function spawnPacket() {
      if (nodes.length === 0) return;
      const startIndex = Math.floor(Math.random() * nodes.length);
      const startNode = nodes[startIndex];
      if (startNode.connections.length === 0) return;
      
      const targetIndex = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
      const targetNode = nodes[targetIndex];
      
      packets.push({
        x: startNode.x,
        y: startNode.y,
        targetX: targetNode.x,
        targetY: targetNode.y,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01
      });
    }

    const draw = () => {
      // Very faint clear for trailing effect
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 1;
      nodes.forEach(node => {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const distToMouse = Math.sqrt(dx*dx + dy*dy);
        
        // Base opacity is very low, gets bright near mouse
        const maxDist = 250;
        let opacity = 0.03; // very faint ambient
        if (distToMouse < maxDist) {
          opacity = 0.03 + (1 - distToMouse / maxDist) * 0.5;
        }

        ctx.strokeStyle = `rgba(244, 228, 208, ${opacity})`; // Sand color

        node.connections.forEach(targetIdx => {
          const target = nodes[targetIdx];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const distToMouse = Math.sqrt(dx*dx + dy*dy);
        
        let opacity = 0.08;
        let radius = 1.5;
        
        if (distToMouse < 250) {
          const intensity = 1 - distToMouse / 250;
          opacity = 0.08 + intensity * 0.9;
          radius = 1.5 + intensity * 2;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 228, 208, ${opacity})`;
        ctx.fill();
      });

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          packets.splice(i, 1);
          spawnPacket();
          continue;
        }
        
        const currX = p.x + (p.targetX - p.x) * p.progress;
        const currY = p.y + (p.targetY - p.y) * p.progress;
        
        ctx.beginPath();
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 228, 208, 0.9)'; // Matte Sand packet
        ctx.fill();
      }

      // Ensure packet count stays up
      if (Math.random() < 0.02 && packets.length < 30) spawnPacket();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 0 
      }} 
    />
  );
};

export default InteractiveCircuitCanvas;
