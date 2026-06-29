//--Copyright (c) 2023-2026 Robert A. Howell

import { FlashcardCardElems } from "../models/flashcardCardElems.js";
import portDefinitions from "../data/portNums.js";
import RwbError from "../../srcopen/models/rwbErrorBus.js";

const flashCardGameWidget = {
  init: () => {
    // Establish which port numbers to test and the definition
    // TODO: functions flashcards
    const methodDefinitions = new Map<string, string>([
      ["charAt()", "Returns a new string of the character at a given index."],
    ]);

    // Create flashcard elements
    let mainFlashCardDivs = new FlashcardCardElems(portDefinitions);

    // Add the game's title element
    let mainFlashCardPage;
    let mainFlashCardPageDiv;
    mainFlashCardPage = RwbError.TryDocumentQuerySelector("MainFlashCard", "#mainFlashCardGame", true, false);
    mainFlashCardPageDiv = RwbError.TryDocumentQuerySelector("MainFlashCards", "#mainFlashCards", true, false);

    const gameTitleElem = document.createElement("h2");
    gameTitleElem.innerText = "Computing Port Numbers";
    mainFlashCardPage.insertAdjacentElement("afterbegin", gameTitleElem);

    // Add the flashcards to widget
    for (let elem of mainFlashCardDivs.m_flashcardsArr) {
      mainFlashCardPageDiv.appendChild(elem);
    }
  },
};

export default flashCardGameWidget;
