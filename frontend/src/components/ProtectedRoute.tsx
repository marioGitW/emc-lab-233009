import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext.tsx';
import UnauthorizedPage from '../ui/pages/UnauthorizedPage/UnauthorizedPage.tsx';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = user?.role || '';
    const hasRequiredRole = requiredRoles.some(role =>
      userRole === role ||
      userRole === `ROLE_${role}` ||
      userRole.toLowerCase() === role.toLowerCase()
    );

    if (!hasRequiredRole) {
      return <UnauthorizedPage />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;


