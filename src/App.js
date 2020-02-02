import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Controller from "./Controller";
import Display from "./Display";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/display'>
          <Display />
        </Route>
        <Route path='/' component={Controller} />
      </Switch>
    </Router>
  );
}

export default App;
