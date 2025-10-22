import React from "react";
import "./Sidebar.css";
import { FaSearch } from "react-icons/fa";
import OtherUser from "./OtherUser";

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
        <OtherUser name="Test123" online={true} />
        <OtherUser name="Alex Smith" online={false} />
        <OtherUser name="John Doe" online={true} />
        <OtherUser name="Jane D009oe" online={false} />
      </div>
    </div>
  );
};

export default Sidebar;
