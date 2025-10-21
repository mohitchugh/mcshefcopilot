import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/shared/Layout';
import Home from './pages/Home';
import ChefPortal from './pages/ChefPortal';
import Meals from './pages/Meals';
import LoginCallback from './components/shared/LoginCallback';
import SecureRoute from './components/shared/SecureRoute';
import { auth0Config } from './config/auth0';
import './App.css';

function App() {
  return (
    <Router>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        authorizationParams={auth0Config.authorizationParams}
        cacheLocation={auth0Config.cacheLocation}
      >
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/callback" element={<LoginCallback />} />
              <Route
                path="/chef"
                element={
                  <SecureRoute>
                    <ChefPortal />
                  </SecureRoute>
                }
              />
              <Route
                path="/meals"
                element={
                  <SecureRoute>
                    <Meals />
                  </SecureRoute>
                }
              />
            </Routes>
          </Layout>
        </AuthProvider>
      </Auth0Provider>
    </Router>
  );
}

export default App;
