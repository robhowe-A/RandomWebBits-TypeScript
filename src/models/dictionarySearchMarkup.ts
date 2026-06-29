//Copyright is optimized out from gulp compile, so add below. 1-30-25, RWB
import { localStorageWord } from "./localStorageCaches.js";
import { DictionarySearchElements, DictionarySearchPreviousWordKeyElements } from "./widgetMarkupElements.js";

//--Copyright (c) 2023-2026 Robert A. Howell

/**
 * A DictionarySearchWidget is made to create the markup needed for the
 *  Dictionary Search. Elements are created and appended to the page to the class
 *  'dictionaryWidget'
 */
export default class DictionarySearchMarkup {
  public searchElements?: DictionarySearchElements;

  constructor(elem: Element) {
    //insert the widget after the passed in "elem"
    if (elem == undefined) {
      console.log(`%cThere is no "dictionaryWidget" class on this page.`, "color: orange;");
      return;
    }
    if (!elem.classList.contains("dictionaryWidget")) {
      console.log(`Add "dictionaryWidget" class to ${elem.nodeName} node.`);
      return;
    }
    this.createDictionaryWidgetMarkup(elem);
  };

  /**
   * Primary widget markup structuring the widget elements and search input.
   *
   * @param elem - The reference element before the widget.
   * @returns searchElements: DictionarySearchElements --> interface of
   *  important HTML elements used through widget function.
   */
  public createDictionaryWidgetMarkup(elem: Element) {
    const dictionary = elem.insertAdjacentElement("afterend", document.createElement("section"));
    if (dictionary == null) {
      console.log("The determined dictionary element is null.");
      return;
    }
    // Create widget elements
    const artH = dictionary.appendChild(document.createElement("h3"));
    const searchWrapper = dictionary.appendChild(document.createElement("search"));
    const searchForm = searchWrapper.appendChild(document.createElement("form"));
    const previousWords = dictionary.appendChild(document.createElement("div"));

    // Return elements used in later functions
    let searchElements: DictionarySearchElements = {
      searchWord: searchForm.appendChild(document.createElement("input")),
      wordSearch: searchForm.appendChild(document.createElement("button")),
      dictionaryElem: <HTMLElement>dictionary,
      errorElem: searchForm.appendChild(document.createElement("span")),
      previousWordsContainer: dictionary.appendChild(document.createElement("div")),
    };

    // Add attributes and property values
    const fontAwesomeSearchIcon = searchElements.wordSearch.appendChild(document.createElement("i"));
    fontAwesomeSearchIcon.classList.add("fa");
    fontAwesomeSearchIcon.classList.add("fa-search");
    previousWords.classList.add("previousWords");
    searchElements.searchWord.classList.add("monospace");
    searchElements.searchWord.setAttribute("type", "search");
    searchElements.searchWord.setAttribute("placeholder", "Search...");
    searchElements.searchWord.setAttribute("aria-label", "Input");
    searchElements.wordSearch.setAttribute("type", "submit");
    searchElements.wordSearch.setAttribute("aria-label", "Search");
    searchElements.searchWord.id = "search-word";
    searchElements.wordSearch.id = "word-search";
    searchElements.previousWordsContainer.id = "dictionary-btns";
    dictionary.id = "dictionary";
    searchForm.id = "dictionary-search";
    searchForm.action = "index.html";
    artH.textContent = "Dictionary Term:";

    this.searchElements = searchElements;
  };

  /**
   * Creates the markup to house returned words from DictionarySearch. The markup
   *  is created based on API egress. Words and their definitions vary. The markup is
   *  adaptive to returned word data structures.
   *
   * @param wordData - This parameter is an object of word types, definitions, and examples.
   * @param searchElems - Widget Elements -- key widget function elements.
   */
  public createDictionaryTermWithMarkup(wordData: any, wordURL:URL, searchElems: DictionarySearchElements) {
    if (wordData == null || !(wordData instanceof Object) || wordData.hasOwnProperty("title")) {
      console.log("%cThere is no definition for this word.", "color:darkgreen;");
      return;
    }
    console.log(`%c<RWB>%cWord markup added with {${wordData[0].meanings.length}} speech parts.`, "color:#F4C430;font-weight:bold;", "color:#F4C430;");

    // Add word definition to the dictionary widget
    const definitionDescriptionContainer = searchElems.dictionaryElem.appendChild(
      document.createElement("div")
    );
    const definitionDescription = definitionDescriptionContainer.appendChild(document.createElement("div"));
    definitionDescription.appendChild(document.createElement("hr")); // word definition separator
    definitionDescriptionContainer.classList.add("definitionDescription");
    
    definitionDescriptionContainer.setAttribute("data-word", wordData[0].word); //CHECK
    const wordTitle = definitionDescription.appendChild(document.createElement("h3"));
    wordTitle.textContent = wordData[0].word;

    if(wordData[0].hasOwnProperty("phonetics") && wordData[0].phonetics.length > 0) {
      //search through word phonetics for audio source URL
      for (let phonetic of wordData[0].phonetics) {
        if (phonetic.hasOwnProperty("text")) {
          const wordPhoneticText = definitionDescription.appendChild(document.createElement("span"));
          wordPhoneticText.textContent = phonetic.text;
        }
        if (phonetic.hasOwnProperty("sourceUrl")){
          const wordAudioButton = definitionDescription.appendChild(document.createElement("button"));
          wordAudioButton.classList.add("dictionary-word-btn-audio");

          const wordAudioImage = wordAudioButton.appendChild(document.createElement("img"));
          wordAudioButton.setAttribute("type", "button");
          wordAudioImage.style.display = "inline-block";
          wordAudioImage.setAttribute("src", "../../library/img/volume_32.webp");

          const wordAudioDialogElem = definitionDescription.appendChild(document.createElement("dialog"));

          const wordAudioElem = wordAudioDialogElem.appendChild(document.createElement("audio"));
          wordAudioElem.setAttribute("src", phonetic.audio);
          wordAudioElem.setAttribute("controls", '');
          document.body.addEventListener("click", e => {
            //e.preventDefault();
            if (e.target !== wordAudioDialogElem && e.target !== wordAudioButton) {
              wordAudioDialogElem.close();
              wordAudioDialogElem.setAttribute("closedby", "closerequest");
            }
            else return;
          });
          wordAudioButton.addEventListener("click", (e) => {
            e.preventDefault();
            if(wordAudioDialogElem.hasAttribute("closedby"))
              wordAudioDialogElem.removeAttribute("closedby");

            wordAudioDialogElem.show();
          });
        }
        const wordPhoneticBreak = definitionDescription.appendChild(document.createElement("br"));

      }
    }
    
    // The word data represents complex JSON object
    // Recurse the word data object, adding elements from the various levels
    wordData.map((word: any) => {
      
      
      
      //Add the word and examples to page
      word.meanings.map((wordType: any) => {
        const wordTypeH = definitionDescription.appendChild(document.createElement("h4"));
        const wordTypeList = definitionDescription.appendChild(document.createElement("ul"));
        wordTypeH.textContent = wordType.partOfSpeech;
        wordType.definitions.map((def: any) => {
          let wordTypeDefItem = wordTypeList.appendChild(document.createElement("li"));
          let definitionP = wordTypeDefItem.appendChild(document.createElement("p"));
          definitionP.textContent = def.definition;
          definitionP.classList.add("wordDefinition");
          const addAdjacentElem = () => {
            const newP = definitionP.insertAdjacentElement("afterend", document.createElement("p"));
            if (newP instanceof HTMLElement) {
              const newPi = newP.appendChild(document.createElement("i"));
              newPi.textContent = def.example;
            }
            definitionP.classList.add("example");
          };
          //check if key "example" is in definition. If it is, add the example to list
          "example" in def ? addAdjacentElem() : true == true;
        });
      });
    });
    //create link[out] button
    const wordHyperLink = definitionDescriptionContainer.appendChild(document.createElement("a"));
    wordHyperLink.setAttribute("href", wordURL.toString());
    wordHyperLink.setAttribute("target", "_blank");
    wordHyperLink.setAttribute("rel", "noopener");
    wordHyperLink.setAttribute("title", wordURL.toString());
    wordHyperLink.textContent = wordURL.toString();
    //create clear button
    const deleteWordTermHeadingElem = definitionDescriptionContainer.appendChild(
      document.createElement("button")
    );
    deleteWordTermHeadingElem.setAttribute("type", "button");
    deleteWordTermHeadingElem.classList.add("dictionary-word-btn-clear");
    deleteWordTermHeadingElem.style.display = "block";

    //when clear button is hovered, display it
    definitionDescriptionContainer.addEventListener("mouseover", event => {
      deleteWordTermHeadingElem.style.opacity = "100%";
      //when clear button is not hovered, hide it
      definitionDescriptionContainer.addEventListener("mouseout", () => {
        deleteWordTermHeadingElem.style.opacity = "50%";
      });
    });

    //when clear button is clicked, clear the elements
    deleteWordTermHeadingElem.addEventListener("click", event => {
      event.preventDefault();
      console.log(
        `%c<RWB>%cRemoved word markup: ${definitionDescriptionContainer.getAttribute("data-word")}`,
        "color:goldenrod;font-weight:bold;",
        "color:goldenrod;"
      );
      definitionDescriptionContainer.remove();
    });

    //add clear button to widget
    definitionDescriptionContainer.appendChild(definitionDescription);
  };

  public createPreviousWordSearchesElements(
    wordstorage: localStorageWord[],
    buttonContainer: HTMLDivElement
  ) {
    let buttonsarr: DictionarySearchPreviousWordKeyElements[] = [];

    //Because the locator and the Local Storage values are viable, create the markup
    //needed to display those words. Add event listeners for widget functionality.
    for (let wordCache of wordstorage) {
      if (document.querySelector(`.dictionary-word-btn[data-word-name="${wordCache.word}"]`) != null)
        continue;
      const wordHeadingElemContainer = buttonContainer.appendChild(document.createElement("div"));
      const cacheWordHeadingElem = wordHeadingElemContainer.appendChild(document.createElement("button"));
      const deleteCacheWordHeadingElem = wordHeadingElemContainer.appendChild(
        document.createElement("button")
      );
      deleteCacheWordHeadingElem.setAttribute("type", "button"); //CHECK
      deleteCacheWordHeadingElem.classList.add("dictionary-word-btn-clear");
      cacheWordHeadingElem.setAttribute("type", "button");
      cacheWordHeadingElem.setAttribute("data-word-name", wordCache.word);
      cacheWordHeadingElem.classList.add("dictionary-btn", "dictionary-word-btn");
      cacheWordHeadingElem.textContent = wordCache.word;

      let previouswordbtn: DictionarySearchPreviousWordKeyElements = {
        word: wordCache,
        cacheWordHeadingElem: cacheWordHeadingElem,
        wordHeadingElemContainer: wordHeadingElemContainer,
        deleteCacheWordHeadingElem: deleteCacheWordHeadingElem,
      };
      buttonsarr.push(previouswordbtn);
    }
    return buttonsarr;
  };
};
