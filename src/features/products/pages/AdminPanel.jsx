import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const AdminPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSaveProduct = (product) => {
    setShowForm(false);
    setEditingProduct(null);
    // Recargar la lista se maneja automáticamente en ProductList
    window.location.reload();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div style={{
      padding: '2rem',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          background: 'rgba(255,240,245,0.9)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '2px solid #ffb6d5',
          boxShadow: '0 0 20px #ffb6d5'
        }}>
          <h1 style={{
            color: '#ff69b4',
            fontSize: '3rem',
            margin: 0,
            textShadow: '0 0 15px #ffb6d5',
            fontFamily: '"Great Vibes", cursive, sans-serif'
          }}>
            Panel de Administración
          </h1>
          <button
            onClick={handleCreateProduct}
            style={{
              padding: '1rem 2rem',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              boxShadow: '0 0 15px #ffb6d5',
              textShadow: '0 0 5px #fff'
            }}
          >
            + Crear Producto
          </button>
        </div>

        <ProductList 
          onEdit={handleEditProduct}
          onDelete={() => {}} // Se maneja internamente en ProductList
        />

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
