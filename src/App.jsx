import { LibraryProvider } from "./context/LibraryProvider";
import SearchBooks from "./modules/SearchBooks";
import { CartProvider } from "./context/CartProvider";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <Router>
      <LibraryProvider>
        <CartProvider>
          <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundImage: "url('https://i.pinimg.com/originals/8c/1d/3f/8c1d3f3ab0c8e5635c666514c9134329.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <h1 style={{
              textAlign: 'center',
              fontSize: '4.5rem',
              fontWeight: 'bold',
              color: '#fff',
              background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
              padding: '25px',
              borderRadius: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              fontFamily: '"Great Vibes", cursive, sans-serif',
              animation: 'shine 3s linear infinite'
            }}>Libritos Saribiris</h1>
            <Routes>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
              <Route path="/" element={isAuthenticated ? <SearchBooks /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </CartProvider>
      </LibraryProvider>
    </Router>
  );
};

export default App;
