//--Copyright (c) 2024-2026 Robert A. Howell

import { apiGet } from "../../models/api.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";
import onError from "../global/onError.js";

const apiDemo = {
  apiDemoResultsHTML: {
    createResultsContainer: (author: string, authorData: any) => {
      let resultsContainer = RwbError.TryDocumentQuerySelector(
        "apidemo",
        "#WebAPI .results",
        true,
        true
      ) as HTMLDivElement;
      if (resultsContainer == null) {
          console.warn("The page has experienced an error. The components may be degraded.");
          return;
      }
      //fillAuthorsContainer with markup:
      //<div class="resultsAuthors">
      //    <h5>Search string: larry page</h5>
      //    <p>Total number of authors found: 3</p>
      //    <div authornum="0">
      //      <p>Author(s): Larry Page</p>
      //      <p>Top_Title: Saint New York Poems Through Jayslee Trump</p>
      //      <p>Total number of works: 3</p>
      //    </div>
      //  <div authornum="1">
      //    <p>Author(s): Sergey Brin Larry Page</p>
      //    <p>Top_Title: Biography - The Google Boys</p>
      //    <p>Total number of works: 1</p>
      //  </div>
      //  <div authornum="2">
      //    <p>Author(s): Norvell W. (writing as N. Wooten Page) (introduction by Will Murray) (with Larry Estep) Page</p>
      //    <p>Top_Title: BRAND OF THE COUGAR - with</p>
      //    <p>Total number of works: 1</p>
      //  </div>
      //</div>
      let authorsContainer = resultsContainer.appendChild(document.createElement("div"));
      let authorContainerResultsHeading = authorsContainer.appendChild(document.createElement("h5"));
      let authorContainerResultsCount = authorsContainer.appendChild(document.createElement("p"));
      authorContainerResultsHeading.textContent = `Search string: ${author}`;
      authorContainerResultsCount.textContent = `Total number of authors found: ${authorData.numFound}`;
      authorsContainer.classList.add("resultsAuthors");

      for (let i = 0; i < Math.min(10, authorData.docs.length); i++) {
        //Show no more than 10 authors
        let authorContainer = authorsContainer.appendChild(document.createElement("div"));
        let authorAuthors = authorContainer.appendChild(document.createElement("p"));
        let authorTitle = authorContainer.appendChild(document.createElement("p"));
        let authorWorksCount = authorContainer.appendChild(document.createElement("p"));
        authorAuthors.textContent = `Author(s): ${authorData.docs[i].name}`;
        authorTitle.textContent = `Top_Title: ${authorData.docs[i].top_work}`;
        authorWorksCount.textContent = `Total number of works: ${authorData.docs[i].work_count.toString()}`;
        authorContainer.setAttribute("authorNum", `${i}`);
      }
      if (authorData.numFound >= 9) {
        let tooManyAuthorsToDisplay = authorsContainer.appendChild(document.createElement("p"));
        tooManyAuthorsToDisplay.textContent =
          "More than 10 authors found from the search. Try another search term to narrow the results.";
      }
    },
    changeResultsQueryMarkup: (base: string, params: string, url: string) => {
      //show the URL on the page
      let baseURL = document.querySelector("#WebAPI #baseURL") as HTMLSpanElement;
      let paramURLStr = document.querySelector("#WebAPI #queryParams") as HTMLSpanElement;
      let resultsURL = document.querySelector("#WebAPI #resultsURL") as HTMLSpanElement;

      baseURL.textContent = base;
      paramURLStr.textContent = params;
      resultsURL.textContent = url;
    },
    initialResultsQueryMarkup: () => {
      //show the URL on the page
      let baseURL = document.querySelector("#WebAPI #baseURL") as HTMLSpanElement;
      let paramURLStr = document.querySelector("#WebAPI #queryParams") as HTMLSpanElement;
      let resultsURL = document.querySelector("#WebAPI #resultsURL") as HTMLSpanElement;

      baseURL.textContent = "Enter an author and send to see fetch's base url";
      paramURLStr.textContent = "Author's name from the form entry will be the search parameter";
      resultsURL.textContent = "A url is constructed from the base url and query parameters";
    },
  },
  authorValidation: (intxt: string) => {
    //Validate the user input as matching Firstname + Lastname
    let trimmed = intxt.trim();
    let lettersRE = new RegExp("^([A-Za-z. -]*s*)+$");
    if (lettersRE.test(trimmed)) {
      //Letters in the string are valid for an author
      return true;
    } else {
      return false;
    }
  },
  init: () => {
    console.debug("PageComponent: apiDemo");

    //Send an api fetch for author data
    //Component elements
    const authorToSearch = RwbError.TryDocumentQuerySelector(
      "apidemo",
      "#fetch-author",
      true,
      true
    ) as HTMLInputElement;

    const authorSearchButton = RwbError.TryDocumentQuerySelector(
      "apidemo",
      "#author-fetch",
      true,
      true
    ) as HTMLInputElement;

    const errorElem = RwbError.TryDocumentQuerySelector("apidemo", ".apierror", true, true) as HTMLElement;
    if (authorToSearch == null || authorSearchButton == null || authorSearchButton == null) {
      console.warn("The page has experienced an error. The components may be degraded.");
      return;
    }

    //Populate the results panel due to no result data
    apiDemo.apiDemoResultsHTML.initialResultsQueryMarkup();

    //Add search button event, triggering the API
    authorSearchButton.addEventListener("click", e => {
      e.preventDefault();
      //Reset error element styles
      errorElem.classList.remove("error");
      errorElem.textContent = "";

      //Clear previous author search elements
      document.querySelector("#WebAPI .resultsAuthors")?.remove();

      //First, validate the string as firstname + lastname
      let userInputAuthorStr = authorToSearch.value;
      if (apiDemo.authorValidation(userInputAuthorStr))
        apiDemo.fetchAuthorData(userInputAuthorStr, errorElem);
      else {
        errorElem.classList.add("error");
        errorElem.textContent = "Invalid input. Please search as 'Firstname + Lastname'.";
      }
    });

    console.log(`%c<RWB>%cApi demo component initialized.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
  },
  fetchAuthorData: (author: string, errorElem: HTMLElement) => {
    const setupAPIFetch = (author: string, errorElem: HTMLElement) => {
      let authorUrlStr = author.replace("/[ ]/g", "%20");

      //let dictionaryUrl = new URL("test", "https://api.dictionaryapi.dev/api/v2/entries/en/");
      const baseURL = "https://openlibrary.org/search/";
      let baseURLDisplay = `${baseURL}authors.json`;
      let queryParameterStr = `authors.json?q=${authorUrlStr}`;
      let queryParams = `?q=${authorUrlStr}`;
      let authorURLSearch = new URL(queryParameterStr, baseURL);

      console.log(`The base URL is: ${baseURL}`);
      console.log(`The query parameters string is: ${queryParameterStr}`);
      console.log(`The fetch URL is: ${authorURLSearch}`);
      apiDemo.apiDemoResultsHTML.changeResultsQueryMarkup(
        baseURLDisplay,
        queryParams,
        authorURLSearch.toString()
        );
      return new apiGet(authorURLSearch, true, errorElem, null);
    };

    const fetchAuthor = async (getAuthorAuthors: apiGet) => {
      return await getAuthorAuthors.apiGet(getAuthorAuthors.getGetUrl());
    };

    const authorDataPromise = (apiConfig: apiGet) => {
      let authorDataPromise = new Promise(resolve => {
        resolve(fetchAuthor(apiConfig));
      });

      authorDataPromise.then((authorData: any) => {
        authorData = JSON.parse(authorData);
        //console.log(authorData.body);
        console.log(`Found a number of authors (numFoundExact) is: ${authorData.numFoundExact}`);
        console.log(`Number of authors found (num) is: ${authorData.numFound}`);
        console.log(`The results found for this author query are: `);
        for (let i = 0; i < Math.min(10, authorData.docs.length); i++) {
          console.log(`\tAuthor(s) ${i} is ${authorData.docs[i].name}`);
          console.log(`\tTop_work ${i} is ${authorData.docs[i].top_work}`);
        }
        apiDemo.apiDemoResultsHTML.createResultsContainer(author, authorData);
      });
    };
    onError.isOffline.authorFetchError(errorElem);
    //Call for the data fetch
    authorDataPromise(setupAPIFetch(author, errorElem));
  },
};

export default apiDemo;
