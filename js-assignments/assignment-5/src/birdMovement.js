let birdMovement;
let birdSpeed = 0;

// Adds key binding Spacebar and W.
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'KeyW') {
    let i = 0;
    birdMovement = setInterval(() => {
      birdSpeed = 10;
      birdPositionY -= birdSpeed;
      i++;
      if (i >= 10 || gameOverFlag === true) {
        clearInterval(birdMovement);
      }
    }, 10);
  }
});

// Adds mouse click event.
document.addEventListener('click', (event) => {
  let i = 0;
  birdMovement = setInterval(() => {
    birdSpeed = 10;
    birdPositionY -= birdSpeed;
    i++;
    if (i >= 10 || gameOverFlag === true) {
      clearInterval(birdMovement);
    }
  }, 10);
});
