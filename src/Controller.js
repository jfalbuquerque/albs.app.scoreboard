import React from "react";
//import { remote, ipcRenderer } from "electron";
//const electron = window.require("electron");

const Controller = () => {
  const start = () => {
    console.log("start");
  };

  return (
    <React.Fragment>
      <h1>Controller</h1>
      <button onClick={start}>START</button>
    </React.Fragment>
  );
};

export default Controller;
