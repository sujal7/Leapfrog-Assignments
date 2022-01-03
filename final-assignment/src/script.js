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
let timeInterval = setInterval(() => {
  // console.log(peronStateCount);
  time++;
  if (time === 30) {
    clearInterval(timeInterval);
  }
}, 1000);

const personStateMap = {
  0: 'skyblue', // Healthy
  1: 'red', // Infected
};

const peronStateCount = {
  0: 0,
  1: 0,
};

const healthyPopulation = document.getElementById('healthy-population');
const infectedPopulation = document.getElementById('infected-population');

// let ms = 0;
// setInterval(() => {
//   ms += 10;
//   console.log(ms);
// }, 10);

let personID = 0;
let fpsCount = 0;

let duration = [];
const numberofPeople = 100;
let transmissionTime = {
  // 0: {},
  // 1: {},
  // 2: {},
  // 3: {},
  // 4: {},
  // 5: {},
};
for (let i = 0; i < numberofPeople; i++) {
  transmissionTime[i] = {};
}
// let num = [];]
// personState
// 0 healthy
// 1 sick
class People {
  constructor() {
    this.personID = personID++;
    this.people = document.createElement('div');
    // this.people.innerText = this.personID;
    this.people.setAttribute('class', 'people');
    this.people.style.width = personWidth + 'px';
    this.people.style.height = personHeight + 'px';
    this.people.style.position = 'absolute';

    this.personState = getPersonState(this.personID);
    peronStateCount[this.personState]++;
    healthyPopulation.innerText = peronStateCount[0];
    infectedPopulation.innerText = peronStateCount[1];
    // if (personID === 1) {
    //   this.people.style.width = personWidth * 2 + 'px';
    //   this.people.style.height = personHeight * 2 + 'px';
    // }

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

    // this.people.style.backgroundColor = getPersonColor(this.personState);
    this.people.style.backgroundColor = personStateMap[this.personState];
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
    this.collisionDuration += 1;
    this.checkBoundaryCollision();
    this.checkTransmission();
    // this.checkFps();

    fpsCount += 1;
    // console.log(peronStateCount);
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

  // checkFps() {
  //   if (ms === 1000) {
  //     console.log(this.fpsCount);
  //   }
  // }

  // runEverySecond() {
  //   setInterval(() => {
  //     console.log(this.personID + 'i run every second' + time);
  //   }, 1000);
  // }

  checkTransmission() {
    peopleArray.forEach((people) => {
      // here this is uninfected person
      if (
        this.personID !== people.personID &&
        this.personState === 0 &&
        people.personState === 1
      ) {
        // num = 0;
        let distanceX =
          this.xPosition + personRadius - (people.xPosition + personRadius * 2);
        let distanceY =
          this.yPosition + personRadius - (people.yPosition + personRadius * 2);
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < personRadius + personRadius * 2) {
          // this.collisionFlag = true;
          // console.log('running');
          // personalbar
          // console.log(num);
          // collision detected!
          // this.collisionTime += 1;
          // // console.log(this.personID, this.collisionTime);
          // if (this.collisionTime >= 57) {
          //   this.people.style.backgroundColor = 'red';
          //   this.personState = 1;
          // }
          transmissionTime[this.personID][people.personID] += 1;
          // console.log(transmissionTime);
          if (transmissionTime[this.personID][people.personID] >= 60) {
            this.people.style.backgroundColor = 'red';
            this.personState = 1;
            peronStateCount[this.personState]++;
            peronStateCount[0]--;
            transmissionTime[this.personID][people.personID] = 0;
            healthyPopulation.innerText = peronStateCount[0];
            infectedPopulation.innerText = peronStateCount[1];
          }

          // console.log('yes');
          // people.style.backgroundColor = 'green';
        } else {
          transmissionTime[this.personID][people.personID] = 0;
          // this.collisionTime = 0; // it is checking for all so not working
          // this.people.style.backgroundColor = 'green';
          // no collision
          // this.color = 'blue';
        }
      }
    });
  }

  checkRecovery() {}

  // updatePeronStateCount(){
  //   peopleArray.forEach(()=>{

  //   })
  // }
}

let requestID;
const sickPeople = 20;

const peopleArray = [];
for (let i = 0; i < numberofPeople; i++) {
  let people = new People();
  // people.drawSimulation();
  // people.runEverySecond();
  function run() {
    people.runSimulation();
    requestID = requestAnimationFrame(run);
    if (time >= simulationTime) {
      // console.log(peopleArray);
      // console.log(transmissionTime);
      cancelAnimationFrame(requestID);
    }
    // run();
  }
  people.changeSpeed();
  // people.changeDirection();
  run();
  peopleArray.push(people);
  duration.push(0);
}

// console.log(duration);

// console.log(peopleArray);

// setInterval(() => {
//   console.log(fpsCount / numberofPeople);
//   fpsCount = 0;
// }, 1000);
// console.log(peopleArray);
// console.log(personID);
