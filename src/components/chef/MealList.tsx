import React from 'react';
import { Meal } from '../../types';
import './MealList.css';

interface MealListProps {
  meals: Meal[];
  onEdit?: (meal: Meal) => void;
  onDelete?: (mealId: string) => void;
}

const MealList: React.FC<MealListProps> = ({ meals, onEdit, onDelete }) => {
  if (meals.length === 0) {
    return (
      <div className="empty-state">
        <p>No meals listed yet. Add your first meal to get started!</p>
      </div>
    );
  }

  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <div key={meal.id} className="meal-card">
          {meal.imageUrl && (
            <img src={meal.imageUrl} alt={meal.title} className="meal-image" />
          )}
          <div className="meal-content">
            <h3>{meal.title}</h3>
            <p className="meal-description">{meal.description}</p>
            <div className="meal-details">
              <span><strong>Price:</strong> ${meal.price.toFixed(2)}</span>
              <span><strong>Your earnings:</strong> ${(meal.price * 0.6).toFixed(2)}</span>
              <span><strong>Quantity:</strong> {meal.quantity}</span>
              <span><strong>Container:</strong> {meal.containerSize}</span>
              <span><strong>Date:</strong> {new Date(meal.availableDate).toLocaleDateString()}</span>
            </div>
            {(onEdit || onDelete) && (
              <div className="meal-actions">
                {onEdit && (
                  <button onClick={() => onEdit(meal)} className="btn-edit">
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(meal.id)} className="btn-delete">
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealList;
