import React, { useState } from 'react';
import { MealFormData } from '../../types';
import './MealForm.css';

interface MealFormProps {
  onSubmit: (meal: MealFormData) => void;
  onCancel?: () => void;
  initialData?: MealFormData;
}

const MealForm: React.FC<MealFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<MealFormData>(
    initialData || {
      title: '',
      description: '',
      quantity: 1,
      containerSize: '',
      price: 0,
      imageUrl: '',
      availableDate: new Date().toISOString().split('T')[0],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <form className="meal-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Meal' : 'Add New Meal'}</h2>

      <div className="form-group">
        <label htmlFor="title">Meal Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Homemade Lasagna"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Describe your meal, ingredients, and any special notes..."
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Quantity Available *</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
          <small className="helper-text">You'll receive 60% (${(formData.price * 0.6).toFixed(2)})</small>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="containerSize">Container Size *</label>
        <select
          id="containerSize"
          name="containerSize"
          value={formData.containerSize}
          onChange={handleChange}
          required
        >
          <option value="">Select size</option>
          <option value="Small (16 oz)">Small (16 oz)</option>
          <option value="Medium (24 oz)">Medium (24 oz)</option>
          <option value="Large (32 oz)">Large (32 oz)</option>
          <option value="Family (64 oz)">Family (64 oz)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="availableDate">Available Date *</label>
        <input
          type="date"
          id="availableDate"
          name="availableDate"
          value={formData.availableDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL (Optional)</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        <small className="helper-text">Add a photo of your dish to attract more customers</small>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {initialData ? 'Update Meal' : 'Add Meal'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MealForm;
