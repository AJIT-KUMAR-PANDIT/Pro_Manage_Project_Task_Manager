import { Route, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
//   const isAuthenticated = checkAuthentication(); 
let isAuthenticated = true;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace /> // Redirect to login if not authenticated
  );
};

export default ProtectedRoutes;
