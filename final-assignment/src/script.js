const personStateCount = {
  0: 0, // Healthy
  1: 0, // Infected
  2: 0, // Recovered
  3: 0, // Deceased
  4: 0, // Vaccinated
};

/**
 * Runs the simulation when the user presses the start simulation button.
 */
function startSimulation() {
  let changeSpeedValue = 1;
  // let changeSecond = 0.5;
  /**
   * GLOBAL CONSTANTS FOR SIMULATION.
   */
  const simulationArea = document.getElementById('simulation-area');
  const SIMULATION_AREA_WIDTH = simulationArea.offsetWidth;
  const SIMULATION_AREA_HEIGHT = simulationArea.offsetHeight;
  const PERSON_RADIUS = 5;
  const INFECTION_RADIUS = inputParameters[8];
  const MIN_INFECTION_TRANSMISSION_TIME = inputParameters[9];
  const PERSON_WIDTH = PERSON_RADIUS * 2;
  const PERSON_HEIGHT = PERSON_RADIUS * 2;

  const SPEED = 1;
  const MIN_ANGLE = 0.1;
  const MAX_ANGLE = 1;
  const FPS = 60;
  const SIMULATION_TIME = parseInt(inputParameters[0]);
  const MIN_RECOVERY_DAYS = 7;
  const MAX_RECOVERY_DAYS = 14;

  const restartSimulation = document.getElementById('restart-simulation');

  /**
   * Redirects user to the main menu when the button is clicked.
   */
  restartSimulation.addEventListener('click', () => {
    window.location.reload();
  });

  // const helpImage = document.getElementById('help-image');
  // const helpText = document.getElementById('help-text');

  // // /**
  // //  * Displays help text when mouse is hovered.
  // //  */
  // // helpImage.addEventListener('mouseover', () => {
  // //   helpText.style.display = 'inline';
  // // });

  // // /**
  // //  * Hides the help text when mouse is out.
  // //  */
  // // helpImage.addEventListener('mouseout', () => {
  // //   helpText.style.display = 'none';
  // // });

  /**
   * Gets the input parameters entered by the user.
   */
  const totalPopulation = inputParameters[1];
  const sickPopulationPercentage = inputParameters[2];
  const vaccinatedPopulationPercentage = inputParameters[3];
  const vaccineEfficiency = inputParameters[4];
  const infectionRate = inputParameters[5];
  const deathRate = inputParameters[6];
  const socialDistancingPercentage = inputParameters[7];
  const waveEffect = document.getElementById('wave-effect').checked;

  const simulationTimeline = document.getElementById('simulation-timeline');
  simulationTimeline.max = SIMULATION_TIME;

  const personHistory = {};

  /**
   * Creates empty object to store history of each person for every second of simulation time.
   */
  for (let i = 0; i <= SIMULATION_TIME; i++) {
    personHistory[i] = {};

    for (let j = 0; j < totalPopulation; j++) {
      personHistory[i][j] = {};
    }
  }

  const dayCount = document.getElementById('day-count');
  let time = 0;
  dayCount.innerText = 'Day ' + time;

  /**
   * Creates an object to map person state with their respective color.
   */
  const stateColorMap = {
    0: 'skyblue', // Healthy
    1: 'red', // Infected
    2: 'yellow', // Recovered
    3: 'hotpink', // Deceased
    4: 'green', // Vaccinated
  };

  /**
   * Converts percentage to positive integer by rounding it off.
   */
  const sickPopulation = Math.round(
    (sickPopulationPercentage * totalPopulation) / 100
  );
  const vaccinatedPopulation = Math.round(
    (vaccinatedPopulationPercentage * totalPopulation) / 100
  );
  const socialDistancingPopulation = Math.round(
    (socialDistancingPercentage * totalPopulation) / 100
  );
  const healthyPopulationNumber =
    totalPopulation - sickPopulation - vaccinatedPopulation;

  personStateCount[0] = healthyPopulationNumber;
  personStateCount[1] = sickPopulation;
  personStateCount[4] = vaccinatedPopulation;

  /**
   * Constants for Canvas.
   */
  const canvas = document.getElementById('graph');
  const GRAPH_TOP = 25;
  const GRAPH_BOTTOM = 200;
  const GRAPH_LEFT = 25;
  const GRAPH_RIGHT = 1100;
  const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;
  const GRAPH_WIDTH = GRAPH_RIGHT - GRAPH_LEFT;
  const totalPoints = SIMULATION_TIME + 1;

  /**
   * Draws the X and Y axis of the graph with its references values and reference lines.
   */
  function drawGraph() {
    const context = canvas.getContext('2d');
    context.font = 'bold 16px Arial';
    context.strokeStyle = '#cfcfcf';

    context.fillStyle = '#cfcfcf';

    // Draw X and Y axis
    context.beginPath();
    context.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
    context.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);

    context.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);

    context.lineTo(GRAPH_LEFT, GRAPH_TOP);
    context.stroke();

    // Draw reference line
    context.beginPath();
    // context.strokeStyle = '#BBB';
    context.moveTo(GRAPH_LEFT, GRAPH_TOP);
    context.lineTo(GRAPH_RIGHT, GRAPH_TOP);

    // Draw reference value for population
    context.fillText(totalPopulation, GRAPH_RIGHT + 15, GRAPH_TOP);

    context.strokeStyle = '#cfcfcf';
    context.stroke();

    // Draw reference line
    context.beginPath();
    context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT / 4) * 3 + GRAPH_TOP);
    context.lineTo(GRAPH_RIGHT, (GRAPH_HEIGHT / 4) * 3 + GRAPH_TOP);

    // Draw reference value for population
    context.fillText(
      totalPopulation / 4,
      GRAPH_RIGHT + 15,
      (GRAPH_HEIGHT / 4) * 3 + GRAPH_TOP
    );
    context.stroke();

    // Draw reference line
    context.beginPath();
    context.moveTo(GRAPH_LEFT, GRAPH_HEIGHT / 2 + GRAPH_TOP);
    context.lineTo(GRAPH_RIGHT, GRAPH_HEIGHT / 2 + GRAPH_TOP);

    // Draw reference value for population
    context.fillText(
      totalPopulation / 2,
      GRAPH_RIGHT + 15,
      GRAPH_HEIGHT / 2 + GRAPH_TOP
    );
    context.stroke();

    // Draw reference line
    context.beginPath();
    context.moveTo(GRAPH_LEFT, GRAPH_HEIGHT / 4 + GRAPH_TOP);
    context.lineTo(GRAPH_RIGHT, GRAPH_HEIGHT / 4 + GRAPH_TOP);

    // Draw reference value for population
    context.fillText(
      (totalPopulation / 4) * 3,
      GRAPH_RIGHT + 15,
      GRAPH_HEIGHT / 4 + GRAPH_TOP
    );
    context.stroke();

    // Draw X and Y axis title

    context.font = 'bold 20px Arial';
    context.fillText('Days', (GRAPH_RIGHT - GRAPH_LEFT) / 2, GRAPH_BOTTOM + 50);
    context.fillText('Population', GRAPH_RIGHT + 50, GRAPH_HEIGHT / 2);

    context.beginPath();
    context.lineJoin = 'round';

    // Draw reference value for days
    context.font = 'bold 16px Arial';
    context.fillText('0', 15, GRAPH_BOTTOM + 25);
    for (let i = 1; i < totalPoints; i++) {
      context.fillText(i, (GRAPH_RIGHT / totalPoints) * i, GRAPH_BOTTOM + 25);
    }
    context.stroke();
  }
  drawGraph();

  let canvasLine = [];
  for (let i = 0; i < 5; i++) {
    canvasLine[i] = document.getElementById(`line${i + 1}`);
  }

  let context = [];
  function initialGraphPosition(personState, personStateCount) {
    context[personState] = canvasLine[personState].getContext('2d');
    context[personState].font = '16px Arial';
    context[personState].beginPath();
    context[personState].moveTo(
      GRAPH_LEFT,
      GRAPH_HEIGHT -
        (personStateCount / totalPopulation) * GRAPH_HEIGHT +
        GRAPH_TOP
    );
  }

  for (let i = 0; i < 5; i++) {
    initialGraphPosition(i, personStateCount[i]);
  }

  let timeInterval;
  /**
   * Runs every second until a condition is met.
   */
  function startInterval() {
    timeInterval = setInterval(() => {
      time++;

      if (time >= SIMULATION_TIME + 1) {
        clearInterval(timeInterval);
        const people = document.getElementsByClassName('people');
        for (let person of people) {
          person.removeAttribute('id');
        }
        viewHistory();
      } else {
        simulationTimeline.value = time;
        dayCount.innerText = 'Day ' + time;
        recordPeopleHistory(time);
        for (let i = 0; i < 5; i++) {
          context[i].lineTo(
            (GRAPH_RIGHT / totalPoints) * time + GRAPH_LEFT,
            GRAPH_HEIGHT -
              (personStateCount[i] / totalPopulation) * GRAPH_HEIGHT +
              GRAPH_TOP
          );
          context[i].strokeStyle = `${stateColorMap[i]}`;
          context[i].lineWidth = 3;
          context[i].stroke();
        }
      }
    }, 1000 / changeSpeedValue);
  }

  startInterval();

  let personID = 0;
  let fpsCount = 0;

  let transmissionTime = {};

  /**
   * Records the time when infected and healthy person are within infection radius.
   */
  for (let i = 0; i < totalPopulation; i++) {
    transmissionTime[i] = {};
    for (let j = 0; j < totalPopulation; j++) {
      transmissionTime[i][j] = 0;
    }
  }

  let recoveryTime = {};

  /**
   * Records the time elapsed for an infected person.
   */
  for (let i = 0; i < totalPopulation; i++) {
    recoveryTime[i] = 0;
  }

  let recoveryDuration = {};

  /**
   * It takes 7 to 14 days to recover from coronavirus.
   * This generates recovery time for all persons randomly in that range.
   */
  for (let i = 0; i < totalPopulation; i++) {
    recoveryDuration[i] = getRandomInt(
      MIN_RECOVERY_DAYS / changeSpeedValue,
      MAX_RECOVERY_DAYS / changeSpeedValue + 1
    );
  }

  let socialDistancingPeople = [];
  while (socialDistancingPeople.length < socialDistancingPopulation) {
    let r = Math.floor(Math.random() * (totalPopulation - 0) + 0);
    if (socialDistancingPeople.indexOf(r) === -1)
      socialDistancingPeople.push(r);
  }

  /**
   * Represents a person.
   */
  class People {
    constructor() {
      this.personID = personID++;
      this.people = document.createElement('div');
      this.people.setAttribute('class', 'people');
      this.people.style.width = PERSON_WIDTH + 'px';
      this.people.style.height = PERSON_HEIGHT + 'px';
      this.people.style.position = 'absolute';

      // Gets the state of a person i.e. either healthy, vaccinated or sick.
      this.personState = getPersonState(
        this.personID,
        sickPopulation,
        vaccinatedPopulation
      );
      if (this.personState === 1 && waveEffect)
        this.people.setAttribute('id', `p${this.personState}`);

      this.socialDistancingFlag = this.getSocialDistancing();

      // Updates the count of person's state.
      // personStateCount[this.personState]++;

      // Updates the statistics.
      updateStats();

      // Gets random positions within the simulation container.
      this.xPosition = getRandomInt(
        PERSON_WIDTH,
        SIMULATION_AREA_WIDTH + 1 - 2 * PERSON_WIDTH
      );
      this.yPosition = getRandomInt(
        PERSON_HEIGHT,
        SIMULATION_AREA_HEIGHT + 1 - 2 * PERSON_HEIGHT
      );

      // Gets random initial direction.
      this.xDirection = getRandomDirection();
      this.yDirection = getRandomDirection();

      if (this.socialDistancingFlag) {
        this.xDirection = 0;
        this.yDirection = 0;
      }

      this.people.style.left = this.xPosition + 'px';
      this.people.style.top = this.yPosition + 'px';
      this.people.style.borderRadius = '50%';
      this.people.style.backgroundColor = stateColorMap[this.personState];

      // Moves the person at random angles by assigning random speed in x and y axis.
      this.speedX = getRandomFloat(MIN_ANGLE, MAX_ANGLE) * SPEED;
      this.speedY = getRandomFloat(MIN_ANGLE, MAX_ANGLE) * SPEED;
      simulationArea.appendChild(this.people);
    }

    /**
     * Runs the simulation by changing position of people, checking boundary collision,
     * checking for transmission of virus and recovery.
     */
    runSimulation() {
      this.xPosition += this.speedX * this.xDirection;
      this.yPosition += this.speedY * this.yDirection;
      this.people.style.left = this.xPosition + 'px';
      this.people.style.top = this.yPosition + 'px';
      // if (!this.socialDistancingFlag)
      this.checkBoundaryCollision();
      this.checkTransmission();
      this.checkRecovery();
      fpsCount += 1;
    }

    /**
     * Checks and redirects people back if they reach the boundary of simulation container.
     */
    checkBoundaryCollision() {
      if (this.xPosition > SIMULATION_AREA_WIDTH - 2 * PERSON_WIDTH) {
        this.xDirection = -1;
      } else if (this.xPosition < PERSON_WIDTH) {
        this.xDirection = 1;
      }

      if (this.yPosition > SIMULATION_AREA_HEIGHT - 2 * PERSON_HEIGHT) {
        this.yDirection = -1;
      } else if (this.yPosition < PERSON_HEIGHT) {
        this.yDirection = 1;
      }
    }

    /**
     * Changes movement of people by changing their angle each second.
     */
    changeAngle() {
      let speedInterval = setInterval(() => {
        this.speedX =
          getRandomFloat(MIN_ANGLE, MAX_ANGLE) * SPEED * changeSpeedValue;
        this.speedY =
          getRandomFloat(MIN_ANGLE, MAX_ANGLE) * SPEED * changeSpeedValue;

        if (time >= SIMULATION_TIME) {
          clearInterval(speedInterval);
        }
      }, 1000);
    }

    /**
     * Checks for transmission of virus between infected and healthy or vaccinated person.
     */
    checkTransmission() {
      peopleArray.forEach((people) => {
        // 'this' is a healthy or vaccinated person, while 'people' is an infected person.
        if (
          this.personID !== people.personID &&
          (this.personState === 0 || this.personState === 4) &&
          people.personState === 1
        ) {
          let distanceX =
            this.xPosition +
            PERSON_RADIUS -
            (people.xPosition -
              (INFECTION_RADIUS - 1) * PERSON_RADIUS +
              PERSON_RADIUS * INFECTION_RADIUS);
          let distanceY =
            this.yPosition +
            PERSON_RADIUS -
            (people.yPosition -
              (INFECTION_RADIUS - 1) * PERSON_RADIUS +
              PERSON_RADIUS * INFECTION_RADIUS);
          let distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
          );

          // Checks if the uninfected person is within the radius of infected person for each frame.
          if (distance < PERSON_RADIUS + PERSON_RADIUS * INFECTION_RADIUS) {
            transmissionTime[this.personID][people.personID] += 1;

            // Checks if the uinfected person has been within the radius of infected person
            // for minimum infection time multiplied by FPS.
            if (
              transmissionTime[this.personID][people.personID] >=
              (MIN_INFECTION_TRANSMISSION_TIME / changeSpeedValue) * FPS
            ) {
              transmissionTime[this.personID][people.personID] = 0;

              // Checks transmission to vaccinated people depending on the vaccine efficiency.
              if (
                this.personState === 4 &&
                probability(100 - vaccineEfficiency)
              ) {
                personStateCount[this.personState]--;
                this.personState = 1;
                if (waveEffect)
                  this.people.setAttribute('id', `p${this.personState}`);
                this.people.style.backgroundColor =
                  stateColorMap[this.personState];
                personStateCount[this.personState]++;
                updateStats();
              } else if (this.personState === 0 && probability(infectionRate)) {
                // Checks transmission to healthy people depending on infection rate.
                personStateCount[this.personState]--;
                this.personState = 1;
                if (waveEffect)
                  this.people.setAttribute('id', `p${this.personState}`);
                this.people.style.backgroundColor =
                  stateColorMap[this.personState];
                personStateCount[this.personState]++;
                updateStats();
              }
            }
          } else {
            // Resets the value when the infected and uninfected people are out of contact.
            transmissionTime[this.personID][people.personID] = 0;
          }
        }
      });
    }

    /**
     * Checks whether an infected person has been recovered or deceased.
     */
    checkRecovery() {
      // Increments recoveryTime value of the infected person on each frame.
      if (this.personState === 1) {
        recoveryTime[this.personID] += 1;

        // Checks if the infected person has been infected for their
        // recovery duration multiplied by FPS.
        if (
          recoveryTime[this.personID] >=
          (recoveryDuration[this.personID] / changeSpeedValue) * FPS
        ) {
          // Checks whether a person is gonna be deceased depending on death rate,
          // else the person will recover.
          if (probability(deathRate)) {
            personStateCount[this.personState]--;
            this.personState = 3;
            if (waveEffect) this.people.removeAttribute('id');
            this.people.style.backgroundColor = stateColorMap[this.personState];
            this.xDirection = 0;
            this.yDirection = 0;
            personStateCount[this.personState]++;
          } else {
            personStateCount[this.personState]--;
            this.personState = 2;
            if (waveEffect) this.people.removeAttribute('id');
            this.people.style.backgroundColor = stateColorMap[this.personState];
            personStateCount[this.personState]++;
          }
          updateStats();
        }
      }
    }

    getSocialDistancing() {
      if (socialDistancingPeople.indexOf(this.personID) === -1) return false;

      return true;
    }
  }

  let requestID;
  const peopleArray = [];

  for (let i = 0; i < totalPopulation; i++) {
    let people = new People();
    peopleArray.push(people);

    function run() {
      people.runSimulation();

      // Iteratively calls the run function to keep the simulation running.
      // It tries to maintain around 60fps.
      requestID = requestAnimationFrame(run);

      // If simulation time is reached, then it stops requesting the animation.
      if (time >= SIMULATION_TIME) {
        cancelAnimationFrame(requestID);
      }
    }
    people.changeAngle();
    run();
  }

  function changeSimulationSpeed() {
    const changeSpeedInput = document.getElementById('change-speed-input');
    const slowerSpeed = document.getElementById('slower-speed');
    const fasterSpeed = document.getElementById('faster-speed');
    changeSpeedInput.innerText = changeSpeedValue;
    slowerSpeed.addEventListener('click', () => {
      if (changeSpeedValue > 0.25) {
        changeSpeedValue -= 0.25;
        changeSpeedInput.innerText = changeSpeedValue;
        clearInterval(timeInterval);
        startInterval();
      }
    });
    fasterSpeed.addEventListener('click', () => {
      if (changeSpeedValue < 4) {
        changeSpeedValue += 0.25;
        changeSpeedInput.innerText = changeSpeedValue;
        clearInterval(timeInterval);
        startInterval();
      }
    });
  }

  changeSimulationSpeed();

  /**
   * Records the history of people on each second.
   * @param {number} time - The time elapsed since the beginning of simulation.
   */
  function recordPeopleHistory(time) {
    peopleArray.forEach((people) => {
      personHistory[time][people.personID]['personState'] = people.personState;
      personHistory[time][people.personID]['xPosition'] = people.xPosition;
      personHistory[time][people.personID]['yPosition'] = people.yPosition;
    });

    personHistory[time]['healthyCount'] = personStateCount[0];
    personHistory[time]['infectedCount'] = personStateCount[1];
    personHistory[time]['recoveredCount'] = personStateCount[2];
    personHistory[time]['deceasedCount'] = personStateCount[3];
    personHistory[time]['vaccinatedCount'] = personStateCount[4];
  }

  recordPeopleHistory(0);

  /**
   * Generates history of people depending on the input in the slider.
   */
  function viewHistory() {
    const peopleObjects = document.getElementsByClassName('people');
    simulationTimeline.addEventListener('input', () => {
      for (let i = 0; i < totalPopulation; i++) {
        peopleObjects[i].style.left =
          personHistory[simulationTimeline.value][i].xPosition + 'px';
        peopleObjects[i].style.top =
          personHistory[simulationTimeline.value][i].yPosition + 'px';
        peopleObjects[i].personState =
          personHistory[simulationTimeline.value][i].personState;
        peopleObjects[i].style.backgroundColor =
          stateColorMap[peopleObjects[i].personState];
      }

      healthyPopulation.innerHTML =
        personHistory[simulationTimeline.value].healthyCount;
      infectedPopulation.innerHTML =
        personHistory[simulationTimeline.value].infectedCount;
      recoveredPopulation.innerHTML =
        personHistory[simulationTimeline.value].recoveredCount;
      deceasedPopulation.innerHTML =
        personHistory[simulationTimeline.value].deceasedCount;
      vaccinatedPopulation.innerHTML =
        personHistory[simulationTimeline.value].vaccinatedCount;
      dayCount.innerText = 'Day ' + simulationTimeline.value;
    });
  }
}

// startSimulation();
// setInterval(() => {
//   console.log(fpsCount / totalPopulation);
//   fpsCount = 0;
// }, 1000);
