import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { authUser, otherUsers } = useSelector((store) => store.user);

  // Logout function remains unchanged
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Real-time search filtering
  useEffect(() => {
    if (!search) {
      // If search is empty, reset the list to all users
      dispatch(setOtherUsers(otherUsers));
      return;
    }

    const filteredUsers = otherUsers?.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredUsers && filteredUsers.length > 0) {
      dispatch(setOtherUsers(filteredUsers));
    } else {
      dispatch(setOtherUsers([]));
    }
  }, [search]);

  // Optional: form submit can just prevent default
  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="sidebar">
      {/* Search Bar */}
      <form onSubmit={searchSubmitHandler} action="">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      <div className="divider"></div>

      <div className="userList">
        {/* Render OtherUsers component */}
        <OtherUsers />
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
