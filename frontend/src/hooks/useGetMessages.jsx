import React from "react";
import axios from "axios";
import { useInsertionEffect } from "react";
import { useSelector } from "react-redux";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  useInsertionEffect(() => {
    const fetchMessages = async () => {
      try {
        //now to check every time if the user is logged in or not
        axios.defaults.withCredentials = true;

        const res = await axios.get(
          `http://localhost:3000/api/v1/message/${selectedUser?._id}`
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    //calling the funtion just created
    fetchMessages();
  }, []);
};

export default useGetMessages;
