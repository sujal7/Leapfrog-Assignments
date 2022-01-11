const healthyPopulation = document.getElementById('healthy-population');
const infectedPopulation = document.getElementById('infected-population');
const recoveredPopulation = document.getElementById('recovered-population');
const deceasedPopulation = document.getElementById('deceased-population');
const vaccinatedPopulation = document.getElementById('vaccinated-population');

/**
 * Updates the count of people in each state in the document.
 */
function updateStats() {
  healthyPopulation.innerHTML = personStateCount[0];
  infectedPopulation.innerHTML = personStateCount[1];
  recoveredPopulation.innerHTML = personStateCount[2];
  deceasedPopulation.innerHTML = personStateCount[3];
  vaccinatedPopulation.innerHTML = personStateCount[4];
}
