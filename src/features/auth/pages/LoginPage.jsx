import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate('/');
  };
  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;