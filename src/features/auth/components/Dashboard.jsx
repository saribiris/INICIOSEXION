import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      padding: '2rem',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #ffe0f7 0%, #ffd6e0 100%)',
      boxShadow: '0 0 30px 5px #ffb6d5, 0 0 10px 2px #ff69b4',
      color: '#d87093',
      fontFamily: 'Arial, sans-serif',
      border: '2px solid #ffb6d5'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#ff69b4',
          textShadow: '0 0 10px #ffb6d5',
          fontFamily: '"Great Vibes", cursive, sans-serif',
          margin: 0
        }}>Mi Cuenta</h1>
        <button
          onClick={logout}
          style={{
            padding: '0.8rem 1.5rem',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 0 15px #ffb6d5',
            fontSize: '1rem'
          }}
        >
          Cerrar Sesión
        </button>
      </div>
      
      <div style={{
        background: 'rgba(255,240,245,0.7)',
        padding: '1.5rem',
        borderRadius: '15px',
        border: '1px solid #ffb6d5'
      }}>
        <h2 style={{
          color: '#ff69b4',
          marginBottom: '1rem',
          fontSize: '1.8rem'
        }}>Información del Usuario</h2>
        
        {user?.avatar && (
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img 
              src={user.avatar} 
              alt={`Avatar de ${user.name}`}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid #ff69b4',
                boxShadow: '0 0 15px #ffb6d5'
              }}
            />
          </div>
        )}
        
        <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          <p><strong>Nombre:</strong> {user?.name}</p>
          <p><strong>Correo:</strong> {user?.email}</p>
          <p><strong>ID:</strong> {user?.id}</p>
          <p><strong>Rol:</strong> {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
