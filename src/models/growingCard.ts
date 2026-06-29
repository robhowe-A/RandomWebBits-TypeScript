//--Copyright (c) 2023-2026 Robert A. Howell

export class GrowingCardElement extends HTMLLIElement {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  private isGrown: boolean = false;

  constructor() {
    super();
    this.addEventListener("click", this.growCard);
    GrowingCardElement.count++;
  };

  public static shrinkCard = (li: GrowingCardElement) => {
    //TODO: check class property
    if (li.style.scale) {
      li.style.scale = "1";
      li.style.zIndex = "1";
      li.setIsGrown(false);
    }
  };

  public static shadeInactiveCard = (li: GrowingCardElement) => {
    if (GrowingCardElement.getIsAtLeastOneBig()) {
      if (!li.getIsGrown()) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
          li.style.opacity = ".5";
        } else {
          li.style.opacity = ".3";
        }
      } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
          li.style.opacity = "1";
        } else {
          li.style.opacity = "1";
        }
      }
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
        li.style.opacity = "1";
      } else {
        li.style.opacity = "1";
      }
    }
  };

  public static getIsAtLeastOneBig = () => {
    let listLIs: GrowingCardElement[] = Array.from(document.querySelectorAll(`#webIDECards li`));
    let atLeastOneIsBig = listLIs.some(li => li.getIsGrown() == true);
    return atLeastOneIsBig;
  };

  public getIsGrown = () => {
    return this.isGrown;
  };

  private setIsGrown = (truefalse: boolean) => {
    return (this.isGrown = truefalse);
  };

  private growCard = () => {
    this.style.scale = "1.2";
    this.style.zIndex = "2";
    this.style.opacity = "1";
    this.setIsGrown(true);

    // Get all the list elements to reference which one to grow
    // If it's not the clicked element, shrink it.
    let listLIs = document.querySelectorAll("#webIDECards li") as NodeListOf<HTMLElement>;
    for (let item of Array.from(listLIs)) {
      if (item !== this) {
        GrowingCardElement.shrinkCard(item as GrowingCardElement);
        GrowingCardElement.shadeInactiveCard(item as GrowingCardElement);

        // set the scale property for each card
        if (item.style.scale == "") {
          item.style.scale = "1";
          item.style.zIndex = "1";
        }
      }
    }
  };
};
