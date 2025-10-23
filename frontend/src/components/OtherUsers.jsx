import React from "react";
import "./OtherUsers.css";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return; //early return in react which means that if other users doesn;t exist then nothing to return

  return (
    <div className="other-users">
      {otherUsers &&
        otherUsers.map((user) => <OtherUser key={user.id} user={user} />)}
    </div>
  );
};

export default OtherUsers;
