// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = false;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
