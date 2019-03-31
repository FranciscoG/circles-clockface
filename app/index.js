import { display } from "display";

import * as time from "./modules/time";
import * as battery from "./modules/battery";
import * as heart from "./modules/heart";
import * as activity from "./modules/activity";


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
  }
});
