import * as storage from '../utils/localStorage.js';
import Background from './Background.js';
import Weather from './Weather.js';
import Location from './Location.js';
import { MAPBOX_API_KEY, WEATHER_API_KEY } from '../apikeys.js';

export default class App {
  constructor() {
    this.background = new Background();
    this.weather = new Weather();
    this.location = new Location();
  }
  init() {
    this.background.set();
    this.weather.getUserLocation();
    this.listenToClicks();
  }

  listenToClicks() {
    this.updateBackground();
    this.searchLocation();
    this.weather.changeWeatherUnits();
  }

  updateBackground() {
    const backgroundChangeBtn = document.querySelector('.header__bg-change-btn');
    backgroundChangeBtn.addEventListener('click', this.background.set);
  }

  // searchAutocomplite() {
  //   mapboxgl.accessToken = MAPBOX_API_KEY;
  //   const geocoder = new MapboxGeocoder({
  //     accessToken: mapboxgl.accessToken,
  //     types: 'country,region,place,postcode,locality,neighborhood'
  //   });
    
  //   geocoder.addTo('#geocoder');
    
  //   const results = document.querySelector('header__search-result');
    
  //   geocoder.on('result', (e) => {
  //   results.innerText = JSON.stringify(e.result, null, 2);
  //   });

  //   geocoder.on('clear', () => {
  //   results.innerText = '';
  //   });
  // }

  searchLocation() {
    // this.searchAutocomplite();
    const searchBtn = document.querySelector('.header__search-btn');
    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const searchInput = document.querySelector('.header__search-input');
      let city = searchInput.value;

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${MAPBOX_API_KEY}&autocomplete=true&fuzzyMatch=false`;

      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((dataJson) => {
          // console.log(dataJson.features)
          const coords = {
            latitude: dataJson.features[0].center[1],
            longitude: dataJson.features[0].center[0]
          }

          this.location.displayCoods(coords);
          this.location.displayMap([coords.longitude, coords.latitude]);
          this.location.getCityName(coords);

          this.weather.getWeatherData(coords.latitude, coords.longitude);
          searchInput.value = '';
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
}
