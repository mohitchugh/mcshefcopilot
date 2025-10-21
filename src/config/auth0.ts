// Auth0 configuration
// In production, these should be environment variables
export const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || '{yourAuth0Domain}',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '{clientId}',
  authorizationParams: {
    redirect_uri: window.location.origin + '/login/callback',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    scope: 'openid profile email',
  },
  cacheLocation: 'localstorage' as const,
};
