//--Copyright (c) 2023-2026 Robert A. Howell

const sliderBar = {
  init: () => {
    var divisor = document.getElementById("divisor") as HTMLDivElement,
      slideBar = document.getElementById("slider") as HTMLInputElement;
    if (divisor == null || slideBar == null) return;
    slideBar.setAttribute("aria-label", "slider");
    slideBar.addEventListener("input", () => sliderBar.moveDivisorBar(divisor, slideBar));
  },
  moveDivisorBar: (divisor: HTMLDivElement, slideBar: HTMLInputElement) => {
    divisor.style.width = slideBar.value + "%";
    console.debug(`Divisor width: ${divisor.style.width}`);
  },
};

export default sliderBar;
