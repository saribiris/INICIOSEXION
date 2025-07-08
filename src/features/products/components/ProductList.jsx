import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';

const ProductList = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        alert('Producto eliminado exitosamente');
      } catch (err) {
        alert('Error al eliminar producto: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#ff69b4' }}>
        Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#ff69b4' }}>
        Error: {error}
      </div>
    );
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{
      background: 'rgba(255,240,245,0.9)',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '2px solid #ffb6d5',
      boxShadow: '0 0 20px #ffb6d5'
    }}>
      <h2 style={{
        color: '#ff69b4',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '2rem',
        textShadow: '0 0 10px #ffb6d5'
      }}>
        Lista de Productos
      </h2>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Buscar productos por título, descripción o categoría..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.8rem',
            borderRadius: '10px',
            border: '1.5px solid #ffb6d5',
            background: 'rgba(255,240,245,0.7)',
            color: '#d87093',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Products Count */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#d87093',
        fontWeight: 'bold'
      }}>
        Mostrando {currentProducts.length} de {filteredProducts.length} productos
        {searchTerm && ` (filtrados de ${products.length} total)`}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        {currentProducts.map(product => (
          <div key={product.id} style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid #ffb6d5',
            boxShadow: '0 0 10px rgba(255,182,213,0.3)'
          }}>
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/150'} 
              alt={product.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}
            />
            <h3 style={{ color: '#d87093', fontSize: '1.2rem', margin: '0.5rem 0' }}>
              {product.title}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0' }}>
              {product.description?.substring(0, 100)}...
            </p>
            <p style={{ color: '#ff69b4', fontWeight: 'bold', fontSize: '1.1rem' }}>
              ${product.price}
            </p>
            <p style={{ color: '#888', fontSize: '0.8rem' }}>
              Categoría: {product.category?.name || 'Sin categoría'}
            </p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={() => onEdit(product)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '5px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '5px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #ff6b6b, #ee5a52)',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          gap: '0.5rem'
        }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              border: 'none',
              background: currentPage === 1 ? '#ccc' : 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
              color: '#fff',
              fontWeight: 'bold',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              style={{
                padding: '0.5rem 0.8rem',
                borderRadius: '5px',
                border: 'none',
                background: currentPage === index + 1 
                  ? 'linear-gradient(90deg, #ff69b4, #d87093)' 
                  : 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                opacity: currentPage === index + 1 ? 1 : 0.7
              }}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              border: 'none',
              background: currentPage === totalPages ? '#ccc' : 'linear-gradient(90deg, #ffb6d5, #ff69b4)',
              color: '#fff',
              fontWeight: 'bold',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
