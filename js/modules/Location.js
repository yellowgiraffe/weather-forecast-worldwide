import { MAPBOX_API_KEY } from "../apikeys.js";

export default class Location {
  getLocationPromise() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }

  get() {
    return this.getLocationPromise()
      .then((res) => {
        const { coords } = res;
        this.displayCoods(coords);
        this.displayMap([coords.longitude, coords.latitude]);
        this.getCityName(coords);
        return coords;
      })
      .catch((err) => {
        console.log(err)
        alert('No access to location')
      });
  }

  displayCoods(position) {
    const latitudeEl = document.querySelector('.side-bar__map-latitude');
    const longitudeEl = document.querySelector('.side-bar__map-longitude');

    latitudeEl.textContent = 'Latitude: ' + position.latitude.toFixed(4);
    longitudeEl.textContent = 'Longitude: ' + position.longitude.toFixed(4);
  }

  displayMap(center) {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 9,
      });
  
    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav);
  
    const marker1 = new mapboxgl.Marker();
    marker1.setLngLat(center).addTo(map);
  }

  getCityName(coords) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${MAPBOX_API_KEY}`;

    fetch(url)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const country = data.features[0].context[3].text;
        const city = data.features[0].context[1].text;

        const countryEl = document.querySelector('.weather__country');
        const cityEl = document.querySelector('.weather__city');

        cityEl.textContent = city;
        countryEl.textContent = country;
      })
  }
};
