// import React from "react";
// import "./MessageContainer.css";
// import SendInput from "./SendInput";
// import Messages from "./Messages";
// import { useSelector } from "react-redux";

// const MessageContainer = ({ image, name, online }) => {
//   const { selectedUser } = useSelector((store) => store.user);
//   // const dispatch = useDispatch();
//   // useEffect(() => {
//   //   return () => {
//   //     dispatch(setSelectedUser(null));
//   //   };
//   // }, [selectedUser]);

//   return (
//     <div className="messageContainer">
//       {/* Header */}
//       <div className="userRow">
//         <div className="avatar">
//           <img
//             src={selectedUser?.profilePicture || image}
//             alt={name || "User"}
//           />
//           {online && <span className="statusDot"></span>}
//         </div>

//         <div className="userInfo">
//           <p className="userName">{selectedUser?.fullName}</p>
//         </div>
//       </div>

//       {/* Messages */}
//       <Messages />

//       {/* Input */}
//       <SendInput />
//     </div>
//   );
// };

// export default MessageContainer;
import React from "react";
import "./MessageContainer.css";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = ({ image, online }) => {
  const { selectedUser, authUser } = useSelector((store) => store.user);

  // Header info: show selected user if clicked, otherwise show logged-in user
  const headerName = selectedUser?.fullName || authUser?.username || "User";
  const headerImage =
    selectedUser?.profilePicture || image || "https://via.placeholder.com/40";

  return (
    <div className="messageContainer">
      {/* Header */}
      <div className="userRow">
        <div className="avatar">
          <img src={headerImage} alt={headerName} />
          {selectedUser ? online && <span className="statusDot"></span> : null}
        </div>
        <div className="userInfo">
          <p className="userName">{headerName}</p>
        </div>
      </div>

      {/* Messages */}
      {/* {!selectedUser ? (
        <div className="welcomeMessage">
          <p>Hi {authUser?.username || "User"}, let's start chatting! 👋</p>
        </div>
      ) : (
        <Messages />
      )} */}
      {!selectedUser ? (
        <div className="welcomeMessage">
          <p>
            Hi <span>{authUser?.username || "User"}</span>, let’s start
            chatting! 👋
          </p>
        </div>
      ) : (
        <Messages />
      )}

      {/* Input field only shows if a user is selected */}
      {selectedUser && <SendInput />}
    </div>
  );
};

export default MessageContainer;
