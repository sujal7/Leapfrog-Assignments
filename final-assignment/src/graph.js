/**
 * Constants for Canvas and Graph.
 */
const canvas = document.getElementById('graph');
const GRAPH_TOP = 25;
const GRAPH_BOTTOM = 200;
const GRAPH_LEFT = 25;
const GRAPH_RIGHT = 1100;
const GRAPH_HEIGHT = GRAPH_BOTTOM - GRAPH_TOP;
const GRAPH_WIDTH = GRAPH_RIGHT - GRAPH_LEFT;

let totalPopulation;
let totalPoints;

/**
 * Initializes the variables that is used to plot graph.
 * @param {number} SIMULATION_TIME - The days to be simulated entered by the user.
 * @param {number} population - The total population entered by the user.
 */
function initializeVariables(SIMULATION_TIME, population) {
  totalPoints = SIMULATION_TIME + 1;
  totalPopulation = population;
}

/**
 * Draws the X and Y axis of the graph with its references values and reference lines.
 */
function drawGraph() {
  const context = canvas.getContext('2d');
  context.font = 'bold 16px Arial';
  context.strokeStyle = '#cfcfcf';

  context.fillStyle = '#cfcfcf';
  context.lineWidth = 3;

  // Draw X and Y axis
  context.beginPath();
  context.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
  context.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);

  context.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);

  context.lineTo(GRAPH_LEFT, GRAPH_TOP);
  context.stroke();

  // Draw reference line
  context.beginPath();
  context.moveTo(GRAPH_LEFT, GRAPH_TOP);
  context.lineTo(GRAPH_RIGHT, GRAPH_TOP);

  // Draw reference value for population
  context.fillText(totalPopulation, GRAPH_RIGHT + 15, GRAPH_TOP);
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

  // Draw reference value for days with a step size of 5.
  context.font = 'bold 16px Arial';
  context.fillText('0', 15, GRAPH_BOTTOM + 25);
  for (let i = 5; i < totalPoints; i += 5) {
    context.fillText(i, (GRAPH_RIGHT / totalPoints) * i, GRAPH_BOTTOM + 25);
  }

  // Draws reference value for the last day.
  context.fillText(
    totalPoints - 1,
    (GRAPH_RIGHT / totalPoints) * (totalPoints - 1),
    GRAPH_BOTTOM + 25
  );
  context.stroke();
}

let canvasLine = [];
for (let i = 0; i < 5; i++) {
  canvasLine[i] = document.getElementById(`line${i + 1}`);
}

let context = [];
/**
 * Moves to the first point of given state on the graph at 0(origin).
 * @param {number} personState - The state of person that is uniquely represented.
 * @param {number} personStateCount - The count of people in the given state.
 */
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

/**
 * Plots the line graph of all people in all state each second.
 * @param {number} time - The time elapsed since the start of the simulation.
 */
function plotLineGraph(time) {
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
