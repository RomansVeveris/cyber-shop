import React from 'react';
import logo from '../assets/Logo.svg';
import burger from '../assets/icons/Burger.svg';
import '../App.css';
import searchIcon from '../assets/icons/Search.svg';
import cart from '../assets/icons/Cart.svg';
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Phones from '../assets/icons/header_nav_icons/Phones.svg';
import Computers from '../assets/icons/header_nav_icons/Computers.svg';
import Gaming from '../assets/icons/header_nav_icons/Gaming.svg';
import Cameras from '../assets/icons/header_nav_icons/Cameras.svg';
import Headphones from '../assets/icons/header_nav_icons/Headphones.svg';
import ArrowLeft from '../assets/icons/arrow_left.svg';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const filterItems = [
  { img: Phones, label: "Phones", value: "phone"},
  { img: Computers, label: 'Computers', value: "all"},
  { img: Gaming, label: 'Smart Watches', value: "watch"},
  { img: Cameras, label: 'Cameras', value: "camera"},
  { img: Headphones, label: 'Headphones', value: "headphones" },
  { img: Gaming, label: 'Gaming', value: "all" },
];

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="header-container-left">
            <Link className="test" to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <div className="input-wrapper">
              <span className="prefix-icon"><img className="search-img" src={searchIcon} alt="search icon"/></span>
              <input type="search" id="search" placeholder="Find my order" />
            </div>
          </div>

          <div className="header-container-right">
            <nav className="header-nav">
              <NavLink to="/" className={({ isActive }) =>
                isActive ? 'nav-header-link active-link' : 'nav-header-link'
              }>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) =>
                isActive ? 'nav-header-link active-link' : 'nav-header-link'
              }>Products</NavLink>
             <NavLink to="/about" className={({ isActive }) =>
                isActive ? 'nav-header-link active-link' : 'nav-header-link'
              }>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) =>
                isActive ? 'nav-header-link active-link' : 'nav-header-link'
              }>Contact</NavLink>
            </nav>
            <div className="cart-container">
              <Link to="/products/cart" className="cart-icon-wrapper">
                <img src={cart} alt="shopping cart" />
                {totalQuantity > 0 && (
                  <div className="cart-badge-wrapper">
                    <span className="cart-badge">{totalQuantity}</span>
                  </div>
                )}
              </Link>
            </div>
          </div>
          <img src={burger} className="App-burger" alt="menu" onClick={() => setMenuOpen(!menuOpen)}/>
          <div className="header-product-filter">
            <div className="filter-container">
              {filterItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className="filter-item"
                    onClick={() => navigate(`/products?filter=${item.value}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={item.img} alt={item.label} />
                    <p className="grey nav-link">{item.label}</p>
                  </div>
                  {index !== filterItems.length - 1 && (
                    <div className="vertical-divider" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`burger-menu-container ${menuOpen ? 'open' : 'closed'}`}
          onClick={() => setMenuOpen(false)}>
          <div className="burger-bg-blur"></div>
          <nav
            className={`burger-menu ${menuOpen ? 'open' : 'closed'}`}
            onClick={(e) => e.stopPropagation()}>
            <div className="buttons-row">
              <button className="btn empty" onClick={() => setMenuOpen(false)}>
                <img src={ArrowLeft} alt="back" />
              </button>

              <Link to="/products/cart" className="cart-icon-wrapper" onClick={() => setMenuOpen(false)}>
                <img src={cart} alt="shopping cart" />
                {totalQuantity > 0 && (
                  <div className="cart-badge-wrapper">
                    <span className="cart-badge">{totalQuantity}</span>
                  </div>
                )}
              </Link>
            </div>
            <ul>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
export default Header;
 