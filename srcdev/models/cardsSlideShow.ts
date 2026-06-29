//--Copyright (c) 2023-2026 Robert A. Howell

import RwbError from "../../srcopen/models/rwbErrorBus.js";

export default class CardsSlideShow {
  public ssContainer: HTMLDivElement;
  public arrowsContainer: HTMLDivElement;
  public prevBtn?: HTMLElement;
  public nextBtn?: HTMLElement;
  private cards: NodeListOf<HTMLDivElement>;
  private cardShowQuant: number;
  private cardsIndxStart: number;
  private cardCounter: number = 1;
  private cardsIndxEnd: number;
  private turn: number = 0;
  private maxTurnCount: number;
  private slideShowContainer: HTMLElement = document.querySelector(".cardslideshow") as HTMLElement;
  private numberElement?: HTMLElement;
  private visibleElems?: NodeListOf<HTMLElement> | number;
  private windowSize: string;
  private resizing?: string;

  constructor(cards: NodeListOf<HTMLDivElement>, quantityShow: number, windowSize: string) {
    this.cards = cards;
    this.cardShowQuant = quantityShow;
    this.cardsIndxStart = 0;
    this.cardsIndxEnd = this.cardShowQuant - 1;
    this.maxTurnCount = this.cards.length - this.cardShowQuant;
    this.windowSize = windowSize;

    this.hideOverflowElements();
    this.onInitSetupCardPosition(null);
    this.ssContainer = this.newContainerMarkup();
    this.arrowsContainer = this.newArrowsMarkup();
    this.newNumberElement();
    this.addBtnEventListeners();
    this.showHideSlideShowButtons();
  };

  private getVisibleElemsFromDocumentQuery() {
    this.visibleElems = RwbError.TryDocumentQuerySelectorAll("CardSlideShowVisibleElements", '.slidescontainer [style*="opacity: 1"]', true, false) as NodeListOf<HTMLElement>;
    if (this.visibleElems.length == 0 || this.visibleElems == null)
      console.debug("Visible elements not found in the slideshow.");
    return this.visibleElems;
  };

  public getWindowSize() {
    return this.windowSize;
  };

  public setWindowSize(componentSize:string) {
    if (componentSize == null) {
      //LOGLEAF
      return;
    }
    //reset card index end on resize
    switch(componentSize) {
      case "SMALL":                           //set to small
        this.cardShowQuant = 1;
        this.cardsIndxEnd--;
        this.resizing = "decrease";

        break;
      case "MEDIUM":                          //set to medium
        if (this.windowSize == "SMALL") {   //from small
          this.resizing = "increase";
          this.cardsIndxEnd++;
        }else{                              //from large
          this.resizing = "decrease";
          this.cardsIndxEnd--;
        }
        this.cardShowQuant = 2;
        break;
      case "LARGE":                           //set to large
        this.cardShowQuant = 3;
        this.cardsIndxEnd++;
        this.resizing = "increase"; //window size increase
        break;
      default:
        //LOGLEAF
        return;
    }
    this.maxTurnCount = this.cards.length - this.cardShowQuant;

    this.windowSize = componentSize;
  };

  public nextSlide() {
    if (this.turn == this.maxTurnCount) {
      return;
    }
    if (this.windowSize == "LARGE") {
      if (this.cards[this.cardsIndxStart - 1] != undefined) {
        this.cards[this.cardsIndxStart - 1].style.display = "none";
        this.cards[this.cardsIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardsIndxStart].style.opacity = "0%";
      this.cards[this.cardsIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxStart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move middle element to left
      this.cards[this.cardsIndxStart + 1].style.transform = "translateX(-365px)";

      //Move right to the middle
      this.cards[this.cardsIndxStart + 2].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
      this.cards[this.cardsIndxEnd + 1].style.opacity = "1";
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsIndxEnd + 1].style.transform = "translateX(365px)";
      if (this.cards[this.cardsIndxEnd + 2] != undefined) {
        this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].style.display = "block";
        this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
      }
    }
    if (this.windowSize == "MEDIUM") {
      if (this.cards[this.cardsIndxStart - 1] != undefined) {
        this.cards[this.cardsIndxStart - 1].style.display = "none";
        this.cards[this.cardsIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardsIndxStart].style.opacity = "0%";
      this.cards[this.cardsIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxStart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move the right element to left
      this.cards[this.cardsIndxStart + 1].style.transform = "translateX(-182.5px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
      this.cards[this.cardsIndxEnd + 1].style.opacity = "1";
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsIndxEnd + 1].style.transform = "translateX(182.5px)";
      if (this.cards[this.cardsIndxEnd + 2] != undefined) {
        this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].style.display = "block";
        this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
      }
    }
    if (this.windowSize == "SMALL") {
      if (this.cards[this.cardsIndxStart - 1] != undefined) {
        this.cards[this.cardsIndxStart - 1].style.display = "none";
        this.cards[this.cardsIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Hide the first element in slideshow
      this.cards[this.cardsIndxStart].style.opacity = "0%";
      this.cards[this.cardsIndxStart].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxStart].children[1].children[3].setAttribute("tabindex", "-1");

      //Move element to left
      this.cards[this.cardsIndxStart].style.transform = "translateX(-182.5px)";

      //Move element to center
      this.cards[this.cardsIndxStart + 1].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("z-index");
      this.cards[this.cardsIndxEnd + 1].style.opacity = "1";
      this.cards[this.cardsIndxEnd + 1].style.removeProperty("display");

      if (this.cards[this.cardsIndxEnd + 2] != undefined) {
        this.cards[this.cardsIndxEnd + 2].style.transform = "translateX(182.5px)";
        this.cards[this.cardsIndxEnd + 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxEnd + 2].style.display = "block";
        this.cards[this.cardsIndxEnd + 2].style.zIndex = "-1";
      }
    }

    //Increment index counter
    this.cardsIndxStart++;
    this.cardsIndxEnd++;
    this.turn++;
    this.cardCounter++;
  };

  public prevSlide(__resizingOverride: string | null) {
    if (this.turn == 0) {
      return;
      }
    let windowSize = this.windowSize;
    let currentCardsIndxEnd = this.cardsIndxEnd;

    if (__resizingOverride == "MEDIUM" || __resizingOverride == "SMALL") {
      windowSize = __resizingOverride;
      currentCardsIndxEnd = currentCardsIndxEnd - 1; //decreased while resize med to large, small to med
    }
    if (windowSize == "LARGE") {
      //Hide the last element in slideshow
      this.cards[this.cardsIndxEnd].style.opacity = "0%";
      this.cards[this.cardsIndxEnd].style.zIndex = "-1";
      this.cards[this.cardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[this.cardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[this.cardsIndxEnd + 1] != undefined) {
        this.cards[this.cardsIndxEnd + 1].style.display = "none";
        this.cards[this.cardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[this.cardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move middle element to to the right
      this.cards[this.cardsIndxStart + 1].style.transform = "translateX(365px)";

      //Move left element to the right
      this.cards[this.cardsIndxStart].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxStart - 1].style.opacity = "1";
      this.cards[this.cardsIndxStart - 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsIndxStart - 1].style.transform = "translateX(-365px)";
      if (this.cards[this.cardsIndxStart - 2] != undefined) {
        this.cards[this.cardsIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxStart - 2].style.display = "block";
      }
    }
    if (windowSize == "MEDIUM") {
      //Hide the last element in slideshow
      this.cards[currentCardsIndxEnd].style.opacity = "0%";
      this.cards[currentCardsIndxEnd].style.zIndex = "-1";
      this.cards[currentCardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[currentCardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[currentCardsIndxEnd + 1] != undefined) {
        this.cards[currentCardsIndxEnd + 1].style.display = "none";
        this.cards[currentCardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[currentCardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move left element to the right
      this.cards[this.cardsIndxStart].style.transform = "translateX(182.5px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxStart - 1].style.opacity = "1";
      this.cards[this.cardsIndxStart - 1].style.removeProperty("display");

      //Move in new element
      this.cards[this.cardsIndxStart - 1].style.transform = "translateX(-182.5px)";
      if (this.cards[this.cardsIndxStart - 2] != undefined) {
        this.cards[this.cardsIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxStart - 2].style.display = "block";
      }
    }
    if (windowSize == "SMALL") {
      //Hide the last element in slideshow
      this.cards[currentCardsIndxEnd].style.opacity = "0%";
      this.cards[currentCardsIndxEnd].style.zIndex = "-1";
      this.cards[currentCardsIndxEnd].children[1].children[2].setAttribute("tabindex", "-1");
      this.cards[currentCardsIndxEnd].children[1].children[3].setAttribute("tabindex", "-1");
      if (this.cards[currentCardsIndxEnd + 1] != undefined) {
        this.cards[currentCardsIndxEnd + 1].style.display = "none";
        this.cards[currentCardsIndxEnd + 1].children[1].children[2].removeAttribute("tabindex");
        this.cards[currentCardsIndxEnd + 1].children[1].children[3].removeAttribute("tabindex");
      }
      //Move element to right
      this.cards[this.cardsIndxStart].style.transform = "translateX(182.5px)";

      //Move element to center
      this.cards[this.cardsIndxStart - 1].style.transform = "translateX(0px)";

      //Display the next element for slideshow
      this.cards[this.cardsIndxStart - 1].children[1].children[2].removeAttribute("tabindex");
      this.cards[this.cardsIndxStart - 1].children[1].children[3].removeAttribute("tabindex");
      this.cards[this.cardsIndxStart - 1].style.opacity = "1";
      this.cards[this.cardsIndxStart - 1].style.removeProperty("display");

      if (this.cards[this.cardsIndxStart - 2] != undefined) {
        this.cards[this.cardsIndxStart - 2].style.display = "block";
        this.cards[this.cardsIndxStart - 2].children[1].children[2].setAttribute("tabindex", "-1");
        this.cards[this.cardsIndxStart - 2].children[1].children[3].setAttribute("tabindex", "-1");
      }
    }

    //Increment index counter
    this.cardsIndxStart--;
    this.cardsIndxEnd--;
    this.turn--;
    this.cardCounter--;
  };

  public addBtnEventListeners = () => {
    //Event listeners for the next and previous buttons
    this.nextBtn!.addEventListener("click", e => {
      e.preventDefault();
      this.nextSlide();
      this.showHideSlideShowButtons();
      this.numberArrowText();
    });
    this.prevBtn!.addEventListener("click", e => {
      e.preventDefault();
      this.prevSlide(null);
      this.showHideSlideShowButtons();
      this.numberArrowText();
    });
  };

  public showHideSlideShowButtons() {
    if (this.cardsIndxStart == 0) {
      this.prevBtn!.style.opacity = "0%";
      this.prevBtn!.setAttribute("tabindex", "-1");
      return;
    }
    if (this.cardsIndxEnd == this.cards.length - 1) {
      this.nextBtn!.style.opacity = "0%";
      this.nextBtn!.setAttribute("tabindex", "-1");
      return;
    }
    this.prevBtn!.style.removeProperty("opacity");
    this.nextBtn!.style.removeProperty("opacity");
    this.prevBtn!.removeAttribute("tabindex");
    this.nextBtn!.removeAttribute("tabindex");
  };

  public numberArrowText = () => {
    if (this.windowSize == "SMALL") {
      this.numberElement!.innerText = `${this.cardCounter.toString()} of ${this.cards.length.toString()}`;
    } else {
      this.numberElement!.innerText = `[${this.cardCounter.toString()}..${(
        this.cardCounter +
        this.cardShowQuant -
        1
      ).toString()}] of ${this.cards.length.toString()}`;
    }
  };

  public onResizeShowStartingElems() {
    this.getVisibleElemsFromDocumentQuery();
    if (this.visibleElems == null)
      this.visibleElems = this.cards;

    let invisibleElemIncreasing: NodeListOf<HTMLElement> | null = null;
    if (this.resizing == "increase") {
      invisibleElemIncreasing = document.querySelectorAll('.slidescontainer [style*="opacity: 1"] + [style*="opacity: 0"]') as NodeListOf<HTMLElement>;
      if (this.cardsIndxEnd == this.cards.length) {
        if (this.windowSize == "LARGE") {//resize is increasing from medium
          this.prevSlide("MEDIUM");
          if (invisibleElemIncreasing.length > 0 && invisibleElemIncreasing != null)
            invisibleElemIncreasing[0].style.transform = "translateX(365px)";
        }
        if (this.windowSize == "MEDIUM") {//resize is increasing from small
          this.prevSlide("SMALL");
          if (invisibleElemIncreasing.length > 0 && invisibleElemIncreasing != null)
            invisibleElemIncreasing[0].style.transform = "translateX(182.5px)";
        }
        if (invisibleElemIncreasing.length > 0 && invisibleElemIncreasing != null) {
          invisibleElemIncreasing[0].style.position = "absolute";
          invisibleElemIncreasing[0].style.opacity = "1";
        }
      }
      invisibleElemIncreasing = document.querySelectorAll('.slidescontainer [style*="opacity: 1"] + [style*="opacity: 0"]') as NodeListOf<HTMLElement>;
      this.visibleElems = RwbError.TryDocumentQuerySelectorAll("CardSlideShowVisibleElements", '.slidescontainer [style*="opacity: 1"]', true, false) as NodeListOf<HTMLElement>;
    }
    
    this.onInitSetupCardPosition(invisibleElemIncreasing);
    this.showHideSlideShowButtons();
    this.numberArrowText();
  };

  private hideOverflowElements() {
    //Hide overflow elements
    if (this.cardsIndxStart < this.cardShowQuant) {
      for (let i = this.cards.length - 1; i > this.cardsIndxEnd; i--) {
        this.cards[i].style.position = "absolute";
        this.cards[i].style.opacity = "0%";
        this.cards[i].style.display = "none";
        if (this.windowSize == "SMALL") {
          this.cards[i].style.transform = "translateX(0px)";
          continue;
        }
        if (this.windowSize == "MEDIUM") {
          this.cards[i].style.transform = "translateX(182.5px)";
          continue;
        }
        this.cards[i].style.transform = "translateX(365px)";
      }
    }
    this.cards[0].style.position = "absolute";
  };

  private newContainerMarkup() {
    const newContainerStyles = () => {
      //Container styles
      slideShowSlides.classList.add("slidescontainer");
      slideShowSlides.style.width = "100%";
      slideShowSlides.style.height = "32em";
      slideShowSlides.style.display = "flex";
      slideShowSlides.style.position = "relative";
    };

    //Build the markup needed for the slideshow
    //Add cards to container
    let slideShowSlides = this.slideShowContainer.appendChild(document.createElement("div"));
    for (let card of Array.from(this.cards)) {
      let temp = card;
      slideShowSlides.insertAdjacentElement("beforeend", temp);
      newContainerStyles();
    }
    slideShowSlides.classList.add(`${this.windowSize}`);
    return slideShowSlides;
  };

  private newArrowsMarkup() {
    //Add left and right buttons
    let slideshowbtns = this.slideShowContainer.appendChild(document.createElement("div"));

    //Left slideshow btn
    let previousslideshowbtn = document.createElement("button");
    previousslideshowbtn.classList.add("slideshowPrev");
    previousslideshowbtn.innerText = "❮";
    slideshowbtns.insertAdjacentElement("beforeend", previousslideshowbtn);

    //Update slideshow object
    this.prevBtn = previousslideshowbtn;

    //Right slideshow btn
    let nextslideshowbtn = document.createElement("button");
    nextslideshowbtn.classList.add("slideshowNext");
    nextslideshowbtn.innerText = "❯";
    slideshowbtns.insertAdjacentElement("beforeend", nextslideshowbtn);
    slideshowbtns.style.display = "flex";

    //Update slideshow object
    this.nextBtn = nextslideshowbtn;

    return slideshowbtns;
  };

  private newNumberElement() {
    //Number element
    this.numberElement = document.createElement("div");

    this.numberArrowText();
    this.nextBtn!.insertAdjacentElement("beforebegin", this.numberElement);
    this.numberElement.style.whiteSpace = "nowrap";
    this.numberElement.style.display = "grid";
    this.numberElement.style.alignContent = "center";
    this.numberElement.style.marginInline = "1.5rem";
  };

  private onInitSetupCardPosition(invisibleElemIncreasing: NodeListOf<HTMLElement> | null) {
    if (this.visibleElems == null)
      this.visibleElems = this.cards;
    else {
      this.getVisibleElemsFromDocumentQuery();
    }

    let nextVisibleLargeElement; //for meduim and large sizes
    let nextVisibleMediumElement; //for meduim and large sizes
    switch (this.windowSize) {
      case "SMALL":
        //small window size logic
        this.visibleElems[0].style.opacity = "1";
        this.visibleElems[0].style.transform = "translateX(0px)";

        let nextVisibleSmallElement = this.visibleElems[0].nextElementSibling as HTMLElement;
        nextVisibleSmallElement.style.display = "block";
        nextVisibleSmallElement.style.zIndex = "-1";
        nextVisibleSmallElement.style.transform = "translateX(0px)";
        nextVisibleSmallElement.children[1].children[2].setAttribute("tabindex", "-1");
        nextVisibleSmallElement.children[1].children[3].setAttribute("tabindex", "-1");
        nextVisibleSmallElement.style.opacity = "0";

        break;
      case "MEDIUM":
        //medium window size logic
        this.visibleElems[0].style.opacity = "1";
        this.visibleElems[0].style.transform = "translateX(-182.5px)";

        if (invisibleElemIncreasing === null) {
          this.visibleElems[1].style.opacity = "1";
          this.visibleElems[1].style.position = "absolute";
          this.visibleElems[1].style.transform = "translateX(182.5px)";
          nextVisibleMediumElement = this.visibleElems[1].nextElementSibling as HTMLElement;
        } else {
          invisibleElemIncreasing[0].style.opacity = "1";
          invisibleElemIncreasing[0].style.position = "absolute";
          invisibleElemIncreasing[0].style.transform = "translateX(182.5px)";
          nextVisibleMediumElement = invisibleElemIncreasing[0].nextElementSibling as HTMLElement;
        }
        
        if (nextVisibleMediumElement != null) {
          nextVisibleMediumElement.style.display = "block";
          nextVisibleMediumElement.style.zIndex = "-1";
          nextVisibleMediumElement.children[1].children[2].setAttribute("tabindex", "-1");
          nextVisibleMediumElement.children[1].children[3].setAttribute("tabindex", "-1");
          nextVisibleMediumElement.style.opacity = "0";

          let nextOpaqueMediumElement = nextVisibleMediumElement.nextElementSibling != null ?
          nextVisibleMediumElement.nextElementSibling as HTMLElement : null;
          
          if(nextOpaqueMediumElement == null) return;
            nextOpaqueMediumElement.style.display = "none";
        }

        break;
      case "LARGE":
        //large window size logic
        this.visibleElems[0].style.opacity = "1";
        this.visibleElems[0].style.transform = "translateX(-365px)";
        this.visibleElems[1].style.opacity = "1";
        this.visibleElems[1].style.position = "absolute";
        this.visibleElems[1].style.transform = "translateX(0px)";

        if(invisibleElemIncreasing === null){
          this.visibleElems[2].style.opacity = "1";
          this.visibleElems[2].style.position = "absolute";
          this.visibleElems[2].style.transform = "translateX(365px)";
          nextVisibleLargeElement = this.visibleElems[2].nextElementSibling as HTMLElement;
        } else {
          invisibleElemIncreasing[0].style.opacity = "1";
          invisibleElemIncreasing[0].style.position = "absolute";
          invisibleElemIncreasing[0].style.transform = "translateX(365px)";
          invisibleElemIncreasing[0].style.removeProperty("z-index");
          nextVisibleLargeElement = invisibleElemIncreasing[0].nextElementSibling as HTMLElement;
        }

        if(nextVisibleLargeElement != null){
          nextVisibleLargeElement.style.display = "block";
          nextVisibleLargeElement.style.zIndex = "-1";
          nextVisibleLargeElement.children[1].children[2].setAttribute("tabindex", "-1");
          nextVisibleLargeElement.children[1].children[3].setAttribute("tabindex", "-1");
          let nextOpaqueLargeElement = nextVisibleLargeElement.nextElementSibling != null ? 
          nextVisibleLargeElement.nextElementSibling as HTMLElement: null;
        
          if(nextOpaqueLargeElement == null) return;
            nextOpaqueLargeElement.style.display = "none";
        }

        break;
      default:
        console.debug("Screen size property not set on slideshow.");
        break;
    }
  };
};
