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