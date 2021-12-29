const gameOverScreen = document.getElementById('game-over-screen');
/**
 * Handles the game over state.
 */
function gameOver() {
  gameOverState = true;
  if (scorePoint > getHighScore()) {
    setHighScore(scorePoint);
  }
  animateFall();
  clearInterval(birdChange);
  requestIDArray.forEach((reqID) => {
    cancelAnimationFrame(reqID);
  });

  gameOverScreen.style.display = 'block';
  const restart = document.createElement('img');
  const gameOverIcon = document.createElement('img');
  const gameOverDescription = document.getElementById('game-over-description');
  gameOverDescription.innerText = `Score: ${scorePoint}`;
  gameOverDescription.style.marginBottom = '5px';
  gameOverIcon.src =
    'https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/gameOver.png';
  gameOverIcon.style.width = '200px';
  restart.style.width = '100px';
  restart.style.marginLeft = '70px';
  restart.style.cursor = 'pointer';
  restart.src =
    'https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-5/src/images/restart.png';
  restart.style.display = 'block';
  restart.style.zIndex = 1;
  restart.addEventListener('click', () => {
    window.location.reload();
  });
  gameOverScreen.appendChild(gameOverIcon);
  gameOverScreen.appendChild(restart);
  gameOverFlag = false;
}
