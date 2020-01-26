import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ipcRenderer } from "electron";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Controller from "./Controller";
import Display from "./Display";

function start() {
  console.log("click start2");
  ipcRenderer.send("start", "yeeeeee");
}

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
