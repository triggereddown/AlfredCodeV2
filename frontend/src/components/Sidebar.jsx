import React from "react";
import "./Sidebar.css";
import { FaSearch } from "react-icons/fa";
import OtherUser from "./OtherUser";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="sidebar">
      {/* Search Bar */}
      <form action="">
        <input type="text" placeholder="Search" />
        <button type="button">
          <FaSearch />
        </button>
      </form>

      <div className="divider"></div>

      <div className="userList">
        <OtherUsers />
        {/* <OtherUser name="Test123" online={true} />
        <OtherUser name="Alex Smith" online={false} />
        <OtherUser name="John Doe" online={true} />
        <OtherUser name="Jane D009oe" online={false} /> */}
      </div>
      <div>
        <button onClick={logoutHandler} className="logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
