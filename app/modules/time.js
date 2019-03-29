import clock from "clock";
import document from "document";
import * as util from "../../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const hour12elem = document.getElementById("hour-12");
const hour24elem = document.getElementById("hour-24");
const hourArc = document.getElementById("arc-hours");
const minutesElem = document.getElementById("minutes");
const minutesArc = document.getElementById("arc-minutes");


function init() {
  // Update the <text> element every tick with the current time
  clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    let mins = util.zeroPad(today.getMinutes());
    
    let hours_to_12 = hours % 12 || 12;
    let hours_to_24 = util.zeroPad(hours);

    hour12elem.text = `${hours_to_12}`;
    hour24elem.text = `${hours_to_24}`;
    minutesElem.text = `${mins}`;
    
    hourArc.sweepAngle = util.calcArc(hours_to_12, 12);
    minutesArc.sweepAngle = util.calcArc(mins, 60);
  }
}


export default init;