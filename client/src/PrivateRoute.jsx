import { Navigate } from 'react-router-dom';
import { useAuth } from './provider/auth';
export const PrivateRoute = ({ children }) => {
  const { authUser, isLoading } = useAuth();

  if (isLoading) return <p>Проверка авторизации...</p>;
  if (!authUser) return <Navigate to='/login' replace />;

  return children;
};
