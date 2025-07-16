import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Dashboard</Link>
      <Link to="/upload" style={{ marginRight: "15px" }}>Upload Data</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
