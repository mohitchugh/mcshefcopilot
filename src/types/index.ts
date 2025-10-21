// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'chef' | 'customer';
}

// Meal types
export interface Meal {
  id: string;
  chefId: string;
  chefName: string;
  title: string;
  description: string;
  quantity: number;
  containerSize: string;
  price: number;
  imageUrl?: string;
  availableDate: string;
  createdAt: string;
}

export interface MealFormData {
  title: string;
  description: string;
  quantity: number;
  containerSize: string;
  price: number;
  imageUrl?: string;
  availableDate: string;
}

// Order types
export interface Order {
  id: string;
  mealId: string;
  customerId: string;
  customerName: string;
  quantity: number;
  totalPrice: number;
  platformFee: number; // 40%
  chefRevenue: number; // 60%
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: string;
}
