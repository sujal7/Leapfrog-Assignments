function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomObstacle() {
  let obstacles = [
    'obstacle1',
    'obstacle2',
    'obstacle3',
    'obstacle4',
    'obstacle5',
    'obstacle6',
    'obstacle7',
  ];
  let randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];

  return randomObstacle;
}
