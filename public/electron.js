const { app, BrowserWindow, ipcMain } = require("electron");
const Timer = require("easytimer/dist/easytimer.min");
const Store = require("./store.js");

const path = require("path");
const isDev = require("electron-is-dev");

const store = new Store({
  configName: "user-preferences",
  defaults: {
    name: "Scoreboard",
    time: {
      secondTenths: 0,
      seconds: 0,
      minutes: 18,
      hours: 0
    }
  }
});

const timer = new Timer();
let time = store.get("time");

const constants = require("./constants");

let controller;
let display;

function createWindow() {
  const { screen } = require("electron");
  const ecran = screen.getPrimaryDisplay();
  const width = ecran.bounds.width;
  let teams = constants.DEFAULT_TEAMS;

  controller = new BrowserWindow({ width: 800, height: 450 });
  controller.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
  controller.setPosition(width / 2 - 400, 550);

  display = new BrowserWindow({ width: 800, height: 450 });
  display.loadURL(
    isDev ? "http://localhost:3000/#/display" : `file://${path.join(__dirname, "../build/index.html#/display")}`
  );
  display.setPosition(width / 2 - 400, 50);

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    // controller.webContents.openDevTools();
    // display.webContents.openDevTools();
  }

  controller.send(constants.TIME_UPDATE_EVENT, time);
  display.send(constants.TIME_UPDATE_EVENT, time);

  ipcMain.on("getTime", (event, arg) => {
    event.returnValue = time;
  });

  controller.on("closed", () => (controller = null));
  display.on("closed", () => (controller = null));

  /////// EVENTS ///////
  /* timer */
  timer.addEventListener("secondTenthsUpdated", e => {
    time = {
      secondTenths: timer.getTimeValues().secondTenths,
      seconds: timer.getTimeValues().seconds,
      minutes: timer.getTimeValues().minutes,
      hours: timer.getTimeValues().hours
    };

    controller.send(constants.TIME_UPDATE_EVENT, time);
    display.send(constants.TIME_UPDATE_EVENT, time);
  });
  timer.addEventListener("started", e => {
    controller.send("started");
  });
  /* windows */
  ipcMain.on(constants.SCORE_EVENT, (event, args) => {
    teams = {
      ...teams,
      [args.team]: {
        ...teams[args.team],
        [args.value]: args.increment ? teams[args.team][args.value] + 1 : teams[args.team][args.value] - 1
      }
    };

    controller.send(constants.SCORE_UPDATE_EVENT, teams);
    display.send(constants.SCORE_UPDATE_EVENT, teams);
  });

  ipcMain.on("start", (event, args) => {
    timer.start({
      countdown: true,
      startValues: time,
      precision: "secondTenths"
    });
  });

  ipcMain.on("pause", (event, args) => {
    timer.pause();
  });

  ipcMain.on("clockUpdate", (event, args) => {
    time = { ...time, [args.type]: args.increment ? time[args.type] + 1 : time[args.type] - 1 };

    store.set("time", time);

    controller.send(constants.TIME_UPDATE_EVENT, time);
    display.send(constants.TIME_UPDATE_EVENT, time);
  });

  ipcMain.on(constants.SCREEN_CHANGE_EVENT, (event, args) => {
    display.send(constants.SCREEN_CHANGE_EVENT);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (controller === null) {
    createWindow();
  }
});
