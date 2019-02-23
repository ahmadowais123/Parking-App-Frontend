import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import AppliedRoute from './AppliedRoute';

//essentially for switching between tabs

export default ({ childProps }) =>
  <Switch>
   <AppliedRoute path="/" exact component={Login} props={childProps}/>
   <AppliedRoute path="/login" exact component={Login} props={childProps} />
   <AppliedRoute path="/register" exact component={Register} props={childProps} />
  </Switch>;