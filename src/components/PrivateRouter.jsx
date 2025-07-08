import React from "react";
// import UseAuth from "../authlayout/useauth/UseAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
