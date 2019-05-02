import * as simpleSettings from "./companion-settings";
import * as router from "../common/message-router";
import OpenWeatherAPI from "./OpenWeatherAPI";
import { settingsStorage } from "settings";
import { geolocation } from "geolocation";

const positionOpts = {
  enableHighAccuracy: false,
  maximumAge: 30 * 60 * 1000, // 30min
  timeout: 10000
};

// get api key
var key = settingsStorage.getItem("userAPIKey");
const api = new OpenWeatherAPI();

try {
  let keyVal = JSON.parse(key);
  api.apiKey = keyVal.name;
} catch (e) {
  console.log(e.message);
}

simpleSettings.init(function(data) {
  // update api key if it changes
  if (data.key === "userAPIKey") {
    try {
      api.apiKey = data.value.name;
    } catch (e) {
      console.log(e.message);
    }
  }

  if (data.key === "useCelsius") {
    api.setUnit(data.value);
  }
});

function getPosition() {
  return new Promise(function(resolve, reject) {
    geolocation.getCurrentPosition(resolve, reject, positionOpts);
  });
}

// Send the weather data to the device
function returnWeatherData(data) {
  router.send("weather_data", data);
  settingsStorage.removeItem("weatherError");
}

router.on("get_weather").then(function() {
  getPosition()
    .then(function(position) {
      api.useCoords(position.coords.latitude, position.coords.longitude);
      api
        .getWeather()
        .then(returnWeatherData)
        .catch(function(err) {
          settingsStorage.setItem("weatherError", err.message);
        });
    })
    .catch(function(err) {
      settingsStorage.setItem("weatherError", err.message);
    });
});
