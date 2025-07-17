import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Dashboard</Link>
      <Link to="/upload" style={{ marginRight: "15px" }}>Upload Data</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>

      {/* Logout button added */}
      <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
