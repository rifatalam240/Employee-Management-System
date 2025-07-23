import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Homepage/Navbar";
import Footer from "../Homepage/Footer";

const Root = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 font-urbanist">
        {" "}
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;
