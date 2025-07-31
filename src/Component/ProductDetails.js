import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ userData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = userData.find((item) => item.id === parseInt(id));
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return <h2 style={{ textAlign: 'center', paddingTop: '50px' }}>Product not found</h2>;
  }

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const placeOrder = () => {
    navigate(`/order/${product.id}`);
  };

  return (
    <div className="product-details-container">
      <Link to="/items" className="back-link">← Back to Items</Link>

      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />

        <div className="product-info">
          <h2>
            {product.name}{' '}
            <span
              className={`favorite-icon ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              ❤️
            </span>
          </h2>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Category:</strong> {product.category || 'Electronics'}</p>
          <p><strong>Quantity in Cart:</strong> {product.quantity}</p>
          <p><strong>Description:</strong> This is a detailed view of <em>{product.name}</em>. Add more info here if needed.</p>

          <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
