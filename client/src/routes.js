import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Authentication } from "./pages/authentication";
import { Lobby } from "./pages/lobby";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/lobby" exact>
          <Lobby />
        </Route>

        <Redirect to="/xxx" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Authentication />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
