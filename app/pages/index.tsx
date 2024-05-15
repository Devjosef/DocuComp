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
        const authenticateAndFetch = async () => {
            try {
                const { data: session, error: authError } = await supabase.auth.getSession();
                if (authError) throw authError;
                if (!session) {
                    router.push('/login');
                } else {
                    const data = await fetchDocumentation();
                    setContent(data);
                    setLoading(false);
                }
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
                console.error(err);
            }
        };

        authenticateAndFetch();
    }, [router]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Welcome to DocuComp</h1>
            <div>{content ? content : 'No content available'}</div>
        </div>
    );
};

export default Home;

