import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        setProduct(res.data); // Set product details
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productId]); // Fetch data whenever productId changes

  if (!product) return <p>Loading product details...</p>; // Loading state

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
};

export default ProductDetail;