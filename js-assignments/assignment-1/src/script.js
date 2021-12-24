/**
 * Constants for width and height of Image.
 */
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 400;

/**
 * Gets the DOM Elements from HTML.
 */
const carouselContainer = document.getElementsByClassName('carousel-container');
const carouselImageWrapper = document.getElementsByClassName(
  'carousel-image-wrapper'
);
const images = document.getElementsByTagName('img');

/**
 * Gets the number of images present inside the image wrapper.
 */
const numberOfImages = carouselImageWrapper[0].children.length;

/**
 * Styles carousel container and image wrapper.
 */
carouselContainer[0].style.width = `${IMAGE_WIDTH}px`;
carouselContainer[0].style.height = `${IMAGE_HEIGHT}px`;
carouselContainer[0].style.position = `relative`;
carouselContainer[0].style.overflow = `hidden`;
carouselImageWrapper[0].style.position = 'relative';

/**
 * Styles all the images provided in HTML.
 */
for (let i = 0; i < numberOfImages; i++) {
  images[i].style.position = 'absolute';
  images[i].style.width = `${IMAGE_WIDTH}px`;
  images[i].style.height = `${IMAGE_HEIGHT}px`;
  images[i].style.top = '0px';
  images[i].style.left = `${i * IMAGE_WIDTH}px`;
  images[i].style.border = '1px solid black';
  images[i].style.opacity = '0.9';
}

/**
 * Variables and Constants for Transition of Images.
 */
const transitionSpeed = IMAGE_WIDTH / 20;
let distanceTravelled = 0;
let currentIndex = 0;
let interval;

/**
 * Function for Right Click.
 */
const rightArrowClicked = function () {
  currentIndex++;

  /**
   * True if last image is being displayed,
   * else False.
   */
  if (currentIndex === numberOfImages) {
    currentIndex = 0;
    interval = setInterval(() => {
      distanceTravelled -= transitionSpeed;
      carouselImageWrapper[0].style.left = `-${distanceTravelled}px`;

      if (distanceTravelled < currentIndex * IMAGE_WIDTH) {
        clearInterval(interval);
      }
    }, 5);
  } else {
    interval = setInterval(() => {
      carouselImageWrapper[0].style.left = `-${distanceTravelled}px`;
      distanceTravelled += transitionSpeed;

      if (distanceTravelled > currentIndex * IMAGE_WIDTH) {
        clearInterval(interval);
      }
    }, 17);
  }
};

/**
 * Function for Left Click.
 */
const leftArrowClicked = function () {
  currentIndex--;

  /**
   * True if first image is being displayed,
   * else False.
   */
  if (currentIndex === -1) {
    currentIndex = numberOfImages - 1;
    interval = setInterval(() => {
      distanceTravelled += transitionSpeed;
      carouselImageWrapper[0].style.left = `-${distanceTravelled}px`;

      if (distanceTravelled >= currentIndex * IMAGE_WIDTH) {
        clearInterval(interval);
      }
    }, 5);
  } else {
    interval = setInterval(() => {
      carouselImageWrapper[0].style.left = `-${distanceTravelled}px`;
      distanceTravelled -= transitionSpeed;

      if (distanceTravelled < currentIndex * IMAGE_WIDTH) {
        clearInterval(interval);
      }
    }, 17);
  }
};

/**
 * Constants for Indicator Dot.
 */
const indicatorDotWidth = 20;
const indicatorDotMarginLeftRight = 5;

/**
 * Creates a new div to contain the indicator dots.
 */
const indicatorDots = document.createElement('div');
carouselContainer[0].appendChild(indicatorDots);

/**
 * Styles the position of div that contains indicator dots.
 */
indicatorDots.style.position = 'absolute';
indicatorDots.style.top = `${IMAGE_HEIGHT - indicatorDotWidth * 2}px`;
indicatorDots.style.left = `${
  IMAGE_WIDTH / 2 -
  numberOfImages * (indicatorDotWidth - indicatorDotMarginLeftRight)
}px`;

/**
 * Generates and styles indicator dots depending on number of images provided in HTML.
 */
for (let i = 0; i < numberOfImages; i++) {
  const indicatorDot = document.createElement('img');
  indicatorDot.src = 'src/images/indicatorDot.svg';
  indicatorDot.style.width = `${indicatorDotWidth}px`;
  indicatorDot.style.marginBottom = '5px';
  indicatorDot.style.marginLeft = indicatorDotMarginLeftRight + 'px';
  indicatorDot.style.marginRight = indicatorDotMarginLeftRight + 'px';
  indicatorDot.style.cursor = 'pointer';
  indicatorDots.appendChild(indicatorDot);
  indicatorDot.style.filter =
    'invert(76%) sepia(3%) saturate(14%) hue-rotate(331deg) brightness(88%) contrast(88%)';

  /**
   * Triggers a function when an indicator dot is clicked.
   */
  indicatorDot.addEventListener('click', () => {
    /**
     * Runs every 17 milliseconds until the interval is cleared.
     */
    interval = setInterval(() => {
      if (currentIndex > i) {
        /**
         * Runs if clicked indicator dot is before the current position.
         */
        distanceTravelled -= transitionSpeed;
        carouselImageWrapper[0].style.left = `-${distanceTravelled}px`;

        if (distanceTravelled <= i * IMAGE_WIDTH) {
          clearInterval(interval);
          currentIndex = i;
        }
      } else {
        /**
         * Runs if clicked indicator dot is after the current position.
         */
        distanceTravelled += transitionSpeed;
        carouselImageWrapper[0].style.left = `-${distanceTravelled}px`;
        if (distanceTravelled >= i * IMAGE_WIDTH) {
          clearInterval(interval);
          currentIndex = i;
        }
      }
    }, 17);
  });
}

/**
 * Left and Right Arrow Styling
 */
const leftArrow = document.createElement('img');
const rightArrow = document.createElement('img');

leftArrow.src = 'src/images/leftArrow.png';
leftArrow.style.position = 'absolute';
leftArrow.style.width = '100px';
leftArrow.style.height = '100px';
leftArrow.style.cursor = 'pointer';
leftArrow.style.top = `${
  IMAGE_HEIGHT / 2 - parseInt(leftArrow.style.height) / 2
}px`;
leftArrow.style.left = '0px';

rightArrow.src = 'src/images/rightArrow.png';
rightArrow.style.position = 'absolute';
rightArrow.style.top = '0px';
rightArrow.style.width = '100px';
rightArrow.style.height = '100px';
rightArrow.style.cursor = 'pointer';
rightArrow.style.top = `${
  IMAGE_HEIGHT / 2 - parseInt(rightArrow.style.height) / 2
}px`;
rightArrow.style.right = '0px';

carouselContainer[0].appendChild(leftArrow);
carouselContainer[0].appendChild(rightArrow);

/**
 * Triggers a function when right arrow is clicked.
 */
rightArrow.addEventListener('click', rightArrowClicked);

/**
 * Triggers a function when right arrow is clicked.
 */
leftArrow.addEventListener('click', leftArrowClicked);
