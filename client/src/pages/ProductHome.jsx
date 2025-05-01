import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PRODUCTS_PER_PAGE = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`);
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [page]);

  const handlePageClick = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div className="product-card" key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.description}</p>
                <p><strong>${product.price}</strong></p>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading products or none available.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>Previous</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageClick(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ProductHome;