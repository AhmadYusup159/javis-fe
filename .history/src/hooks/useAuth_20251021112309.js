import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/dashboard');
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { isAuthenticated, loading, user, checkAuth };
};
