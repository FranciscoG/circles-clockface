import * as messaging from "messaging";
import { Watcher } from "../../common/utils";

// Display the weather data received from the companion
function updateUI(data) {
  // @TODO finish this part
  console.log("weather response: " + JSON.stringify(data));
}

// send message to the companion to make OpenWeatherMap api request
function getWeather() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: "weather"
    });
  }
}

// Listen for the onopen event
messaging.peerSocket.onopen = getWeather;

// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command === "weather_data") {
    updateUI(evt.data);
  }
};

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
};

const weather = new Watcher(getWeather, 60 * 60 * 1000);

export default weather;
