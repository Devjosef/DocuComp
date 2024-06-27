import React from 'react';
import AuthButton from '../components/AuthButton';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <AuthButton provider="google" />
      <AuthButton provider="github" />
    </div>
  );
};

export default LoginPage;