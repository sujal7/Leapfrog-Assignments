/**
 * Generates a random integer value between the given range.
 * @param {number} min - Minimum integer value (inclusive).
 * @param {number} max - Maximum integer value (exclusive).
 * @returns              A random integer between min and max value.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

function getInitialPipePosition(index) {
  if (index === 0) return GAME_SCREEN_WIDTH;
  if (index === 1) return GAME_SCREEN_WIDTH + 300;
  if (index === 2) return GAME_SCREEN_WIDTH + 600;
  if (index === 3) return GAME_SCREEN_WIDTH + 900;
  if (index === 4) return GAME_SCREEN_WIDTH + 1200;
}

function getPipeDownYPosition(pipeUpYPosition) {
  return pipeUpYPosition + PIPE_HEIGHT + BIRD_HEIGHT * 3;
}

const birds = ['bird1', 'bird2', 'bird3', 'bird2'];
let birdIndex = 0;
function getBird() {
  if (birdIndex === birds.length) birdIndex = 0;

  return birds[birdIndex++];
}
