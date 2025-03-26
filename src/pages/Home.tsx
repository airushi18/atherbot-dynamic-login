
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-atherbot-blue" />
            <span className="font-bold text-xl text-atherbot-dark">Ather Bot</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/docs" className="text-atherbot-gray hover:text-atherbot-dark">
              Documentation
            </Link>
            <Link to="/login" className="text-atherbot-gray hover:text-atherbot-dark">
              Sign In
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="flex-1 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-atherbot-dark mb-6 max-w-3xl">
            Powerful AI API for your applications
          </h1>
          <p className="text-xl text-atherbot-gray mb-10 max-w-2xl">
            Integrate state-of-the-art AI capabilities into your applications with our simple, reliable, and scalable API.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg">
                Read the Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why choose Ather Bot?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-atherbot-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-atherbot-gray">
                Our optimized API delivers responses in milliseconds, ensuring your applications remain responsive.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-atherbot-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure by Design</h3>
              <p className="text-atherbot-gray">
                Enterprise-grade security with encrypted data and secure API key management.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-atherbot-blue mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scalable Infrastructure</h3>
              <p className="text-atherbot-gray">
                Built to handle millions of requests per day with consistent performance and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-atherbot-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Sign up now and start using our API in minutes. No credit card required.
          </p>
          <Link to="/signup">
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-atherbot-blue">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Bot className="h-5 w-5 text-atherbot-blue" />
              <span className="font-medium text-atherbot-dark">Ather Bot</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-atherbot-gray hover:text-atherbot-dark">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-atherbot-gray hover:text-atherbot-dark">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-atherbot-gray hover:text-atherbot-dark">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-atherbot-gray">
            &copy; {new Date().getFullYear()} Ather Bot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
