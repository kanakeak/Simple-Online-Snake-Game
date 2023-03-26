// Initialize canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Initialize game variables
let snake = [  { x: 200, y: 200 },  { x: 190, y: 200 },  { x: 180, y: 200 },  { x: 170, y: 200 },  { x: 160, y: 200 },];
let direction = "right";
let food = { x: 0, y: 0 };

// Initialize event listeners
document.addEventListener("keydown", changeDirection);

// Main game loop
function gameLoop() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  if (checkCollision()) {
    resetGame();
  }
}

// Helper functions
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });
}
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") head.x += 10;
  if (direction === "left") head.x -= 10;
  if (direction === "up") head.y -= 10;
  if (direction === "down") head.y += 10;
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }
}
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);
}
function checkCollision() {
  let head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}
function resetGame() {
  snake = [    { x: 200, y: 200 },    { x: 190, y: 200 },    { x: 180, y: 200 },    { x: 170, y: 200 },    { x: 160, y: 200 },  ];
  direction = "right";
  generateFood();
}

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
}

// Start game loop
setInterval(gameLoop, 100);
