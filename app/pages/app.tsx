import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import MobileCompatibility from '../components/MobileCompatibility';

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
      <MainComponent />
    </MobileCompatibility>
  );
}

export default MyApp;
