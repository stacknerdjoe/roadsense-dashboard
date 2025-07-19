import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // cleaner redirect
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Dashboard</Link>
      <Link to="/upload" style={{ marginRight: "15px" }}>Upload Data</Link>
      <Link to="/view" style={{ marginRight: "15px" }}>View Data</Link>

      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/register" style={{ marginRight: "15px" }}>Register</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
