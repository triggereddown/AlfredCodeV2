import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handler = (payload) => {
      // backend emits { newMessage } — handle either shape
      const newMsg = payload?.newMessage || payload;
      const next = Array.isArray(messages) ? [...messages, newMsg] : [newMsg];
      dispatch(setMessages(next));
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, messages, dispatch]);
};

export default useGetRealTimeMessage;
