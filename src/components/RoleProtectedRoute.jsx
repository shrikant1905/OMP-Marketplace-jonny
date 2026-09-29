import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RoleProtectedRoute = ({ allowedRoles = [], children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const currentRoleId = currentUser?.id || 'GUEST';

  if (!allowedRoles.includes(currentRoleId)) {
    const targetRole = allowedRoles[0] || 'DEALER_PRO';
    return (
      <Navigate
        to={`/login?unauthorized=true&role=${targetRole}&redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
