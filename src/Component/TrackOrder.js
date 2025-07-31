import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './TrackOrder.css';

const statuses = [
  { label: 'Order Placed', icon: '🛒' },
  { label: 'Dispatched', icon: '📦' },
  { label: 'Arrived at Hub', icon: '🚛' },
  { label: 'Out for Delivery', icon: '📬' },
  { label: 'Delivered', icon: '✅' },
];

const TrackOrder = () => {
  const location = useLocation();
  const { cartItems, formData } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  if (!cartItems || !formData) {
    return <h2 style={{ textAlign: 'center', marginTop: '40px' }}>No tracking information found.</h2>;
  }

  // Calculate total
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = Number(item.price.toString().replace(/,/g, ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="track-container">
      <h2>Tracking Your Order ✅</h2>

      {/* Tracking status timeline */}
      <div className="tracking-timeline">
        {statuses.map((step, index) => (
          <div key={index} className={`status ${index <= currentStep ? 'active' : ''}`}>
            <div className="icon">{step.icon}</div>
            <div className="label">{step.label}</div>
          </div>
        ))}
      </div>

      {/* Customer Information */}
      <div className="order-details">
        <h3>Customer Info</h3>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>

        {/* Product Information */}
        <h3>Ordered Products</h3>
        {cartItems.map(item => {
          const price = Number(item.price.toString().replace(/,/g, ''));
          return (
            <div key={item.id} className="track-product">
              <img src={item.image} alt={item.name} width={100} />
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Price: ₹{price.toLocaleString()}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ₹{(price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
        <hr />
        <h4>Total Amount: ₹{totalAmount.toLocaleString()}</h4>
      </div>

      <Link to="/" className="back-home">← Back to Home</Link>
    </div>
  );
};

export default TrackOrder;
