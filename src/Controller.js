import React, { Component } from "react";
import { ipcRenderer } from "electron";
import Timer from "./components/Timer";
import { TIME_UPDATE_EVENT } from "./constants";

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = { time: "18:00" };
  }

  componentDidMount() {
    ipcRenderer.on(TIME_UPDATE_EVENT, (event, args) => {
      console.log(TIME_UPDATE_EVENT, args);
      this.setState({ time: args });
    });
  }

  start() {
    ipcRenderer.send("start", "start!!!");
  }

  render() {
    const { time } = this.state;

    return (
      <div>
        <h1>Controller</h1>
        <Timer time={time} />
        <button onClick={this.start}>START</button>
      </div>
    );
  }
}

export default Controller;
