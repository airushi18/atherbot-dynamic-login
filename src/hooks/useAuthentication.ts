
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: 'Sign in successful',
        description: 'Welcome back!',
      });
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'There was an error signing in',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // First, try to sign in with the provided credentials in case user already exists
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // If sign in is successful, user already exists and credentials are correct
      if (!signInError) {
        toast({
          title: 'Sign in successful',
          description: 'Welcome back!',
        });
        return;
      }
      
      // If sign in fails, create a new user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            email_confirmed: true
          }
        }
      });
      
      if (error) throw error;
      
      // Immediately sign in after signup
      if (data.user) {
        const { error: autoSignInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (autoSignInError) {
          console.error("Auto-signin failed after signup:", autoSignInError);
          toast({
            title: 'Account created',
            description: 'You can now sign in with your credentials',
          });
        } else {
          toast({
            title: 'Account created successfully',
            description: 'Welcome to Ather Bot!',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'There was an error signing up',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signIn,
    signUp
  };
};
