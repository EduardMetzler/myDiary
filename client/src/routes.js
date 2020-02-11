import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Authentication } from "./pages/authentication";
import { Lobby } from "./pages/lobby";
import { MyEntry } from "./pages/myEntry";
import { Create } from "./pages/create";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <Create />
        </Route>
        <Route path="/myEntry" exact>
          <MyEntry />
        </Route>
        <Route path="/lobby" exact>
          <Lobby />
        </Route>

        <Redirect to="/lobby" />
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
