import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

const hoursPref = preferences.clockDisplay === "12h" ? 12 : 24;

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const hour = document.getElementById("hour");
const hourArc = document.getElementById("arc-hours");
const minutes = document.getElementById("minutes");
const minutesArc = document.getElementById("arc-minutes");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (hoursPref === 12) {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());

  hour.text = `${hours}`;
  minutes.text = `${mins}`;

  hourArc.sweepAngle = util.calcArc(hours, hoursPref);
  minutesArc.sweepAngle = util.calcArc(mins, 60);
}
