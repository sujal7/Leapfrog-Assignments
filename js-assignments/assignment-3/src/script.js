// Global constants used.
const CONTAINER_WIDTH = 1200;
const CONTAINER_HEIGHT = 600;
const ACCELERATION_CONSTANT = 20;
const ACCELERATION_LOSS_CONSTANT = 200;
const SPEED_CONSTANT = 50;

// To identify each ball object with an index.
let ballIndex = 0;

/**
 * Represents a ball.
 */
class Ball {
  /**
   * @param {number} radius - the radius of the ball.
   */
  constructor(radius) {
    this.ballIndex = ballIndex;
    ballIndex++;
    this.ball = document.createElement('div');
    this.ball.classList.add('ball');
    this.radius = radius;

    // Assumed mass to be same as radius.
    this.mass = this.radius;

    // Initial acceleration is 0.
    this.acceleration = 0;

    // Width and height is double of the radius.
    this.ballWidth = this.radius * 2;
    this.ballHeight = this.radius * 2;
    this.ball.style.width = this.radius * 2 + 'px';
    this.ball.style.height = this.radius * 2 + 'px';
    this.x = getRandomInt(0, CONTAINER_WIDTH - this.ballWidth);
    this.y = getRandomInt(0, CONTAINER_HEIGHT - this.ballHeight);

    // Gets random direction (positive or negative) in x and y axis for the ball to initially move.
    this.dx = getDirection();
    this.dy = getDirection();
    this.ball.style.position = 'absolute';
    this.ball.style.left = this.y + 'px';
    this.ball.style.top = this.x + 'px';
    this.ball.style.backgroundColor = getRandomColor();

    // I have used getRandomFloat to move the balls in random angles.
    // Speed is inversely proportional to the mass of the ball.
    this.xSpeed = (SPEED_CONSTANT / this.mass) * getRandomFloat(0.1, 1);
    this.ySpeed = (SPEED_CONSTANT / this.mass) * getRandomFloat(0.1, 1);
  }

  /**
   * Appends the ball div to the container.
   */
  draw() {
    container.appendChild(this.ball);
  }

  /**
   * Checks the randomly assigned initial position of balls and if they co-incide,
   * then it assigns the ball to new position.
   */
  checkInitialPosition() {
    ballArray.forEach((ball) => {
      if (this.ballIndex !== ball.ballIndex) {
        let distanceX = this.x + this.radius - (ball.x + ball.radius);
        let distanceY = this.y + this.radius - (ball.y + ball.radius);

        // Distance formula.
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < this.radius + ball.radius) {
          this.x = getRandomInt(0, CONTAINER_WIDTH - this.ballWidth);
          this.y = getRandomInt(0, CONTAINER_HEIGHT - this.ballHeight);
          this.radius = 10;
          this.mass = this.radius;
          this.ballWidth = this.radius * 2;
          this.ballHeight = this.radius * 2;
          this.ball.style.width = this.radius * 2 + 'px';
          this.ball.style.height = this.radius * 2 + 'px';
          this.xSpeed = SPEED_CONSTANT / this.mass;
          this.ySpeed = SPEED_CONSTANT / this.mass;
        }
      }
    });
  }

  /**
   * Changes the position of balls inside the container by running it in 60fps.
   */
  move() {
    this.x += (this.xSpeed + this.acceleration) * this.dx;
    this.y += (this.ySpeed + this.acceleration) * this.dy;
    this.ball.style.top = this.y + 'px';
    this.ball.style.left = this.x + 'px';

    // accelereation gets lost slowly in approximately 3.33 secs (200/60)
    if (this.acceleration != 0) {
      this.acceleration -= this.acceleration / ACCELERATION_LOSS_CONSTANT;
    }

    this.checkWallCollision();
    this.checkBallCollision();
    window.requestAnimationFrame(this.move.bind(this));
  }

  /**
   * Checks ball for any wall collision and changes direction if there is collision.
   */
  checkWallCollision() {
    if (this.x > CONTAINER_WIDTH - this.ballWidth) {
      this.dx = -1;
    }

    if (this.y > CONTAINER_HEIGHT - this.ballHeight) {
      this.dy = -1;
    }

    if (this.x < 0) {
      this.dx = 1;
    }

    if (this.y < 0) {
      this.dy = 1;
    }
  }

  /**
   * Checks for any ball to ball collision and changes direction accordingly.
   */
  checkBallCollision() {
    ballArray.forEach((ball) => {
      if (this.ballIndex !== ball.ballIndex) {
        let distanceX = this.x + this.radius - (ball.x + ball.radius);
        let distanceY = this.y + this.radius - (ball.y + ball.radius);

        // Distance formula.
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < this.radius + ball.radius) {
          this.dx = changeDirection(this.dx);
          this.dy = changeDirection(this.dy);

          // Acceleration is inversely proportional to the mass of ball.
          this.acceleration = ACCELERATION_CONSTANT / this.mass;
        }
      }
    });
  }
}

const container = document.getElementById('container');
const ballCount = 20;
const ballArray = [];

/**
 * Generates number of ball objects as specified in the ballCount.
 */
for (let i = 0; i < ballCount; i++) {
  const ball = new Ball(getRandomInt(10, 31));
  ball.draw();
  ball.checkInitialPosition();
  ball.move();
  ballArray.push(ball);
}
