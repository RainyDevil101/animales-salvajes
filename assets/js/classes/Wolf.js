import {Animal} from './index.js';

export class Wolf extends Animal {
  constructor(name, age, img, comments, sound) {
    super(name, age, img, comments, sound);
  }

  howl() {
    return this.sound;
  }
}
