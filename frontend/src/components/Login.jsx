import React, { useState } from "react";

import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // e because e will take care to change when the input is by user on form

  const onSubmitHandler = (e) => {
    // To stop reloading the page on input
    e.preventDefault();
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
          <Link to="/signup">Don't have an account? Sign Up</Link>
          <div>
            <button>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
