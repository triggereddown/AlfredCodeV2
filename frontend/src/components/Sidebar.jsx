import React from "react";
import "./Sidebar.css";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";

const Sidebar = () => {
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
        <OtherUsers name="Test123" online={true} />
        <OtherUsers name="Alex Smith" online={false} />
        <OtherUsers name="John Doe" online={true} />
        <OtherUsers name="Jane D009oe" online={false} />
      </div>
    </div>
  );
};

export default Sidebar;
