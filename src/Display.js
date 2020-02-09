import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ipcRenderer } from "electron";

import { withStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import { SCREEN_CHANGE_EVENT } from "./constants";

const styles = theme => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

class Display extends Component {
  constructor(props) {
    super(props);

    this.screenChangeHandler = this.screenChangeHandler.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on(SCREEN_CHANGE_EVENT, this.screenChangeHandler);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(SCREEN_CHANGE_EVENT, this.screenChangeHandler);
  }

  screenChangeHandler() {
    this.props.history.push("/scores");
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <img src={require("./assets/gulpilhares.png")} alt='Gulpilhares' width='200' />
        <Typography variant='h3'>A.C.D. Gulpilhares</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Display));
