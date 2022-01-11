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

inputSliders[2].addEventListener('input', () => {
  inputSliders[3].max = 100 - inputSliders[2].value;
});

inputSliders[3].addEventListener('input', () => {
  inputSliders[2].max = 100 - inputSliders[3].value;
});

startButton.addEventListener('click', () => {
  mainMenu.style.display = 'none';
  simulationContainer.style.display = 'block';
  startSimulation();

  // The web page automatically scrolls to the animation frame, so I used the following to prevent it.
  window.scrollTo(0, 0);
});

mainMenuTitle.addEventListener('click', () => {
  window.location.reload();
});
