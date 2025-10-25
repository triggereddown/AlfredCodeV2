import React, { useEffect, useRef } from "react";
import "./Message.css";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = String(authUser?._id) === String(message?.senderId);

  // Format timestamp (fallback to current time if missing)
  const formattedTime = message?.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      ref={scroll}
      className={`messageRow ${isSender ? "sender" : "receiver"}`}
    >
      <div className="chatBubble">
        <span className="chatText">{message?.message || ""}</span>
        <span className="chatTime">{formattedTime}</span>
      </div>
    </div>
  );
};

export default Message;
