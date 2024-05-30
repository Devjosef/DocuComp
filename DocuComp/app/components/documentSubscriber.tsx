import React, { useEffect } from 'react';
import { subscribeToDocuments } from '../../lib/supabaseClient';

const DocumentSubscriber: React.FC = () => {
  useEffect(() => {
    const { unsubscribe } = subscribeToDocuments();

    return () => {
      unsubscribe();
    };
  }, []);

  // Placeholder for rendering, can be adjusted as needed
  return <div>Subscribed to document changes.</div>;
};

export default DocumentSubscriber;