/**
 * Gets the high score present in the localStorage.
 * @returns The high score stored in the localStorage, if not present then it returns 0.
 */
function getHighScore() {
  let flappyHighScore = JSON.parse(localStorage.getItem('flappyHighScore'));

  if (flappyHighScore === null) return 0;

  return flappyHighScore.score;
}

/**
 * Sets the high score to the localStorage.
 * @param {number} score - The new high score.
 */
function setHighScore(score) {
  let flappyHighScore = {
    score: score,
  };
  localStorage.setItem('flappyHighScore', JSON.stringify(flappyHighScore));
}

// Displays the high score on the game.
const highScore = document.getElementById('high-score');
highScore.innerHTML = `High Score: ${getHighScore()}`;
