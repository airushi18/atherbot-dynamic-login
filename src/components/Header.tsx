
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bot, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-black/50 border-b border-gray-200/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-atherbot-dark">
          <Bot className="h-8 w-8 text-atherbot-blue" />
          <span className="font-bold text-xl">Ather Bot</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/docs" className="text-atherbot-gray hover:text-atherbot-dark transition-colors">
            Docs
          </Link>
          <Link to="/try-chatbot" className="text-atherbot-gray hover:text-atherbot-dark transition-colors">
            Try Chatbot
          </Link>
          <Link to="/settings" className="text-atherbot-gray hover:text-atherbot-dark transition-colors">
            <Settings className="h-5 w-5" />
          </Link>
          <Link to="/login">
            <Button variant="outline" className="mr-2">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </nav>
        
        {/* Mobile menu button - would need a proper mobile menu implementation */}
        <button className="md:hidden text-atherbot-dark">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
