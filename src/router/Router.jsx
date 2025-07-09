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
import AdminRoute from "./AdminRoute";
import HRRoute from "./HRRoute";
import EmployeeRoute from "./EmployeeRoute";
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
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard></AdminDashboard>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/hr",
        element: (
          <PrivateRoute>
            <HRRoute>
              <HRDashboard></HRDashboard>
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employee",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <EmployeDashboard></EmployeDashboard>
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
