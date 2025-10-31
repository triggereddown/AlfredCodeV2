// import React from "react";
// import "./OtherUsers.css";
// import OtherUser from "./OtherUser";
// import useGetOtherUsers from "../hooks/useGetOtherUsers";
// import { useSelector } from "react-redux";

// const OtherUsers = () => {
//   useGetOtherUsers();
//   const { otherUsers } = useSelector((store) => store.user);
//   if (!otherUsers) return; //early return in react which means that if other users doesn;t exist then nothing to return

//   return (
//     <div className="other-users">
//       {otherUsers &&
//         otherUsers.map((user) => <OtherUser key={user.id} user={user} />)}
//     </div>
//   );
// };

// export default OtherUsers;

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import toast from "react-hot-toast";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found. Please login again.");
          return;
        }

        const res = await axios.get(
          "https://alfredchatv2backend.onrender.com/api/v1/user/getOtherUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Attach token
            },
          }
        );

        dispatch(setOtherUsers(res.data.otherUsers || []));
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch users (401)"
        );
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
