// import create from '../utils/create.js';
import { UNSPLASH_API_KEY } from "../apikeys.js";

export default class Background {
  constructor(hour, month) {
    this.hour = hour;
    this.month = month;

    const weatherAppElement = document.querySelector('.weather-app');

    const defaultTime = new Date();

    if (hour === undefined) { hour = defaultTime.getHours();}
    if (month === undefined) { month = defaultTime.getMonth() + 1; }

    let timeOfDay;
    let season;
    let query;

    if (hour >= 6 && hour <= 12) {
      timeOfDay = 'morning'
    } else if (hour > 12 && hour <= 18) {
      timeOfDay = 'daylight'
    } else if (hour > 18 && hour <= 23) {
      timeOfDay = 'evening'
    } else {
      timeOfDay = 'night'
    }

    if (month >= 12 && month <= 2) {
      season = 'winter'
    } else if (month >= 3 && month <= 5) {
      season = 'spring'
    } else if (month >= 6 && month <= 8) {
      season = 'summer'
    } else {
      season = 'autumn'
    }
    
    console.log(UNSPLASH_API_KEY)
    query = `${season} ${timeOfDay} nature`;

    const baseUnplash = `https://api.unsplash.com/photos/random/?query=${query}&orientation=landscape&client_id=${UNSPLASH_API_KEY}`

    fetch(baseUnplash)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        weatherAppElement.style.backgroundImage = `url('${data.urls.regular}')`;
      })
  }

  // setBgImage(hour, month) {
  //   const defaultTime = new Date();
  //   if (hour === undefined) { hour = defaultTime.getHours();}
  //   if (month === undefined) { month = defaultTime.getMonth() + 1; }

  //   let timeOfDay;
  //   let season;
  //   let query;

  //   if (hour >= 6 && hour <= 12) {
  //     timeOfDay = 'morning'
  //   } else if (hour > 12 && hour <= 18) {
  //     timeOfDay = 'daylight'
  //   } else if (hour > 18 && hour <= 23) {
  //     timeOfDay = 'evening'
  //   } else {
  //     timeOfDay = 'night'
  //   }

  //   if (month >= 12 && month <= 2) {
  //     season = 'winter'
  //   } else if (month >= 3 && month <= 5) {
  //     season = 'spring'
  //   } else if (month >= 6 && month <= 8) {
  //     season = 'summer'
  //   } else {
  //     season = 'autumn'
  //   }
    
  //   query = `${season} ${timeOfDay} nature`;

  //   const baseUnplash = `https://api.unsplash.com/photos/random/?query=${query}&orientation=landscape&client_id=F7PfvDiGf2Q40MFWmgrttVXfo-yKVLhbsitrsUGnWvg`

  //   fetch(baseUnplash)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       weatherAppElement.style.backgroundImage = `url('${data.urls.regular}')`;
  //     })
  // }
}
