const gameScreen = document.getElementById('game-screen');
const GAME_SCREEN_WIDTH = gameScreen.offsetWidth;
const GAME_SCREEN_HEIGHT = gameScreen.offsetHeight;

const BIRD_HEIGHT = 35;
const BIRD_WIDTH = 25;
const BIRD_POSITION_X = GAME_SCREEN_HEIGHT / 5;

let birdPositionY = GAME_SCREEN_HEIGHT / 2 - BIRD_HEIGHT;
const bird = document.createElement('img');
bird.src = '/src/images/bird1.png';
bird.style.position = 'absolute';
bird.style.top = birdPositionY + 'px';
bird.style.left = BIRD_POSITION_X + 'px';
gameScreen.appendChild(bird);

birdChange = setInterval(() => {
  bird.src = `/src/images/${getBird()}.png`;
}, 100);

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
    pipeID++;
  }

  draw() {
    this.pipeTop = document.createElement('div');
    this.pipeTop.style.background = 'url(/src/images/pipe.png)';
    this.pipeTop.style.position = 'absolute';
    this.pipeTop.style.top = '-200px';
    this.pipeTop.style.width = PIPE_WIDTH + 'px';
    this.pipeTop.style.height = PIPE_HEIGHT + 'px';
    this.pipeTop.style.transform = 'rotate(180deg)';

    this.pipeBottom = document.createElement('div');
    this.pipeBottom.style.background = 'url(/src/images/pipe.png)';
    this.pipeBottom.style.position = 'absolute';
    this.pipeBottom.style.bottom = '-20px';
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

    birdPositionY += this.speed * (10 / 100);
    bird.style.top = birdPositionY + 'px';

    if (baseXPosition >= 1.5 * GAME_SCREEN_WIDTH) {
      baseXPosition = GAME_SCREEN_WIDTH;
    }

    if (this.pipeXPosition < -PIPE_WIDTH) {
      setTimeout(() => {
        this.generateNewPipe(this.pipeID);
      }, 1000);
    }
  }

  generateNewPipe(pipeID) {
    this.pipeXPosition = getRandomInt(
      GAME_SCREEN_WIDTH + 10,
      GAME_SCREEN_WIDTH * 1.2
    );
  }
}

const NUMBER_OF_PIPES = 5;
const pipeArray = [];
for (let i = 0; i < NUMBER_OF_PIPES; i++) {
  const pipe = new Pipe();
  pipeArray.push(pipe);
  pipe.draw();
  function move() {
    pipe.move();
    requestAnimationFrame(move);
  }
  move();
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'KeyW') {
    birdPositionY -= 100;
  }
});
document.addEventListener('click', (event) => {
  birdPositionY -= 100;
});
