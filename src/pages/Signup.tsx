
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingElements from "@/components/FloatingElements";
import Header from "@/components/Header";

const Signup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement actual signup logic later
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-atherbot-light to-white">
      <AnimatedBackground />
      <FloatingElements />
      <Header />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <div className="glass-panel rounded-2xl p-8 transition-all duration-500 animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-medium mb-2 text-atherbot-dark">Create an Account</h2>
              <p className="text-atherbot-gray">Join Ather Bot to access AI-powered automation</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-atherbot-dark">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    className="h-12 rounded-xl bg-atherbot-muted text-atherbot-dark"
                    placeholder="First Name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-atherbot-dark">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    className="h-12 rounded-xl bg-atherbot-muted text-atherbot-dark"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-atherbot-dark">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12 rounded-xl bg-atherbot-muted text-atherbot-dark"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-atherbot-dark">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="h-12 rounded-xl bg-atherbot-muted text-atherbot-dark"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
                      privacy policy
                    </a>
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-atherbot-blue hover:bg-atherbot-blue/90 text-white rounded-xl"
              >
                Create Account
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-atherbot-gray">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
