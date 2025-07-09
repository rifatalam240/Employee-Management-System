import { Navigate } from "react-router";
import Loading_spinner from "../Pages/LoadingPage";
import UseAuth from "../context/UseAuth";
import useUserRole from "../coustomHook/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [role, isLoading] = useUserRole();

  if (loading || isLoading) return <Loading_spinner></Loading_spinner>;

  if (user && role === "admin") return children;

  return <Navigate to="/" />;
};

export default AdminRoute;
