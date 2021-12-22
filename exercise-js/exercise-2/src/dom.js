var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
  { x: 90, y: 100 },
  { x: 75, y: 150 },
  { x: 150, y: 100 },
  { x: 95, y: 180 },
  { x: 15, y: 145 },
  { x: 160, y: 120 },
  { x: 130, y: 30 },
  { x: 20, y: 100 },

];
let myContainer = document.getElementById("container");
myContainer.style.position = "relative";

points.forEach((point) => {
  const x = point.x;
  const y = point.y;
  const pointObject = document.createElement("div");
  pointObject.setAttribute("class", "point");
  pointObject.style.width = "10px";
  pointObject.style.height = "10px";
  pointObject.style.position = "absolute";
  pointObject.style.background = "#49c";
  pointObject.style.top = y + "px";
  pointObject.style.left = x + "px";
  pointObject.style.borderRadius = "50%";
  myContainer.appendChild(pointObject);
});

let colorFlag = false;
const handleClick = (event) => {
  if (!colorFlag) {
    event.target.style.background = "#a22";
    colorFlag = true;
  } else {
    event.target.style.background = "#49c";
    colorFlag = false;
  }
};

const pointObjects = document.getElementsByClassName("point");
for (let i = 0; i < pointObjects.length; i++) {
  pointObjects[i].addEventListener("click", handleClick);
}
