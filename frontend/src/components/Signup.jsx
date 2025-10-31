import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        // "https://alfredchatv2backend.onrender.com/api/v1/user/register",
        "http://localhost:3000/api/v1/user/register",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signupWrapper">
      <Toaster />
      {/* Title */}
      <h1 className="appTitle">Alfred Chat & Code Review</h1>

      <div className="signupContainer">
        {/* Left About Section */}
        <div className="aboutSection">
          <h2>About</h2>
          <p>
            Alfred Chat & Code Review is your intelligent developer companion.
            Collaborate with teammates, share code, and get instant AI-powered
            feedback — all in one place. *(Sharing feature is still
            under-development)*
          </p>
        </div>

        {/* Center Signup Form */}
        <div className="signupPage">
          <h2>Create Account</h2>
          <form onSubmit={onSubmitHandler}>
            <input
              placeholder="Full Name"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            />
            <input
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
            <button type="submit">Sign Up</button>
          </form>
          <Link to="/login">Already have an account? Login</Link>
        </div>

        {/* Right Features Section */}
        <div className="featuresSection">
          <h2>Features</h2>
          <ul>
            <li>💬 Real-time messaging</li>
            <li>🧠 AI Code suggestions</li>
            <li>🧠 AI Syntax Improvement</li>
            <li>🧠 AI Tutor for code context</li>
            <li>⚡ Fast, secure authentication</li>
            <li>🎨 Clean modern UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
