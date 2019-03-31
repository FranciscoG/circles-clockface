import { HeartRateSensor } from "heart-rate";
import document from "document";
import { me } from "appbit";

// https://dev.fitbit.com/build/guides/sensors/heart-rate/#automatically-stopping-and-starting

let textHrElem = document.getElementById("text-hr");
let hrm = null;

function setHRtext() {
  textHrElem.text = `${hrm.heartRate}`;
}

function init() {
  hrm = new HeartRateSensor();
  hrm.addEventListener("reading", setHRtext);
}

if (me.permissions.granted("access_heart_rate")) {
  init();
} else {
  textHrElem = "--";
}

export function start() {
  if (hrm) {
    hrm.start();
  }
}

export function stop() {
  if (hrm) {
    hrm.stop();
  }
}
