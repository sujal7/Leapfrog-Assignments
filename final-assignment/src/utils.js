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
function getRandomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

/**
 * Generates a random float value in a given range.
 * @param {number} min - minimum float value (inclusive)
 * @param {number} max - maximum float value (exclusive)
 * @returns - a float value between min and max upto 2 decimal points.
 */
function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

/**
 * Generates state of each person.
 * @param {number} personID - Unique id of each person.
 * @param {number} sickPopulation - Total sick population.
 * @param {number} vaccinatedPopulation - Total vaccinated population.
 * @returns - The state of the person.
 */
function getPersonState(personID, sickPopulation, vaccinatedPopulation) {
  if (personID < sickPopulation) return 1;
  if (
    personID >= sickPopulation &&
    personID < sickPopulation + vaccinatedPopulation
  )
    return 4;

  return 0;
}

/**
 * Calculates probability.
 * @param {number} n - The percentage of likelihood of any event.
 * @returns - Boolean value (true or false) depending on the probability of the event occuring.
 */
function probability(n) {
  n = n / 100;

  // It generates a random decimal number between 0 and 1 and compares with our parameter.
  // Example: if n is 75(%), then n = 0.75,
  // then if a randomly generated decimal is less than equals to n then returns true, else false
  return Math.random() <= n;
}
