const { app, BrowserWindow, ipcMain } = require("electron");
const Timer = require("easytimer/dist/easytimer.min");

const path = require("path");
const isDev = require("electron-is-dev");
const timer = new Timer();

const constants = require("./constants");

let controller;
let display;

function createWindow() {
  const { screen } = require("electron");
  const ecran = screen.getPrimaryDisplay();
  const width = ecran.bounds.width;

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

  controller.on("closed", () => (controller = null));
  display.on("closed", () => (controller = null));

  /////// EVENTS
  timer.addEventListener("secondTenthsUpdated", e => {
    const time = `${timer.getTimeValues().minutes.toString()}:${timer.getTimeValues().seconds.toString()}`;

    controller.send(constants.TIME_UPDATE_EVENT, time);
    display.send(constants.TIME_UPDATE_EVENT, time);
  });

  ipcMain.on("start", (event, args) => {
    console.log("start", args);

    timer.start({
      countdown: true,
      startValues: { minutes: 18 },
      precision: "secondTenths"
    });
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
