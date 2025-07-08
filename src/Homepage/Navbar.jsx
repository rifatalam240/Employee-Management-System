import { Link } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Dummy user data (Firebase user বসাবে এখানে)
  const user = null;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#063C4C]">
          WorkFlowPro
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 font-medium text-[#063C4C]">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact-us">Contact</Link>

          {!user ? (
            <Button className="bg-[#063C4C] hover:bg-[#0E5D6A] text-white">
              <Link to="/login">Login</Link>
            </Button>
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
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#063C4C]">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 space-y-3 bg-white text-[#063C4C] font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact</Link>

          {!user ? (
            <Link
              to="/login"
              className="inline-block bg-[#063C4C] text-white px-4 py-2 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <img src={user.photoURL} className="w-8 h-8 rounded-full" />
              <button className="text-red-500 font-semibold">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
