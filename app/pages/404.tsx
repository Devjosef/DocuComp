import Link from 'next/link';
import React from 'react';

const Custom404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link href="/">
        <a className="mt-6 text-blue-500 hover:underline" aria-label="Go to Home Page">Go to Home</a>
      </Link>
    </div>
  );
};

export default Custom404;