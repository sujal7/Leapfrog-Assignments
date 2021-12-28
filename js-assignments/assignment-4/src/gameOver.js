/**
 * Displays the game over screen.
 * Also, sets the new high score if current score is greater than the high score.
 * Runs a new game when clicked on the screen.
 */
function gameOver() {
  const gameOverScreen = document.getElementById('game-over-screen');
  gameOverScreen.style.display = 'block';
  const gameOverDescription = document.getElementById('game-over-description');

  if (scorePoint > getHighScore()) {
    setHighScore(scorePoint);
    gameOverDescription.innerHTML += 'New High Score! <br/>';
  }

  gameOverDescription.innerHTML += `Game Over.<br/>Your Score was ${scorePoint}.<br/>Click Here to Play Again.`;
  gameOverScreen.addEventListener('click', function () {
    window.location.reload();
  });
}
