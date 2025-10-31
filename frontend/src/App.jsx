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

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home";
import Signup from "../src/components/Signup";
import Login from "../src/components/Login";
import Review from "./components/Review";
import { Toaster } from "react-hot-toast"; // ✅ Import global Toaster

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
