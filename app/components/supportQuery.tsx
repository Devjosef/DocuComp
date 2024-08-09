'use client';

import React, { useState } from 'react';

const SupportQuery = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuery = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setError('Failed to handle support query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your support query here"
      />
      <button onClick={handleQuery} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Query'}
      </button>
      {error && <p>Error: {error}</p>}
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default SupportQuery;