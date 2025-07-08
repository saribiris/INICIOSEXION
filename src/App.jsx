import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LibraryProvider } from "./context/LibraryProvider";
import SearchBooks from "./modules/SearchBooks";
import { CartProvider } from "./context/CartProvider";
import Header from "./components/Header";
import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/auth/components/Dashboard";
import AdminPanel from "./features/products/pages/AdminPanel";
import { loginSuccess } from "./features/auth/slices/authSlice";

const HomePage = () => (
  <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundImage: "url('https://i.pinimg.com/originals/8c/1d/3f/8c1d3f3ab0c8e5635c666514c9134329.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
    <SearchBooks />
  </main>
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(loginSuccess(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  return (
    <LibraryProvider>
      <CartProvider>
        <div style={{ 
          minHeight: '100vh',
          backgroundImage: "url('https://i.pinimg.com/originals/8c/1d/3f/8c1d3f3ab0c8e5635c666514c9134329.jpg')", 
          backgroundSize: 'cover', 
          backgroundAttachment: 'fixed' 
        }}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mi-cuenta" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </CartProvider>
    </LibraryProvider>
  );
};

export default App;
