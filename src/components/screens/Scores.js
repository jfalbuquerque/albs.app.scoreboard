import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ipcRenderer } from "electron";
import Timer from "../Timer";
import Counter from "../Counter";

import Grid from "@material-ui/core/Grid";

import {
  DEFAULT_TIME,
  DEFAULT_TEAMS,
  TIME_UPDATE_EVENT,
  SCORE_UPDATE_EVENT,
  SCREEN_CHANGE_EVENT
} from "../../constants";

class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: DEFAULT_TIME,
      teams: DEFAULT_TEAMS
    };

    this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
    this.scoreUpdateHandler = this.scoreUpdateHandler.bind(this);
    this.screenChangeHandler = this.screenChangeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ time: ipcRenderer.sendSync("getTime") });

    ipcRenderer.on(TIME_UPDATE_EVENT, this.timeUpdateHandler);

    ipcRenderer.on(SCORE_UPDATE_EVENT, this.scoreUpdateHandler);

    ipcRenderer.on(SCREEN_CHANGE_EVENT, this.screenChangeHandler);
    console.log("Scores - componentDidMount");
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(TIME_UPDATE_EVENT, this.timeUpdateHandler);
    ipcRenderer.removeListener(SCORE_UPDATE_EVENT, this.scoreUpdateHandler);
    ipcRenderer.removeListener(SCREEN_CHANGE_EVENT, this.screenChangeHandler);
    console.log("Scores - componentWillUnmount");
  }

  timeUpdateHandler(event, args) {
    this.setState({ time: args });
  }

  scoreUpdateHandler(event, args) {
    this.setState({ teams: args });
  }

  screenChangeHandler() {
    this.props.history.push("/display");
  }

  render() {
    const { time, teams } = this.state;

    return (
      <div className='flex'>
        <Grid container>
          <Grid item xs={6}>
            <h1>{teams.home.name}</h1>
          </Grid>
          <Grid item xs={6}>
            <h1>{teams.visitor.name}</h1>
          </Grid>
          <Grid item xs={4}>
            <Counter value={teams.home.result} />
          </Grid>
          <Grid item xs={4}>
            <Timer time={time} />
          </Grid>
          <Grid item xs={4}>
            <Counter value={teams.visitor.result} />
          </Grid>
          <Grid item xs={6}>
            <Counter value={teams.home.faults} small />
          </Grid>
          <Grid item xs={6}>
            <Counter value={teams.visitor.faults} small />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Scores);
