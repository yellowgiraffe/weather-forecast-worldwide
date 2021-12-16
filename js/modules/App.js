import create from '../utils/create.js';
import * as storage from '../utils/localStorage.js';
import Background from './Background.js';
import Location from './Location.js';

export default class App {
  constructor() {
    this.date = new Date();
    this.location = new Location();
    // this.weather = new Weather();
    this.background = new Background(this.date);
  }
  init() {
    this.background.set();
    this.updateBackground();
    // this.map.set(this.location.getCoords());
    this.location.get();
  }

  updateBackground() {
    const backgroundChangeBtn = document.querySelector('.header__bg-change-btn');
    backgroundChangeBtn.addEventListener('click', this.background.set);
  }
}
