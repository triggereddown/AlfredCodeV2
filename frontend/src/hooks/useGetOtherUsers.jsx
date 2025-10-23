import React, { useEffect } from "react";
import axios from "axios";

const useGetOtherUsers = () => {
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:3000/api/v1/user/chat");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
