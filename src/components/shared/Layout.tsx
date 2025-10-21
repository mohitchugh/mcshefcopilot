import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2025 McShef.com - Connecting home chefs with hungry customers</p>
        <p className="footer-note">Platform takes 40% revenue share for delivery and operations</p>
      </footer>
    </div>
  );
};

export default Layout;
