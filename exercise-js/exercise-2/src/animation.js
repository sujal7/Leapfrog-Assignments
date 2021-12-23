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

// using object oriented approach

const animationContainerNew = document.getElementById(
  "animation-container-new"
);
animationContainerNew.style.width = "500";
animationContainerNew.style.height = "400px";
animationContainerNew.style.marginTop = "20px";
animationContainerNew.style.border = "1px solid #a22";
animationContainerNew.style.margin = "20px auto";
animationContainerNew.style.position = "relative";

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = "50px";
    this.height = "50px";
    this.color = "#a22";
    this.ballElement = document.createElement("div");
    this.ballElement.style.position = "absolute";
    this.ballElement.style.top = this.y + "px";
    this.ballElement.style.left = this.x + "px";
    this.ballElement.style.borderRadius = "50%";
    this.ballElement.style.width = this.width;
    this.ballElement.style.height = this.height;
    this.ballElement.style.background = this.color;
    this.flag = true;
    setInterval(() => {
      animationContainerNew.appendChild(this.ballElement);
      this.ballElement.style.top = parseInt(this.y, 10) + "px";
      if (this.flag === true) {
        this.y += 2;
        if (
          this.y ===
          parseInt(animationContainerNew.style.height, 10) -
            parseInt(this.height, 10)
        ) {
          this.flag = false;
        }
      } else if (this.flag === false) {
        this.y -= 2;
        if (this.y === 0) {
          this.flag = true;
        }
      }
      console.log(this.ballElement.style.top);
    }, 5);
  }
}

new Ball(50, 0);
new Ball(250, 0);
new Ball(350, 0);
