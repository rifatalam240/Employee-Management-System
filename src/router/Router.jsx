import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Homepage/Home";
import Login from "../authlayout/Login";
import Register from "../authlayout/Register";
import PrivateRoute from "../components/PrivateRouter";
import DashboardLayout from "../dashboardLayout/Dashboard";
import AdminDashboard from "../dashboardLayout/AdminDashboard";
import HRDashboard from "../dashboardLayout/HRDashboard";
import EmployeeDashboard from "../dashboardLayout/EmployeDashboard"; // spelling fix
import AdminRoute from "./AdminRoute";
import HRRoute from "./HRRoute";
import EmployeeRoute from "./EmployeeRoute";
import WorkSheet from "../employeepages/WorkSheet";
import PaymentHistory from "../employeepages/PaymentHistory";
import AllEmployeeList from "../adminpages/AllEmployeeList";
import Payroll from "../adminpages/Payroll";
import Payment from "../payment/Payment";
import ContactUs from "../Homepage/ContactUs";
import AdminMessages from "../adminpages/AdminMessages";
import EmployeeList from "../HrPagees/EmployeeList ";
import EmployeeDetails from "../HrPagees/EmployeeDetails ";
import Progress from "../HrPagees/Progress ";
import DashboardHome from "../dashboardLayout/DashboardHome";
// import Dashboard from "../adminpages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "contactus", element: <ContactUs /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      // Admin routes
      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "allemployeelist", element: <AllEmployeeList /> },
          { path: "adminmassage", element: <AdminMessages /> },
          { path: "payroll", element: <Payroll /> },
          // { path: "dash", element: <Dashboard></Dashboard> },
          { path: "payments/:id", element: <Payment /> },
        ],
      },

      // HR routes
      {
        path: "hr",
        element: <HRRoute />,
        children: [
          { index: true, element: <HRDashboard /> },
          { path: "employeelist", element: <EmployeeList /> },
          { path: "details/:email", element: <EmployeeDetails /> },
          { path: "progress", element: <Progress /> },
        ],
      },

      // Employee routes
      {
        path: "employee",
        element: <EmployeeRoute />,
        children: [
          { index: true, element: <EmployeeDashboard /> },
          { path: "work-sheet", element: <WorkSheet /> },
          { path: "payment-history", element: <PaymentHistory /> },
        ],
      },
    ],
  },
]);
