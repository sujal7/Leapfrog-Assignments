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

/**
 * Generates a random image name of the obstacle cars.
 * @returns A random string from the list provided.
 */
function getRandomObstacle() {
  let obstacles = [
    'obstacle1',
    'obstacle2',
    'obstacle3',
    'obstacle4',
    'obstacle5',
    'obstacle6',
    'obstacle7',
  ];
  let randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];

  return randomObstacle;
}
