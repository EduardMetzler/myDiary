import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../pages/style.css";

export const Navbar = () => {
  const history = useHistory();
  const Auth = useContext(AuthContext);
  const logoutHandler = event => {
    event.preventDefault();
    Auth.logout();
    history.push("/");
  };
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const navHeight = nav.offsetHeight;
    console.log(navHeight);
    // return navHeight;
  });
  return (
    <nav className="nav">
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span className="brand-logo">Tagebuch</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Erstellen</NavLink>
          </li>
          <li>
            <NavLink to="/myEntry">Alle Einträge</NavLink>
          </li>{" "}
          <li>
            <a href="/" onClick={logoutHandler}>
              Abmelden
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
