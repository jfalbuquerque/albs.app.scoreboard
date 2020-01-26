//const electron = require("electron");
const { app, BrowserWindow, ipcMain } = require("electron");
//const app = electron.app;
//const ipcMain = electron.ipcMain;
//const screen = electron.screen;
//const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let controller;
let display;

function createWindow() {
  /* controller = new BrowserWindow({ width: 900, height: 680 });
  controller.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

  display = new BrowserWindow({ width: 900, height: 680 });
  display.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`); */

  /* const ecran = screen.getPrimaryDisplay();
  const width = ecran.bounds.width; */

  controller = new BrowserWindow({ width: 800, height: 450 });
  controller.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
  //controller.setPosition(width / 2 - 400, 550);

  display = new BrowserWindow({ width: 800, height: 450 });
  display.loadURL(
    isDev ? "http://localhost:3000/#/display" : `file://${path.join(__dirname, "../build/index.html#/display")}`
  );
  //display.setPosition(width / 2 - 400, 50);

  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    controller.webContents.openDevTools();
    display.webContents.openDevTools();
  }
  controller.on("closed", () => (controller = null));
  display.on("closed", () => (controller = null));

  /////// EVENTS
  ipcMain.on("start", (event, args) => {
    console.log("start", args);
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
