const gameScreen = document.getElementById('game-screen');
const GAME_SCREEN_WIDTH = gameScreen.offsetWidth;
const GAME_SCREEN_HEIGHT = gameScreen.offsetHeight;

const BIRD_HEIGHT = 35;
const BIRD_WIDTH = 25;
const BIRD_POSITION_X = GAME_SCREEN_HEIGHT / 5;
const BIRD_POSITION_Y = GAME_SCREEN_HEIGHT / 2 - BIRD_HEIGHT;

const bird = document.createElement('img');
bird.src = '/src/images/bird1.png';
bird.style.position = 'absolute';
bird.style.top = BIRD_POSITION_Y + 'px';
bird.style.left = BIRD_POSITION_X + 'px';
gameScreen.appendChild(bird);

const BASE_HEIGHT = 100;
const BASE_WIDTH = GAME_SCREEN_WIDTH;
const base = document.createElement('img');
base.src = '/src/images/base3.png';
base.style.position = 'absolute';
base.style.bottom = 0 + 'px';
base.style.left = 0 + 'px';
gameScreen.appendChild(base);

const PLAYABALE_HEIGHT = GAME_SCREEN_HEIGHT - BASE_HEIGHT;
