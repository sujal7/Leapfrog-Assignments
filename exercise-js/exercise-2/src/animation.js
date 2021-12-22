let animationContainer = document.getElementById("animation-container");
console.log(animationContainer);

animationContainer.style.position = "relative";
const ball = document.createElement("div");
ball.setAttribute("class", "ball");
ball.style.width = "50px";
ball.style.height = "50px";
ball.style.background = "#49c";
ball.style.borderRadius = "50%";
ball.style.position = "absolute";
ball.style.left = "100px";

let y = 0;
/**
 * Here, I have used flag to represent downward and upward motion.
 * flag = true for downward & flag = false for upward
 */
let flag = true;
setInterval(() => {
  ball.style.top = y + "px";
  animationContainer.appendChild(ball);
  if (flag === true) {
    y += 2;
    if (y === 250) {
      flag = false;
    }
  } else if (flag === false) {
    y -= 2;
    if (y === 0) {
      flag = true;
    }
  }
}, 5);
