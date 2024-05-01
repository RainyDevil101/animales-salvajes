import {Animal} from './index.js';

export class Hawk extends Animal {
  constructor(name, age, img, comments, sound) {
    super(name, age, img, comments, sound);
  }

  scream() {
    return this.sound;
  }
}
