import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bot, Zap, Shield, Database, ArrowRight } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingElements from "@/components/FloatingElements";
import Header from "@/components/Header";
import RobotIllustration from "@/components/RobotIllustration";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="relative p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:border-atherbot-blue/30 transition-all duration-300 hover:shadow-lg hover:shadow-atherbot-blue/5 group">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative">
      <div className="h-12 w-12 bg-atherbot-blue/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-atherbot-blue/20 transition-colors duration-300">
        <Icon className="h-6 w-6 text-atherbot-blue" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-atherbot-dark">{title}</h3>
      <p className="text-atherbot-gray">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, company, testimonial, avatar }) => (
  <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-atherbot-blue/5">
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-full overflow-hidden bg-atherbot-muted flex-shrink-0">
        <img src={avatar || "https://via.placeholder.com/48"} alt={name} className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="text-atherbot-gray italic mb-4">"{testimonial}"</p>
        <div>
          <h4 className="font-medium text-atherbot-dark">{name}</h4>
          <p className="text-sm text-atherbot-gray">{role}, {company}</p>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process data and generate responses in milliseconds for seamless user experiences."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with encrypted data and privacy compliance built-in."
    },
    {
      icon: Database,
      title: "Knowledge Base",
      description: "Upload and integrate your data to create custom AI models trained on your content."
    },
    {
      icon: Bot,
      title: "Advanced AI",
      description: "State-of-the-art language models with superior understanding and generation capabilities."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO",
      company: "TechSolutions Inc.",
      testimonial: "Ather Bot has transformed how we handle customer support. Response times are down 80% and satisfaction is up 45%.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCorp",
      testimonial: "The API integration was seamless. We were up and running in less than a day, and our users love the intelligent responses.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Laura Garcia",
      role: "Head of Support",
      company: "GlobalRetail",
      testimonial: "The knowledge base feature is a game-changer. Our AI now speaks with our brand voice and has deep product knowledge.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-atherbot-light to-white">
      {/* Background animation canvas */}
      <AnimatedBackground />
      
      {/* Floating elements with parallax effect */}
      <FloatingElements />
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className={`pt-32 pb-20 px-4 relative transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-atherbot-dark leading-tight">
                Welcome to <span className="relative text-atherbot-blue">Ather Bot<span className="absolute -bottom-2 left-0 w-full h-2 bg-atherbot-blue/10 rounded-full"></span></span>
              </h1>
              
              <p className="text-xl text-atherbot-gray max-w-xl">
                The next generation artificial intelligence platform for seamless workflow automation and intelligent customer interactions.
              </p>
              
              <div className="pt-4">
                <Link to="/signup">
                  <Button size="lg" className="group">
                    Let's Go
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-atherbot-blue/10 rounded-full blur-3xl animate-pulse-slow opacity-70"></div>
                <RobotIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-atherbot-dark mb-4">Powerful Features</h2>
            <p className="text-atherbot-gray max-w-2xl mx-auto">Experience the next level of AI technology with our comprehensive feature set</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 relative bg-atherbot-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-atherbot-dark mb-4">What Our Clients Say</h2>
            <p className="text-atherbot-gray max-w-2xl mx-auto">Trusted by companies worldwide to deliver exceptional AI experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                name={testimonial.name} 
                role={testimonial.role} 
                company={testimonial.company} 
                testimonial={testimonial.testimonial} 
                avatar={testimonial.avatar} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-atherbot-blue/10 to-purple-500/10 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-atherbot-dark mb-3">Ready to transform your workflow?</h2>
                <p className="text-atherbot-gray max-w-lg">Join thousands of businesses already using Ather Bot to automate tasks and enhance customer experiences.</p>
              </div>
              
              <Link to="/signup">
                <Button size="lg" className="group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Bot className="h-6 w-6 text-atherbot-blue" />
              <span className="font-bold text-lg text-atherbot-dark">Ather Bot</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-atherbot-gray">© {new Date().getFullYear()} Ather Bot AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
