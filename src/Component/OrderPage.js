import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderPage = ({ userData }) => {
  const { id } = useParams();
  const product = userData.find(item => item.id === parseInt(id));

  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    payment: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setCustomer(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!customer.name || !customer.address || !customer.payment) {
      setStatus('Please fill in all fields');
      return;
    }

    const orderData = {
      product: {
        id: product.id,
        name: product.name,
        price: product.price
      },
      customer
    };

    try {
      const res = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      setStatus(data.message || 'Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      setStatus('Failed to place order. Please try again.');
    }
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Place Order for <span style={{ color: 'teal' }}>{product.name}</span></h2>
      
      <label>Name:</label>
      <input name="name" value={customer.name} onChange={handleChange} placeholder="Your name" className="form-control" />

      <label>Address:</label>
      <input name="address" value={customer.address} onChange={handleChange} placeholder="Your address" className="form-control" />

      <label>Payment Info:</label>
      <input name="payment" value={customer.payment} onChange={handleChange} placeholder="Card or UPI" className="form-control" />

      <button onClick={handlePlaceOrder} style={{ marginTop: '10px' }} className="btn btn-primary">Place Order</button>

      {status && <p style={{ marginTop: '10px', color: 'green' }}>{status}</p>}
    </div>
  );
};

export default OrderPage;
