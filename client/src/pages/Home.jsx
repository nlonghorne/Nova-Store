import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

    return (
      <div className='container'>
        <h1>Welcome to Nova Store</h1>
        {user ? (
        <p>Welcome back {user.name}!</p>
      ) : (
        <p>Please login or register to access your account.</p>
      )}
        <p>Explore our products and enjoy shopping!</p>
        <img src="https://via.placeholder.com/600x400" alt="Nova Store" />
        <p>Discover the latest trends and exclusive offers.</p>
        <button onClick={() => navigate('/products')}>Shop Now</button>
      </div>
    );
  };
  
  export default Home;  