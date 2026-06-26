import { Link } from "react-router-dom"
import React from "react";
import '../css/NavBar.css'

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1 onClick={() => window.location.href = '/'}>CinemaHub</h1>
      </div>
      <div className="navbar-links">
        <Link className="nav-link" to='/movie'>
          Movies
        </Link>
        <Link className="nav-link" to ='/tv'>
          TV Shows
        </Link>
      </div>
    </nav>
  );
};


export default NavBar;