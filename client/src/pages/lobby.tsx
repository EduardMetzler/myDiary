import React from "react";
import { NavLink } from "react-router-dom";

export const Lobby: React.FC = () => {
  return (
    <div className="row">
      <NavLink to="/create">
        <div className="col s12 m6">
          <div className="card-panel teal">
            <span className="white-text">Erstellen</span>
          </div>
        </div>
      </NavLink>
      <NavLink to="/myEntry">
        <div className="col s12 m6">
          <div className="card-panel teal">
            <span className="white-text">Alle Einträge</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
