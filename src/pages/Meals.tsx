import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MealCard from '../components/user/MealCard';
import { Meal } from '../types';
import './Meals.css';

const Meals: React.FC = () => {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const loadMeals = React.useCallback(() => {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      const allMeals: Meal[] = JSON.parse(storedMeals);
      // Filter out meals from current user if they're a chef
      const availableMeals = allMeals.filter(
        (meal) => meal.quantity > 0 && meal.chefId !== user?.id
      );
      setMeals(availableMeals);
    }
  }, [user?.id]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const handleOrder = (meal: Meal) => {
    // Create an order
    const order = {
      id: Date.now().toString(),
      mealId: meal.id,
      customerId: user?.id || '',
      customerName: user?.name || '',
      quantity: 1,
      totalPrice: meal.price,
      platformFee: meal.price * 0.4,
      chefRevenue: meal.price * 0.6,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save order
    const storedOrders = localStorage.getItem('orders');
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Update meal quantity
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      const allMeals: Meal[] = JSON.parse(storedMeals);
      const updatedMeals = allMeals.map((m) =>
        m.id === meal.id ? { ...m, quantity: m.quantity - 1 } : m
      );
      localStorage.setItem('meals', JSON.stringify(updatedMeals));
      loadMeals(); // Reload to update UI
    }

    alert(`Order placed successfully! \n\nTotal: $${meal.price.toFixed(2)}\nPlatform Fee (40%): $${order.platformFee.toFixed(2)}\nChef Receives (60%): $${order.chefRevenue.toFixed(2)}`);
  };

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      searchTerm === '' ||
      meal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.chefName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      filterDate === '' ||
      meal.availableDate === filterDate;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="meals-page">
      <div className="meals-header">
        <h1>Browse Meals</h1>
        <p>Discover delicious homemade meals from talented local chefs</p>
      </div>

      <div className="meals-filters">
        <input
          type="text"
          placeholder="Search meals, chefs, or cuisines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="date-filter"
          min={new Date().toISOString().split('T')[0]}
        />
        {(searchTerm || filterDate) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterDate('');
            }}
            className="clear-filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      {filteredMeals.length === 0 ? (
        <div className="no-meals">
          <p>No meals available at the moment. Check back later!</p>
        </div>
      ) : (
        <div className="meals-grid">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onOrder={handleOrder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
