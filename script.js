let side = 30;
let cellNum = 20;
let socket = io();
let initialMatrix = [];

function setup() {
  // setTimeout(()=>{
  createCanvas(side * cellNum, side * cellNum);
  // }, 500)

  // background("#acacac");
  frameRate(5);
}

function drawGame(matrix) {
  for (let y = 0; y < cellNum; y++) {
    for (let x = 0; x < cellNum; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("orange");
      } else {
        fill("lightgrey");
      }
      rect(x * side, y * side, side, side);
    }
  }
}
socket.on("draw matrix", (data) => {
  drawGame(data);
});

socket.on("get matrix", (data) => {
  initialMatrix = data;
});
