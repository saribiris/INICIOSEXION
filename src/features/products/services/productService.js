const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const productService = {
  // Obtener todos los productos
  getAllProducts: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error de conexión: ' + error.message);
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error al obtener producto: ' + error.message);
    }
  },

  // Crear nuevo producto
  createProduct: async (productData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) {
        throw new Error('Error al crear producto');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error al crear producto: ' + error.message);
    }
  },

  // Actualizar producto
  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      if (!response.ok) {
        throw new Error('Error al actualizar producto');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error al actualizar producto: ' + error.message);
    }
  },

  // Eliminar producto
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Error al eliminar producto: ' + error.message);
    }
  }
};
