import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import '../styles/ProductPage.css';
import delivery from '../assets/icons/delivery_truck.svg';
import stock from '../assets/icons/stock.svg';
import verify from '../assets/icons/verify.svg';

import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

import Toast from "../components/Toast.js";

function ProductPage() {
  const { cartItems, addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(CartContext);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/404');
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    }

    fetchProduct();
  },);

  if (!product) {
  return (
    <div className="loading-container">
      <p>Loading product info...</p>
      <span className="spinner"></span>
    </div>
  );
}

  return (
    <>
    <div className="product-info-container">
      <div className="main-info-container">
          <img className="product-bigger-img" src={product.img} alt={product.title} />
      </div>
      <div className="detailed-info-container">
          <h2 className="product-h2">{product.title}</h2>
          <h4>Price: ${product.price}</h4>
          <div className="colors-container">
            <p className="grey">Available colors:    </p>
            <div className="circle-color" style={{ backgroundColor: '#000' }}></div>
            <div className="circle-color" style={{ backgroundColor: '#781DBC' }}></div>
            <div className="circle-color" style={{ backgroundColor: '#E10000' }}></div>
            <div className="circle-color" style={{ backgroundColor: '#E1B000' }}></div>
            <div className="circle-color" style={{ backgroundColor: '#E8E8E8' }}></div>
          </div>

          <div className="description-container">
          <p className="truncate-description">
            {expanded ? product.description : product.description.slice(0, 150) + ' '}
            {product.description.length > 150 && (
            <span className="more-inline" onClick={() => setExpanded(!expanded)}>
                {expanded ? 'less' : 'more...'}
            </span>
            )}
          </p>
          </div>
          <div className="button-container">
            <button className="btn transparent-black wide product" onClick={() => { if(!showToast) { setShowToast(true); } addToCart(product);}}>Add to Cart</button>
            <button className="btn black wide product"
              onClick={(e) => { 
                console.log("added");
                e.preventDefault();
                e.stopPropagation();
                const isInCart = cartItems.some(item => item.id === product.id);
                if (!isInCart) {
                  addToCart(product);
                }
                navigate('/products/cart');
              }
            }
              >Buy Now
            </button>
          </div>
          <div className="info-container">
            <div className="info-item">
              <div className="info-icon">
                <img src={delivery} alt="delivery truck"/>
              </div>
              <p>Free Delivery</p>
              <p className="info-p">1-2 day</p>
            </div>
              
            <div className="info-item">
              <div className="info-icon">
                  <img src={stock} alt="items in stock"/>
              </div>
              <p>In Stock</p>
              <p className="info-p">Today</p>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <img src={verify} alt="warranty icon"/>
              </div>
              <p>Warranty</p>
              <p className="info-p">1 year</p>
            </div>
          </div>
        </div>
    </div>
    <section className="specifics-container">
      <div className="specifics-inner">
        <div className="inner column">
          <h2>Details</h2>
          <p>Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing the new systemwith two cameras more. Full detail display is going to be implemented soon.</p>
        </div>
        <div className="inner row">
          <h5>Screen diagonal</h5>
          <p className="bold">6''</p>
        </div>
        <div className="inner row">
          <h5>Resolution</h5>
          <p className="bold">2796x1290</p>
        </div>
        <div className="inner row">
          <h5>Screen refresh rate</h5>
          <p className="bold">120hz</p>
        </div>
        <div className="inner row">
          <h5>Screen type</h5>
          <p className="bold">OLED</p>
        </div>
      </div>
    </section>
    <Toast message="Product added to cart!" visible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

export default ProductPage;
