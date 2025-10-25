import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedUser?._id) return;
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `http://localhost:3000/api/v1/message/${selectedUser._id}`
        );

        // Backend returns { success: true, messages: [...] }
        // We only need the messages array for logging and state
        console.log(
          "Fetched Messages for user",
          selectedUser._id,
          res.data.messages
        );
        dispatch(setMessages(res.data.messages));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
