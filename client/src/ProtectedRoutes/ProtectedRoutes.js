import { Route, Navigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem('das');

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 54000);

  useTimer({
    expiryTimestamp, onExpire: () => {
      localStorage.removeItem('das');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      <Navigate to="/" replace />
    }
  });

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace /> // Redirect to login if not authenticated
  );
};

export default ProtectedRoutes;
