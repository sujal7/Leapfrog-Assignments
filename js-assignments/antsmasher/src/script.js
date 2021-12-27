// Global constants used.
const CONTAINER_WIDTH = 1200;
const CONTAINER_HEIGHT = 600;
const SPEED_CONSTANT = 100;

// To identify each ant object with an index.
let antIndex = 0;

/**
 * Represents an Ant.
 */
class Ant {
  /**
   * @param {number} antSize - the size(width and height) of the ant.
   */
  constructor(antSize) {
    this.antIndex = antIndex;
    antIndex++;
    this.ant = document.createElement('img');
    this.ant.src = './src/images/ant.gif';
    this.antWidth = antSize;
    this.antHeight = antSize;
    this.ant.style.width = this.antWidth + 'px';
    this.ant.style.height = this.antHeight + 'px';
    this.ant.classList.add('ant');

    // Assumed mass to be same as width.
    this.mass = this.antWidth;
    this.x = getRandomInt(0, CONTAINER_WIDTH - this.antWidth);
    this.y = getRandomInt(0, CONTAINER_HEIGHT - this.antHeight);

    // Gets random direction (positive or negative) in x and y axis for the ant to initially move.
    this.dx = getDirection();
    this.dy = getDirection();
    this.ant.style.position = 'absolute';
    this.ant.style.left = this.x + 'px';
    this.ant.style.top = this.y + 'px';

    // I have used getRandomFloat to move the ants in random angles.
    // Speed is inversely proportional to the mass of the ant.
    this.xSpeed = (SPEED_CONSTANT / this.mass) * getRandomFloat(0.1, 1);
    this.ySpeed = (SPEED_CONSTANT / this.mass) * getRandomFloat(0.1, 1);
  }

  /**
   * Appends the ant div to the container.
   */
  draw() {
    container.appendChild(this.ant);
  }

  /**
   * Removes the clicked instance of ant and also deletes it from the antArray.
   */
  createAntSmash() {
    this.ant.addEventListener('click', () => {
      container.removeChild(this.ant);
      antArray.splice(this.antIndex, 1);
    });
  }

  /**
   * Checks the randomly assigned initial position of ants and if they co-incide,
   * then it assigns the ant to new position.
   */
  checkInitialPosition() {
    antArray.forEach((ant) => {
      if (this.antIndex !== ant.antIndex) {
        if (
          this.x < ant.x + ant.antWidth &&
          this.x + this.antWidth > ant.x &&
          this.y < ant.y + ant.antHeight &&
          this.antHeight + this.y > ant.y
        ) {
          this.x = getRandomInt(0, CONTAINER_WIDTH - this.antWidth);
          this.y = getRandomInt(0, CONTAINER_HEIGHT - this.antHeight);
          // console.log('yes');
          // this.ant.innerHTML = 'lol';
          // this.radius = 10;
          // this.mass = this.radius;
          // this.ballWidth = this.radius * 2;
          // this.ballHeight = this.radius * 2;
          // this.ball.style.width = this.radius * 2 + 'px';
          // this.ball.style.height = this.radius * 2 + 'px';
          this.xSpeed = SPEED_CONSTANT / this.mass;
          this.ySpeed = SPEED_CONSTANT / this.mass;
        }
      }
    });
  }

  /**
   * Changes the position of ants inside the container by running it in 60fps.
   */
  move() {
    this.x += this.xSpeed * this.dx;
    this.y += this.ySpeed * this.dy;
    this.ant.style.top = this.y + 'px';
    this.ant.style.left = this.x + 'px';
    this.checkWallCollision();
    this.checkAntCollision();
    this.changeAntAngle();
    // console.log(antArray);
    window.requestAnimationFrame(this.move.bind(this));
  }

  /**
   * Checks ant for any wall collision and changes direction if there is collision.
   */
  checkWallCollision() {
    if (this.x > CONTAINER_WIDTH - this.antWidth) {
      this.dx = -1;
    }

    if (this.y > CONTAINER_HEIGHT - this.antHeight) {
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
   * Checks for any ant to ant collision and changes direction accordingly.
   */
  checkAntCollision() {
    antArray.forEach((ant) => {
      if (this.antIndex !== ant.antIndex) {
        if (
          this.x < ant.x + ant.antWidth &&
          this.x + this.antWidth > ant.x &&
          this.y < ant.y + ant.antHeight &&
          this.antHeight + this.y > ant.y
        ) {
          this.dx = changeDirection(this.dx);
          this.dy = changeDirection(this.dy);
        }
      }
    });
  }

  /**
   * Changes the angle of ants based on the direction they are moving in x and y axis.
   */
  changeAntAngle() {
    if (this.dx === 1 && this.dy === -1) {
      this.ant.style.transform = `rotate(${getAngle(
        this.xSpeed,
        this.ySpeed
      )}deg)`;
    } else if (this.dx === 1 && this.dy === 1) {
      this.ant.style.transform = `rotate(${
        getAngle(this.xSpeed, this.ySpeed) + 90
      }deg)`;
    } else if (this.dx === -1 && this.dy === 1) {
      this.ant.style.transform = `rotate(${
        getAngle(this.xSpeed, this.ySpeed) + 180
      }deg)`;
    } else {
      this.ant.style.transform = `rotate(${
        getAngle(this.xSpeed, this.ySpeed) + 270
      }deg)`;
    }
  }
}

const container = document.getElementById('container');
const antCount = 20;
const antArray = [];

/**
 * Generates number of ant objects as specified in the antCount.
 */
for (let i = 0; i < antCount; i++) {
  const ant = new Ant(getRandomInt(30, 51));
  ant.checkInitialPosition();
  ant.checkInitialPosition();
  ant.draw();
  ant.createAntSmash();
  ant.move();
  antArray.push(ant);
}
