import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { authenticateUser } from '../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const user = await authenticateUser({ email, password });
      dispatch(loginSuccess(user));
      onLoginSuccess();
    } catch (err) {
      dispatch(loginFailure(err.message));
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
    </form>
  );
};

export default LoginForm;