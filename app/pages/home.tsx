import React, { useEffect, useState } from 'react';
import { fetchContentfulEntry } from '../../lib/contentful';

const Home: React.FC = () => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const entry = await fetchContentfulEntry('entryId');
        setContent(entry.content);
      } catch (err) {
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 lg:p-24">
      <h1 className="text-3xl font-bold">Welcome to DocuComp</h1>
      <div className="mt-4">{content ? content : 'No content available'}</div>
    </div>
  );
};

export default Home;