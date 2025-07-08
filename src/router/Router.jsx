import { createBrowserRouter } from "react-router";
import Home from "../Homepage/Home";
import Root from "./Root";
import Login from "../authlayout/Login";
import Register from "../authlayout/Register";
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
 
]);
