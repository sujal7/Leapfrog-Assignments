/**
 * Animates the left and right movement of user's car by slowly moving to the destination lane.
 * @param {number} oldIndex - The old lane index where the car previously was.
 * @param {number} newIndex - The new lane index where the car is moving towards.
 */
function animateMovement(oldIndex, newIndex) {
  if (oldIndex > newIndex) {
    // True if the car is moving left.
    let difference = laneXPosition[oldIndex] - laneXPosition[newIndex];
    carXPosition = laneXPosition[oldIndex];
    let animation = setInterval(() => {
      carXPosition -= difference / 10;
      car.style.left = carXPosition + 'px';

      // Clears the animation if destination lane is reached or there is a collision.
      if (carXPosition <= laneXPosition[newIndex] || gameOverFlag === true) {
        clearInterval(animation);
      }
    }, 40);
  } else if (oldIndex < newIndex) {
    // True if the car is moving right.
    let difference = laneXPosition[newIndex] - laneXPosition[oldIndex];
    carXPosition = laneXPosition[oldIndex];
    let animation = setInterval(() => {
      carXPosition += difference / 10;
      car.style.left = carXPosition + 'px';

      // Clears the animation if destination lane is reached or there is a collision.
      if (carXPosition >= laneXPosition[newIndex] || gameOverFlag === true) {
        clearInterval(animation);
      }
    }, 40);
  }
}

// Handle the key press A and D.
document.addEventListener('keydown', (event) => {
  let oldIndex = index;
  if (event.code === 'KeyA') {
    index--;

    // True if car is already in left-most lane.
    if (index < 0) index = 0;
  } else if (event.code === 'KeyD') {
    index++;

    // True if car is already in right-most lane.
    if (index > laneCount - 1) index = laneCount - 1;
  }

  // True if lane of car can be changed.
  if (oldIndex != index) {
    animateMovement(oldIndex, index);
  }
});
