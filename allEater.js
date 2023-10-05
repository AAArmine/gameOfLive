let Creature = require("./creature.js");

module.exports = class AllEater extends Creature {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 2;
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
      matrix[newY][newX] = 4;
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
    var selectGrass = this.selectRandomCell(1); 

    if (selectGrassEater || selectGrass) {
      this.energy++;
      matrix[this.y][this.x] = 0;
      if (selectGrassEater && selectGrass) {
        const choseFood = Math.random();
        if (choseFood < 0.5) {
          this.x = selectGrassEater[0];
          this.y = selectGrassEater[1];
          matrix[selectGrassEater[1]][selectGrassEater[0]] = 4;
          for (var i in grassEaterArr) {
            if (
              selectGrassEater[0] == grassEaterArr[i].x &&
              selectGrassEater[1] == grassEaterArr[i].y
            ) {
              grassEaterArr.splice(i, 1);
              break;
            }
          }
        } else {
          this.x = selectGrass[0];
          this.y = selectGrass[1];
          matrix[selectGrass[1]][selectGrass[0]] = 4;
          for (var i in grassArr) {
            if (
              selectGrass[0] == grassArr[i].x &&
              selectGrass[1] == grassArr[i].y
            ) {
              grassArr.splice(i, 1);
              break;
            }
          }
        }
      } else if (selectGrassEater) {
        this.x = selectGrassEater[0];
        this.y = selectGrassEater[1];
        matrix[selectGrassEater[1]][selectGrassEater[0]] = 4;
        for (var i in grassEaterArr) {
          if (
            selectGrassEater[0] == grassEaterArr[i].x &&
            selectGrassEater[1] == grassEaterArr[i].y
          ) {
            grassEaterArr.splice(i, 1);
            break;
          }
        }
      } else if (selectGrass) {
        this.x = selectGrass[0];
        this.y = selectGrass[1];
        matrix[selectGrass[1]][selectGrass[0]] = 4;
        for (var i in grassArr) {
          if (
            selectGrass[0] == grassArr[i].x &&
            selectGrass[1] == grassArr[i].y
          ) {
            grassArr.splice(i, 1);
            break;
          }
        }
      }

      if (this.energy > 8) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  mul() {
    this.multiply++;
    const newCell = this.selectRandomCell(0); 
    if (this.multiply >= 10 && newCell) {
      var newAllEater = new AllEater(newCell[0], newCell[1], this.index);
      allEaterArr.push(newAllEater);
      matrix[newCell[1]][newCell[0]] = 3;
      this.multiply = 0;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in allEaterArr) {
      if (this.x == allEaterArr[i].x && this.y == allEaterArr[i].y) {
        allEaterArr.splice(i, 1);
        break;
      }
    }
  }
};
