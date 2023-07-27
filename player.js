export class Player {
  constructor(name) {
    this.name = name;
    this.silver = 0;
    this.gold = 0;
    this.items = [];
  }
  getName() {
    console.log(this.name);
  }
}
