const roadHeight = 600;
const roadWidth = 300;
const carWidth = 50;
const carHeight = 80;
const carBottomPadding = 10;
const increaseGameSpeed = 0.2;
let scorePoint = 0;

const car = document.getElementById('car');
car.style.background =
  'url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/car.png)';

const road = document.getElementById('road');

const backgroundImage = document.createElement('img');
backgroundImage.src = './src/images/road.png';
road.appendChild(backgroundImage);
backgroundImage.style.position = 'absolute';
backgroundImage.style.top = '-1200px';
backgroundImage.style.left = '0px';
backgroundImage.style.zIndex = '-1';

const score = document.getElementById('score');

score.innerHTML = `Score: ${scorePoint}`;
let index = 1;
let obstacleID = 0;

const laneCount = 3;
const laneHeight = 600;
const laneWidth = 100;
const carYPosition = roadHeight - carHeight - carBottomPadding;
// console.log(carYPosition);
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

function getHighScore() {
  let highScore = JSON.parse(localStorage.getItem('highScore'));

  if (highScore === null) return 0;

  return highScore.score;
}

function setHighScore(score) {
  var highScore = {
    score: score,
  };
  localStorage.setItem('highScore', JSON.stringify(highScore));
}

const highScore = document.getElementById('high-score');
highScore.innerHTML = `High Score: ${getHighScore()}`;

function animateMovement(oldIndex, newIndex) {
  if (oldIndex > newIndex) {
    let difference = laneXPosition[oldIndex] - laneXPosition[newIndex];
    carX = laneXPosition[oldIndex];
    let animation = setInterval(() => {
      carX -= difference / 10;
      car.style.left = carX + 'px';
      if (carX <= laneXPosition[newIndex] || gameOverFlag === true) {
        clearInterval(animation);
      }
    }, 40);
  } else if (oldIndex < newIndex) {
    let difference = laneXPosition[newIndex] - laneXPosition[oldIndex];
    carX = laneXPosition[oldIndex];
    let animation = setInterval(() => {
      carX += difference / 10;
      car.style.left = carX + 'px';
      if (carX >= laneXPosition[newIndex] || gameOverFlag === true) {
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
});

class Obstacle {
  constructor() {
    this.obstacleID = obstacleID;
    obstacleID++;
    this.index = getRandomInt(0, 3);
    this.y = getRandomInt(-150, -700);
    this.backgroundY = -600;
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
    backgroundImage.style.top = '-1200px';
    this.element.style.bottom = 'auto';
    this.checkPosition();
    this.element.style.top = this.y + this.clearObstacle + 'px';
    this.element.style.transition = 'none';
    score.innerHTML = `Score: ${scorePoint}`;
    road.appendChild(this.element);
  }

  move() {
    this.y += this.speed + this.clearObstacle;
    this.backgroundY += this.speed * 2;
    backgroundImage.style.top = this.backgroundY + 'px';
    this.element.style.top = this.y + this.clearObstacle + 'px';
    this.clearObstacle = 0;
    this.checkCarCollision();
    if (this.backgroundY >= -600) {
      this.backgroundY = -1200;
    }

    if (this.y > laneHeight) {
      this.element.style.background = `url(https://sujal7.github.io/Leapfrog-Assignments/js-assignments/assignment-4/src/images/${getRandomObstacle()}.png)`;
      this.y = getRandomInt(-150, -700);
      this.index = getRandomInt(0, 3);
      const laneMapValue = laneMap[this.index];
      this.element.setAttribute('class', `car ${laneMapValue}`);
      this.checkPosition();
      scorePoint++;
      score.innerHTML = `Score: ${scorePoint}`;
      this.speed += increaseGameSpeed;
    }
  }

  checkPosition() {
    obstacleArray.forEach((obstacle) => {
      if (obstacle.obstacleID !== this.obstacleID) {
        if (
          obstacle.y < this.y + this.obstacleHeight &&
          obstacle.y + obstacle.obstacleHeight > this.y
        ) {
          if (obstacle.index === this.index) {
            obstacle.clearObstacle = obstacle.y - obstacle.obstacleHeight;
          } else {
            obstacle.index = this.index;
          }
        }
      }
    });
  }

  checkCarCollision() {
    if (
      carX < laneXPosition[this.index] + this.obstacleWidth &&
      carX + carWidth > laneXPosition[this.index] &&
      carYPosition < this.y + this.obstacleHeight &&
      carHeight + carYPosition > this.y
    ) {
      gameOverFlag = true;
    }
  }
}

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

let gameOverFlag = false;
const obstacleArray = [];
let requestID;
function startGame() {
  startScreen.style.display = 'none';
  for (let i = 0; i < 3; i++) {
    const obstacle = new Obstacle();
    obstacle.draw();
    obstacleArray.push(obstacle);
    function move() {
      obstacleArray.forEach((obstacle) => {
        obstacle.move();
      });
      if (gameOverFlag) {
        gameOver();
        cancelAnimationFrame(requestID);
      } else {
        requestAnimationFrame(move);
      }
    }
  }
  requestID = window.requestAnimationFrame(move);
}

const startScreen = document.getElementById('start-screen');
const startDescription = document.getElementById('start-description');
const startButton = document.getElementById('start');

startScreen.addEventListener('click', startGame);
