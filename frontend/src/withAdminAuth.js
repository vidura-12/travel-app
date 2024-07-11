// src/components/withAdminAuth.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
              const token = localStorage.getItem('token');
              const response = await axios.get('http://localhost:8081/auth/checkAdmin', {
                headers: { Authorization: token },
              });
              if (response.data.isAdmin) {
                setIsAuthenticated(true);
              } else {
                navigate('/login');
              }
            } catch (error) {
              navigate('/login');
            }
          };
          

      checkAuth();
    }, [navigate]);

    if (!isAuthenticated) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
