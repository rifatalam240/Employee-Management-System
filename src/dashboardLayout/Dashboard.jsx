import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import UseAuth from "../context/UseAuth";
import useUserRole from "../coustomHook/useUserRole";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = location.pathname.split("/")[2] || "Dashboard";
  const { user } = UseAuth();

  const { role, isLoading } = useUserRole(); // ✅ role fetch

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-[#063c4c] text-white w-64 p-4 space-y-4 fixed h-full z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Company</h2>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-2">
          {role === "admin" && (
            <Link
              to="/dashboard/admin"
              className="flex items-center gap-2 p-2 rounded hover:bg-[#052e3a]"
            >
              <MdDashboard />
              Admin Dashboard
            </Link>
          )}
          {role === "hr" && (
            <Link
              to="/dashboard/hr"
              className="flex items-center gap-2 p-2 rounded hover:bg-[#052e3a]"
            >
              <MdDashboard />
              HR Dashboard
            </Link>
          )}
          {role === "employee" && (
            <Link
              to="/dashboard/employee"
              className="flex items-center gap-2 p-2 rounded hover:bg-[#052e3a]"
            >
              <MdDashboard />
              Employee Dashboard
            </Link>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full">
        {/* Topbar */}
        <div className="flex justify-between items-center bg-white shadow px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              className="text-2xl md:hidden"
              onClick={() => setOpen(!open)}
            >
              <FaBars />
            </button>
            <h1 className="text-xl font-semibold capitalize">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{user.displayName}</span>
              </>
            )}
          </div>
        </div>

        {/* Outlet */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
