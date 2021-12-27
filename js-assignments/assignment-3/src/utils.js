function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}
