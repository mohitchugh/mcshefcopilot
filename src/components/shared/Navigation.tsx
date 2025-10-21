import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

const Navigation: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          McShef.com
        </Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hello, {user?.name}</span>
              {user?.role === 'chef' ? (
                <Link to="/chef" className="nav-link">Chef Portal</Link>
              ) : (
                <Link to="/meals" className="nav-link">Browse Meals</Link>
              )}
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          ) : (
            <button onClick={login} className="nav-button">Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
