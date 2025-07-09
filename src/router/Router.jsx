import { createBrowserRouter } from "react-router";
import Home from "../Homepage/Home";
import Root from "./Root";
import Login from "../authlayout/Login";
import Register from "../authlayout/Register";
import PrivateRoute from "../components/PrivateRouter";
import DashboardLayout from "../dashboardLayout/Dashboard";
import AdminDashboard from "../dashboardLayout/AdminDashboard";
import HRDashboard from "../dashboardLayout/HRDashboard";
import EmployeDashboard from "../dashboardLayout/EmployeDashboard";
export const router = createBrowserRouter([
  {
    path: "/",

    Component: Root,
    children: [
      { path: "/", index: true, Component: Home },
      { path: "/login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "admin", Component: AdminDashboard },
      { path: "hr", Component: HRDashboard },
      { path: "employe", Component: EmployeDashboard },
    ],
  },
]);
