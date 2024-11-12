// components/Layout.js
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="bg-[#E5E4DB] py-5 min-h-[65vh]">{children}</div>
      <div className="bg-[#E5E4DB] p-4">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
