import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import './LoginCallback.css';

const LoginCallback: React.FC = () => {
  const { isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) {
      // Redirect to home page after successful authentication
      navigate('/');
    }
  }, [isLoading, error, navigate]);

  if (error) {
    return (
      <div className="login-callback">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="login-callback">
      <div className="loading-spinner"></div>
      <p>Completing login...</p>
    </div>
  );
};

export default LoginCallback;
