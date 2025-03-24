
import React from 'react';

const RobotIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        {/* Robot Head - more angular, professional look */}
        <path 
          d="M150,60 L350,60 L350,220 L150,220 Z" 
          stroke="#0071e3" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
        
        {/* Robot Panel Lines - more technical look */}
        <line 
          x1="150" 
          y1="90" 
          x2="350" 
          y2="90" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeDasharray="4 4" 
        />
        <line 
          x1="150" 
          y1="180" 
          x2="350" 
          y2="180" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeDasharray="4 4" 
        />
        
        {/* Robot Eyes - sleeker look */}
        <rect 
          x="180" 
          y="110" 
          width="40" 
          height="10" 
          rx="2" 
          fill="#0071e3" 
        />
        <rect 
          x="280" 
          y1="110" 
          width="40" 
          height="10" 
          rx="2" 
          fill="#0071e3" 
        />
        
        {/* Robot Mouth - more mechanical */}
        <rect 
          x="200" 
          y="150" 
          width="100" 
          height="4" 
          rx="2" 
          fill="#0071e3" 
        />
        <line 
          x1="210" 
          y1="160" 
          x2="290" 
          y2="160" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeDasharray="5 3" 
        />
        
        {/* Robot Antenna */}
        <path 
          d="M250,60 L250,30 L255,25 L245,20 L255,15 L245,10 L250,5" 
          stroke="#0071e3" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Robot Body - more structured */}
        <path 
          d="M170,220 L330,220 L340,340 L160,340 Z" 
          stroke="#0071e3" 
          strokeWidth="2" 
          fill="none" 
        />
        
        {/* Robot Body Features */}
        <rect 
          x="210" 
          y="240" 
          width="80" 
          height="30" 
          rx="2" 
          stroke="#0071e3" 
          strokeWidth="1" 
          fill="none" 
        />
        <circle 
          cx="230" 
          cy="255" 
          r="5" 
          fill="#0071e3" 
          fillOpacity="0.6" 
        />
        <circle 
          cx="250" 
          cy="255" 
          r="5" 
          fill="#0071e3" 
          fillOpacity="0.6" 
        />
        <circle 
          cx="270" 
          cy="255" 
          r="5" 
          fill="#0071e3" 
          fillOpacity="0.6" 
        />
        
        {/* Digital Circuit Lines */}
        <path 
          d="M190,290 L210,290 L210,310 L230,310 L230,290 L250,290" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M270,290 L290,290 L290,310 L310,310" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Circuit Points */}
        <circle cx="210" cy="290" r="2" fill="#0071e3" />
        <circle cx="230" cy="290" r="2" fill="#0071e3" />
        <circle cx="230" cy="310" r="2" fill="#0071e3" />
        <circle cx="250" cy="290" r="2" fill="#0071e3" />
        <circle cx="270" cy="290" r="2" fill="#0071e3" />
        <circle cx="290" cy="290" r="2" fill="#0071e3" />
        <circle cx="290" cy="310" r="2" fill="#0071e3" />
        <circle cx="310" cy="310" r="2" fill="#0071e3" />
        
        {/* Technical Pencil - more elegant, less cartoonish */}
        <g transform="translate(350, 150) rotate(30)">
          <rect 
            x="0" 
            y="0" 
            width="10" 
            height="150" 
            fill="#0071e3" 
            fillOpacity="0.1" 
            stroke="#0071e3" 
            strokeWidth="1" 
          />
          <polygon 
            points="0,0 10,0 5,-15" 
            fill="#0071e3" 
            stroke="#0071e3" 
            strokeWidth="1" 
          />
          <rect 
            x="0" 
            y="10" 
            width="10" 
            height="15" 
            fill="#0071e3" 
            fillOpacity="0.3" 
            stroke="#0071e3" 
            strokeWidth="1" 
          />
        </g>
        
        {/* Technical Blueprint Lines */}
        <line 
          x1="120" 
          y1="60" 
          x2="120" 
          y2="340" 
          stroke="#0071e3" 
          strokeWidth="0.5" 
          strokeDasharray="5 5" 
          opacity="0.4" 
        />
        <line 
          x1="380" 
          y1="60" 
          x2="380" 
          y2="340" 
          stroke="#0071e3" 
          strokeWidth="0.5" 
          strokeDasharray="5 5" 
          opacity="0.4" 
        />
        <line 
          x1="150" 
          y1="380" 
          x2="350" 
          y2="380" 
          stroke="#0071e3" 
          strokeWidth="0.5" 
          strokeDasharray="5 5" 
          opacity="0.4" 
        />
      </svg>
    </div>
  );
};

export default RobotIllustration;
