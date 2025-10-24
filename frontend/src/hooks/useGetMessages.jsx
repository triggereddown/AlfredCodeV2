import React from "react";
import axios from "axios";
const useGetMessages = () => {
  useInsertionEffect(() => {
    const fetchMessages = async () => {
      try {
        //now to check every time if the user is logged in or not
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:3000/api/v1/message/68b46cdf9ab905cd776bbfa9`
        );
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
};

export default useGetMessages;
