const simulationArea = document.getElementById('simulation-area');
const simulationAreaWidth = simulationArea.offsetWidth;
const simulationAreaHeight = simulationArea.offsetHeight;

const personRadius = 5;
const personWidth = personRadius * 2;
const personHeight = personRadius * 2;
const SPEED = 1;

const simulationTime = 30;
let time = 0;
let timeInterval = setInterval(() => {
  time++;
  if (time === 30) {
    clearInterval(timeInterval);
  }
}, 1000);

const personStateMap = {
  0: 'skyblue', // Healthy
  1: 'red', // Infected
  2: 'yellow', // Recovered
  3: 'hotpink', // Deceased
  4: 'green', // Vaccinated
};

const personStateCount = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};

let personID = 0;
let fpsCount = 0;

let infectionRate = 100;
let deathRate = 10;
const numberofPeople = 200;
const sickPeople = 20;
const vaccinatedPerson = 20;
const vaccineEfficiency = 80;
let transmissionTime = {};
for (let i = 0; i < numberofPeople; i++) {
  transmissionTime[i] = {};
}

let recoveryTime = {};
for (let i = 0; i < numberofPeople; i++) {
  recoveryTime[i] = 0;
}

let recoveryDuration = {};
for (let i = 0; i < numberofPeople; i++) {
  recoveryDuration[i] = getRandomInt(7, 14 + 1);
}

class People {
  constructor() {
    this.personID = personID++;
    this.people = document.createElement('div');
    this.people.setAttribute('class', 'people');
    this.people.style.width = personWidth + 'px';
    this.people.style.height = personHeight + 'px';
    this.people.style.position = 'absolute';

    this.personState = getPersonState(this.personID);
    personStateCount[this.personState]++;
    updateStats();
    this.collisionDuration = 0;
    this.collisionTime = 0;
    this.collisionFlag = false;

    this.xPosition = getRandomInt(0, simulationAreaWidth + 1 - personWidth);
    this.yPosition = getRandomInt(0, simulationAreaHeight + 1 - personHeight);

    this.xDirection = getDirection();
    this.yDirection = getDirection();

    this.people.style.left = this.xPosition + 'px';
    this.people.style.top = this.yPosition + 'px';
    this.people.style.borderRadius = '50%';
    this.people.style.backgroundColor = personStateMap[this.personState];
    this.speedX = getRandomFloat(0.1, 1) * SPEED;
    this.speedY = getRandomFloat(0.1, 1) * SPEED;
    simulationArea.appendChild(this.people);
  }

  drawSimulation() {}

  runSimulation() {
    this.xPosition += this.speedX * this.xDirection;
    this.yPosition += this.speedY * this.yDirection;
    this.people.style.left = this.xPosition + 'px';
    this.people.style.top = this.yPosition + 'px';
    this.collisionDuration += 1;
    this.checkBoundaryCollision();
    this.checkTransmission();
    this.checkRecovery();
    fpsCount += 1;
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

  changeSpeed() {
    let speedInterval = setInterval(() => {
      this.speedX = getRandomFloat(0.1, 1) * SPEED;
      this.speedY = getRandomFloat(0.1, 1) * SPEED;
      if (time === 30) {
        clearInterval(speedInterval);
      }
    }, 1000);
  }

  checkTransmission() {
    peopleArray.forEach((people) => {
      // here, 'this is' uninfected person
      if (
        this.personID !== people.personID &&
        (this.personState === 0 || this.personState === 4) &&
        people.personState === 1
      ) {
        // num = 0;
        let distanceX =
          this.xPosition + personRadius - (people.xPosition + personRadius * 2);
        let distanceY =
          this.yPosition + personRadius - (people.yPosition + personRadius * 2);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < personRadius + personRadius * 2) {
          transmissionTime[this.personID][people.personID] += 1;
          if (transmissionTime[this.personID][people.personID] >= 60) {
            transmissionTime[this.personID][people.personID] = 0;
            if (
              this.personState === 4 &&
              probability(100 - vaccineEfficiency)
            ) {
              this.personState = 1;
              this.people.style.backgroundColor =
                personStateMap[this.personState];
              personStateCount[this.personState]++;
              personStateCount[4]--;
              updateStats();
            } else if (probability(infectionRate)) {
              this.personState = 1;
              this.people.style.backgroundColor =
                personStateMap[this.personState];
              personStateCount[this.personState]++;
              personStateCount[0]--;
              updateStats();
            }
          }
        } else {
          transmissionTime[this.personID][people.personID] = 0;
        }
      }
    });
  }

  checkRecovery() {
    if (this.personState === 1) {
      recoveryTime[this.personID] += 1;
      if (recoveryTime[this.personID] >= recoveryDuration[this.personID] * 60) {
        if (probability(deathRate)) {
          this.personState = 3;
          this.people.style.backgroundColor = personStateMap[this.personState];
          this.xDirection = 0;
          this.yDirection = 0;
          personStateCount[this.personState]++;
          personStateCount[1]--;
        } else {
          this.personState = 2;
          this.people.style.backgroundColor = personStateMap[this.personState];
          personStateCount[this.personState]++;
          personStateCount[1]--;
        }
        updateStats();
      }
    }
  }
}

let requestID;

const peopleArray = [];
for (let i = 0; i < numberofPeople; i++) {
  let people = new People();
  function run() {
    people.runSimulation();
    requestID = requestAnimationFrame(run);
    if (time >= simulationTime) {
      cancelAnimationFrame(requestID);
    }
  }
  people.changeSpeed();
  run();
  peopleArray.push(people);
}

// setInterval(() => {
//   console.log(fpsCount / numberofPeople);
//   fpsCount = 0;
// }, 1000);
