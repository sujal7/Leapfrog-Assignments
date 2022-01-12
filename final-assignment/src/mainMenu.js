const inputParameters = {};

const mainMenu = document.getElementById('main-menu');
const mainMenuTitle = document.getElementById('main-menu-title');
const simulationContainer = document.getElementById('simulation-container');
const inputSliders = document.querySelectorAll('.main-menu input');
const inputValues = document.getElementsByClassName('input-values');
const startButton = document.getElementById('start-simulation');

/**
 * Adds event listener to all the input parameters so that they change according to user input.
 */
function setInputParameters() {
  for (let i = 0; i < inputSliders.length - 1; i++) {
    inputValues[i].innerText = inputSliders[i].value;
    inputParameters[i] = inputSliders[i].value;
    inputSliders[i].addEventListener('input', () => {
      inputValues[i].innerText = inputSliders[i].value;
      inputParameters[i] = inputSliders[i].value;
    });
  }
}

setInputParameters();

/**
 * Adjusts the maximum limit of vaccinated and infected population such that their sum is always less than or equal to 100(%).
 */
function setMaxLimit() {
  inputSliders[2].addEventListener('input', () => {
    inputSliders[3].max = 100 - inputSliders[2].value;
  });

  inputSliders[3].addEventListener('input', () => {
    inputSliders[2].max = 100 - inputSliders[3].value;
  });
}

setMaxLimit();

const mainMenuHelpImages = document.getElementsByClassName(
  'main-menu-help-image'
);
const mainMenuHelpText = document.getElementsByClassName('main-menu-help-text');

/**
 * Adds event listeners to all the help images in main menu.
 */
function setMainMenuHelp() {
  for (let i = 0; i < inputSliders.length; i++) {
    /**
     * Displays help text when mouse is hovered.
     */
    mainMenuHelpImages[i].addEventListener('mouseover', () => {
      mainMenuHelpText[i].style.display = 'inline';
    });

    /**
     * Hides the help text when mouse is out.
     */
    mainMenuHelpImages[i].addEventListener('mouseout', () => {
      mainMenuHelpText[i].style.display = 'none';
    });
  }
}

setMainMenuHelp();

// Displays the simulation area and runs the simulation when the user clicks the start button.
startButton.addEventListener('click', () => {
  mainMenu.style.display = 'none';
  simulationContainer.style.display = 'inline-block';
  startSimulation();

  // The web page automatically scrolls to the animation frame, so I used the following to prevent it.
  window.scrollTo(0, 0);
});

// To refresh the page when the user clicks on the title.
mainMenuTitle.addEventListener('click', () => {
  window.location.reload();
});
