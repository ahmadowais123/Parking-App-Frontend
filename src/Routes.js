import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import AppliedRoute from './components/AppliedRoute';
import Browse from "./containers/Browse";
import NotFound from "./containers/NotFound"
import Create_spot from "./containers/Create_spot";
//essentially for switching between tabs
export default ({ childProps }) =>
  <Switch>
   <AppliedRoute path="/" exact component={Home} props={childProps}/>
   <AppliedRoute path="/login" exact component={Login} props={childProps} />
   <AppliedRoute path="/register" exact component={Register} props={childProps} />
   <AppliedRoute path="/home" exact component={Home} props={childProps}/>
   <AppliedRoute path="/browse" exact component={Browse} props={childProps}/>
   <AppliedRoute path="/create_spot" exact component={Create_spot} props={childProps}/>
   { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
