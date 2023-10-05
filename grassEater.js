let Creature = require("./creature.js");

module.exports = class GrassEater extends Creature {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 12;
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
    const newCell = this.selectRandomCell(0); 
    if (newCell) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newY][newX] = 2;
      matrix[this.y][this.x] = 0;
      this.x = newCell[0];
      this.y = newCell[1];
    }
    if (this.energy <= 0) {
      this.die();
    }
  }

  eat() {
    let selectGrass = this.selectRandomCell(1); 
    if (selectGrass) {
      this.energy++;
      matrix[this.y][this.x] = 0;
      this.x = selectGrass[0];
      this.y = selectGrass[1];
      matrix[selectGrass[1]][selectGrass[0]] = 2;
      for (var i in grassArr) {
        if (
          selectGrass[0] == grassArr[i].x &&
          selectGrass[1] == grassArr[i].y
        ) {
          grassArr.splice(i, 1);
          break;
        }
      }
      if (this.energy >= 5) {
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
      var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
      grassEaterArr.push(newGrassEater);
      matrix[newCell[1]][newCell[0]] = 2;
      this.multiply = 0;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
};
