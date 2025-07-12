import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Homepage/Home";
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
import WorkSheet from "../employeepages/WorkSheet";
import PaymentHistory from "../employeepages/PaymentHistory";
import HRPayment from "../HrPagees/HRPayment";
import EmployeeList from "../HrPagees/EmployeeList ";
import EmployeeDetails from "../HrPagees/EmployeeDetails ";
import Progress from "../HrPagees/Progress ";
import AllEmployeeList from "../adminpages/AllEmployeeList";
import Payroll from "../adminpages/Payroll";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
      // ✅ Admin Routes
      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          { index: true, element: <AdminDashboard /> },
          {
            path: "allemployeelist",
            element: <AllEmployeeList></AllEmployeeList>,
          },
          { path: "payroll", element: <Payroll></Payroll> },
        ],
      },

      // ✅ HR Routes
      {
        path: "hr",
        element: <HRRoute />,
        children: [
          { index: true, element: <HRDashboard /> },
          { path: "paysalary", element: <HRPayment /> },
          { path: "employeelist", element: <EmployeeList /> },

          {
            path: "details/:email",
            element: <EmployeeDetails />,
          },
          { path: "progress", element: <Progress /> },
        ],
      },

      // ✅ Employee Routes
      {
        path: "employee",
        element: <EmployeeRoute />,
        children: [
          { index: true, element: <EmployeDashboard /> },
          { path: "work-sheet", element: <WorkSheet /> },
          { path: "payment-history", element: <PaymentHistory /> },
        ],
      },
    ],
  },
]);
