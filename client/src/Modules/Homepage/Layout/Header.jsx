import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Home", "Job","Company"];

  return (
    <header className="fixed w-full z-50 bg-white backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight"
        >
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group transition"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/register"
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-3xl"
          onClick={() => setIsOpen(true)}
        >
          <HiOutlineMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-[60]`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-gray-700 hover:text-blue-600 transition"
          >
            <HiOutlineX />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 space-y-5 text-gray-700 font-medium text-lg">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col px-6 pt-4 space-y-3">
          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-center transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 text-center transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
