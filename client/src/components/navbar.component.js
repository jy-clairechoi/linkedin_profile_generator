import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <h3 className="navbar-brand">
          LinkedIn Profiles
        </h3>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">All Profiles</Link>
            </li>
            <li className="navbar-item">
              <Link to="/add" className="nav-link">Add Profile</Link>
            </li>
            {/* <li className="navbar-item">
              <Link to="/edit" className="nav-link">Edit Profile</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}
