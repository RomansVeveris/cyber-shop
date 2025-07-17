// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import './styles/Header.css';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import ShoppingCart from './pages/ShoppingCart';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import About from './pages/About';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/product/:id" element={<ProductPage />} />
          <Route path="/products/cart" element={<ShoppingCart />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/about" element={<About />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
