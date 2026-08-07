
import React, { useState } from "react";
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

  const [errors, setErrors] = useState("");

  const { name, password } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();

    setErrors("");

    if (name.trim() === "") {
      setErrors("Name is required");
      return;
    }

    if (password.length < 6) {
      setErrors("Password must be at least 6 characters");
      return;
    }

    dispatch(login());
    navigate("/dashboard");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">

                {/* Header */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold">
                    Welcome Back
                  </h2>

                  <p className="text-muted mb-0">
                    Please login to your account
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin}>

                  {/* Name */}
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) =>
                        dispatch(setName(e.target.value))
                      }
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        dispatch(setPassword(e.target.value))
                      }
                    />
                  </div>

                  {/* Error */}
                  {errors && (
                    <div className="alert alert-danger py-2">
                      {errors}
                    </div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Login
                  </button>

                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Don't have an account?{" "}
                    <a href="#" className="text-decoration-none">
                      Sign up
                    </a>
                  </small>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
