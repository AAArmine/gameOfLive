let Creature = require("./creature.js");

module.exports = class Predator extends Creature {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 8;
    this.directions = [];
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }

  move() {
    this.energy--;
    var newCell = this.selectRandomCell(0); 
    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newY][newX] = 3;
      matrix[this.y][this.x] = 0;
      this.x = newCell[0];
      this.y = newCell[1];
    }
    if (this.energy <= 0) {
      this.die();
    }
  }

  eat() {
    var selectGrassEater = this.selectRandomCell(2); 
    if (selectGrassEater) {
      this.energy++;
      matrix[this.y][this.x] = 0;
      this.x = selectGrassEater[0];
      this.y = selectGrassEater[1];
      matrix[selectGrassEater[1]][selectGrassEater[0]] = 3;
      for (var i in grassEaterArr) {
        if (
          selectGrassEater[0] == grassEaterArr[i].x &&
          selectGrassEater[1] == grassEaterArr[i].y
        ) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
      if (this.energy >= 3) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  mul() {
    this.multiply++;
    var newCell = this.selectRandomCell(0); 
    if (this.multiply >= 2 && newCell) {
      var newPredator = new Predator(newCell[0], newCell[1], this.index);
      predatorArr.push(newPredator);
      matrix[newCell[1]][newCell[0]] = 3;
      this.multiply = 0;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
        break;
      }
    }
  }
};
