import React from "react";
import "./OtherUsers.css";

const OtherUsers = ({ name, image, online }) => {
  return (
    <div className="userRow">
      {/* Profile Image */}
      <div className="avatar">
        <img src={image || "https://via.placeholder.com/40"} alt={name} />
        {online && <span className="statusDot"></span>}
      </div>

      {/* User Name */}
      <div className="userInfo">
        <p className="userName">{name || "Username"}</p>
      </div>
    </div>
  );
};

export default OtherUsers;
