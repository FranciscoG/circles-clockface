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
  const animate = container.getElementById("animate");
  const arc = container.getElementsByTagName("arc")[0];
  return {
    container,
    animate,
    arc
  };
}