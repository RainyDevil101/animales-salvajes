export class Animal {
  constructor(name, age, img, comments, sound) {
    this.name = name;
    this.age = age;
    this.img = img;
    this.comments = comments;
    this.sound = sound;
  }

  get getName() {
    return this.name;
  }

  get getAge() {
    return this.age;
  }

  get getImg() {
    return this.img;
  }

  get getComments() {
    return this.comments;
  }

  get getSound() {
    return this.sound;
  }
}
