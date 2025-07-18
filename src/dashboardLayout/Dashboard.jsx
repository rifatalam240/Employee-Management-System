import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { Users2, CreditCard } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";
import { FaHome, FaUsers, FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";

import UseAuth from "../context/UseAuth";
import useUserRole from "../coustomHook/useUserRole";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = location.pathname.split("/")[2] || "Dashboard";
  const { user } = UseAuth();

  const { role, isLoading } = useUserRole();

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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700 text-green-300 font-semibold" : ""
            }`
          }
        >
          <FaHome className="text-lg" />
          Home
        </NavLink>

        <nav className="space-y-2">
          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <MdDashboard />
                Admin Dashboard
              </NavLink>

              <NavLink
                to="/dashboard/admin/allemployeelist"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <Users2 className="w-5 h-5" />
                All Employees
              </NavLink>

              <NavLink
                to="/dashboard/admin/payroll"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-yellow-400 font-semibold" : ""
                  }`
                }
              >
                <CreditCard className="w-5 h-5" />
                Payroll
              </NavLink>
              <NavLink
                to="/dashboard/admin/adminmassage"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <Users2 className="w-5 h-5" />
                Admin Massage
              </NavLink>
            </>
          )}

          {role === "hr" && (
            <>
              <NavLink
                to="/dashboard/hr"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaHome />
                Home
              </NavLink>

              <NavLink
                to="/dashboard/hr/employeelist"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaUsers />
                Employee List
              </NavLink>
              {/* 
              <NavLink
                to="/dashboard/hr/paysalary"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaMoneyCheckAlt />
                Pay Salary
              </NavLink> */}

              <NavLink
                to="/dashboard/hr/progress"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <FaChartBar />
                Progress
              </NavLink>
            </>
          )}

          {role === "employee" && (
            <>
              <NavLink
                to="/dashboard/employee"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                <MdDashboard />
                Employee Dashboard
              </NavLink>

              <NavLink
                to="/dashboard/employee/work-sheet"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                📋 Work Sheet
              </NavLink>

              <NavLink
                to="/dashboard/employee/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-blue-400 font-semibold" : ""
                  }`
                }
              >
                💰 Payment History
              </NavLink>
            </>
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
