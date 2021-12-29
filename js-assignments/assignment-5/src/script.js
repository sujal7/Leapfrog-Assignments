const gameScreen = document.getElementById('game-screen');
const GAME_SCREEN_WIDTH = gameScreen.offsetWidth;
const GAME_SCREEN_HEIGHT = gameScreen.offsetHeight;

const BIRD_HEIGHT = 35;
const BIRD_WIDTH = 25;
const BIRD_POSITION_X = GAME_SCREEN_HEIGHT / 5;

let birdPositionY = GAME_SCREEN_HEIGHT / 3 - BIRD_HEIGHT;
const bird = document.createElement('img');
bird.src = '/src/images/bird1.png';
bird.style.position = 'absolute';
bird.style.top = birdPositionY + 'px';
bird.style.left = BIRD_POSITION_X + 'px';
bird.style.zIndex = 1;
gameScreen.appendChild(bird);

let birdChange;
birdChange = setInterval(() => {
  bird.src = `/src/images/${getBird()}.png`;
}, 100);

let scorePoint = 0;
const scoreBoard = document.getElementById('scoreboard');
scoreBoard.innerHTML = `<img src="/src/images/0.png" />`;
// scoreBoard.appendChild(score);

const BASE_HEIGHT = 100;
const BASE_WIDTH = GAME_SCREEN_WIDTH;
let baseXPosition = GAME_SCREEN_WIDTH;
const base = document.createElement('img');
base.src = '/src/images/base3.png';
base.style.position = 'absolute';
base.style.bottom = 0 + 'px';
base.style.left = -baseXPosition + 'px';
base.style.zIndex = '1';
gameScreen.appendChild(base);

const PLAYABALE_HEIGHT = GAME_SCREEN_HEIGHT - BASE_HEIGHT;

const SPEED = 5;
const PIPE_WIDTH = 52;
const PIPE_HEIGHT = 320;
let pipeID = 0;
class Pipe {
  constructor() {
    this.pipeID = pipeID;
    this.pipeXPosition = getInitialPipePosition(this.pipeID);
    this.pipeYPosition = 0;
    this.speed = SPEED;
    // this.pipeUpYPosition = getRandomInt(-200, -20);
    // this.pipeUpYPosition = -90; // -90  -200
    this.pipeUpYPosition = getRandomInt(-200, -90);
    this.pipeDownYPosition = getPipeDownYPosition(this.pipeUpYPosition);
    // this.pipeDownYPosition = 120; //
    // -200 120
    -200;
    pipeID++;
  }

  draw() {
    this.pipeTop = document.createElement('div');
    this.pipeTop.setAttribute('id', `pipe-top-${this.pipeID}`);
    this.pipeTop.setAttribute('class', 'pipe-top');
    this.pipeTop.style.background = 'url(/src/images/pipe.png)';
    this.pipeTop.style.position = 'absolute';
    this.pipeTop.style.top = this.pipeUpYPosition + 'px';
    this.pipeTop.style.width = PIPE_WIDTH + 'px';
    this.pipeTop.style.height = PIPE_HEIGHT + 'px';
    this.pipeTop.style.transform = 'rotate(180deg)';

    this.pipeBottom = document.createElement('div');
    this.pipeBottom.setAttribute('id', `pipe-bottom-${this.pipeID}`);
    this.pipeBottom.setAttribute('class', 'pipe-bottom');
    this.pipeBottom.style.background = 'url(/src/images/pipe.png)';
    this.pipeBottom.style.position = 'absolute';
    this.pipeBottom.style.top = this.pipeDownYPosition + 'px';
    this.pipeBottom.style.width = PIPE_WIDTH + 'px';
    this.pipeBottom.style.height = PIPE_HEIGHT + 'px';
    this.pipeTop.style.left = this.pipeXPosition + 'px';
    this.pipeBottom.style.left = this.pipeXPosition + 'px';
    base.style.left = -baseXPosition + 'px';
    gameScreen.appendChild(this.pipeTop);
    gameScreen.appendChild(this.pipeBottom);
  }

  move() {
    this.pipeXPosition -= this.speed;
    this.pipeTop.style.left = this.pipeXPosition + 'px';
    this.pipeBottom.style.left = this.pipeXPosition + 'px';
    baseXPosition += this.speed;
    base.style.left = -baseXPosition + 'px';

    birdPositionY += this.speed * 0.1;
    bird.style.top = birdPositionY + 'px';
    this.checkScore();

    this.checkCollision();
    if (baseXPosition >= 1.5 * GAME_SCREEN_WIDTH) {
      baseXPosition = GAME_SCREEN_WIDTH;
    }

    if (this.pipeXPosition < -PIPE_WIDTH) {
      this.pipeUpYPosition = getRandomInt(-250, -90);
      this.pipeDownYPosition = getPipeDownYPosition(this.pipeUpYPosition);
      this.pipeTop.style.top = this.pipeUpYPosition + 'px';
      this.pipeBottom.style.top = this.pipeDownYPosition + 'px';
      setTimeout(() => {
        this.generateNewPipe(this.pipeID);
      }, 1000);
    }
  }

  generateNewPipe(pipeID) {
    this.pipeXPosition = getRandomInt(
      GAME_SCREEN_WIDTH + 10,
      GAME_SCREEN_WIDTH + 120 + pipeID * 10
    );
  }

  checkScore() {
    if (
      (BIRD_POSITION_X - this.pipeXPosition) % SPEED ===
      BIRD_POSITION_X - this.pipeXPosition
    ) {
      scorePoint++;
      if (scorePoint > 9) {
        let leftDigit = Math.floor(scorePoint / 10);
        let rightDigit = scorePoint % 10;
        scoreBoard.innerHTML = `<img src="/src/images/${leftDigit}.png" />`;
        scoreBoard.innerHTML += `<img src="/src/images/${rightDigit}.png" />`;
      } else {
        scoreBoard.innerHTML = `<img src="/src/images/${scorePoint}.png" />`;
      }
    }
  }

  checkCollision() {
    if (
      BIRD_POSITION_X < this.pipeXPosition + PIPE_WIDTH &&
      BIRD_POSITION_X + BIRD_WIDTH > this.pipeXPosition &&
      birdPositionY < this.pipeUpYPosition + PIPE_HEIGHT &&
      BIRD_HEIGHT + birdPositionY > this.pipeUpYPosition
    ) {
      // collision detected!
      gameOverFlag = true;
      // this.color("green");
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

function animateFall() {
  let acceleration = 1;
  bird.style.transform = 'rotate(90deg)';
  let fall = setInterval(() => {
    birdPositionY += acceleration;
    acceleration += 1;
    bird.style.top = birdPositionY + 'px';
    if (birdPositionY >= GAME_SCREEN_HEIGHT - BASE_HEIGHT - BIRD_HEIGHT) {
      clearInterval(fall);
    }
  }, 20);
}

function gameOver() {
  gameOverState = true;
  if (scorePoint > getHighScore()) {
    setHighScore(scorePoint);
  }
  animateFall();
  clearInterval(birdChange);

  let pipeTop = document.getElementsByClassName('pipe-top');
  let pipeBottom = document.getElementsByClassName('pipe-bottom');
  requestIDArray.forEach((reqID) => {
    cancelAnimationFrame(reqID);
  });

  gameOverScreen.style.display = 'block';
  const restart = document.createElement('img');
  const gameOverIcon = document.createElement('img');
  const gameOverDescription = document.getElementById('game-over-description');
  gameOverDescription.innerText = `Score: ${scorePoint}`;
  gameOverDescription.style.marginBottom = '5px';
  gameOverIcon.src = '/src/images/gameOver.png';
  gameOverIcon.style.width = '200px';
  restart.style.width = '100px';
  restart.style.marginLeft = '70px';
  restart.style.cursor = 'pointer';
  restart.src = '/src/images/restart.png';
  restart.style.display = 'block';
  restart.style.zIndex = 1;
  restart.addEventListener('click', () => {
    window.location.reload();
  });
  gameOverScreen.appendChild(gameOverIcon);
  gameOverScreen.appendChild(restart);
  gameOverFlag = false;
}

let gameOverFlag = false;
let gameOverState = false;
let requestID = null;
let requestIDArray = [];
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
        pipe.move();
        requestIDArray.push(requestID);
        requestID = requestAnimationFrame(move);
      } else {
        if (!gameOverState) gameOver();
      }
    }
    move();
  }
}

const startScreen = document.getElementById('start-screen');
startScreen.style.cursor = 'pointer';
document.addEventListener('click', startGame);
// startGame();

const gameOverScreen = document.getElementById('game-over-screen');

let birdMovement;
let birdSpeed = 0;
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'KeyW') {
    let iter = 0;
    birdMovement = setInterval(() => {
      birdSpeed = 10;
      birdPositionY -= birdSpeed;
      iter++;
      if (iter >= 10 || gameOverFlag === true) {
        clearInterval(birdMovement);
      }
    }, 10);
  }
});
document.addEventListener('click', (event) => {
  let iter = 0;
  birdMovement = setInterval(() => {
    birdSpeed = 10;
    birdPositionY -= birdSpeed;
    iter++;
    if (iter >= 10 || gameOverFlag === true) {
      clearInterval(birdMovement);
    }
  }, 10);
});
