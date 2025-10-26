import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
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
  const [isOpen, setIsOpen] = useState(false);
  const { otherUsers } = useSelector((store) => store.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!search) {
      dispatch(setOtherUsers(otherUsers));
      return;
    }

    const filteredUsers = otherUsers?.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );

    dispatch(setOtherUsers(filteredUsers?.length ? filteredUsers : []));
  }, [search]);

  const searchSubmitHandler = (e) => e.preventDefault();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      {/* Hamburger Icon */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Search Bar */}
        <form onSubmit={searchSubmitHandler} className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="divider"></div>

        {/* User List */}
        <div className="userList">
          <OtherUsers />
        </div>

        {/* Logout */}
        <button onClick={logoutHandler} className="logout">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
