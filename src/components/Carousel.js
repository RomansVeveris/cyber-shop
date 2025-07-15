import React, { useRef, useState } from 'react';
import '../styles/Carousel.css';
import '../styles/global.css';
import ipad from '../assets/images/carousel/ipad.png';
import galaxy from '../assets/images/carousel/galaxy.png';
import macbook from '../assets/images/carousel/macbook.png';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    title: 'iPad Pro',
    image: ipad,
    bg: '#F6F6F6',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
  },
  {
    title: 'Samsung Galaxy',
    image: galaxy,
    bg: '#EAEAEA',
    description: 'The Galaxy Tab S9 Ultra brings a vivid 14.6-inch display, S Pen precision, and desktop-level productivity on the go.',
  },
  {
    title: 'Macbook Pro',
    image: macbook,
    bg: '#DFDFDF',
    description: 'Adventure-ready with a rugged design, dual-frequency GPS, and the brightest display Apple has ever made.',
  },
  {
    title: 'Samsung Galaxy',
    image: galaxy,
    bg: '#EAEAEA',
    description: 'The Galaxy Tab S9 Ultra brings a vivid 14.6-inch display, S Pen precision, and desktop-level productivity on the go.',
  },
];

export function Carousel() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/products');
    }  


  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-container"
        ref={containerRef}
        onScroll={handleScroll}>
            {items.map((item, i) => (
            <div
                key={i}
                className="carousel-item"
                style={{ backgroundColor: item.bg }}
            >
                <img src={item.image} className={`carousel-img ${(item.image===galaxy) ? 'phone' : ''}`} alt={item.title} />
                <h4 className="carousel-title">{item.title}</h4>
                <p className="grey">{item.description}</p>
                <button className="btn transparent-black" onClick={handleClick}>Shop Now</button>
            </div>
            ))}

      </div>

    <div className="carousel-dots">
        {items.map((_, i) => (
        <div
            key={i}
            className={`dot ${i === activeIndex ? 'active' : ''}`}
        />
        ))}
    </div>


    </div>
  );
}
