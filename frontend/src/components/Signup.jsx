import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form action="">
        <div>
          <label htmlFor="">
            <span>Full name</span>
          </label>
          <input type="text" placeholder="Enter Full Name" />
        </div>
        <div>
          <label htmlFor="">
            <span>User name</span>
          </label>
          <input type="text" placeholder="Enter UserName" />
        </div>
        <div>
          <label htmlFor="">
            <span>Password</span>
          </label>
          <input type="password" placeholder="Enter Password" />
        </div>
        <div>
          <label htmlFor="">
            <span>Confirm Password</span>
          </label>
          <input type="password" placeholder="Enter Password" />
          <div>
            <input type="checkbox" />
          </div>
          <Link to="/login">Already have an account? Login ?</Link>
          <div>
            <button>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
