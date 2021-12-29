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

let minGap = 300;
/**
 * Calculates the initial position of pipes.
 * @param {number} index - The index of pipe. (pipeID)
 * @returns
 */
function getInitialPipePosition(index) {
  return GAME_SCREEN_WIDTH + index * minGap;
}

// Difficulty decreases with increase in number. (1 is max difficulty)
const difficultyLevel = 4;

/**
 * Calculates the position of bottom pipe by keeping enough space for the bird in between.
 * @param {number} pipeUpYPosition - Position of top pipe in Y-coordinate.
 * @returns - The position of bottom pipe in Y-coordinate.
 */
function getPipeDownYPosition(pipeUpYPosition) {
  return pipeUpYPosition + PIPE_HEIGHT + BIRD_HEIGHT * difficultyLevel;
}

const birds = ['bird1', 'bird2', 'bird3', 'bird2'];
let birdIndex = 0;

/**
 * Helps to generate images of bird flapping.
 * @returns A string from the array based on birdIndex.
 */
function getBird() {
  if (birdIndex === birds.length) birdIndex = 0;

  return birds[birdIndex++];
}
