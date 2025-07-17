import { Navigate, Outlet } from "react-router";
import Loading_spinner from "../Pages/LoadingPage";
import UseAuth from "../context/UseAuth";
import useUserRole from "../coustomHook/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading_spinner />;

  if (user && role === "admin") return <Outlet />;

  return <Navigate to="/" />;
};

export default AdminRoute;
