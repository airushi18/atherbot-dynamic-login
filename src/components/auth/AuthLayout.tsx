
import React from 'react';
import { Bot } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Bot className="h-10 w-10 text-atherbot-blue mr-2" />
          <h1 className="text-3xl font-bold text-atherbot-dark">Ather Bot</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Sign in to access your API keys and dashboard
            </CardDescription>
          </CardHeader>
          
          {children}
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
