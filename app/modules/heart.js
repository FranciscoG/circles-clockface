import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import document from "document";

const textHrElem = document.getElementById("text-hr");
let hrm;

// https://dev.fitbit.com/build/guides/sensors/heart-rate/#automatically-stopping-and-starting
export default function initialize() {
  hrm = new HeartRateSensor();
  hrm.addEventListener("reading", setHRtext);
  display.addEventListener("change", function() {
    // Automatically stop the sensor when the screen is off to conserve battery
    display.on ? hrm.start() : hrm.stop();
  });
  hrm.start();
}

function setHRtext() {
  textHrElem.text = `${hrm.heartRate}`;
}
