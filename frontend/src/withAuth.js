import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        try {
          const response = await axios.get('http://localhost:8081/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.role === 'location_manager') {
            setIsAuthenticated(true);
          } 
          else if(response.data.role === 'vehicle_manager'){
            setIsAuthenticated(true);
          } 
          else {
            navigate('/admin/login');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          navigate('/admin/login');
        }
      };

      checkAuth();
    }, [navigate]);

    if (!isAuthenticated) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
