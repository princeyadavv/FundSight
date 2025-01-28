import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the active route component */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
