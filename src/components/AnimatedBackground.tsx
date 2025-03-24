
import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      const points: Point[] = [];
      const numPoints = Math.floor(window.innerWidth * window.innerHeight / 10000);
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.5 + 0.1})`,
        });
      }
      
      pointsRef.current = points;
    };

    const drawLine = (point1: Point, point2: Point, distance: number, maxDistance: number) => {
      const opacity = 1 - (distance / maxDistance);
      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.strokeStyle = `rgba(200, 200, 200, ${opacity * 0.2})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const points = pointsRef.current;
      const maxDistance = 150;
      const mouseInfluenceRadius = 150;
      const mouseInfluenceStrength = 0.02;
      
      // Update and draw points
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Apply mouse influence if nearby
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distanceToMouse < mouseInfluenceRadius) {
          const influence = (1 - distanceToMouse / mouseInfluenceRadius) * mouseInfluenceStrength;
          point.vx += dx * influence;
          point.vy += dy * influence;
        }
        
        // Update position
        point.x += point.vx;
        point.y += point.vy;
        
        // Dampening
        point.vx *= 0.99;
        point.vy *= 0.99;
        
        // Boundary check with bouncing
        if (point.x < 0 || point.x > canvas.width) {
          point.vx = -point.vx;
          point.x = Math.min(Math.max(point.x, 0), canvas.width);
        }
        
        if (point.y < 0 || point.y > canvas.height) {
          point.vy = -point.vy;
          point.y = Math.min(Math.max(point.y, 0), canvas.height);
        }
        
        // Draw the point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        
        // Connect nearby points
        for (let j = i + 1; j < points.length; j++) {
          const point2 = points[j];
          const dx = point.x - point2.x;
          const dy = point.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            drawLine(point, point2, distance, maxDistance);
          }
        }
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    
    // Start animation
    frameIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
