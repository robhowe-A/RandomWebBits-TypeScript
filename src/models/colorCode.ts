//--Copyright (c) 2023-2026 Robert A. Howell

export class ColorCodeWidget {
  private elems: NodeListOf<HTMLElement>[];
  private color: string[];
  private resetbtn: HTMLButtonElement;

  constructor(colorlesselements: NodeListOf<HTMLElement>[], colors: string[], resetbtn: HTMLButtonElement) {
    this.elems = colorlesselements;
    this.color = colors;
    this.resetbtn = resetbtn;
    this.resetbtn.style.setProperty("z-index", "1");

    for (let i = 0; i < this.elems.length; i++) {
      this.cssExampleHighlighting(this.elems[i], this.color[i]);
      this.cssExampleHighlightReset(this.elems[i]);
    }
  };

  /**
   * Function to color the example area's elements using css
   * @param elemslist - Node list of HTMLElelements. I.E. using query.SelectorAll()
   * @param color - String of CSS color value
   */
  private cssExampleHighlighting(elemslist: NodeListOf<HTMLElement>, color: string) {
    elemslist.forEach(elem => {
      elem.addEventListener("click", event => {
        event.preventDefault();
        if (elem.style.color != color) {
          elemslist.forEach(elem => {
            elem.style.color = color;
          });
          elem.addEventListener("click", event => {
            event.preventDefault();
            elemslist.forEach(elem => {
                elem.style.color = "initial";
            });
          }, { once: true });
        } else {
          elemslist.forEach(elem => {
            elem.style.color = "initial";
          });
        }
      })
      elem.addEventListener("mouseover", event => {
        event.preventDefault();
        elemslist.forEach(elem => {
          elem.style.color = color;
        });
      });
    });
  };

  //function to reset the css code properties color to original
  private cssExampleHighlightReset(elemslist: NodeListOf<HTMLElement>) {
    this.resetbtn.addEventListener("click", () => {
      console.info("Reset button clicked.");
      elemslist.forEach(elem => {
        elem.style.color = "initial";
      });
    });
  };
};
