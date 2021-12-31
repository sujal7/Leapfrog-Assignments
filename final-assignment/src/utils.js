/**
 * Generates a random integer value between the given range.
 * @param {number} min - Minimum integer value (inclusive).
 * @param {number} max - Maximum integer value (exclusive).
 * @returns              A random integer between min and max value.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generates a direction randomly.
 * @returns 1 or -1 value randomly.
 */
function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
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

function getPersonState(personID) {
  if (personID < sickPeople) return 1;
  return 0;
}

function getPersonColor(personState) {
  if (personState === 1) return 'red';
  return 'skyblue';
}
