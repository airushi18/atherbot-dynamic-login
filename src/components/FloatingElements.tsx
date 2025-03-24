
import React, { useEffect, useRef } from 'react';

const FloatingElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const elements = containerRef.current.querySelectorAll('.floating-element');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const distX = clientX - elementCenterX;
        const distY = clientY - elementCenterY;
        
        // Calculate strength based on distance (closer = stronger effect)
        const strength = element.dataset.strength ? parseFloat(element.dataset.strength) : 0.05;
        const maxDistance = 300; // Maximum effective distance for the effect
        const distance = Math.sqrt(distX * distX + distY * distY);
        const effectStrength = Math.max(0, 1 - distance / maxDistance) * strength;
        
        // Apply the parallax effect
        const moveX = -distX * effectStrength;
        const moveY = -distY * effectStrength;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circle Elements */}
      <div 
        className="floating-element absolute top-[10%] left-[15%] w-32 h-32 rounded-full opacity-20 bg-atherbot-blue blur-xl animate-float"
        data-strength="0.03"
      ></div>
      <div 
        className="floating-element absolute top-[20%] right-[10%] w-40 h-40 rounded-full opacity-10 bg-purple-300 blur-xl animate-float"
        style={{ animationDelay: '1s' }}
        data-strength="0.04"
      ></div>
      <div 
        className="floating-element absolute bottom-[15%] left-[20%] w-36 h-36 rounded-full opacity-15 bg-teal-200 blur-xl animate-float"
        style={{ animationDelay: '2s' }}
        data-strength="0.05"
      ></div>
      
      {/* Gradient Lines */}
      <div 
        className="floating-element absolute top-[35%] left-[5%] h-[1px] w-[15vw] bg-gradient-to-r from-transparent via-atherbot-blue/20 to-transparent"
        data-strength="0.02"
      ></div>
      <div 
        className="floating-element absolute top-[70%] right-[5%] h-[1px] w-[20vw] bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"
        data-strength="0.03"
      ></div>
      
      {/* Squares with rotation */}
      <div 
        className="floating-element absolute top-[65%] right-[25%] w-20 h-20 rounded-md opacity-10 bg-atherbot-blue/30 blur-md animate-rotate-slow"
        data-strength="0.04"
      ></div>
      <div 
        className="floating-element absolute top-[40%] right-[40%] w-16 h-16 rounded-md opacity-10 bg-pink-200/20 blur-md animate-rotate-slow"
        style={{ animationDelay: '3s', animationDirection: 'reverse' }}
        data-strength="0.05"
      ></div>
    </div>
  );
};

export default FloatingElements;
