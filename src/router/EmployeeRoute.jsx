import React from "react";
import { Navigate } from "react-router";
import useUserRole from "../coustomHook/useUserRole";
import UseAuth from "../context/UseAuth";
import Loading_spinner from "../Pages/LoadingPage";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [role, isRoleLoading] = useUserRole();

  if (loading || isRoleLoading) {
    return <Loading_spinner></Loading_spinner>;
  }

  if (user && role === "employee") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default EmployeeRoute;
