import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Confirmation from "./components/Confirmation/Confirmation";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from './PublicRoute';

const Routes = () => {

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/home" component={App} />
          <Route path="/register" component={Register} />
          <PublicRoute path="/login" component={Login} />
          <Route path="/confirm" component={Confirmation} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
