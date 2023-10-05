const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});

matrix = [];
let cellNum = 20;
grassArr = [];
grassEaterArr = [];
predatorArr = [];
allEaterArr = [];

function fillMatrix(cellNum, grassNum, grEaterNum, predatorNum, allEaterNum) {
  let matrix = [];
  for (let y = 0; y < cellNum; y++) {
    matrix[y] = [];
    for (let x = 0; x < cellNum; x++) {
      matrix[y][x] = 0;
    }
  }
  function fillRandomCells(value, count) {
    while (count > 0) {
      const col = Math.floor(Math.random() * cellNum);
      const row = Math.floor(Math.random() * cellNum);
      if (matrix[col][row] === 0) {
        matrix[col][row] = value;
        count--;
      }
    }
  }

  fillRandomCells(1, grassNum);
  fillRandomCells(2, grEaterNum);
  fillRandomCells(3, predatorNum);
  fillRandomCells(4, allEaterNum);
  return matrix;
}
matrix = fillMatrix(cellNum, 100, 30, 5, 5);

let Grass = require("./grass.js");
let GrassEater = require("./grassEater.js");
let Predator = require("./predator.js");
let AllEater = require("./allEater.js");

// console.log(matrix);
function initializeGame() {
  matrix = fillMatrix(cellNum, 100, 30, 5, 5);
  initializeArrays();
  startInterval();
} 
function initializeArrays() {
  grassArr = [];
  grassEaterArr = [];
  predatorArr = [];
  allEaterArr = [];
  for (let y = 0; y < cellNum; y++) {
    for (let x = 0; x < cellNum; x++) {
      if (matrix[y][x] == 1) {
        let grObj = new Grass(x, y, 1, matrix);
        grassArr.push(grObj);
      }
      if (matrix[y][x] == 2) {
        let grEatObj = new GrassEater(x, y, 2, matrix);
        grassEaterArr.push(grEatObj);
      }
      if (matrix[y][x] == 3) {
        let predObj = new Predator(x, y, 3, matrix);
        predatorArr.push(predObj);
      }
      if (matrix[y][x] == 4) {
        let allEatObj = new AllEater(x, y, 4, matrix);
        allEaterArr.push(allEatObj);
      }
    }
  }
}

let speed = 300;
let intervalId;

startInterval();

function startInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    playGame();
  }, speed);
}
function playGame() {
  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].eat();
  }
  for (var i in predatorArr) {
    predatorArr[i].eat();
  }
  for (var i in allEaterArr) {
    allEaterArr[i].eat();
  }
  io.emit("draw matrix", matrix);
  return matrix;
}

io.on("connection", function (socket) {
  socket.emit("get matrix", matrix);
  socket.emit("draw matrix", matrix);
  initializeGame();
});

server.listen(3000, () => {
  console.log("server running on 3000");
});
