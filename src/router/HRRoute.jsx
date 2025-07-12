import { Navigate, Outlet } from "react-router";
import Loading_spinner from "../Pages/LoadingPage";
import UseAuth from "../context/UseAuth";
import useUserRole from "../coustomHook/useUserRole";

const HRRoute = () => {
  const { user, loading } = UseAuth();
  const { role, loading: roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading_spinner />;

  if (user && role && role.toString().toLowerCase() === "hr") {
    // এখানে Outlet দিয়ে চাইল্ড রাউটগুলো রেন্ডার করবে
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default HRRoute;
