import React from "react";
import Navbar from "./Navbar";
import { useQuery } from "@tanstack/react-query";
import { Children } from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full bg-base-100">
      <Navbar />
      {/* <div className="h-[5rem]">sdf</div> */}
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
