import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/Authslice";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


   const handellogout = () => {
    dispatch(logout());
    navigate("/")
  }
  return (
    <nav className="navbar navbar-dark bg-dark px-5">
      <button onClick={handellogout}>Logout</button>
      <span></span>
    </nav>
  );
};

export default Navbar;
