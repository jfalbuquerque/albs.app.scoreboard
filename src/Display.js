import React, { Component } from "react";
import { ipcRenderer } from "electron";
import Timer from "./components/Timer";
import { TIME_UPDATE_EVENT } from "./constants";

class Display extends Component {
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

  render() {
    const { time } = this.state;

    return (
      <div>
        <h1>Display</h1>
        <Timer time={time} />
      </div>
    );
  }
}

export default Display;
