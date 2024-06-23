import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import config from '../config/config.json';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.server}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(responseData.error.message);
        return;
      }

      localStorage.setItem('data', JSON.stringify(responseData.data));
      localStorage.setItem('token', JSON.stringify(responseData.token));

      dispatch({
        type: 'LOGIN',
        payload: {
          user: responseData.data,
          token: responseData.token,
        },
      });

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      setError('Server is not responding. Please try again after some time.');
      return false;
    }
  };

  return { login, error, isLoading };
};
