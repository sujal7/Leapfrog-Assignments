/**
 * Constants for width and height of Image.
 */
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 400;

// OOP using ES6
class ImageCarousel {
  /**
   * Represents an Image Carousel
   * @param {object} carouselContainer - The div class carousel-container.
   * @param {number} transitionTime - The time taken to transition from one image to other (in milliseconds).
   * @param {number} holdTime - The time duration for image being displayed before other image is displayed automatically (in milliseconds).
   */
  constructor(carouselContainer, transitionTime, holdTime) {
    this.carouselContainer = carouselContainer;
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;
    this.carouselImageWrapper = this.carouselContainer.children;
    this.numberOfImages = this.carouselImageWrapper[0].children.length;
    this.images = this.carouselImageWrapper[0].children;
    this.styleContainer();
    this.styleImages();

    this.distanceTravelled = 0;
    this.currentIndex = 0;

    this.indicatorDotWidth = 20;
    this.indicatorDotMarginLeftRight = 5;

    this.intervalTime = 20;
    this.transitionSpeed =
      IMAGE_WIDTH / (this.transitionTime / this.intervalTime);
    this.indicatorDots = document.createElement('div');
    this.indicatorDots.setAttribute('class', 'indicator-dots');
    this.carouselContainer.appendChild(this.indicatorDots);

    this.styleIndicatorDots();

    this.createIndicatorDot();
    this.styleIndicatorDot();

    this.indicatorDotClicked();
    this.setActiveIndicatorDot();

    this.leftArrow = document.createElement('img');
    this.leftArrow.setAttribute('class', 'left-arrow');
    this.rightArrow = document.createElement('img');
    this.rightArrow.setAttribute('class', 'right-arrow');

    this.styleLeftArrow();
    this.styleRightArrow();

    this.rightArrow.addEventListener(
      'click',
      this.rightArrowClicked.bind(this)
    );
    this.leftArrow.addEventListener('click', this.leftArrowClicked.bind(this));
    this.slideAutomatically();

    this.setDynamicProperties();
    /**
     * Sets responsive property when window is resized.
     */
    window.onresize = this.setDynamicProperties.bind(this);
  }

  /**
   * Styles the carousel container.
   */
  styleContainer() {
    this.carouselContainer.style.width = `${IMAGE_WIDTH}px`;
    this.carouselContainer.style.height = `400px`;
    this.carouselContainer.style.position = `relative`;
    this.carouselContainer.style.overflow = `hidden`;
    this.carouselImageWrapper[0].style.position = 'relative';
  }

  /**
   * Styles the images placed inside the wrapper.
   */
  styleImages() {
    for (let i = 0; i < this.numberOfImages; i++) {
      this.images[i].setAttribute('class', 'image');
      this.images[i].style.position = 'absolute';
      this.images[i].style.width = `${IMAGE_WIDTH}px`;
      this.images[i].style.top = '0px';
      this.images[i].style.left = `${i * IMAGE_WIDTH}px`;
      this.images[i].style.border = '1px solid black';
      this.images[i].style.opacity = '0.9';
    }
  }

  /**
   * Sets responsive properties to the carousel.
   */
  setDynamicProperties() {
    /**
     * Adjusts the height of carousel container with respect to image height for responsiveness.
     */
    const carouselContainers =
      document.getElementsByClassName('carousel-container');
    for (let carouselContainer of carouselContainers) {
      carouselContainer.style.height = `${this.images[0].offsetHeight}px`;
    }

    /**
     * Adjuts the position of indicator dots responsively.
     */
    const indicatorDots = document.getElementsByClassName('indicator-dots');
    for (let indicatorDot of indicatorDots) {
      indicatorDot.style.left = `${
        this.images[0].offsetWidth / 2 -
        this.numberOfImages *
          (this.indicatorDotWidth - this.indicatorDotMarginLeftRight)
      }px`;
    }

    /**
     * Adjusts the position of left and right arrow responsively.
     */
    const leftArrows = document.getElementsByClassName('left-arrow');
    for (let leftArrow of leftArrows) {
      leftArrow.style.top = `${
        this.images[0].offsetHeight / 2 -
        parseInt(this.leftArrow.style.height) / 2
      }px`;
    }

    const rightArrows = document.getElementsByClassName('right-arrow');
    for (let rightArrow of rightArrows) {
      rightArrow.style.top = `${
        this.images[0].offsetHeight / 2 -
        parseInt(this.rightArrow.style.height) / 2
      }px`;
    }
  }

  /**
   * Styles the indicator dots div.
   */
  styleIndicatorDots() {
    this.indicatorDots.style.position = 'absolute';
    this.indicatorDots.style.left = `${
      IMAGE_WIDTH / 2 -
      this.numberOfImages *
        (this.indicatorDotWidth - this.indicatorDotMarginLeftRight)
    }px`;
    this.indicatorDots.style.bottom = '5%';
    this.numberOfImages * this.indicatorDotWidth +
      2 * this.numberOfImages * this.indicatorDotMarginLeftRight;
  }

  /**
   * Creates indicator dot images and appends it inside indicator dots div.
   */
  createIndicatorDot() {
    for (let i = 0; i < this.numberOfImages; i++) {
      this.indicatorDots[i] = document.createElement('img');
      this.indicatorDots[i].src = 'src/images/indicatorDot.svg';
      this.indicatorDots.appendChild(this.indicatorDots[i]);
    }
  }

  /**
   * Styles the indicator dot images.
   */
  styleIndicatorDot() {
    for (let i = 0; i < this.numberOfImages; i++) {
      this.indicatorDots[i].style.width = `${this.indicatorDotWidth}px`;
      this.indicatorDots[i].style.marginLeft =
        this.indicatorDotMarginLeftRight + 'px';
      this.indicatorDots[i].style.marginRight =
        this.indicatorDotMarginLeftRight + 'px';
      this.indicatorDots[i].style.cursor = 'pointer';
      this.indicatorDots[i].style.filter =
        'invert(13%) sepia(0%) saturate(133%) hue-rotate(213deg) brightness(107%) contrast(89%)';
    }
  }

  /**
   * Changes color of active indicator dot.
   */
  setActiveIndicatorDot() {
    for (let indicatorDot of this.indicatorDots.children) {
      indicatorDot.style.filter =
        'invert(13%) sepia(0%) saturate(133%) hue-rotate(213deg) brightness(107%) contrast(89%)';
    }
    this.indicatorDots.children[this.currentIndex].style.filter =
      'invert(76%) sepia(3%) saturate(14%) hue-rotate(331deg) brightness(88%) contrast(88%)';
  }

  /**
   * Handles click event for indicator dot.
   */
  indicatorDotClicked() {
    for (let i = 0; i < this.numberOfImages; i++) {
      /**
       * Triggers a function when an indicator dot is clicked.
       */
      this.indicatorDots[i].addEventListener('click', () => {
        clearInterval(this.slideInterval);
        /**
         * Runs every 'intervalTime' until the interval is cleared.
         */
        /**
         * If clicked indicator dot is same as current pos, it clears the interval.
         */
        if (this.currentIndex === i) {
          clearInterval(this.interval);
          this.slideAutomatically();
        } else if (this.currentIndex > i) {
          this.interval = setInterval(() => {
            /**
             * Runs if clicked indicator dot is before the current position.
             */
            // this.distanceTravelled -=
            //   this.transitionSpeed * (this.currentIndex - i);
            this.distanceTravelled -= this.transitionSpeed;
            this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;

            if (this.distanceTravelled <= i * IMAGE_WIDTH) {
              clearInterval(this.interval);
              this.currentIndex = i;
              this.setActiveIndicatorDot();
              this.slideAutomatically();
            }
          }, this.intervalTime / (this.currentIndex - i));
        } else {
          /**
           * Runs if clicked indicator dot is after the current position.
           */
          this.interval = setInterval(() => {
            this.distanceTravelled += this.transitionSpeed;
            this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;
            if (this.distanceTravelled >= i * IMAGE_WIDTH) {
              clearInterval(this.interval);
              this.currentIndex = i;
              this.setActiveIndicatorDot();
              this.slideAutomatically();
            }
          }, this.intervalTime / (i - this.currentIndex));
        }
      });
    }
  }

  /**
   * Styles the left arrow image.
   */
  styleLeftArrow() {
    this.leftArrow.src = 'src/images/leftArrow.png';
    this.leftArrow.style.filter =
      'invert(68%) sepia(1%) saturate(0%) hue-rotate(160deg) brightness(50%) contrast(100%) drop-shadow(0px 10px 3px black)';
    this.leftArrow.style.position = 'absolute';
    this.leftArrow.style.width = '100px';
    this.leftArrow.style.height = '100px';
    this.leftArrow.style.cursor = 'pointer';
    this.leftArrow.style.top = `${
      IMAGE_HEIGHT / 2 - parseInt(this.leftArrow.style.height) / 2
    }px`;
    this.leftArrow.style.left = '0px';
    this.carouselContainer.appendChild(this.leftArrow);
  }

  /**
   * Styles the right arrow image.
   */
  styleRightArrow() {
    this.rightArrow.src = 'src/images/rightArrow.png';
    this.rightArrow.style.filter =
      'invert(68%) sepia(1%) saturate(0%) hue-rotate(160deg) brightness(50%) contrast(86%) drop-shadow(0px 10px 3px black)';
    this.rightArrow.style.position = 'absolute';
    this.rightArrow.style.top = '0px';
    this.rightArrow.style.width = '100px';
    this.rightArrow.style.height = '100px';
    this.rightArrow.style.cursor = 'pointer';
    this.rightArrow.style.top = `${
      IMAGE_HEIGHT / 2 - parseInt(this.rightArrow.style.height) / 2
    }px`;
    this.rightArrow.style.right = '0px';
    this.carouselContainer.appendChild(this.rightArrow);
  }

  /**
   * Switches to right image when right arrow is clicked.
   */
  rightArrowClicked() {
    this.currentIndex++;
    /**
     * True if last image is being displayed,
     * else False.
     */
    if (this.currentIndex === this.numberOfImages) {
      clearInterval(this.slideInterval);
      this.currentIndex = 0;
      this.interval = setInterval(() => {
        this.distanceTravelled -= this.transitionSpeed;
        this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;
        if (this.distanceTravelled < this.currentIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
          this.slideAutomatically();
        }
      }, this.intervalTime / (this.numberOfImages - 1));
    } else {
      clearInterval(this.slideInterval);
      this.interval = setInterval(() => {
        this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;
        this.distanceTravelled += this.transitionSpeed;

        if (this.distanceTravelled > this.currentIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
          this.slideAutomatically();
        }
      }, this.intervalTime);
    }
  }

  /**
   * Switches to left image when left arrow is clicked.
   */
  leftArrowClicked() {
    this.currentIndex--;

    /**
     * True if first image is being displayed,
     * else False.
     */
    if (this.currentIndex === -1) {
      this.currentIndex = this.numberOfImages - 1;
      this.interval = setInterval(() => {
        this.distanceTravelled += this.transitionSpeed;
        this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;

        if (this.distanceTravelled >= this.currentIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
        }
      }, this.intervalTime / (this.numberOfImages - 1));
    } else {
      this.interval = setInterval(() => {
        this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;
        this.distanceTravelled -= this.transitionSpeed;

        if (this.distanceTravelled < this.currentIndex * IMAGE_WIDTH) {
          clearInterval(this.interval);
          this.setActiveIndicatorDot();
        }
      }, this.intervalTime);
    }
  }

  /**
   * Slides the images automatically every 'holdTime'.
   */
  slideAutomatically() {
    this.slideInterval = setInterval(() => {
      this.rightArrowClicked();
    }, this.holdTime);
  }
}

const carouselContainers =
  document.getElementsByClassName('carousel-container');

//  If you want to set different transition time and hold times for different carousels
//  Then you can do the following:

const transitionTimeOne = 1000;
const transitionTimeTwo = 500;
const holdTimeOne = 4000;
const holdTimeTwo = 3000;

// I have used setTimeout because sometimes, the image is not loaded properly.
setTimeout(() => {
  new ImageCarousel(carouselContainers[0], transitionTimeOne, holdTimeOne);
  new ImageCarousel(carouselContainers[1], transitionTimeTwo, holdTimeTwo);
  new ImageCarousel(carouselContainers[2], 500, 2000);
}, 100);

// Simply, run the below code if you want to set same transition time and hold time for different carousels.
// for (let carouselContainer of carouselContainers) {
//   new ImageCarousel(carouselContainer, 1000, 4000);
// }
