import React from 'react';
import AuthButton from '../components/Authbutton';

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <AuthButton provider="google" />
      <AuthButton provider="github" />
    </div>
  );
};

export default LoginPage;