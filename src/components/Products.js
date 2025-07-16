import '../styles/Products.css';
import '../styles/global.css';
import loved from '../assets/icons/Favorite.svg'; 
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export function Products({ limit = null, filter = 'all', sort = 'az' }) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsCol = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCol);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProducts(productsList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = filter === 'all'
      ? [...allProducts]
      : allProducts.filter(p => p.type === filter);

    switch (sort) {
      case 'az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    const limited = limit ? filtered.slice(0, limit) : filtered;
    setProducts(limited);
  }, [filter, sort, limit, allProducts]);

  return (
    <section className="products">
      {products.map(product => (
        <Link 
          key={product.id} 
          to={`/products/product/${product.id}`} 
          className="products-item-link" 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="products-item">
            <div className="loved-row">
              <img src={loved} alt="Favorite" className="favorite-icon" />
            </div>
            <img className="product-img" src={product.img} alt={product.title} />
            <p className="bold spaced">{product.title}</p>
            <p className="p-price">${product.price}</p>
            <button 
              className="btn filled-black small"
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation();
                const isInCart = cartItems.some(item => item.id === product.id);
                if (!isInCart) {
                  addToCart(product);
                }
                navigate('/products/cart');
                }
              }
            >
              Buy Now
            </button>
          </div>
        </Link>
      ))}
    </section>
  );
}
export default Products;
