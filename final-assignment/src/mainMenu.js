const inputParameters = {};

const mainMenu = document.getElementById('main-menu');
const mainMenuTitle = document.getElementById('main-menu-title');
const simulationContainer = document.getElementById('simulation-container');
const inputSliders = document.querySelectorAll('.main-menu input');
const inputValues = document.getElementsByClassName('input-values');
const startButton = document.getElementById('start-simulation');

for (let i = 0; i < inputSliders.length - 1; i++) {
  inputValues[i].innerText = inputSliders[i].value;
  inputParameters[i] = inputSliders[i].value;
  inputSliders[i].addEventListener('input', () => {
    inputValues[i].innerText = inputSliders[i].value;
    inputParameters[i] = inputSliders[i].value;
  });
}

startButton.addEventListener('click', () => {
  mainMenu.style.display = 'none';
  simulationContainer.style.display = 'block';
  startSimulation();
});

mainMenuTitle.addEventListener('click', () => {
  window.location.reload();
});
