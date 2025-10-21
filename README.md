# McShef.com - Home Chef Marketplace

McShef.com is a Single Page Application (SPA) that connects talented home chefs with food lovers in their community. The platform allows chefs to offer homemade meals while customers can browse and order delicious food from local chefs.

## Features

### For Chefs (60% revenue share)
- Create and manage meal listings
- Specify meal details: title, description, quantity, container size, and price
- Upload optional meal photos
- Set availability dates
- Track earnings (60% of meal price)

### For Customers
- Browse available meals from local chefs
- Search and filter meals by date
- View detailed meal information
- Place orders with transparent pricing
- See revenue split (40% platform fee for delivery and operations)

### Platform Features
- Auth0 authentication integration
- Dual portal system (Chef Portal & Customer Portal)
- Role-based access control
- Responsive design
- Centralized pickup and delivery service

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Authentication**: Auth0 (OAuth 2.0 / OIDC)
- **Routing**: React Router v7
- **Styling**: CSS3 with responsive design
- **State Management**: React Context API
- **Data Storage**: LocalStorage (for demo purposes)

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Auth0 account (for authentication)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mohitchugh/mcshefcopilot.git
cd mcshefcopilot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Auth0 Authentication

1. Create a free Auth0 account at https://auth0.com
2. Create a new Single Page Application in your Auth0 dashboard
3. Note your Auth0 domain and Client ID
4. Add `http://localhost:3000/login/callback` to the Allowed Callback URLs
5. Add `http://localhost:3000` to the Allowed Logout URLs
6. Add `http://localhost:3000` to the Allowed Web Origins

### 4. Set up environment variables

Create a `.env` file in the root directory:

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your_client_id_here
REACT_APP_AUTH0_AUDIENCE=https://your-api-audience (optional)
```

Replace `your-auth0-domain` and `your_client_id_here` with your actual Auth0 credentials.

### 5. Run the application

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## Application Structure

```
src/
├── components/
│   ├── chef/              # Chef portal components
│   │   ├── MealForm.tsx   # Meal creation/editing form
│   │   └── MealList.tsx   # Chef's meal management list
│   ├── user/              # Customer portal components
│   │   └── MealCard.tsx   # Meal display card
│   └── shared/            # Shared components
│       ├── Layout.tsx     # Main layout wrapper
│       ├── Navigation.tsx # Navigation bar
│       ├── LoginCallback.tsx # Auth0 callback handler
│       └── SecureRoute.tsx   # Protected route wrapper
├── context/
│   └── AuthContext.tsx    # Authentication context
├── pages/
│   ├── Home.tsx          # Landing page
│   ├── ChefPortal.tsx    # Chef dashboard
│   └── Meals.tsx         # Customer meal browsing
├── types/
│   └── index.ts          # TypeScript type definitions
├── config/
│   └── auth0.ts          # Auth0 configuration
└── App.tsx               # Main app component with routing
```

## Usage Guide

### For Chefs

1. Click "Chef Portal" on the home page
2. Login with your Auth0 credentials
3. Click "Add New Meal" to list a new dish
4. Fill in meal details:
   - Title (e.g., "Homemade Lasagna")
   - Description
   - Quantity available
   - Price (you receive 60%)
   - Container size
   - Available date
   - Optional photo URL
5. Manage your meals: edit or delete existing listings

### For Customers

1. Click "Browse Meals" on the home page
2. Login with your Auth0 credentials
3. Browse available meals
4. Use search to find specific meals or chefs
5. Filter by date to see meals available on specific days
6. Click "Order Now" to place an order
7. Review the order summary showing:
   - Total price
   - Platform fee (40%)
   - Chef's earnings (60%)

## Revenue Model

- **Platform Fee**: 40% of each transaction
  - Covers centralized pickup and delivery
  - Platform operations and maintenance
- **Chef Revenue**: 60% of meal price
  - Direct earnings for the chef
  - Paid for food preparation

## Development Notes

### Data Storage
Currently using localStorage for demo purposes. For production, implement:
- Backend API (Node.js/Express, Django, etc.)
- Database (PostgreSQL, MongoDB, etc.)
- Image hosting service (AWS S3, Cloudinary)
- Payment processing (Stripe, PayPal)

### Authentication
Auth0 integration provides:
- Secure OAuth 2.0 authentication
- User profile management
- Role-based access control
- Token management

## Future Enhancements

- Real backend API integration
- Payment processing
- Order tracking and history
- Chef ratings and reviews
- Real-time notifications
- Advanced search and filtering
- Multi-image upload
- Chef profile pages
- Customer order history
- Admin dashboard

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues and questions, please open an issue on GitHub.
