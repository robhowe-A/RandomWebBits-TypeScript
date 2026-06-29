//--Copyright (c) 2023-2026 Robert A. Howell
// Attribution: Robert A Howell, May 2023
// Content derived from: W3Schools, https://www.w3schools.com/howto/howto_js_slideshow.asp

/**
 * Component creating slideshow widgets
 */
const slideShowWidget = {
  slideIndex: 1,
  /**
   * Create slideshow components.
   */
  init: () => {
    slideShowWidget.showSlides(slideShowWidget.slideIndex);

    // Next/previous controls
    function plusSlides(n: number) {
      slideShowWidget.showSlides((slideShowWidget.slideIndex += n));
    };

    // Thumbnail image controls
    function currentSlide(n: number) {
      slideShowWidget.showSlides((slideShowWidget.slideIndex = n));
    };

    //Change to next slide when arrow buttons are clicked
    const slideShowPreviousBtns = document.getElementsByClassName("slideshowPrev");
    const slideShowNextBtns = document.getElementsByClassName("slideshowNext");
    for (let btn of Array.from(slideShowPreviousBtns)) {
      btn.addEventListener("click", () => {
        plusSlides(-1);
      });
    }
    for (let btn of Array.from(slideShowNextBtns)) {
      btn.addEventListener("click", () => {
        plusSlides(1);
      });
    }

    //Change to selected slide when dot are clicked
    const slideShowDots = document.getElementsByClassName("dot");
    let dotCounter = 1;
    for (let dot of Array.from(slideShowDots)) {
      //add dot counter
      dot.setAttribute("dotindex", `${dotCounter}`);
      //when clicked, navigate to the slide indicated
      dot.addEventListener("click", () => {
        plusSlides(dotCounter);
      });
      dotCounter++;
    }
    dotCounter = 1;
  },
  showSlides: (n: number) => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideShowWidget.slideIndex = 1;
    }
    if (n < 1) {
      slideShowWidget.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      let tempSlide = <HTMLDivElement>slides[i];
      tempSlide.style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    let tempSlide = <HTMLDivElement>slides[slideShowWidget.slideIndex - 1];
    tempSlide.style.display = "block";
    dots[slideShowWidget.slideIndex - 1].className += " active";
  },
};

export default slideShowWidget;
