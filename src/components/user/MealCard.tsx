import React from 'react';
import { Meal } from '../../types';
import './MealCard.css';

interface MealCardProps {
  meal: Meal;
  onOrder?: (meal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onOrder }) => {
  return (
    <div className="user-meal-card">
      {meal.imageUrl ? (
        <img src={meal.imageUrl} alt={meal.title} className="user-meal-image" />
      ) : (
        <div className="user-meal-placeholder">
          <span>🍽️</span>
        </div>
      )}
      <div className="user-meal-content">
        <h3>{meal.title}</h3>
        <p className="chef-name">by Chef {meal.chefName}</p>
        <p className="user-meal-description">{meal.description}</p>
        <div className="user-meal-info">
          <div className="info-item">
            <span className="label">Container:</span>
            <span className="value">{meal.containerSize}</span>
          </div>
          <div className="info-item">
            <span className="label">Available:</span>
            <span className="value">{new Date(meal.availableDate).toLocaleDateString()}</span>
          </div>
          <div className="info-item">
            <span className="label">Quantity Left:</span>
            <span className="value">{meal.quantity}</span>
          </div>
        </div>
        <div className="user-meal-footer">
          <span className="price">${meal.price.toFixed(2)}</span>
          {onOrder && meal.quantity > 0 && (
            <button onClick={() => onOrder(meal)} className="btn-order">
              Order Now
            </button>
          )}
          {meal.quantity === 0 && (
            <span className="sold-out">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealCard;
