import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const getMe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Для cookies
      });
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
      await fetch(`${API_URL}/api/v1/auth/logout`, {
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
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setAuthUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (payload) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setAuthUser(data);
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
