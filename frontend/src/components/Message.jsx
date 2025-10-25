import React from "react";
import "./Message.css";

const Message = ({ message, sender = false }) => {
  return (
    <div className={`messageRow ${sender ? "sender" : "receiver"}`}>
      <div className="chatBubble">{message.text}</div>
    </div>
  );
};

export default Message;
