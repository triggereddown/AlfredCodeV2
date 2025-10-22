import React from "react";
import { IoSend } from "react-icons/io5";
import "./SendInput.css";

const SendInput = () => {
  return (
    <form className="sendInput">
      <input type="text" placeholder="Type your message here..." />
      <button type="submit">
        <IoSend />
      </button>
    </form>
  );
};

export default SendInput;
