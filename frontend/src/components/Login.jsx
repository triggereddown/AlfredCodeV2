import React, { use, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  // e because e will take care to change when the input is by user on form

  const onSubmitHandler = async (e) => {
    // To stop reloading the page on input
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // important
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    console.log(user);
    setUser({
      username: "",

      password: "",
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler} action="">
        <div>
          <label htmlFor="">
            <span>User name</span>
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            placeholder="Enter UserName"
          />
        </div>
        <div>
          <label htmlFor="">
            <span>Password</span>
          </label>
          <input
            value={user.password}
            // ... is spread operator to get the existing value
            // the onbject of setuser is destructured as any props to access the inside elements
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div>
          <Link to="/">Don't have an account? Sign Up</Link>
          <div>
            <button>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
