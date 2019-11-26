"use strict";

const { ipcRenderer } = require("electron");
const constants = require("../../constants");

let timerStarted = false;
let timerPaused = true;

document.getElementById("start").addEventListener("click", () => {
  console.log("here");
  if (timerPaused) {
    ipcRenderer.send(constants.START_EVENT, timerStarted);
    timerPaused = false;
    timerStarted = true;
  } else {
    ipcRenderer.send(constants.PAUSE_EVENT);
    timerPaused = true;
  }
});

/* document.getElementById("stop").addEventListener("click", () => {
  ipcRenderer.send(constants.STOP_EVENT);
}); */

const scoreBtns = document.getElementsByClassName("score");
for (var i = 0; i < scoreBtns.length; i++) {
  scoreBtns[i].addEventListener("click", score);
}

const score = e => {
  e.stopPropagation();

  ipcRenderer.send(constants.SCORE_EVENT, {
    team: this.dataset.team,
    increment: this.dataset.increment
  });
};

const faultBtns = document.getElementsByClassName("fault");
for (var i = 0; i < faultBtns.length; i++) {
  faultBtns[i].addEventListener("click", fault);
}

const fault = e => {
  e.stopPropagation();

  ipcRenderer.send(constants.FAULT_EVENT, {
    team: this.dataset.team,
    increment: this.dataset.increment
  });
};

ipcRenderer.on(constants.TIME_UPDATE_EVENT, (event, arg) => {
  document.getElementById("timer").innerHTML = arg;
});

ipcRenderer.on(constants.SCORE_UPDATE_EVENT, (event, args) => {
  document.getElementById("control-score-home").innerHTML =
    args.home > 9 ? args.home : "0" + args.home;
  document.getElementById("control-score-visitor").innerHTML =
    args.visitor > 9 ? args.visitor : "0" + args.visitor;
});

ipcRenderer.on(constants.FAULT_UPDATE_EVENT, (event, args) => {
  document.getElementById("control-faults-home").innerHTML =
    args.home > 9 ? args.home : "0" + args.home;
  document.getElementById("control-faults-visitor").innerHTML =
    args.visitor > 9 ? args.visitor : "0" + args.visitor;
});
