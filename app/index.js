import * as simpleSettings from "./modules/device-settings";

import { display } from "display";

import * as time from "./modules/time";
import * as battery from "./modules/battery";
import * as heart from "./modules/heart";
import activity from "./modules/activity";

import weather from "./modules/weather";

/**
 * all actions must export a `start` and `stop` method
 */
const modules = [time, battery, heart, activity];

function update() {
  modules.forEach(mod => {
    mod.start();
  })
}
function pause() {
  modules.forEach(mod => {
    mod.stop();
  })
}

if (display.on) {
  update();
}

display.addEventListener("change", function() {
  if (display.on) {
    update();
  } else {
    pause();
  }
});

// weather updates every hour and so doesn't need to be start/stopped
weather.start();

// initialize local storage of settings
simpleSettings.initialize();
