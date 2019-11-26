"use strict";

const { ipcRenderer } = require("electron");
const constants = require("../../constants");

ipcRenderer.on(constants.TIME_UPDATE_EVENT, (event, args) => {
  document.getElementById("timer").innerHTML = args;
});

ipcRenderer.on(constants.SCORE_UPDATE_EVENT, (event, args) => {
  document.getElementById("score-home").innerHTML =
    args.home > 9 ? args.home : "0" + args.home;
  document.getElementById("score-visitor").innerHTML =
    args.visitor > 9 ? args.visitor : "0" + args.visitor;
});

ipcRenderer.on(constants.FAULT_UPDATE_EVENT, (event, args) => {
  document.getElementById("faults-home").innerHTML =
    args.home > 9 ? args.home : "0" + args.home;
  document.getElementById("faults-visitor").innerHTML =
    args.visitor > 9 ? args.visitor : "0" + args.visitor;
});
