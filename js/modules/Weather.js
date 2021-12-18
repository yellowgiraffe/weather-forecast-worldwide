import Location from './Location.js';
import { WEATHER_API_KEY } from "../apikeys.js";

export default class Weather {
  constructor() {
    this.location = new Location();
  }
  getCurrentWeather() {
    //
  }

  test() {
    this.location.get()
      .then((position) => {
        console.log(position)
        console.log([position.coords.latitude, position.coords.longitude])
        return [position.coords.latitude, position.coords.longitude]
      })
      .catch((err) => {
        console.log(err);
      })
  }


}