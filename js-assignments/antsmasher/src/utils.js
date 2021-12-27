/**
 * Returns a random integer from a given range.
 * @param {number} min - minimum value (inclusive)
 * @param {number} max - maximum value (exclusive)
 * @returns - a random integer between min and max.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * A function to calculate angle based on x and y co-ordinates using tan inverse formula.
 * @param {number} x - x co-ordinate
 * @param {number} y - y co-ordinate
 * @returns Angle between x and y co-ordinate in degrees.
 */
function getAngle(x, y) {
  let angleRad = Math.atan(y / x);
  let angleDeg = (angleRad * 180) / Math.PI;

  return angleDeg;
}

/**
 * Generates random direction.
 * @returns 1 or -1 value randomly.
 */
function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

/**
 * Returns value that represent opposite direction.
 * @param {number} direction - positive or negative direction.
 * @returns - returns opposite of input direction.
 */
function changeDirection(direction) {
  if (direction === -1) return 1;

  return -1;
}

/**
 * Generates a random float value in a given range.
 * @param {number} min - minimum float value (inclusive)
 * @param {number} max - maximum float value (exclusive)
 * @returns - a float value between min and max.
 */
function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}
