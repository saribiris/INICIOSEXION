const API_URL = 'https://api.escuelajs.co/api/v1';

// Credenciales de admin predefinidas
const ADMIN_CREDENTIALS = {
  email: 'admin@libripelle.com',
  password: 'admin123',
  user: {
    id: 999,
    name: 'Administrador',
    email: 'admin@libripelle.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1'
  }
};

export const authenticateUser = async (credentials) => {
  const { email, password } = credentials;
  
  // Verificar si son credenciales de admin
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return ADMIN_CREDENTIALS.user;
  }
  
  // Si no es admin, verificar en la API
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Error al conectar con el servidor');
  }
  const users = await response.json();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Agregar rol de usuario normal
  return {
    ...user,
    role: user.role || 'user'
  };
};
