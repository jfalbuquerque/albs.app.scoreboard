import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Scores from "./components/screens/Scores";

import Controller from ".//Controller";
import Display from "./Display";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/display' component={Display} />
          <Route path='/scores' component={Scores} />
          <Route path='/' component={Controller} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
