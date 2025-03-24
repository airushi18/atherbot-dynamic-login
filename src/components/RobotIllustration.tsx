
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
        {/* Robot Head */}
        <rect 
          x="150" 
          y="60" 
          width="200" 
          height="160" 
          rx="20" 
          stroke="#0071e3" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeDasharray="2 6" 
          fill="none" 
        />
        
        {/* Robot Eyes */}
        <circle 
          cx="200" 
          cy="120" 
          r="25" 
          stroke="#0071e3" 
          strokeWidth="3" 
          fill="white" 
          fillOpacity="0.2" 
        />
        <circle 
          cx="300" 
          cy="120" 
          r="25" 
          stroke="#0071e3" 
          strokeWidth="3" 
          fill="white" 
          fillOpacity="0.2" 
        />
        
        {/* Robot Pupils */}
        <circle 
          cx="200" 
          cy="120" 
          r="10" 
          fill="#0071e3" 
        />
        <circle 
          cx="300" 
          cy="120" 
          r="10" 
          fill="#0071e3" 
        />
        
        {/* Robot Mouth */}
        <path 
          d="M190 170 Q250 200 310 170" 
          stroke="#0071e3" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Robot Antenna */}
        <line 
          x1="250" 
          y1="60" 
          x2="250" 
          y2="30" 
          stroke="#0071e3" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <circle 
          cx="250" 
          cy="25" 
          r="5" 
          fill="#0071e3" 
        />
        
        {/* Robot Body */}
        <rect 
          x="170" 
          y="220" 
          width="160" 
          height="120" 
          rx="15" 
          stroke="#0071e3" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeDasharray="2 6" 
          fill="none" 
        />
        
        {/* Robot Arms */}
        <line 
          x1="170" 
          y1="250" 
          x2="130" 
          y2="230" 
          stroke="#0071e3" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeDasharray="5 5" 
        />
        <line 
          x1="330" 
          y1="250" 
          x2="370" 
          y2="230" 
          stroke="#0071e3" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeDasharray="5 5" 
        />
        
        {/* Robot Control Panel */}
        <rect 
          x="205" 
          y="240" 
          width="90" 
          height="40" 
          rx="5" 
          stroke="#0071e3" 
          strokeWidth="2" 
          fill="white" 
          fillOpacity="0.1" 
        />
        <circle 
          cx="225" 
          cy="260" 
          r="8" 
          fill="#0071e3" 
          fillOpacity="0.5" 
        />
        <circle 
          cx="250" 
          cy="260" 
          r="8" 
          fill="#0071e3" 
          fillOpacity="0.5" 
        />
        <circle 
          cx="275" 
          cy="260" 
          r="8" 
          fill="#0071e3" 
          fillOpacity="0.5" 
        />
        
        {/* Pencil */}
        <g transform="translate(370, 200) rotate(45)">
          <rect 
            x="0" 
            y="0" 
            width="15" 
            height="140" 
            fill="#f5d0a9" 
            stroke="#0071e3" 
            strokeWidth="1" 
          />
          <polygon 
            points="0,0 15,0 7.5,-20" 
            fill="#0071e3" 
            stroke="#0071e3" 
            strokeWidth="1" 
          />
          <rect 
            x="0" 
            y="25" 
            width="15" 
            height="20" 
            fill="#0071e3" 
            stroke="#0071e3" 
            strokeWidth="1" 
            strokeOpacity="0.5" 
          />
        </g>
        
        {/* Sketchy Effect Lines */}
        <path 
          d="M120 100 Q130 95 125 85 M380 110 Q390 105 385 95 M140 320 Q150 315 145 305 M350 300 Q360 295 355 285" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeLinecap="round" 
          opacity="0.6" 
        />
      </svg>
    </div>
  );
};

export default RobotIllustration;
