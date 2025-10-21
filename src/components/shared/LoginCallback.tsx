import React from 'react';
import { LoginCallback as OktaLoginCallback } from '@okta/okta-react';
import './LoginCallback.css';

const LoginCallback: React.FC = () => {
  return (
    <div className="login-callback">
      <div className="loading-spinner"></div>
      <p>Completing login...</p>
      <OktaLoginCallback />
    </div>
  );
};

export default LoginCallback;
