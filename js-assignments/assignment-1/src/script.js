const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 400;

const carouselContainer = document.getElementsByClassName('carousel-container');
const carouselImageWrapper = document.getElementsByClassName('carousel-image-wrapper');
const images = document.getElementsByTagName('img');
const numberOfImages = carouselImageWrapper[0].children.length;

carouselContainer[0].style.width = `${IMAGE_WIDTH}px`;
carouselContainer[0].style.height = `${IMAGE_HEIGHT}px`;
carouselContainer[0].style.position = `relative`;
carouselContainer[0].style.overflow = `hidden`;
carouselImageWrapper[0].style.position = 'relative';

for(let i=0; i<numberOfImages; i++){
    images[i].style.position = 'absolute';
    images[i].style.width = `${IMAGE_WIDTH}px`;
    images[i].style.height = `${IMAGE_HEIGHT}px`;
    images[i].style.top = '0px';
    images[i].style.left = `${i*IMAGE_WIDTH}px`;
    images[i].style.border = '1px solid grey';
    images[i].style.opacity = '0.95'
}

const leftArrow = document.createElement('img');
const rightArrow = document.createElement('img');

leftArrow.src = 'src/images/leftArrow.png';
leftArrow.style.position = 'absolute';
leftArrow.style.width = '100px';
leftArrow.style.height = '100px';
leftArrow.style.cursor = 'pointer';
leftArrow.style.top = `${IMAGE_HEIGHT/2 - (parseInt(leftArrow.style.height)/2)}px`;
leftArrow.style.left = '0px';

rightArrow.src = 'src/images/rightArrow.png';
rightArrow.style.position = 'absolute';
rightArrow.style.top = '0px';
rightArrow.style.width = '100px';
rightArrow.style.height = '100px';
rightArrow.style.cursor = 'pointer';
rightArrow.style.top = `${IMAGE_HEIGHT/2 - (parseInt(rightArrow.style.height)/2)}px`;
rightArrow.style.right = '0px'

carouselContainer[0].appendChild(leftArrow);
carouselContainer[0].appendChild(rightArrow);

let currentIndex = 0;
rightArrow.addEventListener('click', ()=>{
    currentIndex++;
    if(currentIndex===numberOfImages)   currentIndex=0;
    carouselImageWrapper[0].style.left=`-${currentIndex*IMAGE_WIDTH}px`;
})

leftArrow.addEventListener('click', ()=>{
    currentIndex--;
    if(currentIndex===-1)   currentIndex=numberOfImages-1;
    carouselImageWrapper[0].style.left=`-${currentIndex*IMAGE_WIDTH}px`;
})

// 16 or 17 ms -> 60fps
// game loop

const indicatorDots = document.createElement('div');
indicatorDots.style.position = 'absolute';
carouselContainer[0].appendChild(indicatorDots);
const indicatorDotWidth = 20;
const indicatorDotMarginLeftRight = 5;
for(let i=0; i<numberOfImages; i++){
    const indicatorDot = document.createElement('img');
    indicatorDot.src = 'src/images/indicatorDot.svg';
    // indicatorDot.style.position = 'absolute';
    indicatorDot.style.width = `${indicatorDotWidth}px`;
    indicatorDot.style.marginBottom = '5px';
    indicatorDot.style.marginLeft = indicatorDotMarginLeftRight+'px';
    indicatorDot.style.marginRight = indicatorDotMarginLeftRight+'px';
    indicatorDot.style.filter = 'invert(76%) sepia(3%) saturate(14%) hue-rotate(331deg) brightness(88%) contrast(88%)';
    indicatorDot.addEventListener('click', ()=>{
        carouselImageWrapper[0].style.left=`-${i*IMAGE_WIDTH}px`;
        currentIndex = i;
    })
    indicatorDot.style.cursor = 'pointer';
    indicatorDots.appendChild(indicatorDot);
}

indicatorDots.style.top = `${IMAGE_HEIGHT-indicatorDotWidth*2}px`;
indicatorDots.style.left = `${IMAGE_WIDTH/2 - numberOfImages*(indicatorDotWidth-5)}px`;
console.log(indicatorDots.style.width);

