
import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  brightness: number;
}

const FaceMesh: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const initPoints = () => {
      const points: Point[] = [];
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      const rows = 60;
      const cols = 50;
      const spacing = 16;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const relX = (j - cols / 2) * spacing;
          const relY = (i - rows / 2) * spacing;
          
          // Face Shape
          const faceDist = (relX * relX) / (250 * 250) + (relY * relY) / (380 * 380);
          
          if (faceDist < 1) {
            // Eyes Structure
            const eyeDistL = Math.hypot(relX + 85, relY + 110);
            const eyeDistR = Math.hypot(relX - 85, relY + 110);
            const isEyeSocket = eyeDistL < 45 || eyeDistR < 45;
            const isEyeLid = (eyeDistL > 38 && eyeDistL < 48) || (eyeDistR > 38 && eyeDistR < 48);
            const isPupil = eyeDistL < 12 || eyeDistR < 12;
            
            // Nose Structure
            const isNoseBridge = Math.abs(relX) < 12 && relY > -100 && relY < 60;
            const isNoseTip = Math.hypot(relX, relY - 70) < 35;
            const isNostril = Math.hypot(Math.abs(relX) - 25, relY - 75) < 15;

            // Mouth Structure
            const mouthWidth = 90;
            const mouthY = 190;
            const mouthDist = Math.abs(relY - mouthY) + Math.abs(relX) * 0.6;
            const isMouthLine = mouthDist < 15 && Math.abs(relX) < mouthWidth;
            const isLipOutline = mouthDist > 25 && mouthDist < 35 && Math.abs(relX) < mouthWidth + 10;

            // Determine if we should place a point here
            let shouldPlace = false;
            let featureBrightness = 0;

            if (isPupil || isEyeLid || isNoseBridge || isNoseTip || isNostril || isMouthLine || isLipOutline) {
              shouldPlace = true;
              featureBrightness = 0.5;
            } else if (!isEyeSocket && (i % 1 === 0 && j % 1 === 0)) {
              // Fill skin areas
              shouldPlace = true;
            }

            if (shouldPlace) {
              const angle = Math.random() * Math.PI * 2;
              const radius = 600 + Math.random() * 400;
              
              points.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                originX: centerX + relX,
                originY: centerY + relY,
                vx: 0,
                vy: 0,
                brightness: featureBrightness
              });
            }
          }
        }
      }
      pointsRef.current = points;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initPoints();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      const points = pointsRef.current;
      const forceRadius = 240;
      const forceStrength = 0.7;
      const friction = 0.85;
      const ease = 0.08;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < forceRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (forceRadius - dist) / forceRadius;
          p.vx -= Math.cos(angle) * force * forceStrength * 22;
          p.vy -= Math.sin(angle) * force * forceStrength * 22;
          p.brightness = Math.min(1, p.brightness + 0.12);
        } else {
          p.brightness *= 0.94;
        }

        p.vx += (p.originX - p.x) * ease;
        p.vy += (p.originY - p.y) * ease;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        const glowAmount = p.brightness;
        ctx.fillStyle = isDark 
          ? `rgba(129, 140, 248, ${0.5 + glowAmount * 0.5})` 
          : `rgba(0, 0, 0, ${0.7 + glowAmount * 0.3})`;
        
        const size = 3.5 + glowAmount * 4;
        ctx.fillRect(p.x - size/2, p.y - size/2, size, size);

        for (let j = i + 1; j < Math.min(i + 20, points.length); j++) {
           const p2 = points[j];
           const d = Math.hypot(p.x - p2.x, p.y - p2.y);
           if (d < 35) {
             const alpha = Math.max(0.15, (35 - d) / 35 * 0.5 + (p.brightness + p2.brightness) * 0.3);
             ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
             ctx.beginPath();
             ctx.lineWidth = 1.2;
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
           }
        }
      }

      // Scanner HUD Elements - REDUCED SIZE
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2); // Smaller radius (70 -> 35)
      ctx.stroke();
      ctx.setLineDash([]);

      // Smaller Crosshair
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)';
      ctx.lineWidth = 2;
      const chSize = 10; // Smaller crosshair (20 -> 10)
      const gap = 4;    // Smaller gap (8 -> 4)
      ctx.moveTo(mouse.x - chSize, mouse.y); ctx.lineTo(mouse.x - gap, mouse.y);
      ctx.moveTo(mouse.x + chSize, mouse.y); ctx.lineTo(mouse.x + gap, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - chSize); ctx.lineTo(mouse.x, mouse.y - gap);
      ctx.moveTo(mouse.x, mouse.y + chSize); ctx.lineTo(mouse.x, mouse.y + gap);
      ctx.stroke();

      // Digital Metadata with tighter layout
      ctx.font = 'bold 10px "Plus Jakarta Sans", monospace';
      ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.4)';
      ctx.fillText(`ID: ${Math.round(mouse.x)}, ${Math.round(mouse.y)}`, mouse.x + 15, mouse.y - 18);
      ctx.fillText(`SYNC: 98.4%`, mouse.x + 15, mouse.y - 6);
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};

export default FaceMesh;
