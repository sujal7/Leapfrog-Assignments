/**
 * Animates the bird falling with acceleration and rotates the bird downwards.
 */
function animateFall() {
  let acceleration = 1;
  bird.style.transform = 'rotate(90deg)';
  let fall = setInterval(() => {
    birdPositionY += acceleration;
    acceleration += 1;
    bird.style.top = birdPositionY + 'px';
    if (birdPositionY >= GAME_SCREEN_HEIGHT - BASE_HEIGHT - BIRD_HEIGHT) {
      clearInterval(fall);
    }
  }, 20);
}
