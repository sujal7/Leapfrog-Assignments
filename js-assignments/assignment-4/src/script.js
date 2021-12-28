/**
 * Global Constants for the Game.
 */
const ROAD_HEIGHT = 600;
const ROAD_WIDTH = 300;
const laneCount = 3;
const laneHeight = ROAD_HEIGHT;
const laneWidth = ROAD_WIDTH / 3;
const SPEED = 5;
const CAR_WIDTH = 50;
const CAR_HEIGHT = 80;
const CAR_BOTTOM_PADDING = 10;
const INCREASE_GAME_SPEED = 0.2;
const MIN_OBSTACLE_POSITION = -150;
const MAX_OBSTACLE_POSITION = -700;
const BACKGROUND_IMAGE_POSITION = -1200;
const CAR_Y_POSITION = ROAD_HEIGHT - CAR_HEIGHT - CAR_BOTTOM_PADDING;

/**
 * Initial variables for the game.
 */
let carXPosition = 125;
let index = 1;
let scorePoint = 0;
let obstacleID = 0;

/**
 * Styling user's car and background image.
 */
const car = document.getElementById('car');
car.style.background =
  'url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/car.png)';

const road = document.getElementById('road');
const backgroundImage = document.createElement('img');
backgroundImage.src = './src/images/road.png';
backgroundImage.style.position = 'absolute';
backgroundImage.style.top = BACKGROUND_IMAGE_POSITION + 'px';
backgroundImage.style.left = '0px';
backgroundImage.style.zIndex = '-1';
road.appendChild(backgroundImage);

/**
 * Setting initial score.
 */
const score = document.getElementById('score');
score.innerHTML = `Score: ${scorePoint}`;

/**
 * Object to map index with class of car & obstacle cars.
 */
const laneMap = {
  0: 'lane-left',
  1: 'lane-middle',
  2: 'lane-right',
};

/**
 * Object to map index with X position of car & obstacle cars.
 */
const laneXPosition = {
  0: 35,
  1: 125,
  2: 215,
};

/**
 * Represents an Obstacle (Other Cars).
 */
class Obstacle {
  /**
   * Initializes property for an instance of the class.
   */
  constructor() {
    this.obstacleID = obstacleID;
    obstacleID++;
    this.index = getRandomInt(0, 3);
    this.y = getRandomInt(MIN_OBSTACLE_POSITION, MAX_OBSTACLE_POSITION);
    this.backgroundYPosition = BACKGROUND_IMAGE_POSITION;
    this.speed = SPEED;
    this.obstacleHeight = CAR_HEIGHT;
    this.obstacleWidth = CAR_WIDTH;

    // This variable is used to reposition the obstacle cars in case of intersection between them.
    this.clearObstacle = 0;
  }

  /**
   * Puts the obstacle cars on the screen and also checks for collision between obstacle cars.
   */
  draw() {
    const laneMapValue = laneMap[this.index];
    this.element = document.createElement('div');
    this.checkPosition();
    this.element.setAttribute('class', `car ${laneMapValue}`);
    this.element.style.background = `url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/${getRandomObstacle()}.png)`;
    this.element.style.bottom = 'auto';
    this.element.style.top = this.y + this.clearObstacle + 'px';
    this.element.style.transition = 'none';
    score.innerHTML = `Score: ${scorePoint}`;
    backgroundImage.style.top = BACKGROUND_IMAGE_POSITION + 'px';
    road.appendChild(this.element);
  }

  /**
   * Moves the road image and obstacle cars vertically downwards.
   */
  move() {
    this.y += this.speed + this.clearObstacle;
    this.backgroundYPosition += this.speed * 2;
    backgroundImage.style.top = this.backgroundYPosition + 'px';
    this.element.style.top = this.y + this.clearObstacle + 'px';

    // Resets the obstacle clearing variable.
    this.clearObstacle = 0;

    // Checks for any collision between user's car and obstacle car(s).
    this.checkCarCollision();

    // Repeats the road image.
    if (this.backgroundYPosition >= BACKGROUND_IMAGE_POSITION / 2) {
      this.backgroundYPosition = BACKGROUND_IMAGE_POSITION;
    }

    // Regenerates the obstacle cars randomly and checks position.
    // Increases the score and speed.
    if (this.y > laneHeight) {
      this.element.style.background = `url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/${getRandomObstacle()}.png)`;
      this.y = getRandomInt(MIN_OBSTACLE_POSITION, MAX_OBSTACLE_POSITION);
      this.index = getRandomInt(0, 3);
      const laneMapValue = laneMap[this.index];
      this.element.setAttribute('class', `car ${laneMapValue}`);
      this.checkPosition();
      scorePoint++;
      score.innerHTML = `Score: ${scorePoint}`;
      this.speed += INCREASE_GAME_SPEED;
    }
  }

  /**
   * Checks the obstacle cars for intersection between each other while being generated.
   * Changes the Y-coordinate if there is intersection or changes the index if the way is blocked.
   */
  checkPosition() {
    obstacleArray.forEach((obstacle) => {
      if (obstacle.obstacleID !== this.obstacleID) {
        if (
          obstacle.y < this.y + this.obstacleHeight &&
          obstacle.y + obstacle.obstacleHeight > this.y
        ) {
          if (obstacle.index === this.index) {
            obstacle.clearObstacle = obstacle.y - obstacle.obstacleHeight;
          } else {
            obstacle.index = this.index;
          }
        }
      }
    });
  }

  /**
   * Checks for collision between user's car and obstacle car(s).
   * Sets gameOverFlag to true if there is collision.
   */
  checkCarCollision() {
    if (
      carXPosition < laneXPosition[this.index] + this.obstacleWidth &&
      carXPosition + CAR_WIDTH > laneXPosition[this.index] &&
      CAR_Y_POSITION < this.y + this.obstacleHeight &&
      CAR_HEIGHT + CAR_Y_POSITION > this.y
    ) {
      gameOverFlag = true;
    }
  }
}

// Variable and constants for object creation and method call.
let gameOverFlag = false;
const obstacleArray = [];
let requestID;
const numberOfObjects = 3;

/**
 * Removes the start screen and runs the game.
 */
function startGame() {
  startScreen.style.display = 'none';

  for (let i = 0; i < numberOfObjects; i++) {
    const obstacle = new Obstacle();
    obstacle.draw();
    obstacleArray.push(obstacle);

    // This function runs in a loop and makes the game run at around 60fps.
    function move() {
      obstacleArray.forEach((obstacle) => {
        obstacle.move();
      });

      if (gameOverFlag) {
        gameOver();
        cancelAnimationFrame(requestID);
      } else {
        requestAnimationFrame(move);
      }
    }
  }
  requestID = window.requestAnimationFrame(move);
}

// Triggers startGame() function when the start screen is clicked.
const startScreen = document.getElementById('start-screen');
const startDescription = document.getElementById('start-description');
startDescription.innerHTML = `Click Here to Start Your Game.<br />
Press A/D to Move Left/Right.`;
startScreen.addEventListener('click', startGame);
