/*jslint sloppy: true*/
function changeDot() {


    const scrollValue = $(window).scrollTop();
    const heightHeader = $(".header1").offset().top;
    const heightMain = $(".main1").offset().top;
    const heightSection = $(".section1").offset().top;
    const heightFooter = $('.footer1').offset().top;


    if (scrollValue < heightMain) {
        $('nav li').not('.dot1').removeClass('active');
        $(".dot1").addClass('active');

    } else if (scrollValue < heightSection) {
        $('nav li').not('.dot2').removeClass('active');
        $(".dot2").addClass('active');
    } else if (scrollValue < heightFooter) {
        $('nav li').not('.dot3').removeClass('active');
        $(".dot3").addClass('active');
    } else if (scrollValue > heightFooter) {
        $('nav li').not('.dot4').removeClass('active');
        $(".dot4").addClass('active');
    }

}
$(window).on("scroll", changeDot)

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }


    requestAnimationFrame(animation);
}




var projects = document.querySelector('.p');
var contact1 = document.querySelector('.c');
var section1 = document.querySelector('.section1');
var footer1 = document.querySelector('.footer1');
var about1 = document.querySelector('.button');
var main1 = document.querySelector('.main1');
var dot1 = document.querySelector('.dot1');
var dot2 = document.querySelector('.dot2');
var dot3 = document.querySelector('.dot3');
var dot4 = document.querySelector('.dot4');
var header1 = document.querySelector('.header1');




projects.addEventListener('click', function () {
    smoothScroll('.section1', 1000);
});

contact1.addEventListener('click', function () {
    smoothScroll('.footer1', 1000);
});

about1.addEventListener('click', function () {
    smoothScroll('.main1', 1000);
});

dot1.addEventListener('click', function () {
    smoothScroll('.header1', 1000);
});

dot2.addEventListener('click', function () {
    smoothScroll('.main1', 1000);
});

dot3.addEventListener('click', function () {
    smoothScroll('.section1', 1000);
});

dot4.addEventListener('click', function () {
    smoothScroll('.footer1', 1000);
});






class Slider {
  constructor(images) {
    this.images = images;
    this.slide = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.image = null;
    this.currentSlide = 0;
    this.slideArrayLength = 0;
    this.slideCaption = null;

    this.UiSelectors = {
      slide: '[data-slide]',
      buttonPrev: '[data-button-prev]',
      buttonNext: '[data-button-next]',
    };
  }

  initializeSlider() {
    this.slide = document.querySelector(this.UiSelectors.slide);
    this.prevBtn = document.querySelector(this.UiSelectors.buttonPrev);
    this.nextBtn = document.querySelector(this.UiSelectors.buttonNext);

    this.image = document.createElement('img');
    this.image.classList.add('slide__image');

    this.setSlideAttributes(0);

    this.slideArrayLength = this.images && this.images.length;

    this.slide.appendChild(this.image);


    this.disableButtons();
    this.addListeners();
  }

  addListeners() {
    this.prevBtn.addEventListener('click', () =>
      this.changeSlide(this.currentSlide - 1),
    );
      
    this.nextBtn.addEventListener('click', () =>
      this.changeSlide(this.currentSlide + 1),
    );

    
  }

  disableButtons() {
    this.currentSlide === 0
      ? this.prevBtn.setAttribute('disabled', true)
      : this.prevBtn.removeAttribute('disabled');
    this.currentSlide === this.slideArrayLength - 1
      ? this.nextBtn.setAttribute('disabled', true)
      : this.nextBtn.removeAttribute('disabled');
  }

  changeSlide(index) {
    if (index === -1 || index === this.slideArrayLength) return;
    this.currentSlide = index;

    

    this.setSlideAttributes(index);
    this.disableButtons();
  }

 
  setSlideAttributes(index) {
    this.image.setAttribute(
      'src',
      Array.isArray(this.images) && this.images.length && this.images[index],
    );
    this.image.setAttribute('alt', `Slide ${index + 1}`);
  }
}