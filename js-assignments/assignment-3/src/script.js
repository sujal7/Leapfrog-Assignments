const container = document.getElementById('container');

const containerWidth = 1200;
const containerHeight = 600;
const fps = 60;
const ballCount = 20;
let ballIndex = 0;

class Ball {
  constructor(radius) {
    this.ballIndex = ballIndex;
    // console.log(ballIndex);
    ballIndex++;
    this.ball = document.createElement('div');
    // this.ball.innerHTML = `${this.ballIndex - 1}`;
    this.ball.classList.add('ball');
    this.radius = radius;
    this.mass = this.radius;
    this.ballWidth = this.radius * 2;
    this.ballHeight = this.radius * 2;
    this.ball.style.width = this.radius * 2 + 'px';
    this.ball.style.height = this.radius * 2 + 'px';
    this.x = getRandomInt(0, containerWidth - this.ballWidth);
    this.y = getRandomInt(0, containerHeight - this.ballHeight);
    this.dx = getDirection();
    this.dy = getDirection();
    this.ball.style.position = 'absolute';
    this.ball.style.left = this.y + 'px';
    this.ball.style.top = this.x + 'px';
    this.xSpeed = 30 / this.mass;
    this.ySpeed = 30 / this.mass;
  }

  draw() {
    container.appendChild(this.ball);
  }

  move() {
    this.x += this.xSpeed * this.dx;
    this.y += this.ySpeed * this.dy;
    this.ball.style.top = this.y + 'px';
    this.ball.style.left = this.x + 'px';
    this.checkBallCollision();
    this.checkWallCollision();
    // this.checkStuck();
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
    ballArray.forEach((ball) => {
      if (this.ballIndex !== ball.ballIndex) {
        let distanceX = this.x + this.radius - (ball.x + ball.radius);
        let distanceY = this.y + this.radius - (ball.y + ball.radius);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < this.radius + ball.radius) {
          this.x = getRandomInt(0, containerWidth - this.ballWidth);
          this.y = getRandomInt(0, containerHeight - this.ballHeight);
          // this.ball.style.width = '100px';
          // this.ball.style.height = '100px';
          // console.log('i ran');

          this.radius = 10;
          this.mass = this.radius;
          this.ballWidth = this.radius * 2;
          this.ballHeight = this.radius * 2;
          this.ball.style.width = this.radius * 2 + 'px';
          this.ball.style.height = this.radius * 2 + 'px';
          this.xSpeed = 30 / this.mass;
          this.ySpeed = 30 / this.mass;

          // container.removeChild(this.ball);
          // new Ball(getRandomInt(10, 41));
          // this.dx = 1;
          // ball.dx = -1;
          // this.dy = 1;
          // ball.dy = -1;
        } else {
          // no collision
        }
      }
    });
  }

  checkBallCollision() {
    ballArray.forEach((ball) => {
      if (this.ballIndex !== ball.ballIndex) {
        let distanceX = this.x + this.radius - (ball.x + ball.radius);
        let distanceY = this.y + this.radius - (ball.y + ball.radius);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < this.radius + ball.radius) {
          this.dx = changeDirection(this.dx);
          this.dy = changeDirection(this.dy);
          // ball.dx = changeDirection(ball.dx);
          // ball.dy = changeDirection(ball.dy);
        } else {
          // no collision
        }
      }
    });
  }

  // checkStuck() {
  //   ballArray.forEach((ball) => {
  //     if (this.ballIndex !== ball.ballIndex) {
  //       let distanceX = this.x + this.radius - (ball.x + ball.radius);
  //       let distanceY = this.y + this.radius - (ball.y + ball.radius);
  //       let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  //       if (distance < this.radius + ball.radius) {
  //         this.dx = 1;
  //         ball.dx = -1;
  //         // this.dy = changeDirection(this.dy);
  //         // ball.dx = changeDirection(ball.dx);
  //         // ball.dy = changeDirection(ball.dy);
  //       } else {
  //         // no collision
  //       }
  //     }
  //   });
  // }
}

const ballArray = [];
for (let i = 0; i < ballCount; i++) {
  const ball = new Ball(getRandomInt(10, 41));
  // const ball = new Ball(10);
  ball.draw();
  ball.checkInitialPosition();
  ball.move();
  ballArray.push(ball);
  // ball.checkBallCollision();
}
// console.log(ballArray);
// console.log(ballArray);
