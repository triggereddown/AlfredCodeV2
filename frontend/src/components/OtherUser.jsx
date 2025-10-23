import React from "react";
import "./OtherUser.css";

const OtherUser = (props) => {
  const user = props.user;

  return (
    <div className="userRow">
      {/* Profile Image */}
      <div className="avatar">
        <img src={user?.profilePhoto} alt={user?.fullName || "User"} />
        {user?.online && <span className="statusDot"></span>}
      </div>

      {/* User Name */}
      <div className="userInfo">
        <p className="userName">{user?.fullName || "Username"}</p>
      </div>
    </div>
  );
};

export default OtherUser;
