import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import "./SendInput.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/message/send/${selectedUser._id}`
      );
      console.log(res);
    } catch (err) {
      console.error("Error sending message:", err);
    }
    alert(message);
    // Dispatch the sendMessage action with the message
  };

  return (
    <form className="sendInput" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">
        <IoSend />
      </button>
    </form>
  );
};

export default SendInput;
