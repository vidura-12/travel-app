import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/admin/login" />}
    />
  );
};

export default PrivateRoute;
