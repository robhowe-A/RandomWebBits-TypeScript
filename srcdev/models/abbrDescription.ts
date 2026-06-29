//--Copyright (c) 2023-2026 Robert A. Howell

export default class AbbrOpen {
  public isOpen: boolean = false;
  private abbrElement: HTMLElement;
  private description?: HTMLSpanElement;

  constructor(abbrElement: HTMLElement) {
    this.isOpen = false;
    this.abbrElement = abbrElement;
  }

  public revealAbbrDescription() {
    this.abbrElement.addEventListener("click", e => {
      e.preventDefault();
      if (this.isOpen) {
        this.description!.remove();
      }
      let abbrTitleAttrVal: string = this.abbrElement.getAttribute("title") as string;

      if (e.target == this.abbrElement) {
        //create the span element
        this.description = this.abbrElement.appendChild(document.createElement("span"));
        this.description.textContent = `${String.fromCharCode(160)}(${abbrTitleAttrVal})${String.fromCharCode(
          160
        )}`;
        this.isOpen = true;
      }
    });
  }
};
