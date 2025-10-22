import React from "react";
import "./OtherUser.css";

const OtherUser = ({ image, name, online }) => {
  return (
    <div className="userRow">
      {/* Profile Image */}
      <div className="avatar">
        <img
          src={image || "https://via.placeholder.com/40"}
          alt={name || "User"}
        />
        {online && <span className="statusDot"></span>}
      </div>

      {/* User Name */}
      <div className="userInfo">
        <p className="userName">{name || "Username"}</p>
      </div>
    </div>
  );
};

export default OtherUser;
