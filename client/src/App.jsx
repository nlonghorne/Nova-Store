import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import ProductHome from './pages/ProductHome.jsx';
import ProductDetail from './pages/ProductDetail';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      {user ? (
        <>
          {/* <span>Welcome, {user.name}!</span> */}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductHome />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;