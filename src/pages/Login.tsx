
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingElements from "@/components/FloatingElements";
import Header from "@/components/Header";

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will implement actual login logic later
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
              <h2 className="text-2xl font-medium mb-2 text-atherbot-dark">Welcome Back</h2>
              <p className="text-atherbot-gray">Sign in to continue to your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-atherbot-dark">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-sm font-medium text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="h-12 rounded-xl bg-atherbot-muted text-atherbot-dark"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-atherbot-blue hover:bg-atherbot-blue/90 text-white rounded-xl"
              >
                Sign in
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-atherbot-gray">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
