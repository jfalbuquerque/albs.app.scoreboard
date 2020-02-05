import React, { Component } from "react";
import { ipcRenderer } from "electron";
import Timer from "./components/Timer";
import Counter from "./components/Counter";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { DEFAULT_TIME, DEFAULT_TEAMS, TIME_UPDATE_EVENT, SCORE_UPDATE_EVENT } from "./constants";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: DEFAULT_TIME,
      teams: DEFAULT_TEAMS
    };
  }

  componentDidMount() {
    this.setState({ time: ipcRenderer.sendSync('getTime') });

    ipcRenderer.on(TIME_UPDATE_EVENT, (event, args) => {
      this.setState({ time: args });
    });

    ipcRenderer.on(SCORE_UPDATE_EVENT, (event, args) => {
      this.setState({ teams: args });
    });
  }

  render() {
    const { time, teams } = this.state;

    return (
      <div className='flex'>
        <Grid container>
          <Grid item xs={6}>
            {teams.home.name}
          </Grid>
          <Grid item xs={6}>
            {teams.visitor.name}
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

export default Display;
