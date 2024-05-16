import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchContentfulEntry, transformEntryData } from '@/lib/contentful';

interface HomeProps {}
interface HomeState {
    content: string | null;
    loading: boolean;
    error: string | null;
}

const Home: React.FC<HomeProps> = () => {
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const authenticateAndFetch = async () => {
            try {
                const entryId = 'your-entry-id'; // Specify the entry ID
                const entry = await fetchContentfulEntry(entryId); // Corrected usage of fetch function
                if (entry) {
                    const transformedData = transformEntryData(entry); // Use transformEntryData
                    if (transformedData) {
                        setContent(transformedData.toString()); // Set transformed data as string
                    } else {
                        throw new Error('Content not found');
                    }
                } else {
                    throw new Error('Content not found');
                }
                setLoading(false);
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

