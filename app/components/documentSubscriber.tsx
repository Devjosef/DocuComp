import React, { useEffect } from 'react';
import { subscribeToDocuments } from '../../utils/supabaseClient';

// Component to handle real-time subscription to document changes.
const DocumentSubscriber: React.FC = () => {
  useEffect(() => {
    const { unsubscribe } = new subscribeToDocuments();

    return () => {
      unsubscribe();
    };
  }, []);

  // Placeholder for rendering, can be adjusted as needed
  return <div>Subscribed to document changes.</div>;
};

export default DocumentSubscriber;