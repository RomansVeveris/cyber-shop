import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBlock from '../utils/animation';

import '../styles/HomeBody.css';
import '../styles/global.css';

export function HomeBody() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/products');
  }

  return (
    <div className="home-body">
        <section className="shop-now">
            <div className="shop-now-text">
                <h3 className="white dim">Pro.Beyond.</h3>
                <AnimatedBlock>
                  <h1 className="white">IPhone 15 <strong>Pro</strong></h1>
                </AnimatedBlock>
                <p className="grey">Created to change everything for the better. For everyone</p>
                <button className="btn transparent-white" onClick={handleClick}>Shop Now</button>
            </div>
            <AnimatedBlock y={120} duration={1} delay={0.3}>
              <img src={require('../assets/images/iphone_image.png')}
              alt="Product"
              className="shop-now-image" />
            </AnimatedBlock>
        </section>
    </div>
  );
}

export default HomeBody;
