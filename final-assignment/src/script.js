/**
 * Creates an object to count number of people in different states.
 */
const personStateCount = {
  0: 0, // Healthy
  1: 0, // Infected
  2: 0, // Recovered
  3: 0, // Deceased
  4: 0, // Vaccinated
};

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
 * Runs the simulation when the user presses the start simulation button.
 */
function startSimulation() {
  // The speed of simulation. Initially, the speed is normal i.e. 1.
  let changeSpeedValue = 1;

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

  const helpImage = document.getElementById('help-image');
  const helpText = document.getElementById('help-text');

  /**
   * Displays help text when mouse is hovered.
   */
  helpImage.addEventListener('mouseover', () => {
    helpText.style.display = 'inline';
  });

  /**
   * Hides the help text when mouse is out.
   */
  helpImage.addEventListener('mouseout', () => {
    helpText.style.display = 'none';
  });

  /**
   * Gets the input parameters entered by the user.
   */
  const totalPopulation = inputParameters[1];
  const infectedPopulationPercentage = inputParameters[2];
  const vaccinatedPopulationPercentage = inputParameters[3];
  const vaccineEfficiency = inputParameters[4];
  const infectionRate = inputParameters[5];
  const deathRate = inputParameters[6];
  const socialDistancingPercentage = inputParameters[7];
  const waveEffect = document.getElementById('wave-effect').checked;

  const simulationTimeline = document.getElementById('simulation-timeline');

  // Adjusts max value of the simulation slider.
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
   * Converts percentage to positive integer by rounding it off.
   */
  const infectedPopulationNumber = Math.round(
    (infectedPopulationPercentage * totalPopulation) / 100
  );
  const vaccinatedPopulationNumber = Math.round(
    (vaccinatedPopulationPercentage * totalPopulation) / 100
  );
  const socialDistancingPopulation = Math.round(
    (socialDistancingPercentage * totalPopulation) / 100
  );
  const healthyPopulationNumber =
    totalPopulation - infectedPopulationNumber - vaccinatedPopulationNumber;

  // Initializes the count of people in different state.
  personStateCount[0] = healthyPopulationNumber;
  personStateCount[1] = infectedPopulationNumber;
  personStateCount[4] = vaccinatedPopulationNumber;

  initializeGraphVariables(SIMULATION_TIME, totalPopulation);

  drawGraph();

  for (let i = 0; i < 5; i++) {
    initialGraphPosition(i, personStateCount[i]);
  }

  let timeInterval;
  /**
   * Runs an interval that executes every 1000/changeSpeedValue millisecond until the time is greater    * than SIMULATION_TIME.
   * changeSpeedValue is used to factor in change in simulation speed.
   */
  function startTime() {
    timeInterval = setInterval(() => {
      time++;

      if (time >= SIMULATION_TIME + 1) {
        clearInterval(timeInterval);
        const people = document.getElementsByClassName('people');

        // Removes the attribute id after the simulation ends to remove wave effect(if enabled by user).
        for (let person of people) {
          person.removeAttribute('id');
        }

        viewHistory();
      } else {
        simulationTimeline.value = time;
        dayCount.innerText = 'Day ' + time;
        recordPeopleHistory(time);
        plotLineGraph(time);
      }
    }, 1000 / changeSpeedValue);
  }

  startTime();

  let transmissionTime = {};

  /**
   * Initializes transmission time between each and every person to 0.
   */
  for (let i = 0; i < totalPopulation; i++) {
    transmissionTime[i] = {};
    for (let j = 0; j < totalPopulation; j++) {
      transmissionTime[i][j] = 0;
    }
  }

  let recoveryTime = {};

  /**
   * Initializes the recovery time for each and every person to 0.
   */
  for (let i = 0; i < totalPopulation; i++) {
    recoveryTime[i] = 0;
  }

  let recoveryDuration = {};

  /**
   * It takes 7 to 14 days to recover from coronavirus.
   * Hence, this generates recovery time for each person randomly in that range.
   */
  for (let i = 0; i < totalPopulation; i++) {
    recoveryDuration[i] = getRandomInt(
      MIN_RECOVERY_DAYS / changeSpeedValue,
      MAX_RECOVERY_DAYS / changeSpeedValue + 1
    );
  }

  let socialDistancingPeople = [];

  /**
   * Appends unique random number to the socialDistancingPeople array.
   */
  while (socialDistancingPeople.length < socialDistancingPopulation) {
    let randomPerson = getRandomInt(0, totalPopulation);

    // If the generated number does not exist, then the number is pushed to the array.
    if (socialDistancingPeople.indexOf(randomPerson) === -1)
      socialDistancingPeople.push(randomPerson);
  }

  let personID = 0;
  /**
   * Represents a Person.
   */
  class People {
    constructor() {
      this.personID = personID++;
      this.people = document.createElement('div');
      this.people.setAttribute('class', 'people');
      this.people.style.width = PERSON_WIDTH + 'px';
      this.people.style.height = PERSON_HEIGHT + 'px';
      this.people.style.position = 'absolute';

      // Gets the state of a person i.e. either healthy, vaccinated or infected.
      this.personState = this.getPersonState();

      // Sets id to the infected person to display wave effect (if enabled by user).
      if (this.personState === 1 && waveEffect)
        this.people.setAttribute('id', `p${this.personState}`);

      // Gets whether the particular person follows social distancing or not.
      this.socialDistancingFlag = this.getSocialDistancing();

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

      // Gets random initial direction for people to move.
      this.xDirection = getRandomDirection();
      this.yDirection = getRandomDirection();

      // If the person follows social distancing, then it makes them stationary.
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

      // Appends the people element to the simulationArea.
      simulationArea.appendChild(this.people);
    }

    /**
     * Generates state of each person at the start of simulation.
     * @returns - The state of the person.
     */
    getPersonState() {
      if (this.personID < infectedPopulationNumber) return 1;
      if (
        this.personID >= infectedPopulationNumber &&
        this.personID < infectedPopulationNumber + vaccinatedPopulationNumber
      )
        return 4;

      return 0;
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

      this.checkBoundaryCollision();
      this.checkTransmission();
      this.checkRecovery();
    }

    /**
     * Checks and redirects people back if they reach the boundary of simulation container.
     */
    checkBoundaryCollision() {
      // Checks for horizontal collison.
      if (this.xPosition > SIMULATION_AREA_WIDTH - 2 * PERSON_WIDTH) {
        this.xDirection = -1;
      } else if (this.xPosition < PERSON_WIDTH) {
        this.xDirection = 1;
      }

      // Checks for vertical collison.
      if (this.yPosition > SIMULATION_AREA_HEIGHT - 2 * PERSON_HEIGHT) {
        this.yDirection = -1;
      } else if (this.yPosition < PERSON_HEIGHT) {
        this.yDirection = 1;
      }
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
            // changeSpeedValue is used to factor in change in simulation speed.
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
                this.people.style.backgroundColor =
                  stateColorMap[this.personState];
                personStateCount[this.personState]++;
                updateStats();

                // Sets p1 id for infected people element (if wave effect present).
                if (waveEffect)
                  this.people.setAttribute('id', `p${this.personState}`);
              } else if (this.personState === 0 && probability(infectionRate)) {
                // Checks transmission to healthy people depending on infection rate.
                personStateCount[this.personState]--;
                this.personState = 1;
                this.people.style.backgroundColor =
                  stateColorMap[this.personState];
                personStateCount[this.personState]++;
                updateStats();

                // Sets p1 id for infected people element (if wave effect present).
                if (waveEffect)
                  this.people.setAttribute('id', `p${this.personState}`);
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
        // changeSpeedValue is used to factor in the change in simulation speed.
        if (
          recoveryTime[this.personID] >=
          (recoveryDuration[this.personID] / changeSpeedValue) * FPS
        ) {
          // Checks whether a person is gonna be deceased depending on death rate,
          // else the person will recover.
          if (probability(deathRate)) {
            personStateCount[this.personState]--;
            this.personState = 3;
            this.people.style.backgroundColor = stateColorMap[this.personState];
            this.xDirection = 0;
            this.yDirection = 0;
            personStateCount[this.personState]++;

            // Removes id attribute from infected person to remove wave effect (if present).
            if (waveEffect) this.people.removeAttribute('id');
          } else {
            personStateCount[this.personState]--;
            this.personState = 2;
            this.people.style.backgroundColor = stateColorMap[this.personState];
            personStateCount[this.personState]++;

            // Removes id attribute from infected person to remove wave effect (if present).
            if (waveEffect) this.people.removeAttribute('id');
          }
          updateStats();
        }
      }
    }

    /**
     * Checks whether the personID exists in the socialDistancingPeople array.
     * @returns False if personID does not exist.
     *          True if personId exists.
     */
    getSocialDistancing() {
      if (socialDistancingPeople.indexOf(this.personID) === -1) return false;

      return true;
    }

    /**
     * Moves people randomly by changing their angle each 1000/changeSpeedValue millisecond.
     */
    changeAngle() {
      let angleInterval = setInterval(() => {
        this.speedX =
          getRandomFloat(MIN_ANGLE, MAX_ANGLE) * SPEED * changeSpeedValue;
        this.speedY =
          getRandomFloat(MIN_ANGLE, MAX_ANGLE) * SPEED * changeSpeedValue;

        if (time >= SIMULATION_TIME) {
          clearInterval(angleInterval);
        }
      }, 1000 / changeSpeedValue);
    }
  }

  // The ID of request animation frame
  let requestID;

  // To store all the object of people in an array.
  const peopleArray = [];

  // Creates 'totalPopulation' instances of class People.
  for (let i = 0; i < totalPopulation; i++) {
    let people = new People();
    peopleArray.push(people);

    /**
     * Runs the simulation by recursively calling the function with the help of requestAnimationFrame.
     */
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

  /**
   * Records the history of people on each second.
   * @param {number} time - The time elapsed since the beginning of simulation.
   */
  function recordPeopleHistory(time) {
    // Stores the respective position and state of people.
    peopleArray.forEach((people) => {
      personHistory[time][people.personID]['personState'] = people.personState;
      personHistory[time][people.personID]['xPosition'] = people.xPosition;
      personHistory[time][people.personID]['yPosition'] = people.yPosition;
    });

    // Stores the count of people in different states.
    personHistory[time]['healthyCount'] = personStateCount[0];
    personHistory[time]['infectedCount'] = personStateCount[1];
    personHistory[time]['recoveredCount'] = personStateCount[2];
    personHistory[time]['deceasedCount'] = personStateCount[3];
    personHistory[time]['vaccinatedCount'] = personStateCount[4];
  }

  // Records people history in the beginning of simulation.
  recordPeopleHistory(0);

  const peopleObjects = document.getElementsByClassName('people');
  /**
   * Adds event listener to the simulation slider to view history of simulation by moving the slider.
   */
  function viewHistory() {
    simulationTimeline.addEventListener('input', () => {
      // Styles the people with their respective position and backgroundColor.
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

      // Generates of count of people in different states.
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

  /**
   * Adds event listener to change the speed of simulation by slowing or speeding.
   */
  function changeSimulationSpeed() {
    const changeSpeedInput = document.getElementById('change-speed-input');
    const slowerSpeed = document.getElementById('slower-speed');
    const fasterSpeed = document.getElementById('faster-speed');
    changeSpeedInput.innerText = changeSpeedValue;

    /**
     * When user clicks the slow button.
     */
    slowerSpeed.addEventListener('click', () => {
      if (changeSpeedValue > 0.25) {
        changeSpeedValue -= 0.25;
        changeSpeedInput.innerText = changeSpeedValue;

        // We have to clear the interval and run it again so that the interval time is changed
        // to slow down the simulation.
        // i.e. setInterval({}, 1000/changeSpeedValue)
        clearInterval(timeInterval);
        startTime();
      }
    });

    /**
     * When user clicks the fast button.
     */
    fasterSpeed.addEventListener('click', () => {
      if (changeSpeedValue < 4) {
        changeSpeedValue += 0.25;
        changeSpeedInput.innerText = changeSpeedValue;

        // We have to clear the interval and run it again so that the interval time is changed
        // to speed up the simulation.
        // i.e. setInterval({}, 1000/changeSpeedValue)
        clearInterval(timeInterval);
        startTime();
      }
    });
  }

  changeSimulationSpeed();
}
