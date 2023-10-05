let Creature = require("./creature.js");

module.exports = class Grass extends Creature {
  mul() {
    this.multiply++;
     const newCell = this.selectRandomCell(0); 
    if (this.multiply > 8 && newCell) {
      let newGrass = new Grass(newCell[0], newCell[1], this.index);
      matrix[newCell[1]][newCell[0]] = 1;
      grassArr.push(newGrass);
      this.multiply = 0;
    }
  }
};
