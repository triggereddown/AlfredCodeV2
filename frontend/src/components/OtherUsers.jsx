import React from "react";
import "./OtherUsers.css";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const OtherUsers = () => {
  useGetOtherUsers();

  return <OtherUser />;
};

export default OtherUsers;
