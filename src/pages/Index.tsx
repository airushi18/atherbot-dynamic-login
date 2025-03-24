
import React, { useEffect, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingElements from "@/components/FloatingElements";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-atherbot-light to-white p-4">
      {/* Background animation canvas */}
      <AnimatedBackground />
      
      {/* Floating elements with parallax effect */}
      <FloatingElements />
      
      {/* Content wrapper */}
      <div className={`w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left section - Branding */}
        <div className="w-full lg:w-1/2 px-4 lg:pr-10 mb-10 lg:mb-0">
          <div className="space-y-6 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-atherbot-blue/10 blur-xl rounded-full animate-pulse-slow"></div>
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-atherbot-dark leading-tight">
                <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[5px] after:bottom-[6px] after:left-0 after:bg-atherbot-blue/20 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100">
                  Atherbot
                </span>{" "}
                AI
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-atherbot-gray max-w-xl">
              The next generation artificial intelligence platform for seamless workflow automation.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-2 bg-atherbot-muted rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-atherbot-gray">Advanced Security</span>
              </div>
              <div className="flex items-center space-x-2 bg-atherbot-muted rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-atherbot-blue"></div>
                <span className="text-sm text-atherbot-gray">Smart Analytics</span>
              </div>
              <div className="flex items-center space-x-2 bg-atherbot-muted rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-atherbot-gray">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right section - Login form */}
        <div className="w-full lg:w-1/2 px-4 lg:pl-10 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
          <LoginForm />
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-sm text-atherbot-gray animate-fade-in" style={{ animationDelay: '1s' }}>
        <p>© {new Date().getFullYear()} Atherbot AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
