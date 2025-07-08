import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    setEmailError('');
    setPasswordError('');
    
    if (!email) {
      setEmailError('El correo electrónico es requerido');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    if (!password) {
      setPasswordError('La contraseña es requerida');
      return;
    }
    
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const result = await login({ email, password });
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '400px',
      margin: '80px auto',
      padding: '2rem',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #ffe0f7 0%, #ffd6e0 100%)',
      boxShadow: '0 0 30px 5px #ffb6d5, 0 0 10px 2px #ff69b4',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      color: '#d87093',
      fontFamily: 'Arial, sans-serif',
      border: '2px solid #ffb6d5',
      animation: 'neonGlow 2s infinite alternate'
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#ff69b4',
        textShadow: '0 0 10px #ffb6d5, 0 0 20px #ff69b4',
        marginBottom: '1rem',
        fontFamily: '"Great Vibes", cursive, sans-serif'
      }}>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          padding: '0.8rem',
          borderRadius: '10px',
          border: '1.5px solid #ffb6d5',
          background: 'rgba(255,240,245,0.7)',
          color: '#d87093',
          fontSize: '1.1rem',
          outline: 'none',
          boxShadow: '0 0 10px #ffb6d5 inset'
        }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{
          padding: '0.8rem',
          borderRadius: '10px',
          border: '1.5px solid #ff69b4',
          background: 'rgba(255,240,245,0.7)',
          color: '#d87093',
          fontSize: '1.1rem',
          outline: 'none',
          boxShadow: '0 0 10px #ff69b4 inset'
        }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: '0.9rem',
          borderRadius: '10px',
          border: 'none',
          background: 'linear-gradient(90deg, #ffb6d5, #ff69b4, #ffe0f7)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 0 20px #ffb6d5, 0 0 10px #ff69b4',
          transition: 'background 0.3s, transform 0.2s',
          textShadow: '0 0 5px #fff',
        }}
      >
        {isLoading ? 'Cargando...' : 'Entrar'}
      </button>
      {error && <div style={{ color: '#ff69b4', textAlign: 'center', fontWeight: 'bold', textShadow: '0 0 5px #ffb6d5' }}>{error}</div>}
      {emailError && <div style={{ color: '#ff69b4', textAlign: 'center', fontWeight: 'bold', textShadow: '0 0 5px #ffb6d5' }}>{emailError}</div>}
      {passwordError && <div style={{ color: '#ff69b4', textAlign: 'center', fontWeight: 'bold', textShadow: '0 0 5px #ffb6d5' }}>{passwordError}</div>}
      
      <div style={{
        background: 'rgba(255,240,245,0.7)',
        padding: '1rem',
        borderRadius: '10px',
        border: '1px solid #ffb6d5',
        fontSize: '0.9rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>Para pruebas usar:</p>
        <p style={{ margin: '0.2rem 0' }}>Usuario: john@mail.com / changeme</p>
        <p style={{ margin: '0.2rem 0' }}>Admin: admin@libripelle.com / admin123</p>
      </div>
    </form>
  );
};

export default LoginForm;