import { createBrowserRouter } from "react-router";
import Home from "../Homepage/Home";
import Root from "./Root";
export const router = createBrowserRouter([
  {
    path: "/",

    Component: Root,
    children: [{ path: "/", index: true, Component: Home }],
  },
  //   {
  //     path: "/",
  //     Component: Authlayout,
  //     children: [
  //       { path: "/login", Component: Login },
  //       { path: "/signup", Component: SignUp },
  //     ],
  //   },
  //   {
  //     path: "/dashboard",
  //     element: (
  //       <PrivateRoute>
  //         <Dashboardlayout></Dashboardlayout>
  //       </PrivateRoute>
  //     ),
  //     children: [
  //       { path: "mypercel", Component: MypercelPage },
  //       { path: "payment/:id", Component: Payment },
  //       { path: "paymenthistory", Component: MyPaymentHistory },
  //     ],
  //   },
]);
