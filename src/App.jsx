import React, { useState } from 'react';
import './App.css';

// Cart Icon Component
const CartIcon = ({ cartCount, onClick }) => (
  <div className="cart-icon" onClick={onClick}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" />
      <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" />
      <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" />
    </svg>
    <span className="cart-count">{cartCount}</span>
  </div>
);

// Header Component
const Header = ({ cartCount, onCartClick }) => (
  <header className="site-header">
    <h1 className="logo">BEJAMAL.</h1>
    <CartIcon cartCount={cartCount} onClick={onCartClick} />
  </header>
);

// Featured Product Component
const FeaturedProduct = ({ onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return;

    setIsAdding(true);
    onAddToCart({
      id: 'samurai-king',
      name: 'Samurai King Resting'
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <section className="featured-product">
      <div className="product-header">
        <h2>Samurai King Resting</h2>
        <button
          className={`add-to-cart-btn primary ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'ADDED!' : 'ADD TO CART'}
        </button>
      </div>

      <div className="product-content">
        <img
          src="./Images/Dog.png"
          alt="Samurai King Resting"
          className="featured-image"
        />

        <div className="product-info-section">
          <div className="product-details">
            <h3>About the Samurai King Resting</h3>

            <p className="product-description">
              So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter 
              likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts 
              for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, 
              a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder
              text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.
            </p>
          </div>

          <div className="product-sidebar">
            <div className="related-products">
              <h4>People also buy</h4>
              <div className="related-items">
                <div className="related-item">
                  <img src = "./Images/2.png" alt="Related item" />
                </div>
                <div className="related-item">
                  <img src="./Images/3.png" alt="Related item" />
                </div>
                <div className="related-item">
                  <img src="./Images/4.png" alt="Related item" />
                </div>
              </div>

              <div className="details-section">
                <h5>Details</h5>
                <p>
                  Size: 1020 x 1020 pixel<br />
                  Size: 15 mb
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Photo Card Component
const PhotoCard = ({ photo, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);
    onAddToCart(photo);

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="photo-item" data-category={photo.category} data-price={photo.price}>
      <div className="photo-card">
        <img src={photo.image} alt={photo.name} />
        <button
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'ADDED!' : 'ADD TO CART'}
        </button>
        <div className="photo-info">
          <h4>{photo.name}</h4>
          <p className="photo-price">${photo.price}</p>
        </div>
      </div>
    </div>
  );
};

// Filter Component
const Filter = ({ title, options, selectedValues, onChange, type }) => (
  <div className="filter-group">
    <h3>{title}</h3>
    <div className={type === 'price' ? 'price-filters' : 'filter-options'}>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            name={type}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={(e) => onChange(type, option.value, e.target.checked)}
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    {[1, 2, 3].map((page) => (
      <span
        key={page}
        className={`page-number ${currentPage === page ? 'active' : ''}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </span>
    ))}
    <span
      className="page-next"
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
    >
      →
    </span>
  </div>
);

// Main App Component
const App = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [filters, setFilters] = useState({
    category: ['pro', 'landscape'],
    price: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Price: Low to High');

  // Photo data
  const allPhotos = [
    {
      id: 'Painting',
      name: 'Painting',
      price: 63.69,
      category: 'landscape',
      image: "./Images/2.png"
    },
    {
      id: 'flowers',
      name: 'flowers',
      price: 3.69,
      category: 'flowers',
      image: "./Images/3.png"
    },
    {
      id: 'egg-balloon-1',
      name: 'Egg Balloon',
      price: 93.69,
      category: 'food',
      image: "./Images/4.png"
    },
    {
      id: 'flowers1',
      name: 'flowers',
      price: 3.69,
      category: 'flowers',
      image: "./Images/3.png"
    },
    {
      id: 'architecture-1',
      name: 'Architecture',
      price: 101.00,
      category: 'pro',
      image: "./Images/3.png"
    },
    {
      id: 'egg-balloon-2',
      name: 'Egg Balloon2',
      price: 93.69,
      category: 'food',
      image: "./Images/4.png"
    }
  ];

  // Filter options
  const categoryOptions = [
    { value: 'people', label: 'People' },
    { value: 'premium', label: 'Premium' },
    { value: 'pets', label: 'Pets' },
    { value: 'food', label: 'Food' },
    { value: 'landmarks', label: 'Landmarks' },
    { value: 'cities', label: 'Cities' },
    { value: 'nature', label: 'Nature' }
  ];

  const priceOptions = [
    { value: 'under20', label: 'Under than $20' },
    { value: '20-100', label: '$20 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: 'over200', label: 'More than $200' }
  ];

  // Add to cart handler
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setCartCount(cartCount + 1);
  };

  // Cart click handler
  const handleCartClick = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const cartSummary = cart.map(item =>
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Cart Contents:\n\n${cartSummary}\n\nTotal: $${total.toFixed(2)}`);
  };

  // Filter handler
  const handleFilterChange = (type, value, isChecked) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: isChecked
        ? [...prevFilters[type], value]
        : prevFilters[type].filter(item => item !== value)
    }));
  };

  // Filter photos based on selected filters
  const getFilteredPhotos = () => {
    return allPhotos.filter(photo => {
      // Category filter
      const categoryMatch = filters.category.length === 0 || filters.category.includes(photo.category);

      // Price filter
      let priceMatch = true;
      if (filters.price.length > 0) {
        priceMatch = filters.price.some(priceRange => {
          switch (priceRange) {
            case 'under20':
              return photo.price < 50;
            case '20-100':
              return photo.price >= 50 && photo.price <= 100;
            case '100-200':
              return photo.price > 100 && photo.price <= 250;
            case 'over200':
              return photo.price > 250;
            default:
              return true;
          }
        });
      }

      return categoryMatch && priceMatch;
    });
  };

  // Sort photos
  const getSortedPhotos = (photos) => {
    return [...photos].sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Name A-Z':
          return a.name.localeCompare(b.name);
        case 'Name Z-A':
          return b.name.localeCompare(a.name);
        case 'Newest First':
          return Math.random() - 0.5;
        default:
          return a.price - b.price;
      }
    });
  };

  const filteredPhotos = getFilteredPhotos();
  const sortedPhotos = getSortedPhotos(filteredPhotos);

  return (
    <div className="window-container">
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

      <FeaturedProduct onAddToCart={handleAddToCart} />

      <section className="photography-section">
        <div className="section-header">
          <h2>Photography <span className="section-subtitle">/ Premium Photos</span></h2>
          <div className="section-controls">
            <span className="results-count">{filteredPhotos.length} items</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="gallery-layout">
          <aside className="filter-sidebar">
            <Filter
              title="Category"
              options={categoryOptions}
              selectedValues={filters.category}
              onChange={handleFilterChange}
              type="category"
            />
            <Filter
              title="Price range"
              options={priceOptions}
              selectedValues={filters.price}
              onChange={handleFilterChange}
              type="price"
            />
          </aside>

          <main className="photo-grid-container">
            <div className="photo-grid">
              {sortedPhotos.map(photo => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={3}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </section>
    </div>
  );
};

export default App;