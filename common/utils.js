import document from "document";

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

/**
 * get arc length based on total number of steps
 */
export function calcArc(current, steps) {
  let angle = (360 / steps) * current;
  return angle > 360 ? 360 : angle;
}

/**
 * get the 3 elements needed to animate an arc
 */
export function getElements(containerId) {
  const container = document.getElementById(containerId);
  const animateAngle = container.getElementById("animateAngle");
  const arc = container.getElementsByTagName("arc")[0];

  return {
    container,
    animateAngle,
    arc
  };
}

/**
 * 
 * @param {function} callback function to call at each interval
 * @param {number} interval interval time in ms
 */
export class Watcher {
  constructor(callback, interval) {
    this.watchID = null;
    this.interval = interval || 10000;
    this.callback = callback;
  }

  start() {
    if (!this.watchID) {
      this.callback();
      this.watchID = setInterval(this.callback, this.interval);
    }
  }

  stop() {
    clearInterval(this.watchID);
    this.watchID = null;
  }
}
