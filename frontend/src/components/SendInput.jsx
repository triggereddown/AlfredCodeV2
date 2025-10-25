import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import "./SendInput.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Send response:", res.data);
      // After sending, refetch messages for this conversation to keep UI in sync
      const fetchRes = await axios.get(
        `http://localhost:3000/api/v1/message/${selectedUser._id}`,
        { withCredentials: true }
      );
      console.log("Refetched messages:", fetchRes.data.messages);
      dispatch(setMessages(fetchRes.data.messages));
    } catch (err) {
      console.error("Error sending message:", err);
    }
    setMessage(""); // clear input after sending
    //To check the message
    // alert(message);
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
