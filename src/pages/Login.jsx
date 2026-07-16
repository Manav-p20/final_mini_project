import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  setPassword,
  login,
} from "../features/auth/Authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, password } = useSelector(
    (state) => state.auth
  );

  const handleLogin = () => {
    dispatch(login());  
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <h2>Login Page</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          dispatch(setName(e.target.value))
        }
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          dispatch(setPassword(e.target.value))
        }
      />

      <button
        className="btn btn-primary"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;