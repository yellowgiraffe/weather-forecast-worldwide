import { UNSPLASH_API_KEY } from '../apikeys.js';

export default class Background {
  constructor() {
    this.date = new Date();
    this.query = null;
  }

  getMonth() {
    const month = this.date.getMonth() + 1;

    if (month === 12 || month <= 2) {
      this.query = 'HjUOZVNHXDg';
    } else if (month >= 3 && month <= 5) {
      this.query = 'DMhhgSDGBg8';
    } else if (month >= 6 && month <= 8) {
      this.query = '15PiWPEFqkE';
    } else {
      this.query = '7C1isvBWq1o';
    }
  }

  set() {
    this.getMonth();
    const url = `https://api.unsplash.com/photos/random/?collections=${this.query}&orientation=landscape&client_id=${UNSPLASH_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weatherAppElement = document.querySelector('.weather-app');
        weatherAppElement.style.backgroundImage = `url('${data.urls.full}')`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update() {
    const backgroundChangeBtn = document.querySelector('.header__bg-change-btn');
    backgroundChangeBtn.addEventListener('click', () => {
      this.set();
    });
  }
}
