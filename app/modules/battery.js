import { battery } from "power";
import { display } from "display";
import document from "document";
import * as util from "../../common/utils";

// minutes arc and animation
const batteryContainer = document.getElementById("arc-battery");
const batteryAnim = batteryContainer.getElementById("animate");
const batteryArc = batteryContainer.getElementsByTagName("arc")[0];

// separate text element
const batteryText = document.getElementById('text-battery');

export default function initialize() {
  if (display.on) {
    setBatteryLevel();
    battery.onchange = setBatteryLevel;
  }

  display.addEventListener("change", () => {
    if (display.on) {
      setBatteryLevel();
      battery.onchange = setBatteryLevel;
    } else {
      battery.onchange = void(0);
    }
  });
}

function setBatteryLevel() {
  let levelNum = Math.floor(battery.chargeLevel);
  let level = `${levelNum}%`;
  batteryText.text = level;
  
  batteryArc.sweepAngle = 0;
  batteryAnim.to = util.calcArc(levelNum, 100);
  batteryArc.animate("enable");
}