import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/Authslice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/Themecontext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar px-5 py-3">
      <button
        className="btn btn-outline-primary"
        onClick={toggleTheme}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <button
        className="btn btn-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;