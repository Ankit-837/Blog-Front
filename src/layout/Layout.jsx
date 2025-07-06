import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <HomePage/>
      <Outlet />
    </div>
  );
};

export default Layout;
