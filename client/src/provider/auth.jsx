import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('authUser CTX', authUser);
  const API_URL = '147.45.237.165';

  const getMe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Для cookies
      });
      if (!response.ok) {
        throw new Error('error');
      }
      const data = await response.json();
      setAuthUser(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await fetch(`/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setAuthUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (payload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setAuthUser(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (payload) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setAuthUser(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext value={{ authUser, logout, login, register, isLoading }}>
      {isLoading ? <h1>Loading</h1> : children}
    </AuthContext>
  );
};
