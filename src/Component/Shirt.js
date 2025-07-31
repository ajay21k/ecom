import React, { useEffect, useState } from 'react';
import products from './Shirt.json';
import './Items.css';

const Shirt = () => {
  const [clothingData, setClothingData] = useState([]);
  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    // Initialize with Shirt products
    setClothingData(products.map(item => ({ ...item, cart: false, quantity: 0 })));
  }, []);

  const handleAddToCart = (id) => {
    const updated = clothingData.map((item) =>
      item.id === id ? { ...item, cart: true, quantity: 1 } : item
    );
    setClothingData(updated);
  };

  const handleIncrement = (id) => {
    const updated = clothingData.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setClothingData(updated);
  };

  const handleDecrement = (id) => {
    const updated = clothingData.map((item) => {
      if (item.id === id) {
        if (item.quantity === 1) {
          return { ...item, cart: false, quantity: 0 };
        }
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setClothingData(updated);
  };

  const toggleFlip = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section className="item-wrapper">
      <div className="items-grid">
        {clothingData.map((product) => (
          <div key={product.id} className="item-card">
            <div className="flip-card" onClick={() => toggleFlip(product.id)}>
              <div className={`flip-inner ${flippedId === product.id ? 'flipped' : ''}`}>
                
                {/* Front Side */}
                <div className="flip-front">
                  <img src={product.image} alt={product.name} className="item-image" />
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <div className="button-group">
                    {!product.cart ? (
                      <button className="add-btn" onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}>Add</button>
                    ) : (
                      <>
                        <button className="add-btn" onClick={(e) => {
                          e.stopPropagation();
                          handleIncrement(product.id);
                        }}>+</button>
                        <span>{product.quantity}</span>
                        <button className="remove-btn" onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(product.id);
                        }}>-</button>
                        <span style={{ color: 'green' }}>✔️</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-back">
                  <h4>Details</h4>
                  <p>{product.description || "No description provided."}</p>
                  <button className="add-btn" onClick={(e) => {
                    e.stopPropagation();
                    alert("More details coming soon!");
                  }}>More Info</button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shirt;
