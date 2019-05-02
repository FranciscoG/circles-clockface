import document from "document";
import * as messaging from "messaging";
import { Watcher } from "../../common/utils";
import * as router from "../../common/message-router";

const temp = document.getElementById("temp-num");
const unit = document.getElementById("temp-unit");

// Display the weather data received from the companion
function updateUI(data) {
  // @TODO finish this part
  console.log("weather response: " + JSON.stringify(data));

  temp.text = `${Math.round(data.main.temp)}°`;
  unit.text = "F";
}

// send message to the companion to make OpenWeatherMap api request
function getWeather() {
  // tell the companion app to begin polling weather
  router.send("get_weather");
}

// Listen for the onopen event
messaging.peerSocket.onopen = getWeather;
router.on("weather_data").then(updateUI);

const weather = new Watcher(getWeather, 60 * 60 * 1000);

export default weather;
