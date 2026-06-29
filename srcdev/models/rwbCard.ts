//Copyright is optimized out from gulp compile, so add below. 1-30-25, RWB

import WebBit from "./webBit.js";
import AttributionLink from "./attributionLink.js";
import { RwbCardElements } from "./widgetMarkupElements.js";
//--Copyright (c) 2023-2026 Robert A. Howell

export default class RWBCard {
  /**
   * Card elements to display an icon picture and card body. An image, the image top, the card body.
   */
  public card: HTMLDivElement;
  private rwbCardElements?: RwbCardElements;
  private article: WebBit;

  constructor(article: WebBit) {
    this.article = article;
    this.card = this.buildRwbCardMarkup();
  };

  /**
   *  Map WebBit data to a card each
   *
   *       <div class="card">
   *           <div>
   *               <img src="" alt="" article="">
   *           </div>
   *           <div class="cardBody">
   *               <h3></h3>
   *               <p></p>
   *               <a href=""></a>
   *           </div>
   *       </div>
   */
  private buildRwbCardMarkup() {
    let webBitCard = document.createElement("div");
    this.rwbCardElements = {
      cardImg: document.createElement("img"),
      cardImgTop: document.createElement("div"),
      cardBody: document.createElement("div"),
    };
    let cardBodyHeading = document.createElement("h3");
    let cardBodyPara = document.createElement("p");
    let cardBodyLink = document.createElement("a");
    this.rwbCardElements.cardImgTop.appendChild(this.rwbCardElements.cardImg);
    this.rwbCardElements.cardBody.appendChild(cardBodyHeading);
    this.rwbCardElements.cardBody.appendChild(cardBodyPara);
    this.rwbCardElements.cardBody.appendChild(cardBodyLink);

    // Add card data attributes and property values
    webBitCard.classList.add("card");
    webBitCard.setAttribute("id", `${this.article.id}`);
    this.rwbCardElements.cardBody.classList.add("cardBody");
    this.rwbCardElements.cardImg.setAttribute("src", this.article.cardImage);
    this.rwbCardElements.cardImg.setAttribute("alt", this.article.cardImageAlt);
    this.rwbCardElements.cardImg.setAttribute("Article", this.article.articleNumber.toString());
    cardBodyLink.setAttribute("href", this.article.articleLink);
    cardBodyHeading.innerText = this.article.name;
    cardBodyPara.textContent = this.article.description;
    cardBodyLink.textContent = "Go to Page";

    // Image attribution may be needed for the image used
    // Attribution data is imported as 'attrlinks' signature parameter
    if (this.article.linkAttribution) {
      this.buildRwbCardAttributionPanel(this.rwbCardElements, this.article.linkAttribution);
    }

    // The card is WebBit
    // Add the markup to the containing element
    webBitCard.appendChild(this.rwbCardElements.cardImgTop);
    webBitCard.appendChild(this.rwbCardElements.cardBody);

    return webBitCard;
  };

  /**
   * Function to determine image attribution, the image id and article id will match,
   * otherwise the data isn't entered, causing a miss
   *
   *       <div class="flip-card"><!--card image panel-->
   *       <div class="inner">
   *           <div class="cardFront">
   *               <img src="" alt="" article="">
   *           </div>
   *                <div class="cardBack">
   *                    <h3></h3>
   *                    <p></p>
   *                    <img src="" alt="" article="" class="imgSmall imgPTR">
   *                </div>
   *           </div>
   *       </div><!--end card image panel-->
   * @param rwbCardElements Card elements to display an icon picture and card body. An image, the image top, the card body.
   * @param link Attribution link
   */
  private buildRwbCardAttributionPanel(rwbCardElements: RwbCardElements, link: AttributionLink) {
    if (rwbCardElements.cardImg.getAttribute("Article") === link.articleId.toString()) {
      // Create image back panel elements and add the data
      // Redefine card image panel as a flip panel
      const CARDINNER = rwbCardElements.cardImgTop.appendChild(document.createElement("div"));
      const CARDFRONT = CARDINNER.appendChild(document.createElement("div"));
      CARDFRONT.appendChild(rwbCardElements.cardImg); // move image within card front divisor
      let smallImg = <HTMLImageElement>rwbCardElements.cardImg.cloneNode(false);
      const CARDBACK = CARDINNER.appendChild(document.createElement("div"));
      const BACKHEADING = CARDBACK.appendChild(document.createElement("h3"));
      CARDBACK.appendChild(smallImg);
      const BACKPARA = CARDBACK.appendChild(document.createElement("p"));
      const ATTRIBUTELINK = rwbCardElements.cardBody.appendChild(document.createElement("a")); //append to front panel

      // Add flip-panel data attributes and property values
      rwbCardElements.cardImgTop.classList.add("flip-card");
      CARDINNER.classList.add("inner");
      CARDFRONT.classList.add("cardFront");
      smallImg.classList.add("imgSmall", "imgPTR");
      CARDBACK.classList.add("cardBack");
      ATTRIBUTELINK.classList.add("attribute");
      BACKHEADING.textContent = link.attributedOwner;
      BACKPARA.textContent = link.innerText;
      ATTRIBUTELINK.href = link.hReference;
      ATTRIBUTELINK.rel = "external noopener";
      ATTRIBUTELINK.title = link.title;
      ATTRIBUTELINK.textContent = link.attributedOwner;
    }
  };
};
