import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: 1,
    images: ['']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        categoryId: product.category?.id || 1,
        images: product.images || ['']
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      images: [e.target.value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        ...formData,
        price: parseInt(formData.price)
      };

      let result;
      if (product) {
        result = await productService.updateProduct(product.id, productData);
      } else {
        result = await productService.createProduct(productData);
      }

      onSave(result);
      alert(product ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #ffe0f7 0%, #ffd6e0 100%)',
        borderRadius: '20px',
        padding: '2rem',
        width: '90%',
        maxWidth: '500px',
        border: '2px solid #ffb6d5',
        boxShadow: '0 0 30px #ffb6d5'
      }}>
        <h2 style={{
          color: '#ff69b4',
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '2rem',
          textShadow: '0 0 10px #ffb6d5'
        }}>
          {product ? 'Editar Producto' : 'Crear Producto'}
        </h2>

        {error && (
          <div style={{
            color: '#ff69b4',
            textAlign: 'center',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#d87093', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
              Título:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '10px',
                border: '1.5px solid #ffb6d5',
                background: 'rgba(255,240,245,0.7)',
                color: '#d87093',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#d87093', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
              Precio:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '10px',
                border: '1.5px solid #ffb6d5',
                background: 'rgba(255,240,245,0.7)',
                color: '#d87093',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#d87093', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '10px',
                border: '1.5px solid #ffb6d5',
                background: 'rgba(255,240,245,0.7)',
                color: '#d87093',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#d87093', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
              URL de Imagen:
            </label>
            <input
              type="url"
              value={formData.images[0]}
              onChange={handleImageChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '10px',
                border: '1.5px solid #ffb6d5',
                background: 'rgba(255,240,245,0.7)',
                color: '#d87093',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '0.9rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(90deg, #ccc, #999)',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.9rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
                color: '#fff',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
