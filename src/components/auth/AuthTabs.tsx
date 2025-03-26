
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthTabsProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ onSignIn, onSignUp, isLoading }) => {
  return (
    <Tabs defaultValue="signin">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin">
        <SignInForm onSubmit={onSignIn} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="signup">
        <SignUpForm onSubmit={onSignUp} isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
