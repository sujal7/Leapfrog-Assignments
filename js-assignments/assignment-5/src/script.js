/**
 * Global Constants for the game.
 */
const gameScreen = document.getElementById('game-screen');
const GAME_SCREEN_WIDTH = gameScreen.offsetWidth;
const GAME_SCREEN_HEIGHT = gameScreen.offsetHeight;
const BIRD_HEIGHT = 35;
const BIRD_WIDTH = 25;
const BIRD_POSITION_X = GAME_SCREEN_HEIGHT / 5;
const BASE_HEIGHT = 100;
const BASE_WIDTH = GAME_SCREEN_WIDTH;
const SPEED = 5;
const PIPE_WIDTH = 52;
const PIPE_HEIGHT = 320;
const MIN_PIPE_POSITION = -90;
const MAX_PIPE_POSITION = -250;

// Styles the bird.
let birdPositionY = GAME_SCREEN_HEIGHT / 3 - BIRD_HEIGHT;
const bird = document.createElement('img');
bird.src = './src/images/bird1.png';
bird.style.position = 'absolute';
bird.style.top = birdPositionY + 'px';
bird.style.left = BIRD_POSITION_X + 'px';
bird.style.zIndex = 1;
gameScreen.appendChild(bird);

let birdChange;
/**
 * Generates new picture of bird every 100ms to make the bird look like flapping wings.
 */
birdChange = setInterval(() => {
  bird.src = `./src/images/${getBird()}.png`;
}, 100);

// Display the initial score.
let scorePoint = 0;
const scoreBoard = document.getElementById('scoreboard');
scoreBoard.innerHTML = `<img src="https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/${scorePoint}.png"/>`;

// Styles the base/ground.
let baseXPosition = GAME_SCREEN_WIDTH;
const base = document.createElement('img');
base.src = './src/images/base.png';
base.style.position = 'absolute';
base.style.bottom = 0 + 'px';
base.style.left = -baseXPosition + 'px';
base.style.zIndex = '1';
gameScreen.appendChild(base);

// To identify each instance of pipe uniquely.
let pipeID = 0;

/**
 * Represents a pipe (both top and bottom).
 */
class Pipe {
  constructor() {
    this.pipeID = pipeID;
    this.pipeXPosition = getInitialPipePosition(this.pipeID);
    this.speed = SPEED;
    this.pipeUpYPosition = getRandomInt(MAX_PIPE_POSITION, MIN_PIPE_POSITION);
    this.pipeDownYPosition = getPipeDownYPosition(this.pipeUpYPosition);
    pipeID++;
  }

  // Draws all the elements on the initial position.
  draw() {
    // Styles the top pipe.
    this.pipeTop = document.createElement('div');
    this.pipeTop.setAttribute('class', 'pipe-top');
    this.pipeTop.style.background =
      'url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/pipe.png)';
    this.pipeTop.style.position = 'absolute';
    this.pipeTop.style.top = this.pipeUpYPosition + 'px';
    this.pipeTop.style.width = PIPE_WIDTH + 'px';
    this.pipeTop.style.height = PIPE_HEIGHT + 'px';
    this.pipeTop.style.left = this.pipeXPosition + 'px';
    this.pipeTop.style.transform = 'rotate(180deg)';

    // Styles the bottom pipe.
    this.pipeBottom = document.createElement('div');
    this.pipeBottom.setAttribute('class', 'pipe-bottom');
    this.pipeBottom.style.background =
      'url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/pipe.png)';
    this.pipeBottom.style.position = 'absolute';
    this.pipeBottom.style.top = this.pipeDownYPosition + 'px';
    this.pipeBottom.style.width = PIPE_WIDTH + 'px';
    this.pipeBottom.style.height = PIPE_HEIGHT + 'px';
    this.pipeBottom.style.left = this.pipeXPosition + 'px';
    gameScreen.appendChild(this.pipeTop);
    gameScreen.appendChild(this.pipeBottom);

    // Styles the base.
    base.style.left = -baseXPosition + 'px';
  }

  /**
   * Changes the position of elements dynamically.
   */
  move() {
    // Moves the pipe from right to left.
    this.pipeXPosition -= this.speed;
    this.pipeTop.style.left = this.pipeXPosition + 'px';
    this.pipeBottom.style.left = this.pipeXPosition + 'px';

    // Moves the base along with the pipes.
    baseXPosition += this.speed;
    base.style.left = -baseXPosition + 'px';

    // Pulls the bird downwards by 10% of the speed constant.
    birdPositionY += this.speed * 0.1;
    bird.style.top = birdPositionY + 'px';

    // Checks and updates the score.
    this.checkScore();

    // Checks for collision between the bird and top pipe, bottom pipe, top boundary and base.
    this.checkCollision();

    // Repositions the base image.
    if (baseXPosition >= 2 * GAME_SCREEN_WIDTH) {
      baseXPosition = GAME_SCREEN_WIDTH;
    }

    // If the pipe vanishes to the back, it regenerates the pipe.
    if (this.pipeXPosition < -PIPE_WIDTH) {
      this.pipeUpYPosition = getRandomInt(MAX_PIPE_POSITION, MIN_PIPE_POSITION);
      this.pipeDownYPosition = getPipeDownYPosition(this.pipeUpYPosition);
      this.pipeTop.style.top = this.pipeUpYPosition + 'px';
      this.pipeBottom.style.top = this.pipeDownYPosition + 'px';

      // Regenerates the new pipe in certain time to avoid intersections.
      setTimeout(() => {
        this.generateNewPipe(this.pipeID);
      }, 1000);
    }
  }

  /**
   * Gets new position of pipe randomly from the given parameters.
   * @param {number} pipeID - The unique ID of each instance of pipe.
   */
  generateNewPipe(pipeID) {
    this.pipeXPosition = getRandomInt(
      GAME_SCREEN_WIDTH + 10,
      GAME_SCREEN_WIDTH + 120 + pipeID * 10
    );
  }

  /**
   * Checks whether the bird has passed the pipe and updates score.
   */
  checkScore() {
    // Since, the pipes always run at constant SPEED, the following condition returns true only once.
    // For eg: If gap between bird and pipe is 3, then 3 === 3 (True).
    if (
      (BIRD_POSITION_X - this.pipeXPosition) % SPEED ===
      BIRD_POSITION_X - this.pipeXPosition
    ) {
      scorePoint++;

      // To update the score with the help of digit images for two or more digits.
      if (scorePoint > 9) {
        let leftDigit = Math.floor(scorePoint / 10);
        let rightDigit = scorePoint % 10;
        scoreBoard.innerHTML = `<img src="https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/${leftDigit}.png" />`;
        scoreBoard.innerHTML += `<img src="https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/${rightDigit}.png" />`;
      } else {
        scoreBoard.innerHTML = `<img src="https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/${scorePoint}.png" />`;
      }
    }
  }

  /**
   * Checks for 4 types of collision with:
   * a) Upper Pipe
   * b) Lower Pipe
   * c) Base Area
   * d) Upper Limit position of the game
   */
  checkCollision() {
    if (
      BIRD_POSITION_X < this.pipeXPosition + PIPE_WIDTH &&
      BIRD_POSITION_X + BIRD_WIDTH > this.pipeXPosition &&
      birdPositionY < this.pipeUpYPosition + PIPE_HEIGHT &&
      BIRD_HEIGHT + birdPositionY > this.pipeUpYPosition
    ) {
      gameOverFlag = true;
    } else if (
      BIRD_POSITION_X < this.pipeXPosition + PIPE_WIDTH &&
      BIRD_POSITION_X + BIRD_WIDTH > this.pipeXPosition &&
      birdPositionY < this.pipeDownYPosition + PIPE_HEIGHT &&
      BIRD_HEIGHT + birdPositionY > this.pipeDownYPosition
    ) {
      gameOverFlag = true;
    } else if (birdPositionY <= 0) {
      gameOverFlag = true;
    } else if (
      birdPositionY + BIRD_HEIGHT >=
      GAME_SCREEN_HEIGHT - BASE_HEIGHT + 10
    ) {
      gameOverFlag = true;
    }
  }
}

let gameOverFlag = false;
let gameOverState = false;
let requestID = null;
let requestIDArray = [];

/**
 * Starts the game by instantiating objects of the class.
 */
function startGame() {
  document.removeEventListener('click', startGame);
  startScreen.style.display = 'none';
  const NUMBER_OF_PIPES = 5;
  const pipeArray = [];
  for (let i = 0; i < NUMBER_OF_PIPES; i++) {
    const pipe = new Pipe();
    pipeArray.push(pipe);
    pipe.draw();
    function move() {
      if (!gameOverFlag) {
        // Runs when gameOverFlag is false.
        pipe.move();
        requestIDArray.push(requestID);

        // Tells the browser that we want to perform animation and the browser maintains 60fps.
        requestID = requestAnimationFrame(move);
      } else {
        // Runs when gameOverFlag is true.
        // Also, it only runs once to avoid calling of gameOver function multiple times.
        if (!gameOverState) gameOver();
      }
    }
    move();
  }
}

const startScreen = document.getElementById('start-screen');
startScreen.style.cursor = 'pointer';
document.addEventListener('click', startGame);
