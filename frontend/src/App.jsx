import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/components/Home";
import Signup from "../src/components/Signup";
import Login from "../src/components/Login";
import Review from "./components/Review";

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
  return <RouterProvider router={router} />;
}

export default App;
