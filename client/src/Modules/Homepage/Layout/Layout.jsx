// src/Components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header /> {/* Common header */}
      <main className="pt-14">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
