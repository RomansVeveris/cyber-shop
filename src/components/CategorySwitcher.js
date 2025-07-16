
import '../styles/CategorySwitcher.css';

export function CategorySwitcher() {
  return (
    <section className="offers">
      <div className="offers-container">
        <div className="offer-item first-item">
          <h5>New Arrival</h5>
        </div>
        <div className="offer-item">
          <h5>Bestseller</h5>
        </div>
        <div className="offer-item">
          <h5>Featured Products</h5>
        </div>
      </div>
    </section>
  );
}

export default CategorySwitcher;
