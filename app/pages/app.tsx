import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';
import MobileCompatibility from '../components/MobileCompatibility';
import React from 'react';

function MyApp({ Component, pageProps }: { Component: React.ComponentType<any>, pageProps: any }) {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      if (!session) router.push('/login');
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/login');
    });
  }, [router]);

  return (
    <MobileCompatibility>
      <Component />
    </MobileCompatibility>
  );
}

export default MyApp;
