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
    this.getLocationPromise()
      .then((res) => {
        const { coords } = res;
        this.displayCoods(coords);
        this.displayMap([coords.longitude, coords.latitude]);
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
};
