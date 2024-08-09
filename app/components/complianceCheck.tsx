'use client';

import React, { useState } from 'react';

interface ComplianceCheckProps {
  documentContent: string;
}

const ComplianceCheck: React.FC<ComplianceCheckProps> = ({ documentContent }) => {
  const [complianceStatus, setComplianceStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkCompliance = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/compliance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentContent }),
      });

      const data = await response.json();
      setComplianceStatus(data.complianceStatus);
    } catch (err) {
      setError('Failed to check compliance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={checkCompliance} disabled={loading}>
        {loading ? 'Checking...' : 'Check Compliance'}
      </button>
      {error && <p>Error: {error}</p>}
      {complianceStatus && <p>Compliance Status: {complianceStatus}</p>}
    </div>
  );
};

export default ComplianceCheck;