import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { fetchDocumentation } from '../services/contentfulService';

const Home: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetchContent = async () => {
      try {
        const session = supabase.auth.session();
        if (!session) {
          router.push('/login'); // Redirect to login page
        } else {
          const data = await fetchDocumentation();
          setContent(data);
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err); // Log error for debugging purposes
      }
    };

    checkAuthAndFetchContent();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Head>
        <title>DocuComp - Home</title>
        <meta name="description" content="Welcome to DocuComp - Your document management tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to DocuComp</h1>
        <div>{content ? content : 'No content available'}</div>
      </main>

      <footer>
        <p>Contact us at info@docucomp.com</p>
      </footer>
    </div>
  );
};

export default Home;
