import React from "react";
import "./MessageContainer.css";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = ({ image, name, online }) => {
  return (
    <div className="messageContainer">
      {/* Header */}
      <div className="userRow">
        <div className="avatar">
          <img
            src={image || "https://via.placeholder.com/40"}
            alt={name || "User"}
          />
          {online && <span className="statusDot"></span>}
        </div>

        <div className="userInfo">
          <p className="userName">{name || "Username"}</p>
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
