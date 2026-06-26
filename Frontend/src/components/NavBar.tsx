import { Link } from "react-router-dom";
import React from "react";
import "../css/NavBar.css";

const NavBar: React.FC = () => {
  return (
    <div className="navbar_wrapper">
      <nav className="navbar">
        <div className="navbar_logo">
          <h1 onClick={() => (window.location.href = "/")}>CinemaHub</h1>
        </div>
        <div className="navbar_links">
          <Link className="nav_link" to="/movie">
            Movies
          </Link>
          <Link className="nav_link" to="/tv">
            TV Shows
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
