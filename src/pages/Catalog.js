import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Products from '../components/Products';
import '../styles/Catalog.css';
import arrowDown from '../assets/icons/arrow_down.svg';
import AnimatedBlock from '../utils/animation';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';

  const [filter, setFilter] = useState(initialFilter);
  const [sort, setSort] = useState('az');

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  return (
    <>
      <div className="organizer-container">
        <div className="filter-group">
          <label htmlFor="product-filter">Filter: </label>
          <select
            id="product-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              backgroundImage: `url(${arrowDown})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.8rem center',
              backgroundSize: '24px 24px',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all">All</option>
            <option value="phone">Phones</option>
            <option value="camera">Cameras</option>
            <option value="watch">Watches</option>
            <option value="headphones">Headphones</option>
          </select>
        </div>

        <div className="sort-group">
          <label htmlFor="sort-by">Sort: </label>
          <select
            id="sort-by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              backgroundImage: `url(${arrowDown})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.8rem center',
              backgroundSize: '24px 24px',
              paddingRight: '2.5rem'
            }}
          >
            <option value="az">Title A-Z</option>
            <option value="za">Title Z-A</option>
            <option value="priceAsc">Price low-high</option>
            <option value="priceDesc">Price high-low</option>
          </select>
        </div>
      </div>
      <AnimatedBlock>
        <Products limit={null} filter={filter} sort={sort} />
      </AnimatedBlock>
    </>
  );
}
