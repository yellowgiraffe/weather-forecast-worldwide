// import create from '../utils/create.js';
import { UNSPLASH_API_KEY } from "../apikeys.js";
import { get } from "../utils/localStorage.js";

export default class Background {
  constructor(date) {
    this.date = date;
  }

  getMonth() {
    const month = this.date.getMonth() + 1;

    if (month == 12 || month <= 2) {
      return 'winter'
    } else if (month >= 3 && month <= 5) {
      return 'spring'
    } else if (month >= 6 && month <= 8) {
      return 'summer'
    } else {
      return 'autumn'
    }
  }

  set() {
    const query = this.getMonth();
    const url = `https://api.unsplash.com/photos/random/?query=${query}&collections=2cO3esWySUQ&orientation=landscape&client_id=${UNSPLASH_API_KEY}`

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weatherAppElement = document.querySelector('.weather-app')
        weatherAppElement.style.backgroundImage = `url('${data.urls.full}')`;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  update() {
    const backgroundChangeBtn = document.querySelector('.header__bg-change-btn');
    backgroundChangeBtn.addEventListener('click', this.set);
  }
};
