import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminProductManager = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [mode, setMode] = useState('create'); // 'create' or 'edit'

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
    } else {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      editingId
        ? 'Are you sure you want to update this product?'
        : 'Are you sure you want to create this product?'
    );
    if (!confirmed) return;

    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, {
          name,
          description,
          price: parseFloat(price),
        });
      } else {
        await axios.post('/api/products', {
          name,
          description,
          price: parseFloat(price),
        });
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setMode('edit');
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Product Manager</h2>

      {/* Mode Toggle Buttons */}
      <div className="mode-toggle">
        <button
          onClick={() => {
            setMode('create');
            resetForm();
          }}
          className={mode === 'create' ? 'active' : ''}
        >
          Create Product
        </button>
        <button
          onClick={() => {
            setMode('edit');
            resetForm();
          }}
          className={mode === 'edit' ? 'active' : ''}
        >
          Edit/Delete Product
        </button>
      </div>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'} Product</button>
      </form>

      {/* Product List (visible only in edit mode) */}
      {mode === 'edit' && (
        <div className="product-list">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p><strong>${p.price}</strong></p>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductManager;