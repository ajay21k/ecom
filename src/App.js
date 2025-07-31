import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Items from './Component/Items';
import Cart from './Component/Cart';
import Shirt from './Component/Shirt';
import ProductDetails from './Component/ProductDetails';
import products from './Component/products.json';
import OrderPage from './Component/OrderPage';
import TrackOrder from './Component/TrackOrder';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(products);
  }, []);

  // ✅ Add this: remove item from cart
  const handleRemoveFromCart = (itemId) => {
    setUserData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, cart: false, quantity: 0 } : item
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/items"
          element={<Items userData={userData} setUserData={setUserData} />}
        />
        <Route
          path="/cart"
          element={<Cart userData={userData} onRemoveFromCart={handleRemoveFromCart} />}
        />
        <Route path="/clothing" element={<Shirt />} />
        <Route
          path="/product/:id"
          element={<ProductDetails userData={userData} />}
        />
        <Route path="/order/:id" element={<OrderPage userData={userData} />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
