import {Animal} from './index.js';

export class Lion extends Animal {
  constructor(name, age, img, comments, sound) {
    super(name, age, img, comments, sound);
  }

  roar() {
    return this.sound;
  }
}
