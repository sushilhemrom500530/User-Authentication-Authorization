import { useEffect, useState } from 'react';
import useApi from '../use-api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await useApi.get('/auth/me');
        setUser(res.data.user);
      } catch (err) {
        setError('Authentication failed. Please login again.');
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
