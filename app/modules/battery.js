import { battery } from "power";
import { display } from "display";
import document from "document";
import * as util from "../../common/utils";

const batteryArc = document.getElementById('arc-battery');
const batteryText = document.getElementById('text-battery');

let watchID;

export default function initialize() {
  setBatteryLevel();

  display.addEventListener("change", () => {
    if (display.on) {
      start();
    } else {
      stop();
    }
  });
}

function setBatteryLevel() {
  let levelNum = Math.floor(battery.chargeLevel);
  let level = `${levelNum}%`;
  batteryArc.sweepAngle = util.calcArc(levelNum, 100);
  batteryText.text = level;
}

function start() {
  if (!watchID) {
    setBatteryLevel();
    watchID = setInterval(setBatteryLevel, 5000);
  }
}

function stop() {
  clearInterval(watchID);
  watchID = null;
}