export default class OpenWeatherAPI {
  baseUrl = "https://api.openweathermap.org/data/2.5";

  constructor(apiKey) {
    this.apiKey = apiKey;
    this.units = "imperial";
  }

  setUnit(useCelsius) {
    if (useCelsius === "true") {
      this.units = "metric";
    } else {
      this.units = "imperial";
    }
  }

  useCity(city) {
    this.query = `q=${city}`;
  }

  useCoords(lat, lon) {
    this.query = `lat=${lat}&lon=${lon}`;
  }

  getWeather() {
    return this.request("weather");
  }

  getForecast() {
    return this.request("forecast/hourly");
  }

  request(endpoint) {
    if (!this.query) {
      throw new Error('Query not set. use useCity or useCoords methods');
    }
    if (!this.apiKey) {
      throw new Error('Missing Open Weather Map API Key');
    }

    const url = `${this.baseUrl}/${endpoint}?${this.query}&units=${
      this.units
    }&APPID=${this.apiKey}`;

    console.log(url);

    return fetch(url)
      .then(function(response){
        if (!response.ok) throw new Error(`Response status is ${response.status}`);
        return response.json();
      });
  }
}
