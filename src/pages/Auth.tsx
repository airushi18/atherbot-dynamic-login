
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthTabs from '@/components/auth/AuthTabs';
import { useAuthentication } from '@/hooks/useAuthentication';

const Auth = () => {
  const navigate = useNavigate();
  const { isLoading, signIn, signUp } = useAuthentication();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    
    checkSession();
    
    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthLayout>
      <AuthTabs
        onSignIn={signIn}
        onSignUp={signUp}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default Auth;
