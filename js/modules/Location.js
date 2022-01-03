import { MAPBOX_API_KEY } from '../apikeys.js';

export default class Location {
  getUserLocationPromise() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
      );
    });
  }

  get() {
    return this.getUserLocationPromise()
      .then((res) => {
        const { coords } = res;
        this.displayCoods(coords);
        this.displayMap([coords.longitude, coords.latitude]);
        this.getCityName(coords);
        return coords;
      })
      .catch(() => {
        const coords = {
          latitude: 52.237049,
          longitude: 21.017532,
        };
        this.displayCoods(coords);
        this.displayMap([coords.longitude, coords.latitude]);
        this.getCityName(coords);
        alert('Access to your location is denied. Your default city is Warsaw');
        return coords;
      });
  }

  displayCoods(position) {
    const latitudeEl = document.querySelector('.side-bar__map-latitude');
    const longitudeEl = document.querySelector('.side-bar__map-longitude');

    latitudeEl.textContent = `Latitude: ${position.latitude.toFixed(4)}`;
    longitudeEl.textContent = `Longitude: ${position.longitude.toFixed(4)}`;
  }

  displayMap(center) {
    mapboxgl.accessToken = MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 9,
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const marker1 = new mapboxgl.Marker();
    marker1.setLngLat(center).addTo(map);
  }

  getCityName(coords) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?language=en&access_token=${MAPBOX_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        Object.keys(data.features).forEach((el) => {
          if (data.features[el].id.includes('place')) {
            const city = data.features[el].text;
            const cityEl = document.querySelector('.weather__city');
            cityEl.textContent = city;
          }
          if (data.features[el].id.includes('country')) {
            const country = data.features[el].text;
            const countryEl = document.querySelector('.weather__country');
            countryEl.textContent = country;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
