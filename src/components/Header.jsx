import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: 'linear-gradient(90deg, #ffb6d5, #ff69b4, #ffe0f7)',
      boxShadow: '0 0 20px #ffb6d5',
      marginBottom: '2rem'
    }}>
      <Link 
        to="/" 
        style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px #fff',
          fontFamily: '"Great Vibes", cursive, sans-serif'
        }}
      >
        Libritos Saribiris
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span style={{ 
              color: '#fff', 
              fontWeight: 'bold',
              textShadow: '0 0 5px #fff'
            }}>
              Hola, {user?.name}
            </span>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                style={{
                  padding: '0.8rem 1.5rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'rgba(255,215,0,0.3)',
                  color: '#fff',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 0 10px rgba(255,215,0,0.5)',
                  fontSize: '1rem'
                }}
              >
                Admin Panel
              </Link>
            )}
            <Link
              to="/mi-cuenta"
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 0 10px rgba(255,255,255,0.3)',
                fontSize: '1rem'
              }}
            >
              Mi Cuenta
            </Link>
            <button
              onClick={logout}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(255,255,255,0.3)',
                fontSize: '1rem'
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 0 10px rgba(255,255,255,0.3)',
              fontSize: '1rem'
            }}
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
