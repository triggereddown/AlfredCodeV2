import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  // makin an object to get the input
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // e because e will take care to change when the input is by user on form

  const onSubmitHandler = (e) => {
    // To stop reloading the page on input
    e.preventDefault();
    console.log(user);
    setUser({
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form
        // Calling the onsubmit handler function with usestate on clicking on submit button
        onSubmit={onSubmitHandler}
        action=""
      >
        <div>
          <label htmlFor="">
            <span>Full name</span>
          </label>
          <input
            value={user.fullName}
            // to get the existing users and also setting the fullname as e.target .vqalue
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            type="text"
            placeholder="Enter Full Name"
          />
        </div>
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div>
          <label htmlFor="">
            <span>Confirm Password</span>
          </label>
          <input
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            type="password"
            placeholder="Enter Password"
          />
          <div>
            <input type="checkbox" />
          </div>
          <Link to="/login">Already have an account? Login ?</Link>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
