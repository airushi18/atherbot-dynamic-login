
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
          x="165" 
          y="80" 
          width="170" 
          height="140" 
          rx="15" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        
        {/* Robot Face */}
        <rect 
          x="200" 
          y="110" 
          width="40" 
          height="20" 
          rx="5" 
          fill="#0071e3" 
          fillOpacity="0.7"
        />
        <rect 
          x="260" 
          y="110" 
          width="40" 
          height="20" 
          rx="5" 
          fill="#0071e3" 
          fillOpacity="0.7"
        />
        
        {/* Robot Smile */}
        <path 
          d="M215,160 Q250,180 285,160" 
          stroke="#0071e3" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Robot Antenna */}
        <path
          d="M250,80 L250,60 L240,50 L260,40 L240,30 L250,20"
          stroke="#0071e3"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="250" cy="15" r="5" fill="#0071e3" />
        
        {/* Robot Neck */}
        <rect 
          x="220" 
          y="220" 
          width="60" 
          height="20" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        
        {/* Robot Body */}
        <rect 
          x="165" 
          y="240" 
          width="170" 
          height="120" 
          rx="10" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        
        {/* Robot Control Panel */}
        <rect 
          x="200" 
          y="260" 
          width="100" 
          height="60" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="1"
        />
        
        {/* Control Panel Details */}
        <circle cx="220" cy="280" r="6" fill="#0071e3" fillOpacity="0.6" />
        <circle cx="250" cy="280" r="6" fill="#0071e3" fillOpacity="0.6" />
        <circle cx="280" cy="280" r="6" fill="#0071e3" fillOpacity="0.6" />
        
        <rect x="210" y="300" width="80" height="10" rx="2" fill="#0071e3" fillOpacity="0.4" />
        
        {/* Robot Left Arm (at rest) */}
        <path 
          d="M165,260 L130,260 L130,320 L150,320" 
          stroke="#0071e3" 
          strokeWidth="2" 
          fill="none"
        />
        <rect 
          x="120" 
          y="260" 
          width="20" 
          height="60" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        <circle cx="130" cy="260" r="5" fill="#0071e3" fillOpacity="0.4" />
        
        {/* Robot Right Arm (waving) */}
        <path 
          d="M335,260 L370,230 L390,180 L380,170" 
          stroke="#0071e3" 
          strokeWidth="2" 
          fill="none"
        />
        <rect 
          x="370" 
          y="170" 
          width="20" 
          height="60" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
          transform="rotate(-30, 370, 170)"
        />
        <circle cx="370" cy="230" r="5" fill="#0071e3" fillOpacity="0.4" />
        
        {/* Robot Hand (waving) */}
        <path 
          d="M390,180 L410,170 L405,160 L415,155 L410,145" 
          stroke="#0071e3" 
          strokeWidth="2" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* "Hi!" Text */}
        <text 
          x="415" 
          y="130" 
          fontFamily="Arial" 
          fontSize="20" 
          fontWeight="bold" 
          fill="#0071e3"
        >
          Hi!
        </text>
        
        {/* Robot Legs */}
        <rect 
          x="190" 
          y="360" 
          width="30" 
          height="40" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        <rect 
          x="280" 
          y="360" 
          width="30" 
          height="40" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        
        {/* Robot Feet */}
        <rect 
          x="180" 
          y="390" 
          width="50" 
          height="10" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        <rect 
          x="270" 
          y="390" 
          width="50" 
          height="10" 
          rx="5" 
          fill="white" 
          stroke="#0071e3" 
          strokeWidth="2"
        />
        
        {/* Circuit Pattern Details */}
        <path 
          d="M180,330 L190,330 L190,340 L200,340" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeDasharray="2 2" 
          fill="none"
        />
        <path 
          d="M300,330 L310,330 L310,340 L320,340" 
          stroke="#0071e3" 
          strokeWidth="1" 
          strokeDasharray="2 2" 
          fill="none"
        />
        
        {/* Technical Details */}
        <circle cx="190" cy="330" r="2" fill="#0071e3" />
        <circle cx="190" cy="340" r="2" fill="#0071e3" />
        <circle cx="200" cy="340" r="2" fill="#0071e3" />
        <circle cx="300" cy="330" r="2" fill="#0071e3" />
        <circle cx="310" cy="330" r="2" fill="#0071e3" />
        <circle cx="310" cy="340" r="2" fill="#0071e3" />
        <circle cx="320" cy="340" r="2" fill="#0071e3" />
      </svg>
    </div>
  );
};

export default RobotIllustration;
