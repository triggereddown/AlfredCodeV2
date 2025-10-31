// import React from "react";
// import "./OtherUser.css";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";
// import { on } from "../../../backend/src/models/userModel";

// const OtherUser = ({ user }) => {
//   const dispatch = useDispatch();
//   const { selectedUser, onlineUsers } = useSelector((store) => store.user);
//   const isOnline = onlineUsers.includes(user._id);
//   const selectedUserHandler = () => {
//     dispatch(setSelectedUser(user));
//   };

//   return (
//     <div
//       onClick={selectedUserHandler}
//       className={`userRow ${
//         selectedUser?._id === user?._id ? "selectedUser" : ""
//       }`}
//     >
//       {/* Profile Image */}
//       <div className="avatar">
//         <img
//           src={user?.profilePhoto || "https://via.placeholder.com/40"}
//           alt={user?.fullName || "User"}
//         />
//         {user?.online && <span className="statusDot"></span>}
//       </div>

//       {/* User Name */}
//       <div className="userInfo">
//         <p className="userName">{user?.fullName || "Username"}</p>
//       </div>
//     </div>
//   );
// };

// export default OtherUser;

import React from "react";
import "./OtherUser.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  // ✅ Safe check — prevent .includes() crash
  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);
  console.log("User:", user.fullName, "isOnline:", isOnline);
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
      {/* Profile Image + Online Status Dot */}
      <div className="avatar">
        <img
          src={user?.profilePhoto || "https://via.placeholder.com/40"}
          alt={user?.fullName || "User"}
        />
        {/* ✅ Render dot dynamically */}
        {isOnline && <span className="statusDot"></span>}
      </div>

      {/* User Name */}
      <div className="userInfo">
        <p className="userName">{user?.fullName || "Username"}</p>
      </div>
    </div>
  );
};

export default OtherUser;
