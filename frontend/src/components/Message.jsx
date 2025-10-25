import React from "react";
import "./Message.css";
import { useEffect, useRef } from "react";

const Message = ({ message, isSender }) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={scroll}>
      <div className={`messageRow ${isSender ? "sender" : "receiver"}`}>
        <div className="chatBubble">{message?.message || ""}</div>
      </div>
    </div>
  );
};

export default Message;
