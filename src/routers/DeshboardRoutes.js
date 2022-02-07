import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { BusinessScreen } from "../Components/Business/BusinessScreen";
import { BusniesNameScreen } from "../Components/Business/BusniesNameScreen";
import { PersonScreen } from "../Components/Business/PersonScreen";
import { NavBar } from "../Components/ui/NavBar";

export const DeshboardRoutes = () => {
  return (
    <div>
      <Router>
        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path="/business/:businessId"
              component={BusniesNameScreen}
            />
            <Route
              exact
              path="/business/:businessId/:personId"
              component={PersonScreen}
            />
            <Route exact path="/business" component={BusinessScreen} />
            <Redirect to="/business" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
