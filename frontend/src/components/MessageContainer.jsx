import React from "react";
import "./MessageContainer.css";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = ({ image, name, online }) => {
  const { selectedUser } = useSelector((store) => store.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => {
  //     dispatch(setSelectedUser(null));
  //   };
  // }, [selectedUser]);

  return (
    <div className="messageContainer">
      {/* Header */}
      <div className="userRow">
        <div className="avatar">
          <img
            src={selectedUser?.profilePicture || image}
            alt={name || "User"}
          />
          {online && <span className="statusDot"></span>}
        </div>

        <div className="userInfo">
          <p className="userName">{selectedUser?.fullName}</p>
        </div>
      </div>

      {/* Messages */}
      <Messages />

      {/* Input */}
      <SendInput />
    </div>
  );
};

export default MessageContainer;
