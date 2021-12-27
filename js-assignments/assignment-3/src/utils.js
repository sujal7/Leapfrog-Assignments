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
 * Returns 1 or -1 value randomly.
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

/**
 * Generates random color from an array.
 * @returns - a random hexcode of color from colors array.
 */
function getRandomColor() {
  const colors = [
    '#85144b',
    '#000000',
    '#c0c0c0',
    '#808080',
    '#008000',
    '#00ff00',
    '#808000',
    '#000080',
    '#0000ff',
    '#008080',
    '#00ffff',
    '#7fffd4',
    '#8a2be2',
    '#a52a2a',
    '#5f9ea0',
    '#7fff00',
    '#d2691e',
    '#6495ed',
    '#dc143c',
    '#00ffff',
    '#00008b',
    '#008b8b',
    '#b8860b',
    '#a9a9a9',
    '#006400',
  ];
  var randColor = colors[Math.floor(Math.random() * colors.length)];

  return randColor;
}
