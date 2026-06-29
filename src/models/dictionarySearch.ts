//--Copyright (c) 2023-2026 Robert A. Howell

import { apiGet } from "./api.js";
import { DictionarySearchElements, DictionarySearchPreviousWordKeyElements } from "./widgetMarkupElements.js";
import { localStorageWord } from "./localStorageCaches.js";
import DictionarySearchMarkup from "./dictionarySearchMarkup.js";
import RwbError from "../../srcopen/models/rwbErrorBus.js";
import { RwbParseJson } from "./rwbJsonConverter.js";
import { RwbStringifyJson } from "./rwbJsonConverter.js";
import onError from "../components/global/onError.js";

/**
 * A DictionarySearch is a set of markup creation and functions which allow a user
 *  to look up a word like a Dictionary. When called, the user's input is validated
 *  as an acceptable word or it declines the request, then showing the user if the word
 *  is acceptable.
 *
 * Creating a dictionary search widget requires passing a reference element (for a
 * known placement location) that contains the 'dictionaryWidget' class.
 *
 *   new DictionarySearch(elem);
 *
 * All the needed elements and functionality are added to the page.
 *
 */
export class DictionarySearch extends DictionarySearchMarkup {
  public static count: number = 0;
  public static wordStorage: localStorageWord[];
  private static CacheStorageNameofWordRequest: string = "RWB_word_fetch";
  private static requestUrl: string = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  private previousWordsBtnIsCreated: boolean = false;
  private previousWordsBtnWasClicked: boolean = false;
  private wordURL: URL = new URL("https://www.randomwebbits.com/");
  private wordData: object = {};

  /**
   * This constructor creates all the functionality and markup needed for the
   *  Dictionary Search widget interface.
   *
   * @param elem - The reference element used to place widget markup.
   */
  constructor(elem: Element) {
    //Invoke superclass constructor.
    super(elem);
    if (this.searchElements == undefined) return;
    //Initialize the dictionary widget with click event listeners
    this.addWidgetEvents();
    //Store words cache data with initialization.
    DictionarySearch.wordStorage = DictionarySearch.getLocalStorageWordCaches();
    if (DictionarySearch.wordStorage) {
      this.createPreviousWordButtons(this.searchElements.previousWordsContainer);
    }
    DictionarySearch.count++;
  };

  /**
   * Retrieve Local Storage words previously stored with the Dictionary Search Widget.
   *
   * @returns DictionarySearch.wordStorage - these are the words stored previously in the
   *  browser cache.
   */
  public static getLocalStorageWordCaches() {
    //Local Storage 'word-caches' items data assignment
    //cache response links and cache name are previously stored in Local Storage
    let storageStr: string | null;
    if (RwbError.checkLocalStorageEqualNull("DictionarySearch", "word-caches", true, false)) {
      console.info(`%cNo local storage for DictionarySearch`, "color:purple;");

      //The Local Storage is null or empty--> Confirm here the browser does not have any Cache Storage items in error
      if ("caches" in window) {
        let cacheNamesPromise = window.caches.has(DictionarySearch.CacheStorageNameofWordRequest);
        cacheNamesPromise.then((cacheExists) => {
          if (cacheExists) {
            window.caches.delete(DictionarySearch.CacheStorageNameofWordRequest);
          }
          localStorage.removeItem("word-caches");
          //LOGLEAF

        });
        return;
      }
    }
    storageStr = localStorage.getItem("word-caches");
    //check the word-cache value for correct json parsing
    let parsetest = Object.create(new RwbParseJson(storageStr as string));
    if (!parsetest.passed) {
      localStorage.removeItem("word-caches");
      console.log(
        `%c<RWB>%cDeleted storage key: word-caches`,
        "color:orange;font-size:14px;font-weight:bold;",
        "color:orange;font-size:16px;"
      );
      this.getLocalStorageWordCaches();
      return;
    }
    return parsetest.returnObj;
  };

  /**
   * Call to return the previously searched word.
   *
   * @returns this.wordURL
   */
  public getWordURL() {
    return this.wordURL;
  };

  /**
   * Call to return the fetched word data.
   *
   * @returns this.wordData
   */
  public getWordData() {
    return this.wordData;
  };

  /**
   * Adds click and keypress event listeners to the widget. Input event listeners 'click'
   *  and 'keypress' await for a search call. Also, should a user want to search a
   *  previously searched word, the widget adapts markup for that request.
   */
  private addWidgetEvents() {
    if (this.searchElements == undefined) {
      console.log("A search element is undefined from searchWord | wordSearch");
      return;
      }
    let buttonContainer = RwbError.TryDocumentQuerySelector("DictionaryButtons", "#dictionary-btns", true, false);
    if(buttonContainer == null){
      console.warn("Dictionary search experienced an error. Please refresh and retry.");
      return;
    }

    //Add form input event listeners
    //Upon input entry, fire API fetch
    this.searchElements.wordSearch.addEventListener("click", event => {
      event.preventDefault();
      this.wordSearch(this.searchElements!, false, null);
      this.checkcreatePreviousWordButtons();
    });
    this.searchElements.searchWord.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      this.wordSearch(this.searchElements!, false, null);
      this.checkcreatePreviousWordButtons();
    });
  };

  /**
   * Checks button state to create previous word buttons when appropriate.
   * @returns void return
   */
  private checkcreatePreviousWordButtons() {
    let buttonContainer = this.searchElements!.previousWordsContainer;
    DictionarySearch.wordStorage = DictionarySearch.getLocalStorageWordCaches();
    let previousWordSearchNotFoundElem = document.querySelector("#dictionary-btns .error-notfound");

    //Check the placement locator and word caches for undefined
    if (DictionarySearch.wordStorage == null) {
      if (!previousWordSearchNotFoundElem) {
        const noWordsHeadingElem = buttonContainer.appendChild(document.createElement("div"));
        noWordsHeadingElem.classList.add("dictionary-btn", "error-notfound");
        noWordsHeadingElem.textContent = "Previous words not found. The cache is empty.";
        this.previousWordsBtnIsCreated = true;
        this.previousWordsBtnWasClicked = true;
        return;
      } else {
        if (!this.previousWordsBtnWasClicked) {
          this.previousWordsBtnWasClicked = true;
          return;
        }
        else {
          this.previousWordsBtnWasClicked = false;
          return;
        }
      }
    }
    else {
      if (DictionarySearch.wordStorage.length >  document.querySelectorAll("#dictionary-btns div:not(.error-notfound)").length){
        if(previousWordSearchNotFoundElem)
          previousWordSearchNotFoundElem.remove();
          this.createPreviousWordButtons(buttonContainer);
        }
      if (!this.previousWordsBtnWasClicked) {
        this.previousWordsBtnWasClicked = true;
        return;
      }
      else {
        this.previousWordsBtnWasClicked = false;
        return;
      }
    }
  };

  /**
   * This function creates buttons rendered in the UI for the user to search previous found words.
   * @param previousWordsBtnWasClicked - Button click state variable.
   * @param buttonContainer - Element containing previous words button toggle.
   * @returns void return
   */
  private createPreviousWordButtons(buttonContainer: HTMLDivElement) {
    let previouswordbuttons: DictionarySearchPreviousWordKeyElements[] =
      this.createPreviousWordSearchesElements(DictionarySearch.wordStorage, buttonContainer);
    for (let btn of previouswordbuttons) {
      //add event listener for new button.
      //this is the cached word butten. when it's clicked, fire a word search
      btn.cacheWordHeadingElem.addEventListener("click", (event: any) => {
        event.preventDefault();
        this.wordSearch(this.searchElements!, true, btn.word);
      });
      //MOBILE
      //when hovered, display the delete button option
      btn.wordHeadingElemContainer.addEventListener("touchstart", () => {
        btn.deleteCacheWordHeadingElem.style.display = "inline-block";
        //when not hovered, hide the delete button option
        btn.wordHeadingElemContainer.addEventListener("mouseleave", (event: any) => {
          if (event.target == btn.deleteCacheWordHeadingElem) {
            return;
          }
          btn.deleteCacheWordHeadingElem.style.opacity = "50%;";
        });
      }, { passive: true });

      //when hovered, display the delete button option
      btn.wordHeadingElemContainer.addEventListener("mouseover", (event: any) => {
        btn.deleteCacheWordHeadingElem.style.display = "inline-block";
        //when not hovered, hide the delete button option
        btn.wordHeadingElemContainer.addEventListener("mouseleave", (event: any) => {
          if (event.target == btn.deleteCacheWordHeadingElem) {
            return;
          }
          btn.deleteCacheWordHeadingElem.style.display = "none";
        });
      });
      //when focus (such as using keyboard only), display the delete button
      btn.cacheWordHeadingElem.addEventListener("focus", (e: any) => {
        e.preventDefault();
        btn.deleteCacheWordHeadingElem.style.display = "inline-block";
      });
      //when not focused, hide the delete button option
      btn.deleteCacheWordHeadingElem.addEventListener("focusout", (event: any) => {
        if (event.target == btn.cacheWordHeadingElem) {
          return;
        }
        btn.deleteCacheWordHeadingElem.style.display = "none";
      });

      //add event listener for delete button
      btn.deleteCacheWordHeadingElem.addEventListener("click", (event: any) => {
        event.preventDefault();
        btn.wordHeadingElemContainer.remove();
        this.removeDictionaryTermfromLocalStorage(btn.cacheWordHeadingElem.textContent);
      });
    }
  };

  /**
   * Adds the word to the browser's Local Storage containing word data, URL, and caching.
   *
   * @param localstoragevalue - This interface stores information where sending to Local Storage.
   */
  private addDictionaryTermtoLocalStorage(localstoragevalue: localStorageWord) {
    //Log the word cache creation
    const addedwordcache = () => {
      console.log(
        `%c<RWB>%cAdded local storage word: ${localstoragevalue.word}`,
        "color:cyan;font-weight:bold;",
        "color:cyan;"
      );
    };
    //The 'localstoragevalue' needs added to local storage cache
    //Local storage may be empty or already having the wanted searched word
    //Check storage is not null. If it is, add the word.
    if (DictionarySearch.wordStorage == null || DictionarySearch.wordStorage == undefined) {
      if (RwbError.checkLocalStorageEqualNull("DictionarySearch", "word-caches", false, false)) {
        //Add the storage word to an array
        let wordStore: localStorageWord[] = [];
        wordStore.push(localstoragevalue);
        let jsonstr: string = "";

        //Call RWBStringifyJSON to stringify the object
        let stringifytestsingleword = Object.create(new RwbStringifyJson(wordStore));
        if (!stringifytestsingleword.passed) {
          //stringify object did not work, so return
          //LOGLEAF
          return;
        }
        jsonstr = stringifytestsingleword.returnStr;

        // Local storage is empty => add the word
        localStorage.setItem("word-caches", jsonstr);
        console.log(
          `%c<RWB>%cCreated storage key: word-caches`,
          "color:cyan;font-size:14px;font-weight:bold;",
          "color:cyan;font-size:16px;"
        );
        addedwordcache();
        return;
      }
      //LOGLEAF
      return;
    }
    //Local storage is not empty. Here, we need to add the word to the existing word cache.
    let allcache: localStorageWord[] = DictionarySearch.wordStorage;
    let jsonstr: string = "";

    //Match the current URL for cache management
    for (let cache of allcache) {
      if (cache.wordURL == localstoragevalue.wordURL) {
        //Word is already in Local Storage
        //No need to add it to the array
        //LOGLEAF
        return;
      }
    }
    //Add word to existing 'word-caches' in Local Storage
    allcache.push(localstoragevalue);

    //Call RWBStringifyJSON to stringify the object
    let stringifytestdoubleword = Object.create(new RwbStringifyJson(allcache));
    if (!stringifytestdoubleword.passed) {
      //stringify object did not work, so return
      //LOGLEAF
      return;
    }
    jsonstr = stringifytestdoubleword.returnStr;

    localStorage.setItem("word-caches", jsonstr);
    addedwordcache();
  };

  /**
   * Remove a previous word data from browser's Local Storage --> Key/Value
   * data referencing words stored in local cache.
   *
   * @param localstorageword - string from "Previous Word Searches" button
   */
  private removeDictionaryTermfromLocalStorage(localstorageword: string) {
    //Remove the cache item to Local Storage, Cache Storage
    //Check local storage is not null or empty
    if (DictionarySearch.wordStorage == null) {
      //LOGLEAF
      return;
    }
    //Get the words array from Local Storage
    //RWBError.checkLocalStorageNullorEmpty("DictionaryWidget", "word-caches"); //log whether fetched word cache is null or empty.
    let allcache: localStorageWord[] = DictionarySearch.wordStorage;

    //Remove the word from Cache Storage and Local Storage word array
    for (let wordCache of allcache) {
      if (wordCache.word == localstorageword) {
        this.removeRequestfromCacheStorage(wordCache.wordURL);
        allcache.splice(allcache.indexOf(wordCache), 1);
        console.log(
          `%c<RWB>%cDeleted word cache: ${localstorageword}`,
          "color:darkcyan;font-weight:bold;",
          "color:darkcyan;"
        );
      }
    }
    if (allcache.length == 0) {
      //The removed word was the last word in the array, so remove the container
      localStorage.removeItem("word-caches");
      console.log(
        `%c<RWB>%cDeleted storage key: word-caches`,
        "color:darkcyan;font-size:14px;font-weight:bold;",
        "color:darkcyan;font-size:16px;"
      );
      return;
    }
    //Call RWBStringifyJSON to stringify the object
    let wordcachesstrfytest = Object.create(new RwbStringifyJson(allcache));
    if (!wordcachesstrfytest.passed) {
      //LOGLEAF
      return;
    }

    //Return remaining words to Local Storage
    localStorage.setItem("word-caches", wordcachesstrfytest.returnStr);
  };

  /**
   * Remove a fetch request from Cache Storage. Utilizes
   * DictionarySearch.CacheStorageNameofWordRequest for cache name.
   * @param removeURL
   */
  private removeRequestfromCacheStorage(removeURL: URL) {
    window.caches.open(DictionarySearch.CacheStorageNameofWordRequest).then(cache => {
      caches.match(removeURL).then(result => {
        if (result !== undefined) {
          let cachePromise = new Promise(resolve => resolve(result));
          cachePromise.then(() => {
            cache.delete(removeURL);
          });
          console.log(`Removed url from storage cache: ${removeURL}`);
        }
      });
    });
  };

  /**
   * This function dynamically recalls a word definition request and instantiates apiGET(). The
   * returned promise also dymanically answers the widget markup.
   *
   * @param word - The word searched from widget input.
   * @param wordUrl - The fetch request URL.
   * @param searchElems - Widget Elements -- key widget function elements.
   * @param sendToCache - ? Send fetch request to Cache Storage : Fetch without storing the request.
   * @param cacheName - If sending fetch requests to cache, provide a name to store it under.
   * @returns - wordData: Promise<unknown>
   */
  private fetchDictionaryTerm(
    word: string,
    wordUrl: URL,
    searchElems: DictionarySearchElements,
    sendToCache: boolean,
    cacheName: string
    ) {
    //A function call parameter option is to store the word request in browser's Cache Storage
    //Structure the word data via 'localstoragewordvalue' interface used throughout fetching
    let wordcache: localStorageWord = {
      inCache: sendToCache,
      word: word,
      wordURL: wordUrl,
      cacheName: sendToCache ? cacheName : "",
    };

    //Asynchronous fetch reqeust and dynamic markup creation from the data's return
    const wordFetchRequest = async () => {
        //Call apiGET() object constructor
        const wordFetch = new apiGet(
          wordcache.wordURL,
          wordcache.inCache,
          searchElems.errorElem,
          wordcache.cacheName
        );
      if(onError.isOffline.wordFetchError(searchElems)) return;
      let noDefinitions: boolean = false;
      
      //Fetch request method call. Returned data may be the word definition
      let data = await wordFetch.apiGet(wordFetch.getGetUrl());
      // When the word data resolves, call markup functions
      if (typeof data == "string") {
        //If the returned data is a string, it is the word definition data.
        noDefinitions = false;
        let parsetest = Object.create(new RwbParseJson(data));
        if (!parsetest.passed) {
          return;
        }
        data = parsetest.returnObj;
      }
      let wordData: any = data;
      //If the returned data is an object, confirm it is 'no definition' server data
      if (typeof data == "object") {
        if (wordData.hasOwnProperty("title")) {
          //No definitions were found when data is an object with a title property
          //wordData.title == "No Definitions Found"
          noDefinitions = true;
          if (wordData.title == "No Definitions Found" && wordcache.inCache == true) {
            //The data stream here is without word data. This function awaits the api fetch's data
            //to complete storage/promise returns. It waits 5 seconds for the browser to complete its store functions
            //then removes the unwanted cache request.
            //TODO:BUGRESEARCH=>During the 5 timeout, if the page refreshes a 'bad word' will be stored in the cache
            //This 'bad word' can be removed by deleting all previous words via UI and refreshing the page. This will
            // fire getLocalStorageWordCaches() to clear any mismatched worddata<-->cachedrequests.
            setTimeout(() => {
              //Function awaiting request's Cache Storage caching
              try {
                this.removeRequestfromCacheStorage(wordFetch.getGetUrl());
              } catch {
                console.log("Could not remove from Cache Storage. Name: ", wordFetch.getGetUrl());
              }
            }, 5000);
          }
        }
      }
      if (typeof data === undefined || noDefinitions) {
        //Good data--> return data for markup render
        //'Bad data' due to "No definitions found", invalid word
        if (noDefinitions) {
          //Server returned no definitions data
          if (wordData.title == "No Definitions Found")
            searchElems.errorElem.innerText = "No Definitions Found";
          searchElems.errorElem.classList.add("error-notfound");
          return data;
        }
        return;
      }
      if (wordFetch.sendToBrowserCache && !wordFetch.inCache) {
        //Program has requested to send to cache, however, the API call returned cache insertion did not succeed
        //Change the word's local storage data to reflect this
        wordcache.inCache = false;
      }
      return data;
      };

    let wordData = wordFetchRequest();
    this.addDictionaryTermtoLocalStorage(wordcache);
    return wordData;
  };

  /**
   * User input validation function tests the input string against a valid Regular Expression.
   *
   *    RegExp("^[A-Za-z]{1,45}$")
   *
   * @param intxt - String value received from user field input.
   * @returns Acceptable user input: true or false.
   */
  private wordValidation(intxt: string) {
    let trimmed = intxt.trim();
    let lettersRE = new RegExp("^[A-Za-z]{1,45}$");
    if (lettersRE.test(trimmed)) {
      return true;
    } else {
      //word is not an acceptable word.`);
      return false;
    }
  };

  /**
   * callFetchDictionaryTerm awaits a promise, fetching a dictionary term. The data
   * ingress calls markup creation function.
   *
   * @param searchElems - Widget Elements -- key widget function elements.
   * @param word - The word to be fetched.
   * @param wordURL - A URL composing the full url of the fetch request.
   */
  private callFetchDictionaryTerm(searchElems: DictionarySearchElements, word: string, wordURL: URL) {
    let wordDataPromise = new Promise(resolve => {
      // When the word data resolves, call markup functions
      resolve(this.fetchDictionaryTerm(word,wordURL,searchElems,true,DictionarySearch.CacheStorageNameofWordRequest))
    });
    wordDataPromise.then((data: unknown) => {
      this.wordData = data as object;
      console.log(`%c<RWB>%cFetched word: ${word}`, "color:gold;font-weight:bold;", "color:gold;");
      
      this.createDictionaryTermWithMarkup(data, wordURL, searchElems);
      if (data == undefined || data.hasOwnProperty("title")) return;
      // Remove unneeded classes if applied previously
      searchElems.searchWord.classList.remove("invalid");
      searchElems.searchWord.classList.remove("invalid-notfound");
      searchElems.errorElem.classList.remove("error");
      searchElems.errorElem.classList.remove("error-notfound");
      searchElems.errorElem.textContent = "";
    });
  };

  /**
   * wordSearch() begins a word search request. The user input listener chooses
   * whether the fetch is called from cache or is new.
   *
   * @param searchElems - Widget Elements -- key widget function elements.
   * @param isFromPreviousWords - True if the user requested a search from a previous word, to call data from Browser Cache.
   * @param cachedWord - If the user called for a previous word, cachedWord is within the Local Storage.
   */
  private wordSearch(
    searchElems: DictionarySearchElements,
    isFromPreviousWords: boolean,
    cachedWord: localStorageWord | null
    ) {
    if (isFromPreviousWords) {
        this.callFetchDictionaryTerm(searchElems, cachedWord!.word, cachedWord!.wordURL);
    } 
    else {
      // Take user input and filter to an accepted string
      let acceptedInputWord: boolean = false;
      this.wordValidation(searchElems.searchWord.value)
      ? (acceptedInputWord = true)
      : (acceptedInputWord = false);
      if (acceptedInputWord) {
        // Create a URL of the accepted word for use in the fetch call
        this.wordURL = new URL(searchElems.searchWord.value.toString(), DictionarySearch.requestUrl);
        this.callFetchDictionaryTerm(searchElems, searchElems.searchWord.value, this.wordURL);
      } else {
        searchElems.searchWord.classList.remove("invalid-notfound");
        searchElems.searchWord.classList.add("invalid");
        searchElems.errorElem.classList.remove("error-notfound");
        searchElems.errorElem.classList.add("error");
        searchElems.errorElem.textContent = "Invalid word!";
        searchElems.searchWord.classList.add("invalid-notfound");
      }
    }
    searchElems.searchWord.value = ""; // reset input string
  };
};
