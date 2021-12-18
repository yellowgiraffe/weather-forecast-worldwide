import create from '../utils/create.js';
import * as storage from '../utils/localStorage.js';
import Background from './Background.js';
import Weather from './Weather.js';

export default class App {
  constructor() {
    this.date = new Date();
    this.background = new Background(this.date);
    // this.location = new Location();
    this.weather = new Weather();
  }
  init() {
    this.background.set();
    this.updateBackground();
    this.weather.getUserLocation();
  }

  updateBackground() {
    const backgroundChangeBtn = document.querySelector('.header__bg-change-btn');
    backgroundChangeBtn.addEventListener('click', this.background.set);
  }
}
