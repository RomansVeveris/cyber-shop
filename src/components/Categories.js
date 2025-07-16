import '../styles/Categories.css';
import { useNavigate } from 'react-router-dom';
import smartphones from '../assets/icons/Phone.svg';
import watches from '../assets/icons/Watch.svg';
import cameras from '../assets/icons/Camera.svg';
import headphones from '../assets/icons/Headphones.svg';
import computers from '../assets/icons/Computer.svg';
import gaming from '../assets/icons/Gaming.svg';
import leftArrow from '../assets/icons/arrow_left.svg';
import rightArrow from '../assets/icons/arrow_right.svg';
import AnimatedBlock from '../utils/animation';

const categoryData = [
  { icon: smartphones, label: 'Phones', value: "phone" },
  { icon: watches, label: 'Smart Watches', value: "watch" },
  { icon: cameras, label: 'Cameras', value: "camera" },
  { icon: headphones, label: 'Headphones', value: "headphones" },
  { icon: computers, label: 'Computers', value: "all" },
  { icon: gaming, label: 'Gaming', value: "all" },
];

export function Categories() {
  const navigate = useNavigate();
  return (
    <section className="categories">
      <div className="categories-header">
        <h3>Browse By Category</h3>
        <div className="arrow-buttons">
          <div className="categories-header arrow-buttons">
            <button className="btn empty">
                <img src={leftArrow} alt="Left Arrow" />
            </button>
            <button className="btn empty">
                <img src={rightArrow} alt="Right Arrow" />
            </button>
          </div>
        </div>
      </div>
      <div className="categories-list">
        {categoryData.map((category, index) => (
          <AnimatedBlock key={index}>
            <div
            className="category-item"
            key={index}
            onClick={() => navigate(`/products?filter=${category.value}`)}
            style={{ cursor: 'pointer' }}
            >
              <img src={category.icon} alt={category.label} />
              <p className="bold">{category.label}</p>
            </div>
          </AnimatedBlock>
        ))}
      </div>
    </section>
  );
}

export default Categories;
