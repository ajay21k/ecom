import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ userData, onRemoveFromCart }) => {
  const cartItems = (userData || []).filter(item => item.cart);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const numericPrice = Number(item.price.toString().replace(/,/g, ''));
    return sum + numericPrice * item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // Pass the first item ID (or change this if you want to handle multiple)
      navigate(`/order/${cartItems[0].id}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map(item => {
              const numericPrice = Number(item.price.toString().replace(/,/g, ''));
              return (
                <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} width={50} height={50} className="me-3" />
                    <div>
                      <strong>{item.name}</strong> <span className="text-muted">x {item.quantity}</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-primary me-3">
                      ₹{(numericPrice * item.quantity).toLocaleString()}
                    </span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="text-end">
            <h4>Total: ₹{totalPrice.toLocaleString()}</h4>
            <button className="btn btn-success mt-2" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
