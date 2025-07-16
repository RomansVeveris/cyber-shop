import '../styles/Bestsellers.css';
import '../styles/global.css';
import headphones from '../assets/images/hero_headphones.png'; 
import appleVision from '../assets/images/apple_vision.png';
import playstation from '../assets/images/playstation.png';
import macbook from '../assets/images/macbook.png';
import { useNavigate } from 'react-router-dom';

export function Bestsellers() {
  const navigate = useNavigate();
  const handleClick = () => {
      navigate('/products');
  }  
  const catalogItems = [
    {
      id: 1,
      image: headphones,
      title: 'Apple AirPods Max',
      description: 'Computational audio. Listen, it\'s powerful',
      background: "#EDEDED",
      whiteTitle: false,
    },
    {
      id: 2,
      image: appleVision,
      title: 'Apple Vision Pro',
      description: 'An immersive way to experience entertainment',
      background: "#353535",
      whiteTitle: true,
    },
    {
      id: 3,
      image: playstation,
      title: 'PlayStation 5',
      description: 'Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.',
      background: "#FFFFFF",
      whiteTitle: false,
    },
    {
      id: 4,
      image: macbook,
      title: 'Macbook Pro',
      description: 'The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.',
      background: "#EDEDED",
      whiteTitle: false,
    },
  ];
  return (
    <section className="catalog">
        {catalogItems.map((item, index) => {
        const words = item.title.trim().split(' ');
        const lastWord = words.pop();
        const rest = words.join(' ');
        const isLast = index === catalogItems.length - 1;

        return (
          <div
          key={item.id}
          className={`catalog-item ${
              item.id === 1 ? 'airpods' :
              item.id === 2 ? 'vision' :
              item.id === 3 ? 'playstation' :
              item.id === 4 ? 'macbook' : ''
          }`}
          style={{
              backgroundColor: item.background,
              color: item.whiteTitle ? '#FFFFFF' : '#000000',
          }}
          >
            <img src={item.image} alt={item.title} className="catalog-image" />
            
            <div className="catalog-content">
                <h2 className="catalog-h2">
                {rest} <strong className="catalog-strong">{lastWord}</strong>
                </h2>
                <p className="grey">{item.description}</p>
                {isLast && (
                <button className="btn transparent-black wide" onClick={handleClick}>
                    Shop Now
                </button>
                )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
export default Bestsellers;
