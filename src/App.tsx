import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/shared/Layout';
import Home from './pages/Home';
import ChefPortal from './pages/ChefPortal';
import Meals from './pages/Meals';
import LoginCallback from './components/shared/LoginCallback';
import SecureRoute from './components/shared/SecureRoute';
import { oktaConfig } from './config/okta';
import './App.css';

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    window.location.replace(
      toRelativeUrl(originalUri || '/', window.location.origin)
    );
  };

  return (
    <Router>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
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
      </Security>
    </Router>
  );
}

export default App;
