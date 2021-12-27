const container = document.getElementById('container');

const containerWidth = 1200;
const containerHeight = 600;
const fps = 60;
const ballCount = 10;
let ballIndex = 0;

class Ball {
  constructor(radius) {
    this.ballIndex = ballIndex;
    // console.log(ballIndex);
    ballIndex++;
    this.ball = document.createElement('div');
    this.ball.classList.add('ball');
    this.radius = radius;
    this.ballWidth = this.radius * 2;
    this.ballHeight = this.radius * 2;
    this.ball.style.width = radius * 2 + 'px';
    this.ball.style.height = radius * 2 + 'px';
    this.x = getRandomInt(0, containerWidth - this.ballWidth);
    this.y = getRandomInt(0, containerHeight - this.ballHeight);
    this.dx = getDirection();
    this.dy = getDirection();
    this.ball.style.position = 'absolute';
    this.ball.style.left = this.y + 'px';
    this.ball.style.top = this.x + 'px';
    this.xSpeed = 1;
    this.ySpeed = 1;
  }

  draw() {
    container.appendChild(this.ball);
  }

  move() {
    this.x += this.xSpeed * this.dx;
    this.y += this.ySpeed * this.dy;
    this.ball.style.top = this.y + 'px';
    this.ball.style.left = this.x + 'px';
    this.checkWallCollision();
    // this.checkBallCollision();
    window.requestAnimationFrame(this.move.bind(this));
  }

  checkWallCollision() {
    if (this.x > containerWidth - this.ballWidth) {
      this.dx = -1;
    }

    if (this.y > containerHeight - this.ballHeight) {
      this.dy = -1;
    }

    if (this.x < 0) {
      this.dx = 1;
    }

    if (this.y < 0) {
      this.dy = 1;
    }
  }

  checkInitialPosition() {
    setTimeout(() => {
      ballArray.forEach((ball) => {
        if (this.ballIndex !== ball.ballIndex) {
          var dx = this.x + this.radius - (ball.x + ball.radius);
          var dy = this.y + this.radius - (ball.y + ball.radius);
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.radius + ball.radius) {
            this.x = getRandomInt(0, containerWidth - this.ballWidth);
            this.y = getRandomInt(0, containerHeight - this.ballHeight);
          } else {
            // no collision
          }
        }
      });
    }, 2000);
  }
  checkBallCollision() {
    ballArray.forEach((ball) => {
      if (this.ballIndex !== ball.ballIndex) {
        console.log('eureka');
      }
    });
  }
}

const ballArray = [];
for (let i = 0; i < ballCount; i++) {
  const ball = new Ball(getRandomInt(10, 51));
  ballArray.push(ball);
  ball.draw();
  ball.move();
  ball.checkInitialPosition();
  // ball.checkBallCollision();
}
// console.log(ballArray);
