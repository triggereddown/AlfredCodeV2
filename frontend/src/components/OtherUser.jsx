import React from "react";
import "./OtherUser.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`userRow ${
        selectedUser?._id === user?._id ? "selectedUser" : ""
      }`}
    >
      {/* Profile Image */}
      <div className="avatar">
        <img
          src={user?.profilePhoto || "https://via.placeholder.com/40"}
          alt={user?.fullName || "User"}
        />
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
