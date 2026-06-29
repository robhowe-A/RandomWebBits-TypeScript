//Copyright is optimized out from gulp compile, so add below. 1-30-25, RWB
import WebBit from "./webBit.js";
//--Copyright (c) 2023-2026 Robert A. Howell

import RWBCard from "./rwbCard.js";
import RwbError, { RwbReferenceError } from "../../srcopen/models/rwbErrorBus.js";

export default class RandomWebBits {
  public cardsSection?: HTMLDivElement;
  public cardsData?: HTMLDivElement[];

  constructor(cardsSection: HTMLDivElement | undefined, cardsData: any) {
    if (typeof cardsSection == "undefined") {
      return;
    }
    this.cardsSection = cardsSection;
    this.cardsData = cardsData;
  };

  /** Create sections to append to main
   *
   *        <section class="cards">
   *            <h2>Arbitrary Articles:</h2>
   *            <div class="card_columns">
   *            </div>
   *        </section>
   *
   * @param sectionTitle - heading section's title.
   * @param sectionHeadingId - section heading's id attribute.
   * @param containerType - slideshow, accordion, or default.
   * @returns HTMLDivElement
   */
  public static buildCardContainingSection(
    sectionTitle: string,
    sectionHeadingId: string,
    containerType?: string
  ) {
    let pageMain: HTMLElement;
    pageMain = RwbError.TryDocumentQuerySelector("MainRWB", "main", true, true) as HTMLElement;
    if (pageMain == null || pageMain.nodeName !== "MAIN") {
      console.warn("App main has experienced a problem. Please refresh and retry.");
      return;
    }

    const cardSection = document.createElement("section");
    let sectionHeading = document.createElement("h2");
    let cardsContainer = document.createElement("div");
    cardSection.appendChild(sectionHeading);
    cardSection.appendChild(cardsContainer);
    pageMain.append(cardSection);

    // Add data attributes and property values
    switch (containerType) {
      case "slideshow":
        cardsContainer.classList.add("card_columns", "cardslideshow", "grid");
        break;
      case "accordion":
        cardsContainer.classList.add("card_columns", "cardaccordion", "grid");
        break;
      default:
        cardsContainer.classList.add("card_columns", "grid");
        break;
    }
    cardSection.classList.add("cards");
    sectionHeading.innerText = `${sectionTitle}`;
    sectionHeading.setAttribute("id", sectionHeadingId);

    return cardsContainer;
  };

  /** This function maps card data to HTML elements
   *
   * @param cardsData
   * @returns
   */
  public static buildRwbCards(cardsData: WebBit[]) {
    if (cardsData == null) {
      new RwbReferenceError("emptyArray", "cards data array may be null");
      return;
    }
    // Iterate each card in the array. Build the card elements and add the data
    return cardsData.map((article: WebBit) => {
      return Object.create(new RWBCard(article)).card;
    });
  };

  public static buildRwbIntroduction() {
    let introduction = document.createElement("section");
    let Title = introduction.appendChild(document.createElement("h1"));
    let h2 = introduction.appendChild(document.createElement("h2"));
    let para1 = introduction.appendChild(document.createElement("p"));
    let para2 = introduction.appendChild(document.createElement("p"));
    Title.classList.add("Title");
    Title.innerText = "Home | Arbitrary Web Bits";
    h2.innerText = "New to the Web?";
    para1.innerText =
      "If you are new to web development, there are innumerous enumerations of stuff and things the World Wide Web offers that you don't know.";
    para2.innerText = "You may want to start by claiming a stake to a domain name.";

    return introduction;
  };
};
