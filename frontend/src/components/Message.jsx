import React from "react";
import "./Message.css";

const Message = ({ text, sender = false }) => {
  return (
    <div className={`messageRow ${sender ? "sender" : "receiver"}`}>
      <div className="chatBubble">{text}</div>
    </div>
  );
};

export default Message;
