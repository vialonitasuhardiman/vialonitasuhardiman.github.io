const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let fruit;
let interval;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
    interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
        if (snake.hitBorder()) {
            alert('Game Over. Press OK to restart.');
            document.location.reload(); // Reload the page to restart the game
        }

    }, 250);
}());

window.addEventListener('keydown', (evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    // ... rest of the Snake constructor remains the same ...

    this.hitBorder = function() {
        return this.x >= canvas.width || this.y >= canvas.height || this.x < 0 || this.y < 0;
    };

    // ... rest of the Snake methods remain the same ...

}

// ... rest of the Fruit function remains the same ...

// Add controls for touch devices
function enableControls() {
    const controls = document.getElementsByClassName('control');
    Array.from(controls).forEach(control => {
        control.addEventListener('click', function(event) {
            snake.changeDirection(event.target.id);
        });
    });
}
