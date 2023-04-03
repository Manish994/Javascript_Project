//Select Carousel
const carousel = document.querySelector(".carousel");

//Select all the slides inside carousel
//Selection using spread operator
const slides = [...carousel.children];

//Calculate the slideWidth
const slideWidth = slides[0].getBoundingClientRect().width;

//Position the slides horizontally
function positionSlides(slides) {
  for (let index = 0; index < slides.length; index++) {
    slides[index].style.left = slideWidth * index + "px";
  }
}
positionSlides(slides);

//Select Next Button
const nextButton = document.querySelector(".right-btn");

//On right click button, we move(translateX) the carousel to the left position
nextButton.addEventListener("click", function () {
  const currentSlide = carousel.querySelector(".active");
  const nextSlide = currentSlide.nextElementSibling;
  moveToSlide(carousel, currentSlide, nextSlide);
  hideButton(nextSlide, slides);
  moveToDot(nextSlide, slides, nav, dots);
});

//Select previous button.
const previousButton = document.querySelector(".left-btn");

//On the left button click, we move(translateX) carousel to the right position.
previousButton.addEventListener("click", function () {
  const currentSlide = carousel.querySelector(".active");
  const previousSlide = currentSlide.previousElementSibling;
  moveToSlide(carousel, currentSlide, previousSlide);
  hideButton(previousSlide, slides);
  moveToDot(previousSlide, slides, nav, dots);
});

//Move To Dot
function moveToDot(targetSlide, slides, nav, dots) {
  const slideIndex = findIndex(targetSlide, slides);
  const currentDot = nav.querySelector(".active");
  const targetDot = dots[slideIndex];
  toggleActive(currentDot, targetDot);
}

//Function moveToSlide
function moveToSlide(carousel, currentSlide, targetSlide) {
  const position = targetSlide.style.left;
  carousel.style.transform = `translateX(-${position})`;
  toggleActive(currentSlide, targetSlide);
}

//Function toggle active class
function toggleActive(current, target) {
  current.classList.remove("active");
  target.classList.add("active");
}

//function Hide Button
function hideButton(targetSlide, slides) {
  //if target slide is the first slide then previous button must be hidden
  //and next button must be visible
  if (targetSlide === slides[0]) {
    previousButton.classList.add("hide");
    nextButton.classList.remove("hide");
  } else if (targetSlide === slides[slides.length - 1]) {
    //if the target slide is last slide then next button must be hidden.
    //and previous button must be visible.
    nextButton.classList.add("hide");
    previousButton.classList.remove("hide");
  } else {
    //if none of the above is true, then next button and previous button must be visible
    nextButton.classList.remove("hide");
    previousButton.classList.remove("hide");
  }
}

//Select the nav
const nav = document.querySelector(".nav");

//Select all the dots from nav
//and convert into array using spread operator
const dots = [...nav.children];

//On dot click
nav.addEventListener("click", function (e) {
  //if we don't click on dot, we exit
  if (e.target === nav) {
    return;
  }
  //Select the clicked dot
  const targetDot = e.target;

  //Finding the index number of dot, So we target the right slide
  let targetDotIndex = findIndex(targetDot, dots);

  //Select the target Slide
  const targetSlide = slides[targetDotIndex];

  //Select the current Slide
  const currentSlide = carousel.querySelector(".active");
  moveToSlide(carousel, currentSlide, targetSlide);

  //Select current dot
  const currentDot = nav.querySelector(".active");
  toggleActive(currentDot, targetDot);

  //Hide Button
  hideButton(targetSlide, slides);
});

//finding the indexNumber of an item, which exists inside on array of items
function findIndex(item, items) {
  for (let index = 0; index < items.length; index++) {
    if (item === items[index]) {
      return index;
    }
  }
}
