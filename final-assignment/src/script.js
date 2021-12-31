const simulationArea = document.getElementById('simulation-area');
const simulationAreaWidth = simulationArea.offsetWidth;
const simulationAreaHeight = simulationArea.offsetHeight;

const personHeight = 10;
const personWidth = 10;
const MIN_SPEED = 1;
const MAX_SPEED = 1;

let fpsCount = 0;
class People {
  constructor() {
    this.people = document.createElement('div');
    this.people.setAttribute('class', 'people');
    this.people.style.width = personWidth + 'px';
    this.people.style.height = personHeight + 'px';
    this.people.style.position = 'absolute';

    this.xPosition = getRandomInt(0, simulationAreaWidth + 1 - personWidth);
    this.yPosition = getRandomInt(0, simulationAreaHeight + 1 - personHeight);

    this.xDirection = getDirection();
    this.yDirection = getDirection();

    this.people.style.left = this.xPosition + 'px';
    this.people.style.top = this.yPosition + 'px';
    this.people.style.borderRadius = '50%';
    this.people.style.backgroundColor = 'red';
    // this.speedX = getRandomInt(MIN_SPEED, MAX_SPEED + 1);
    this.speedX = getRandomFloat(0.1, 1) * MIN_SPEED;
    this.speedY = getRandomFloat(0.1, 1) * MIN_SPEED;
    simulationArea.appendChild(this.people);
  }

  drawSimulation() {}

  runSimulation() {
    this.xPosition += this.speedX * this.xDirection;
    this.yPosition += this.speedY * this.yDirection;
    this.people.style.left = this.xPosition + 'px';
    this.people.style.top = this.yPosition + 'px';

    // this.speed = getRandomInt(MIN_SPEED, MAX_SPEED + 1);
    // this.xDirection = getDirection();
    // this.yDirection = getDirection();
    this.checkBoundaryCollision();
    fpsCount += 1;
    // this.changeDirection();
  }

  checkBoundaryCollision() {
    if (this.xPosition > simulationAreaWidth - 2 * personWidth) {
      this.xDirection = -1;
    } else if (this.xPosition < personWidth) {
      this.xDirection = 1;
    }

    if (this.yPosition > simulationAreaHeight - 2 * personHeight) {
      this.yDirection = -1;
    } else if (this.yPosition < personHeight) {
      this.yDirection = 1;
    }
  }

  changeDirection() {
    setInterval(() => {
      this.xDirection = getDirection();
      this.yDirection = getDirection();
    }, 1000);
    // getRandomInt(2000, 5000));
  }

  changeSpeed() {
    setInterval(() => {
      this.speedX = getRandomFloat(0.1, 1) * MIN_SPEED;
      this.speedY = getRandomFloat(0.1, 1) * MIN_SPEED;
      // this.speedY =
      //   getRandomFloat(this.speedY - 0.25, this.speedY + 0.26) * MIN_SPEED;
    }, 1000);
  }
}

const numberofPeople = 100;
for (let i = 0; i < numberofPeople; i++) {
  let people = new People();
  people.drawSimulation();
  function run() {
    people.runSimulation();
    requestAnimationFrame(run);
  }
  people.changeSpeed();
  // people.changeDirection();
  run();
}

// setInterval(() => {
//   console.log(fpsCount / numberofPeople);
//   fpsCount = 0;
// }, 1000);
