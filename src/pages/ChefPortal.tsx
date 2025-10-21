import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MealForm from '../components/chef/MealForm';
import MealList from '../components/chef/MealList';
import { Meal, MealFormData } from '../types';
import './ChefPortal.css';

const ChefPortal: React.FC = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  // Load meals from localStorage on mount
  useEffect(() => {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      const allMeals = JSON.parse(storedMeals);
      // Filter meals by current chef
      const chefMeals = allMeals.filter((meal: Meal) => meal.chefId === user?.id);
      setMeals(chefMeals);
    }
  }, [user?.id]);

  const saveMealsToStorage = (updatedMeals: Meal[]) => {
    // Get all meals from storage
    const storedMeals = localStorage.getItem('meals');
    const allMeals: Meal[] = storedMeals ? JSON.parse(storedMeals) : [];
    
    // Remove current chef's meals and add updated ones
    const otherMeals = allMeals.filter((meal: Meal) => meal.chefId !== user?.id);
    const newAllMeals = [...otherMeals, ...updatedMeals];
    
    localStorage.setItem('meals', JSON.stringify(newAllMeals));
    setMeals(updatedMeals);
  };

  const handleAddMeal = (mealData: MealFormData) => {
    const newMeal: Meal = {
      ...mealData,
      id: Date.now().toString(),
      chefId: user?.id || '',
      chefName: user?.name || '',
      createdAt: new Date().toISOString(),
    };

    const updatedMeals = [...meals, newMeal];
    saveMealsToStorage(updatedMeals);
    setShowForm(false);
  };

  const handleUpdateMeal = (mealData: MealFormData) => {
    if (!editingMeal) return;

    const updatedMeal: Meal = {
      ...editingMeal,
      ...mealData,
    };

    const updatedMeals = meals.map((m) => (m.id === editingMeal.id ? updatedMeal : m));
    saveMealsToStorage(updatedMeals);
    setEditingMeal(null);
    setShowForm(false);
  };

  const handleEditMeal = (meal: Meal) => {
    setEditingMeal(meal);
    setShowForm(true);
  };

  const handleDeleteMeal = (mealId: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      const updatedMeals = meals.filter((m) => m.id !== mealId);
      saveMealsToStorage(updatedMeals);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMeal(null);
  };

  return (
    <div className="chef-portal">
      <div className="portal-header">
        <h1>Chef Portal</h1>
        <p>Welcome, {user?.name}! Manage your meal offerings here.</p>
      </div>

      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-add-meal">
          + Add New Meal
        </button>
      )}

      {showForm && (
        <MealForm
          onSubmit={editingMeal ? handleUpdateMeal : handleAddMeal}
          onCancel={handleCancelForm}
          initialData={
            editingMeal
              ? {
                  title: editingMeal.title,
                  description: editingMeal.description,
                  quantity: editingMeal.quantity,
                  containerSize: editingMeal.containerSize,
                  price: editingMeal.price,
                  imageUrl: editingMeal.imageUrl,
                  availableDate: editingMeal.availableDate,
                }
              : undefined
          }
        />
      )}

      {!showForm && (
        <>
          <h2 className="section-title">Your Meals</h2>
          <MealList meals={meals} onEdit={handleEditMeal} onDelete={handleDeleteMeal} />
        </>
      )}
    </div>
  );
};

export default ChefPortal;
