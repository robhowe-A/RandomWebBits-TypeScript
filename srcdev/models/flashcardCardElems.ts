//--Copyright (c) 2023-2026 Robert A. Howell

/** This object creates an array of div elements from port number information*/
export class FlashcardCardElems {
  /**Counts the number of widget objects instantiated */
  public static widgetcount: number = 0;
  /**Counts the number of objects within the widget instantiated [flashcards] */
  public static totalflashcards: number = 0;
  public m_flashcardsArr: HTMLLIElement[] = [];
  public flashcardscount: number = 0;
  private m_portInfoMap: Map<any, string>;

  constructor(portnumbersMap: Map<any, string>) {
    this.m_portInfoMap = portnumbersMap;
    const mapIter = this.m_portInfoMap.keys();
    FlashcardCardElems.widgetcount++;

    this.m_portInfoMap.forEach(port => {
      // Create list element
      let flashcard = document.createElement("li");
      //TODO: let flashcard = new GrowingCardElement();
      //Unable to instantiate li element as growing card due to DOM unavalable --> requires shadowDOM manipulate

      // Populate element for page use
      const inner = flashcard.appendChild(document.createElement("div"));
      const flipfront = inner.appendChild(document.createElement("div"));
      const flipback = inner.appendChild(document.createElement("div"));
      let gameCardSpan = flipfront.appendChild(document.createElement("span"));
      let gameCardBackSpan = flipback.appendChild(document.createElement("span"));
      flashcard.classList.add("flip-card", "gameCard");
      inner.classList.add("inner", "vertical");
      flipfront.classList.add("cardFront");
      flipback.classList.add("cardBack", "vertical");
      gameCardSpan.innerText = `Port# ${mapIter.next().value}`;
      gameCardBackSpan.innerText = `${port}`;

      this.flashcardscount++;
      FlashcardCardElems.totalflashcards++;

      // Add div to flashcard instance
      this.m_flashcardsArr.push(flashcard);
    });
  };
};
