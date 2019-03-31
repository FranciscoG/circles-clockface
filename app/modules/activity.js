import document from "document";
import { me } from "appbit";
import { goals, today } from "user-activity";
import * as util from "../../common/utils";

/*********************************************
 * Calories
 */
const calProgress = util.getElements("arc-cal");
const textCal = document.getElementById("text-cal");
textCal.text = "--";


function setCalories() {
  let val = today.adjusted.calories || 0;
  textCal.text = val.toLocaleString();

  if (goals.calories) {
    calProgress.arc.sweepAngle = 0;
    calProgress.animateAngle.to = util.calcArc(val, goals.calories);
    calProgress.container.animate("enable");
  }
}

/*********************************************
 * Steps
 */

const stepsProgress = util.getElements("arc-steps");
const textSteps = document.getElementById("text-steps");
textSteps.text = "--";


function setSteps() {
  let val = today.adjusted.steps || 0;
  textSteps.text = val.toLocaleString();

  if (goals.steps) {
    stepsProgress.arc.sweepAngle = 0;
    stepsProgress.animateAngle.to = util.calcArc(val, goals.steps);
    stepsProgress.container.animate("enable");
  }
}

/****************************************************/

export function start() {
  if (me.permissions.granted("access_heart_rate")) {
    setCalories();
    setSteps();
  }
}
