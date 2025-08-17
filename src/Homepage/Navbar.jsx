import { NavLink } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaTimes, FaReact, FaMoon, FaSun } from "react-icons/fa";
import UseAuth from "../context/UseAuth";

// Flicker-proof theme init
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const Navbar = () => {
  const { user, signout } = UseAuth();
  const [theme, setTheme] = useState(savedTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const handlesignout = () => signout();

  const navLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md transition-colors ${
      isActive
        ? "bg-blue-500 text-white dark:bg-blue-600"
        : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-base-content">
          <FaReact size={32} className="text-blue-500" />
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            WorkFlowPro
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClasses}>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/contactus" className={navLinkClasses}>
            Contact
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            className="btn btn-ghost p-2 ml-2"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-700 text-xl" />
            )}
          </button>

          {/* Auth Buttons / User Dropdown */}
          {!user ? (
            <div className="flex gap-2">
              <Button variant="default">
                <NavLink to="/login">Login</NavLink>
              </Button>
              <Button variant="default">
                <NavLink to="/register">Register</NavLink>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={
                    user?.photoURL ||
                    "https://i.postimg.cc/15m3yGgF/admin.webp"
                  }
                  alt="User"
                  className="w-9 h-9 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                <DropdownMenuItem className="text-gray-900 dark:text-gray-200">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handlesignout}
                  className="text-red-500 hover:text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-900 dark:text-gray-200"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 space-y-2 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 transition-colors">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClasses}>
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className={navLinkClasses}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/contactus"
            onClick={() => setMenuOpen(false)}
            className={navLinkClasses}
          >
            Contact
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            className="btn btn-ghost p-2 mt-2"
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-700 text-xl" />
            )}
          </button>

          {!user ? (
            <div className="flex flex-col gap-y-2 mt-2">
              <NavLink
                to="/login"
                className="inline-block btn btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="inline-block btn btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <img
                src={user?.photoURL || "https://i.postimg.cc/15m3yGgF/admin.webp"}
                className="w-8 h-8 rounded-full"
                alt="User"
              />
              <button
                onClick={handlesignout}
                className="text-red-500 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
