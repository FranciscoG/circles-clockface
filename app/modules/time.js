import clock from "clock";
import document from "document";
import * as util from "../../common/utils";
import * as router from "../../common/message-router";

// Update the clock every minute
clock.granularity = "minutes";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// hour texts (12h and 24h both displayed in this clockface)
const hourTop = document.getElementById("hour-top");
const hourBtm = document.getElementById("hour-bottom");
// hour progress arc
// const hourArc = document.getElementById("arc-hours");
const hourProgress = util.getElements("arc-hours");

// minutes text
const minutesText = document.getElementById("text-minutes");
// minutes arc and animation
const minutesProgress = util.getElements("arc-minutes");

// date
const dayOfWeelElem = document.getElementById('date-name');
const monthElem = document.getElementById('date-month');
const dayElem = document.getElementById('date-day');

let today;

function updateDate() {
  if (!today) { return; }

  let dayOfWeek = days[today.getDay()];
  dayOfWeelElem.text = dayOfWeek;

  let month = months[today.getMonth()];
  monthElem.text = month;

  let day = today.getDate();
  dayElem.text = day;
}


function updateTime(doAnimation = false) {
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());

  let hours_to_12 = hours % 12 || 12;
  let hours_to_24 = util.zeroPad(hours);

  hourTop.text = `${hours_to_12}`;
  hourBtm.text = `${hours_to_24}`;
  
  minutesText.text = `${mins}`;
  
  let minAngle = util.calcArc(mins, 60);

  if (doAnimation) {
    minutesProgress.arc.sweepAngle = 0;
    minutesProgress.animateAngle.to = minAngle;
    minutesProgress.container.animate("enable");

    hourProgress.arc.sweepAngle = 0;
    hourProgress.animateAngle.to = util.calcArc(hours_to_12, 12);
    hourProgress.container.animate("enable");
  } else {
    minutesProgress.arc.sweepAngle = minAngle;
    hourProgress.arc.sweepAngle = util.calcArc(hours_to_12, 12);
  }
}

function onEachMinute(evt) {
  today = evt.date;
  updateTime()
  updateDate();
}

export function start() {
  today = new Date();
  updateTime(true); // only animate once when display turns on
  clock.ontick = onEachMinute;
}

export function stop() {
  clock.ontick = void 0;
}