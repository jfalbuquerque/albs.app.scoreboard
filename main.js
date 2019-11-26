const { app, ipcMain, screen } = require("electron");
const Window = require("./Window");
const constants = require("./constants");
const Timer = require("easytimer/dist/easytimer.min");

const timer = new Timer();

const results = {
  home: 0,
  visitor: 0
};

const faults = {
  home: 0,
  visitor: 0
};

function main() {
  const display = screen.getPrimaryDisplay();
  const width = display.bounds.width;

  let mainWindow = new Window({
    file: "./renderer/controller/index.html"
  });
  mainWindow.setPosition(width / 2 - 400, 550);

  let secondWindow = new Window({
    file: "./renderer/display/display.html"
  });
  secondWindow.setPosition(width / 2 - 400, 50);

  timer.addEventListener("secondTenthsUpdated", e => {
    const time = `${timer
      .getTimeValues()
      .minutes.toString()}:${timer.getTimeValues().seconds.toString()}`;

    mainWindow.send(constants.TIME_UPDATE_EVENT, time);
    secondWindow.send(constants.TIME_UPDATE_EVENT, time);
  });

  ipcMain.on(constants.START_EVENT, (event, args) => {
    console.log("start", args);
    timer.start(
      !args && {
        countdown: true,
        startValues: { minutes: 18 },
        precision: "secondTenths"
      }
    );
  });

  ipcMain.on(constants.PAUSE_EVENT, () => {
    timer.pause();
  });

  ipcMain.on(constants.TIME_EVENT, (event, arg) => {
    mainWindow.send(constants.TIME_EVENT, arg);
  });

  ipcMain.on(constants.SCORE_EVENT, (event, arg) => {
    console.log("event", constants.SCORE_EVENT);
    if (arg.increment === "true") {
      results[arg.team]++;
    } else if (results[arg.team] > 0) {
      results[arg.team]--;
    }

    secondWindow.send(constants.SCORE_UPDATE_EVENT, results);
    mainWindow.send(constants.SCORE_UPDATE_EVENT, results);
  });

  ipcMain.on(constants.FAULT_EVENT, (event, arg) => {
    console.log("event", constants.FAULT_EVENT);
    if (arg.increment === "true") {
      faults[arg.team]++;
    } else if (faults[arg.team] > 0) {
      faults[arg.team]--;
    }

    secondWindow.send(constants.FAULT_UPDATE_EVENT, faults);
    mainWindow.send(constants.FAULT_UPDATE_EVENT, faults);
  });
}

app.on("ready", main);

app.on("window-all-closed", () => {
  app.quit();
});
