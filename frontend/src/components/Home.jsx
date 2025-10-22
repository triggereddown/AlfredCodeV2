import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
