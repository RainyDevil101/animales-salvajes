import { Animal } from './index.js';

export class Bear extends Animal {
  constructor(name, age, img, comments, sound) {
    super(name, age, img, comments, sound);
  }

  growl() {
    return this.sound;
  }
}
