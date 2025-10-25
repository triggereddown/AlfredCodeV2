import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // store just the user object (not the whole response wrapper)
        dispatch(setAuthUser(res.data.user));
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    // Reset fields
    setUser({ username: "", password: "" });
  };

  return (
    <div className="loginPage">
      <Toaster position="top-center" reverseOrder={false} />
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="inputGroup">
          <label>User name</label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            placeholder="Enter Username"
            required
          />
        </div>

        <div className="inputGroup">
          <label>Password</label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <button type="submit">Login</button>

        <Link to="/">Don't have an account? Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
