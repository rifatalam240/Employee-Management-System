import { NavLink } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaTimes } from "react-icons/fa";
import UseAuth from "../context/UseAuth";

const Navbar = () => {
  const { user, signout } = UseAuth();
  const handlesignout = () => {
    signout();
  };
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy user data (Firebase user বসাবে এখানে)
  // const user = null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-[#063C4C]">
          WorkFlowPro
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-medium text-[#063C4C]">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/contact-us">Contact</NavLink>

          {!user ? (
            <div className="space-x-2">
              <Button className="bg-[#063C4C] hover:bg-[#0E5D6A] text-white">
                <NavLink to="/login">Login</NavLink>
              </Button>
              <Button className="bg-[#063C4C] hover:bg-[#0E5D6A] text-white">
                <NavLink to="/register">Register</NavLink>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-9 h-9 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handlesignout}>
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
            className="text-[#063C4C]"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 space-y-3 bg-white text-[#063C4C] font-medium">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/contact-us" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <div className="flex flex-col gap-y-2">
              {" "}
              <NavLink
                to="/login"
                className="inline-block bg-[#063C4C] text-white px-4 w-full py-2 rounded-2xl"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>{" "}
              <NavLink
                to="/register"
                className="inline-block bg-[#063C4C] text-white px-4 w-full py-2 rounded-2xl"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img src={user.photoURL} className="w-8 h-8 rounded-full" />
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
