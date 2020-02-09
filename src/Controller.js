import React, { Component } from "react";
import { ipcRenderer } from "electron";
import Timer from "./components/Timer";
import Counter from "./components/Counter";
import Navbar from "./components/Navbar";
import Team from "./components/Team";

import { withStyles } from "@material-ui/styles";
import { Container, Grid, Divider } from "@material-ui/core";

import {
  DEFAULT_TIME,
  DEFAULT_TEAMS,
  TIME_UPDATE_EVENT,
  SCORE_EVENT,
  SCORE_UPDATE_EVENT,
  SCREEN_CHANGE_EVENT
} from "./constants";

const styles = theme => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch"
  },
  grow: {
    flex: 1
  },
  divider: {
    backgroundColor: "whitesmoke"
  }
});

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: DEFAULT_TIME,
      teams: DEFAULT_TEAMS,
      started: false
    };
  }

  componentDidMount() {
    this.setState({ time: ipcRenderer.sendSync("getTime") });

    ipcRenderer.on(TIME_UPDATE_EVENT, (event, args) => {
      this.setState({ time: args });
    });

    ipcRenderer.on(SCORE_UPDATE_EVENT, (event, args) => {
      this.setState({ teams: args });
    });

    ipcRenderer.on("started", (event, args) => {
      this.setState({ started: true });
    });
  }

  onResultUpdate(team, value, increment) {
    ipcRenderer.send(SCORE_EVENT, { team, value, increment });
  }

  start() {
    ipcRenderer.send("start");
  }

  pause() {
    this.setState({ started: false });
    ipcRenderer.send("pause");
  }

  clockUpdate(type, increment) {
    ipcRenderer.send("clockUpdate", { type, increment });
  }

  changeScreen() {
    ipcRenderer.send(SCREEN_CHANGE_EVENT);
  }

  render() {
    const { time, teams, started } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Navbar onChangeScreen={this.changeScreen} />
        <Grid container direction='column' className={classes.grow}>
          <Grid container>
            <Grid container item xs={4} alignItems='center' justify='center'>
              <h1>{teams.home.name}</h1>
            </Grid>
            <Grid container item xs={4} alignItems='center' justify='center'>
              <h3>Vs</h3>
            </Grid>
            <Grid container item xs={4} alignItems='center' justify='center'>
              <h1>{teams.visitor.name}</h1>
            </Grid>
          </Grid>

          <Divider className={classes.divider} />

          <Grid container item className={classes.grow}>
            <Grid container item xs={4} direction='column' alignItems='center' justify='center'>
              <Counter
                value={teams.home.result}
                onValueUpdate={increment => this.onResultUpdate("home", "result", increment)}
              />
              <Counter
                value={teams.home.faults}
                onValueUpdate={increment => this.onResultUpdate("home", "faults", increment)}
                small
              />
            </Grid>

            <Grid container item xs={4} alignItems='center' justify='space-between' direction='row'>
              <Divider className={classes.divider} orientation='vertical' />
              <Timer
                time={time}
                onStart={this.start}
                started={started}
                onPause={() => this.pause()}
                onClockUpdate={this.clockUpdate}
              />
              <Divider className={classes.divider} orientation='vertical' />
            </Grid>

            <Grid container item xs={4} direction='column' alignItems='center' justify='center'>
              <Counter
                value={teams.visitor.result}
                onValueUpdate={increment => this.onResultUpdate("visitor", "result", increment)}
              />
              <Counter
                value={teams.visitor.faults}
                onValueUpdate={increment => this.onResultUpdate("visitor", "faults", increment)}
                small
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Controller);
