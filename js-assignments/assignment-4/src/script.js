const car = document.getElementById('car');
const road = document.getElementById('road');
const carWidth = 50;
const carHeight = 80;

let index = 1;
let obstacleID = 0;

let laneCount = 3;
const laneHeight = 600;
let iter = 0;

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
      // console.log(carX);
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
      // console.log(carX);
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
    // console.log(obstacleID);
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

    this.element.setAttribute('class', `car ${laneMapValue}`);
    // this.element.style.bottom = 'auto';
    this.checkPosition();
    this.element.style.top = this.y + this.clearObstacle + 'px';
    this.element.style.transition = 'none';

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
      // this.element.style.backgroundColor = 'green';
      this.y = getRandomInt(-150, -700);
      this.index = getRandomInt(0, 3);
      const laneMapValue = laneMap[this.index];
      this.element.setAttribute('class', `car ${laneMapValue}`);
      this.checkPosition();
    }

    // window.requestAnimationFrame(this.move.bind(this));
  }

  checkPosition() {
    obsArray.forEach((obstacle) => {
      // console.log(obstacleID);
      // console.log(obstacle.obstacleID);
      // console.log(this.element.obstacleID);
      if (obstacle.obstacleID !== this.obstacleID) {
        // console.log('tay' + this.obstacleID);
        if (
          obstacle.y < this.y + this.obstacleHeight &&
          obstacle.y + obstacle.obstacleHeight > this.y
        ) {
          if (obstacle.index == this.index) {
            // console.log('collied');
            // console.log(this.element.obstacleID === obstacle.obstacleID);
            // this.element.style.backgroundColor = 'red';
            // console.log(obstacle.obstacleID);
            obstacle.clearObstacle = obstacle.y - obstacle.obstacleHeight;
            // obstacle.clearObstacle = -obstacle.obstacleHeight;
            // if (iter <= 1) {
            //   console.log(obstacle);
            //   console.log(this.element);
            //   iter++;
            // }
          }
          // console.log('collided');
          // obstacle.y = obstacle.y - obstacle.obstacleHeight;
          // console.log((obstacle.y -= obstacle.obstacleHeight));
        }
      }
      // if (
      //   rect1.x < rect2.x + rect2.w &&
      //   rect1.x + rect1.w > rect2.x &&
      //   rect1.y < rect2.y + rect2.h &&
      //   rect1.h + rect1.y > rect2.y
      // ) {
      //   // collision detected!
      //   this.color('green');
      // } else {
      //   // no collision
      //   this.color('blue');
      // }
    });
  }

  checkCarCollision() {
    if (
      carX < this.index == this.index &&
      carY < this.y + this.obstacleHeight &&
      carHeight + carY > this.y
    ) {
      // alert('collision detected!');
      // console.log('collision detected');
      // this.color('green');
    } else {
      // no collision
      // this.color('blue');
    }
  }
}

const obsArray = [];

for (let i = 0; i < 3; i++) {
  const obs = new Obstacle();
  obs.draw();
  obsArray.push(obs);
  // obs.move();
}

function move() {
  obsArray.forEach((obs) => obs.move());

  requestAnimationFrame(move);
}

move();

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
