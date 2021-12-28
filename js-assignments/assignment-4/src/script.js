const car = document.getElementById('car');
car.style.background =
  'url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/car.png)';

const road = document.getElementById('road');
// road.style.background = 'url(/src/images/road.png)';

const carWidth = 50;
const carHeight = 80;

let scorePoint = 0;
const score = document.getElementById('score');
let index = 1;
let obstacleID = 0;

let laneCount = 3;
const laneHeight = 600;

const carY = 510;
let carX = 125;
const laneMap = {
  0: 'lane-left',
  1: 'lane-middle',
  2: 'lane-right',
};

const laneXPosition = {
  0: 25,
  1: 125,
  2: 225,
};

function animateMovement(oldIndex, newIndex) {
  if (oldIndex > newIndex) {
    let difference = laneXPosition[oldIndex] - laneXPosition[newIndex];
    carX = laneXPosition[oldIndex];
    let animation = setInterval(() => {
      carX -= difference / 10;
      car.style.left = carX + 'px';
      if (carX <= laneXPosition[newIndex]) {
        clearInterval(animation);
      }
    }, 40);
  } else if (oldIndex < newIndex) {
    let difference = laneXPosition[newIndex] - laneXPosition[oldIndex];
    carX = laneXPosition[oldIndex];
    let animation = setInterval(() => {
      carX += difference / 10;
      car.style.left = carX + 'px';
      if (carX >= laneXPosition[newIndex]) {
        clearInterval(animation);
      }
    }, 40);
  }
}

document.addEventListener('keydown', (event) => {
  let oldIndex = index;
  if (event.code === 'KeyA') {
    index--;
    if (index < 0) index = 0;
  } else if (event.code === 'KeyD') {
    index++;
    if (index > laneCount - 1) index = laneCount - 1;
  }
  if (oldIndex != index) {
    animateMovement(oldIndex, index);
  }

  // const laneMapValue = laneMap[index];

  // car.setAttribute('class', `car ${laneMapValue}`);
});

class Obstacle {
  constructor() {
    this.obstacleID = obstacleID;
    obstacleID++;
    this.index = getRandomInt(0, 3);
    this.y = getRandomInt(-150, -700);
    this.speed = 5;
    this.obstacleHeight = 80;
    this.obstacleWidth = 50;
    this.clearObstacle = 0;
  }

  draw() {
    this.element = document.createElement('div');
    const laneMapValue = laneMap[this.index];
    this.element.style.background = `url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/${getRandomObstacle()}.png)`;
    this.element.setAttribute('class', `car ${laneMapValue}`);
    // this.element.style.bottom = 'auto';
    this.checkPosition();
    this.element.style.top = this.y + this.clearObstacle + 'px';
    this.element.style.transition = 'none';
    score.innerHTML = `Score: ${scorePoint}`;
    road.appendChild(this.element);
  }

  move() {
    // this.index = getRandomInt(0, 3);
    this.y += this.speed + this.clearObstacle;
    this.element.style.top = this.y + this.clearObstacle + 'px';
    // console.log(this.obstacleID);
    this.clearObstacle = 0;
    this.checkCarCollision();

    if (this.y > laneHeight) {
      this.element.style.background = `url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/${getRandomObstacle()}.png)`;
      // this.element.style.backgroundColor = 'green';
      this.y = getRandomInt(-150, -700);
      this.index = getRandomInt(0, 3);
      const laneMapValue = laneMap[this.index];
      this.element.setAttribute('class', `car ${laneMapValue}`);
      this.checkPosition();
      scorePoint++;
      score.innerHTML = `Score: ${scorePoint}`;
    }
  }

  checkPosition() {
    obstacleArray.forEach((obstacle) => {
      if (obstacle.obstacleID !== this.obstacleID) {
        if (
          obstacle.y < this.y + this.obstacleHeight &&
          obstacle.y + obstacle.obstacleHeight > this.y
        ) {
          if (obstacle.index == this.index) {
            obstacle.clearObstacle = obstacle.y - obstacle.obstacleHeight;
          }
        }
      }
    });
  }

  checkCarCollision() {
    if (
      carX < laneXPosition[this.index] + this.obstacleWidth &&
      carX + carWidth > laneXPosition[this.index] &&
      carY < this.y + this.obstacleHeight &&
      carHeight + carY > this.y
    ) {
      gameOver();
    }
  }
}

const obstacleArray = [];

let myRequest;

for (let i = 0; i < 3; i++) {
  const obstacle = new Obstacle();
  obstacle.draw();
  obstacleArray.push(obstacle);
  function move() {
    obstacleArray.forEach((obstacle) => obstacle.move());
    myRequest = requestAnimationFrame(move);
  }
}
move();

function gameOver() {
  // console.log(myRequest);
  cancelAnimationFrame(myRequest);
}

// new Game({
//   keyBindings: {
//     left: 'ArrowLeft',
//     right: 'ArrowRight'
//   }
// })

// new Game({
//   keyBindings: {
//     left: 'A',
//     right: 'D'
//   }
// })
