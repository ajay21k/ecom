import React, { useState } from 'react';
import './Items.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // ✅ import toast
import 'react-toastify/dist/ReactToastify.css'; // ✅ import styles

const Items = ({ userData, setUserData }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (id) => {
    const updated = userData.map(item =>
      item.id === id ? { ...item, cart: true, quantity: 1 } : item
    );
    setUserData(updated);
    toast.success('Added to cart! 🛒'); // ✅ show toast
  };

  const handleIncrement = (id) => {
    const updated = userData.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setUserData(updated);
  };

  const handleDecrement = (id) => {
    const updated = userData.map(item => {
      if (item.id === id) {
        if (item.quantity === 1) {
          return { ...item, cart: false, quantity: 0 };
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setUserData(updated);
  };

  return (
    <section className="item-wrapper">
      <ToastContainer position="top-center" autoClose={2000} /> {/* ✅ container */}
      <div className="items-grid">
        {userData.map(product => (
          <div key={product.id} className="item-card">
            <div className="flip-card">
              <div className={`flip-inner ${flippedCards[product.id] ? 'flipped' : ''}`}>

                {/* Front Side */}
                <div className="flip-front">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="item-image"
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                  <h3>{product.name}</h3>
                  <p className="text-muted">₹{product.price}</p>

                  <div className="button-group">
                    {!product.cart ? (
                      <button className="btn btn-warning" onClick={() => handleAddToCart(product.id)}>
                        Add
                      </button>
                    ) : (
                      <>
                        <button className="btn btn-success" onClick={() => handleIncrement(product.id)}>+</button>
                        <span style={{ margin: '0 10px' }}>{product.quantity}</span>
                        <button className="btn btn-danger" onClick={() => handleDecrement(product.id)}>-</button>
                        <span style={{ marginLeft: '10px', color: 'green' }}>✔️</span>
                      </>
                    )}
                    <button className="btn btn-secondary ms-2" onClick={() => toggleFlip(product.id)}>
                      Details
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-back text-center">
                  <h4>{product.name}</h4>
                  <p>Price: ₹{product.price}</p>
                  <p>Category: {product.category || 'Electronics'}</p>
                  <button className="btn btn-dark mt-2" onClick={() => toggleFlip(product.id)}>
                    Back
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Items;
