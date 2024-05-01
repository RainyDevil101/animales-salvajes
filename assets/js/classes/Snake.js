import {Animal} from './index.js';

export class Snake extends Animal {
  constructor(name, age, img, comments, sound) {
    super(name, age, img, comments, sound);
  }

  sss() {
    return this.sound;
  }
}
