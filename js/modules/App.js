import create from '../utils/create.js';
import * as storage from '../utils/localStorage.js';
import Background from './Background.js';

export default class App {
  init() {
    new Background();
  }
}
