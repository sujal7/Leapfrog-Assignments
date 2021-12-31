const simulationArea = document.getElementById('simulation-area');
const simulationAreaWidth = simulationArea.offsetWidth;
const simulationAreaHeight = simulationArea.offsetHeight;

const personRadius = 5;
const personWidth = personRadius * 2;
const personHeight = personRadius * 2;
const MIN_SPEED = 1;
const MAX_SPEED = 1;

const simulationTime = 30;
let time = 0;
setInterval(() => {
  time++;
}, 1000);

let personID = 0;
let fpsCount = 0;

// let num = [];

// personState
// 0 healthy
// 1 sick
class People {
  constructor() {
    this.personID = personID++;
    this.people = document.createElement('div');
    this.people.setAttribute('class', 'people');
    this.people.style.width = personWidth + 'px';
    this.people.style.height = personHeight + 'px';
    this.people.style.position = 'absolute';

    this.personState = getPersonState(this.personID);

    this.collisionDuration = 0;

    this.xPosition = getRandomInt(0, simulationAreaWidth + 1 - personWidth);
    this.yPosition = getRandomInt(0, simulationAreaHeight + 1 - personHeight);

    this.xDirection = getDirection();
    this.yDirection = getDirection();

    this.people.style.left = this.xPosition + 'px';
    this.people.style.top = this.yPosition + 'px';
    this.people.style.borderRadius = '50%';
    this.people.style.backgroundColor = getPersonColor(this.personState);
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
    this.checkTransmission();
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

  checkTransmission() {
    peopleArray.forEach((people) => {
      if (this.personID != people.personID && people.personState === 1) {
        // num = 0;
        let distanceX =
          this.xPosition + personRadius - (people.xPosition + personRadius);
        let distanceY =
          this.yPosition + personRadius - (people.yPosition + personRadius);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < personRadius + personRadius) {
          // console.log('running');
          // personalbar
          // console.log(num);
          // collision detected!
          this.people.style.backgroundColor = 'red';
          // console.log('yes');
          // people.style.backgroundColor = 'green';
        } else {
          // this.people.style.backgroundColor = 'skyblue';
          // no collision
          // this.color = 'blue';
        }
      }
    });
  }
}

let requestID;
const numberofPeople = 5;
const sickPeople = 2;

const peopleArray = [];
for (let i = 0; i < numberofPeople; i++) {
  let people = new People();
  // people.drawSimulation();
  function run() {
    people.runSimulation();
    requestID = requestAnimationFrame(run);
    if (time >= simulationTime) {
      // console.log(peopleArray);
      cancelAnimationFrame(requestID);
    }
    // run();
  }
  people.changeSpeed();
  // people.changeDirection();
  run();
  peopleArray.push(people);
}

console.log(peopleArray);

// setInterval(() => {
//   console.log(fpsCount / numberofPeople);
//   fpsCount = 0;
// }, 1000);
// console.log(peopleArray);
// console.log(personID);
