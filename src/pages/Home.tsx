import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home: React.FC = () => {
  const { isAuthenticated, login, setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleChefPortal = () => {
    if (isAuthenticated) {
      setUserRole('chef');
      navigate('/chef');
    } else {
      setUserRole('chef');
      login();
    }
  };

  const handleCustomerPortal = () => {
    if (isAuthenticated) {
      setUserRole('customer');
      navigate('/meals');
    } else {
      setUserRole('customer');
      login();
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to McShef.com</h1>
        <p className="hero-subtitle">
          Connecting talented home chefs with food lovers in your community
        </p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h2>🍳 For Chefs</h2>
          <p>Share your culinary creations from your home kitchen</p>
          <ul>
            <li>Set your own menu and prices</li>
            <li>Earn 60% of revenue</li>
            <li>We handle pickup and delivery</li>
            <li>Flexible scheduling</li>
          </ul>
          <button onClick={handleChefPortal} className="feature-button">
            Chef Portal
          </button>
        </div>

        <div className="feature-card">
          <h2>🍽️ For Food Lovers</h2>
          <p>Discover authentic homemade meals from local chefs</p>
          <ul>
            <li>Fresh, homemade meals daily</li>
            <li>Support local home chefs</li>
            <li>Convenient delivery service</li>
            <li>Variety of cuisines</li>
          </ul>
          <button onClick={handleCustomerPortal} className="feature-button">
            Browse Meals
          </button>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse or List</h3>
            <p>Customers browse meals, chefs list their offerings</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Order or Prepare</h3>
            <p>Customers order, chefs prepare delicious meals</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Pickup & Delivery</h3>
            <p>We centrally pickup and deliver to customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
