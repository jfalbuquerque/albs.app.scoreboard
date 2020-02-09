const DEFAULT_TIME = {
  secondTenths: 0,
  seconds: 0,
  minutes: 0,
  hours: 0
};

const DEFAULT_TEAMS = {
  home: { result: 0, faults: 0, name: "Home" },
  visitor: { result: 0, faults: 0, name: "Visitor" }
};

const TIME_UPDATE_EVENT = "time_update";
const SCORE_EVENT = "score";
const SCORE_UPDATE_EVENT = "score_update";
const SCREEN_CHANGE_EVENT = "screen_change";

module.exports = {
  DEFAULT_TIME,
  DEFAULT_TEAMS,
  TIME_UPDATE_EVENT,
  SCORE_EVENT,
  SCORE_UPDATE_EVENT,
  SCREEN_CHANGE_EVENT
};
