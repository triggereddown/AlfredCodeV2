import React from "react";
import "./OtherUsers.css";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);
  return (
    <div className="other-users">
      {otherUsers &&
        otherUsers.map((user) => <OtherUser key={user.id} user={user} />)}
    </div>
  );
};

export default OtherUsers;
