import { battery } from "power";
import document from "document";
import * as util from "../../common/utils";

// minutes arc and animation
const batteryProgress = util.getElements("arc-battery");

// separate text element
const batteryText = document.getElementById("text-battery");

function setBatteryLevel() {
  let levelNum = Math.floor(battery.chargeLevel);
  let level = `${levelNum}%`;
  batteryText.text = level;

  batteryProgress.arc.sweepAngle = 0;
  batteryProgress.animateAngle.to = util.calcArc(levelNum, 100);
  batteryProgress.container.animate("enable");
}

export function start() {
  setBatteryLevel();
  battery.onchange = setBatteryLevel;
}

export function stop() {
  battery.onchange = void 0;
}