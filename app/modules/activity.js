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

let lastCalReading;

function setCalories() {
  let val = today.adjusted.calories || 0;
  lastCalReading = val;
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

let lastStepReading;

function setSteps() {
  let val = today.adjusted.steps || 0;
  lastStepReading = val;
  textSteps.text = val.toLocaleString();

  if (goals.steps) {
    stepsProgress.arc.sweepAngle = 0;
    stepsProgress.animateAngle.to = util.calcArc(val, goals.steps);
    stepsProgress.container.animate("enable");
  }
}

/****************************************************/

const checkActivity = new util.Watcher(function(){
  if (!me.permissions.granted("access_heart_rate")) { return; }
  
  if (today.adjusted.calories !== lastCalReading) {
    setCalories();
  }
  if (today.adjusted.steps !== lastStepReading) {
    setSteps();
  }
});

export default checkActivity;