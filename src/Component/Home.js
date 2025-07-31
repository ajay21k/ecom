import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // ✅ Hero image rotation logic
  const images = [
    '/store.png',
    '/flash.jpg',
    '/puma.jpg',
    '/levi.png',
    '/ama.jpg'
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();

    if (term.startsWith('electronic')) {
      navigate(`/items?search=${encodeURIComponent(term)}`);
    } else if (term.startsWith('cloth')) {
      navigate(`/clothing?search=${encodeURIComponent(term)}`);
    } else {
      alert("Please search for a valid category: 'electronic' or 'cloth'.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">🛒 E-asify</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/items">🛍 Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">❤️ Favorites</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">🛒 Cart</Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {/* ✅ Rotating Hero Image Section */}
      <div
        style={{
          backgroundImage: `url("${images[currentImage]}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '500px',
          width: '100%',
          transition: 'background-image 1s ease-in-out',
        }}
      />

      {/* Content Below Image */}
      <section className="text-center py-5 bg-light">
        <div className="container">
          <h1 className="display-4">Welcome to E-asify</h1>
          <p className="lead">Discover the best products at unbeatable prices!</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link to="/items" className="btn btn-primary btn-lg">Grab Device</Link>
            <Link to="/clothing" className="btn btn-outline-primary btn-lg">Show Clothing</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
