import { display } from "display";

import * as time from "./modules/time";
import * as battery from "./modules/battery";
import * as heart from "./modules/heart";
import activity from "./modules/activity";
import * as simpleSettings from "./modules/device-settings";

if (display.on) {
  time.start();
  battery.start();
  heart.start();
  activity.start();
}

display.addEventListener("change", function() {
  
  if (display.on) {
    time.start();
    battery.start();
    heart.start();
    activity.start();
  } else {
    time.stop();
    battery.stop();
    heart.stop();
    activity.stop();
  }
});

/* -------- SETTINGS -------- */
function settingsCallback(data) {
  if (!data) {
    return;
  }
  /**
   * Setup weather API and/or location
   */
}
simpleSettings.initialize(settingsCallback);
