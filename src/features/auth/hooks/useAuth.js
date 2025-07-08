import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { authenticateUser } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(state => state.auth);

  const login = async (credentials) => {
    dispatch(loginStart());
    try {
      const user = await authenticateUser(credentials);
      dispatch(loginSuccess(user));
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } catch (err) {
      dispatch(loginFailure(err.message));
      return { success: false, error: err.message };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: logoutUser
  };
};
