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
    this.carouselContainer.appendChild(this.indicatorDots);

    this.styleIndicatorDots();

    this.createIndicatorDot();
    this.styleIndicatorDot();

    this.indicatorDotClicked();
    this.setActiveIndicatorDot();

    this.leftArrow = document.createElement('img');
    this.rightArrow = document.createElement('img');

    this.styleLeftArrow();
    this.styleRightArrow();

    this.rightArrow.addEventListener(
      'click',
      this.rightArrowClicked.bind(this)
    );
    this.leftArrow.addEventListener('click', this.leftArrowClicked.bind(this));
    this.slideAutomatically();
  }

  styleContainer() {
    this.carouselContainer.style.width = `${IMAGE_WIDTH}px`;
    this.carouselContainer.style.height = `${IMAGE_HEIGHT}px`;
    this.carouselContainer.style.position = `relative`;
    this.carouselContainer.style.overflow = `hidden`;
    this.carouselImageWrapper[0].style.position = 'relative';
  }

  styleImages() {
    for (let i = 0; i < this.numberOfImages; i++) {
      this.images[i].style.position = 'absolute';
      this.images[i].style.width = `${IMAGE_WIDTH}px`;
      this.images[i].style.height = `${IMAGE_HEIGHT}px`;
      this.images[i].style.top = '0px';
      this.images[i].style.left = `${i * IMAGE_WIDTH}px`;
      this.images[i].style.border = '1px solid black';
      this.images[i].style.opacity = '0.9';
    }
  }
  styleIndicatorDots() {
    this.indicatorDots.style.position = 'absolute';
    this.indicatorDots.style.top = `${
      IMAGE_HEIGHT - this.indicatorDotWidth * 2
    }px`;
    this.indicatorDots.style.left = `${
      IMAGE_WIDTH / 2 -
      this.numberOfImages *
        (this.indicatorDotWidth - this.indicatorDotMarginLeftRight)
    }px`;
  }

  createIndicatorDot() {
    for (let i = 0; i < this.numberOfImages; i++) {
      this.indicatorDots[i] = document.createElement('img');
      this.indicatorDots[i].src = 'src/images/indicatorDot.svg';
      this.indicatorDots.appendChild(this.indicatorDots[i]);
    }
  }

  styleIndicatorDot() {
    for (let i = 0; i < this.numberOfImages; i++) {
      this.indicatorDots[i].style.width = `${this.indicatorDotWidth}px`;
      this.indicatorDots[i].style.marginBottom = '5px';
      this.indicatorDots[i].style.marginLeft =
        this.indicatorDotMarginLeftRight + 'px';
      this.indicatorDots[i].style.marginRight =
        this.indicatorDotMarginLeftRight + 'px';
      this.indicatorDots[i].style.cursor = 'pointer';
      this.indicatorDots[i].style.filter =
        'invert(13%) sepia(0%) saturate(133%) hue-rotate(213deg) brightness(107%) contrast(89%)';
    }
  }

  setActiveIndicatorDot() {
    for (let indicatorDot of this.indicatorDots.children) {
      indicatorDot.style.filter =
        'invert(13%) sepia(0%) saturate(133%) hue-rotate(213deg) brightness(107%) contrast(89%)';
    }
    this.indicatorDots.children[this.currentIndex].style.filter =
      'invert(76%) sepia(3%) saturate(14%) hue-rotate(331deg) brightness(88%) contrast(88%)';
  }

  indicatorDotClicked() {
    for (let i = 0; i < this.numberOfImages; i++) {
      /**
       * Triggers a function when an indicator dot is clicked.
       */
      this.indicatorDots[i].addEventListener('click', () => {
        clearInterval(this.slide);
        /**
         * Runs every 17 milliseconds until the interval is cleared.
         */
        this.interval = setInterval(() => {
          /**
           * If clicked indicator dot is same as current pos, it clears the interval.
           */
          if (this.currentIndex === i) {
            clearInterval(this.interval);
            this.slideAutomatically();
          } else if (this.currentIndex > i) {
            /**
             * Runs if clicked indicator dot is before the current position.
             */
            this.distanceTravelled -=
              this.transitionSpeed * (this.currentIndex - i);
            this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;

            if (this.distanceTravelled <= i * IMAGE_WIDTH) {
              clearInterval(this.interval);
              this.currentIndex = i;
              this.setActiveIndicatorDot();
              this.slideAutomatically();
            }
          } else {
            /**
             * Runs if clicked indicator dot is after the current position.
             */
            this.distanceTravelled +=
              this.transitionSpeed * (i - this.currentIndex);
            this.carouselImageWrapper[0].style.left = `-${this.distanceTravelled}px`;
            if (this.distanceTravelled >= i * IMAGE_WIDTH) {
              clearInterval(this.interval);
              this.currentIndex = i;
              this.setActiveIndicatorDot();
              this.slideAutomatically();
            }
          }
        }, this.intervalTime);
      });
    }
  }

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

  rightArrowClicked() {
    this.currentIndex++;
    /**
     * True if last image is being displayed,
     * else False.
     */
    if (this.currentIndex === this.numberOfImages) {
      clearInterval(this.slide);
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
      clearInterval(this.slide);
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

  slideAutomatically() {
    this.slide = setInterval(() => {
      this.rightArrowClicked();
    }, this.holdTime);
  }
}

const carouselContainers =
  document.getElementsByClassName('carousel-container');

for (let carouselContainer of carouselContainers) {
  new ImageCarousel(carouselContainer, 1000, 4000);
}
