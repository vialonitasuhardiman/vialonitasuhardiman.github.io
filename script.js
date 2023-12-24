const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartButton = document.getElementById('restartButton');
const loseScreen = document.getElementById('loseScreen');

const gameWidth = canvas.width;
const gameHeight = canvas.height;
const snakeSize = 20;
let gameRunning = true;

// Snake setup
let snake = [{
  x: 160,
  y: 200
}];
let dx = snakeSize;
let dy = 0;
let food = spawnFood();

document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', restartGame);

function initSnakeGame() {
  if (gameRunning) {
    setTimeout(() => {
      clearCanvas();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      initSnakeGame();
    }, 100);
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
}

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(part => {
    ctx.fillRect(part.x, part.y, snakeSize, snakeSize);
  });
}

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  // Eat food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;

  const goingUp = dy === -snakeSize;
  const goingDown = dy === snakeSize;
  const goingRight = dx === snakeSize;
  const goingLeft = dx === -snakeSize;

  if (keyPressed === LEFT && !goingRight) {
    dx = -snakeSize;
    dy = 0;
  }
  if (keyPressed === UP && !goingDown) {
    dx = 0;
    dy = -snakeSize;
  }
  if (keyPressed === RIGHT && !goingLeft) {
    dx = snakeSize;
    dy = 0;
  }
  if (keyPressed === DOWN && !goingUp) {
    dx = 0;
    dy = snakeSize;
  }
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max-min) + min) / snakeSize) * snakeSize;
}

function spawnFood() {
  return {
    x: randomFood(0, gameWidth - snakeSize),
    y: randomFood(0, gameHeight - snakeSize)
  };
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function checkGameOver() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      endGame();
    }
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameWidth - snakeSize;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameHeight - snakeSize;

  if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
    endGame();
  }
}

function endGame() {
  gameRunning = false;
  loseScreen.classList.remove('hidden');
}

function restartGame() {
  snake = [{
    x: 160,
    y: 200
  }];
  dx = snakeSize;
  dy = 0;
  gameRunning = true;
  loseScreen.classList.add('hidden');
  initSnakeGame();
}

// Mobile controls could be added by overlaying transparent buttons or handling swipe gestures
// Additionally, PC controls can be enhanced by preventing immediate 180-degree turns 
