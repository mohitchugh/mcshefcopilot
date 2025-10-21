// Okta configuration
// In production, these should be environment variables
export const oktaConfig = {
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID || '{clientId}',
  issuer: process.env.REACT_APP_OKTA_ISSUER || 'https://{yourOktaDomain}/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: process.env.NODE_ENV === 'development',
};
