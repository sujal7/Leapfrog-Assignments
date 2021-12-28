/**
 * Gets the high score present in the localStorage.
 * @returns The high score stored in the localStorage, if not present then it returns 0.
 */
function getHighScore() {
  let highScore = JSON.parse(localStorage.getItem('highScore'));

  if (highScore === null) return 0;

  return highScore.score;
}

/**
 * Sets the high score to the localStorage.
 * @param {number} score - The new high score.
 */
function setHighScore(score) {
  let highScore = {
    score: score,
  };
  localStorage.setItem('highScore', JSON.stringify(highScore));
}

// Displays the high score on the game.
const highScore = document.getElementById('high-score');
highScore.innerHTML = `High Score: ${getHighScore()}`;
