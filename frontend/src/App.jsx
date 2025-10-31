// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "../src/components/Home";
// import Signup from "../src/components/Signup";
// import Login from "../src/components/Login";
// import Review from "./components/Review";

// const router = createBrowserRouter([
//   {
//     path: "/home",
//     element: <Home />,
//   },
//   {
//     path: "/review",
//     element: <Review />,
//   },
//   {
//     path: "/",
//     element: <Signup />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home";
import Signup from "../src/components/Signup";
import Login from "../src/components/Login";
import Review from "./components/Review";
import { Toaster } from "react-hot-toast"; // ✅ Import global Toaster
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  //const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);
  return (
    <>
      {/* Global Toaster for all pages */}
      <Toaster
        position="top-right" // Position of toasts
        reverseOrder={false} // Newest toast appears last
        toastOptions={{
          duration: 3000, // Auto dismiss after 3 seconds
          style: {
            fontSize: "14px",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
