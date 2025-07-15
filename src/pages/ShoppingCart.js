import '../styles/ShoppingCart.css';
import Plus from '../assets/icons/plus.svg';
import Minus from '../assets/icons/minus.svg';
import Close from '../assets/icons/Close.svg';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { validateCheckoutForm } from '../utils/validateCheckout';
import { handleCheckout } from '../utils/checkout';

export default function ShoppingCart() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = (cartItems.length === 0) ? 0 : 0.00;
  const total = subtotal + shipping;

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="shopping-cart">
      <section className="cart-container">
        <h3 className="bold">Shopping Cart</h3>
        <div className="cart-item-container">
        {cartItems.length === 0 ? (
            <div className="empty-cart-container">
                <h3 className="bold">Your cart is empty</h3>
                <p className="grey">Here will be shown products when added to cart.</p>
                <Link to ="/products" className="btn black wide link-btn">Continue shopping</Link>
            </div>
        ) : (
            cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
                <img className="cart-item-image" src={item.img} alt={item.title} />
                <div className="cart-item-info">
                <div className="product-title">
                    <h5>{item.title}</h5>
                    <p>#{item.id}</p>
                </div>
                <div className="price-count-container">
                    <div className="count-handler">
                    <button className="btn-count" onClick={() => updateQuantity(item.id, -1)}>
                        <img src={Minus} alt="decrease" />
                    </button>
                    <div className="count-container">
                        <p>{item.quantity}</p>
                    </div>
                    <button className="btn-count" onClick={() => updateQuantity(item.id, 1)}>
                        <img src={Plus} alt="increase" />
                    </button>
                    </div>
                    <h4>${(item.price * item.quantity).toFixed(2)}</h4>
                    <button className="btn-count" onClick={() => removeFromCart(item.id)}>
                    <img src={Close} alt="remove" />
                    </button>
                </div>
                </div>
            </div>
            ))
        )}
        </div>
      </section>

      <section className={`order-summary-container ${cartItems.length === 0 ? 'blurred' : ''}`}>
        <div className="order-summary">
          <div className="input">
          </div>
          <h3 className="bold">Order Summary</h3>
          <div>
            <p className="small dark-grey bold">Email address</p>
            <input 
              type="email" 
              className={`user-info-input ${errors.email ? 'input-error' : ''}`} 
              id="email" placeholder='example@email.com'
              onChange={e => setEmail(e.target.value)}
              ></input>
            {errors.email && <p className="small bold error-text">{errors.email}</p>}
          </div>
          <div>
            <p className="small dark-grey bold">Name</p>
            <input type="text" className={`user-info-input ${errors.name ? 'input-error' : ''}`} id="name" placeholder='Your name' onChange={e => setName(e.target.value)}></input>
             {errors.name && <p className="small bold error-text">{errors.name}</p>}
          </div>
          <div>
            <p className="small dark-grey bold">Surname</p>
            <input type="text" className={`user-info-input ${errors.surname ? 'input-error' : ''}`} id="surname" placeholder='Your surname' onChange={e => setSurname(e.target.value)}></input>
            {errors.surname && <p className="small bold error-text">{errors.surname}</p>}
          </div>
          <div>
            <p className="small dark-grey bold">Shipping address</p>
            <input type="text" className={`user-info-input ${errors.address ? 'input-error' : ''}`} id="address" placeholder='Country, city, address, zip-code' onChange={e => setAddress(e.target.value)}></input>
            {errors.address && <p className="small bold error-text">{errors.address}</p>}
          </div>

          <div className="summary-row">
            <p>Subtotal</p>
            <p className="bold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="summary-row">
            <p>Estimated shipping & Handling</p>
            <p className="bold">${shipping.toFixed(2)}</p>
          </div>
          <div className="summary-row">
            <p className="bold">Total</p>
            <p className="bold">${total.toFixed(2)}</p>
          </div>
          <button className={`btn black wide ${!isLoading ? "" : "tapped"}`} onClick={() => {handleCheckout({
            cartItems,
            total,
            email,
            name,
            surname,
            address,
            setErrors,
            setIsLoading,
            validateCheckoutForm
          })}}>{!isLoading ? "Checkout" : <span className="spinner"></span>}</button>
        </div>
      </section>
    </div>
  );
}