
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in to Atherbot AI.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-panel rounded-2xl p-8 transition-all duration-500 animate-fade-in">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-medium mb-2 text-atherbot-dark">Welcome to Atherbot</h2>
          <p className="text-atherbot-gray">Sign in to continue to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-atherbot-dark">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input h-12 pl-4 pr-4 rounded-xl bg-atherbot-muted text-atherbot-dark placeholder:text-atherbot-gray/50 focus:ring-2 focus:ring-atherbot-blue/30"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
              <div className="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none opacity-30">
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-atherbot-gray/10 to-transparent"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-atherbot-dark">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input h-12 pl-4 pr-12 rounded-xl bg-atherbot-muted text-atherbot-dark placeholder:text-atherbot-gray/50 focus:ring-2 focus:ring-atherbot-blue/30"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-atherbot-gray hover:text-atherbot-dark transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-atherbot-gray/30 text-atherbot-blue focus:ring-atherbot-blue/30"
              />
              <Label htmlFor="remember" className="text-sm text-atherbot-gray cursor-pointer">
                Remember me
              </Label>
            </div>
            <a href="#" className="text-sm font-medium text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
              Forgot password?
            </a>
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="interactive-button w-full h-12 bg-atherbot-blue hover:bg-atherbot-blue/90 text-white rounded-xl relative overflow-hidden group transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? "Signing in..." : "Sign in"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white/20 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-atherbot-gray">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-atherbot-blue hover:text-atherbot-blue/80 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
