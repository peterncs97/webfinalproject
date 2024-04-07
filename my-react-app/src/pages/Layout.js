import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Character from "./Character";
import Dialog from "./Dialog";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Character />
      <Outlet />
      <Dialog />
    </>
  )
};

export default Layout;