import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/" onClick={() => Auth.logout()}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="headerBar">
      <h1 className="Budgetek-Title">
        <Link to="/">
          Budgetek
        </Link>
      </h1>
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;