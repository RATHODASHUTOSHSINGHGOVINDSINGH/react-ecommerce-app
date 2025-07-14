import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from './AuthContext';

 
const ProtectedRoute = ({ children }) => {
  // Get authentication status from context
  const { isLoggedIn } = useAuth();
  
  // Store current location to redirect back after login
  const location = useLocation();

  // Redirect to login if user is not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;