//--Copyright (c) 2025-2026 Robert A. Howell

import pageAcronyms from "../data/acronyms.js";
import RwbError from "../../srcopen/models/rwbErrorBus.js";

const acronymList = {
  init: (page: string) => {
    const currentPage = pageAcronyms.filter(acr => acr.page === page);

    // Create a new DOM element to insert into the HTML
    let asideBox = document.createElement("aside");
    asideBox.classList.add("acronyms");

    // Create a list element to insert acronyms
    let acronymUl = document.createElement("ul");

    // Insert all acronyms into the new list
    currentPage[0].acronyms.forEach((acr) => {
      // Create list item element
      let acronymLI = document.createElement("li");

      // Assign text to the list element
      acronymLI.innerHTML = acr;

      // Add the list item element to the ordered list
      acronymUl.appendChild(acronymLI);
    })

    // Build the aside element with the list and H3
    const acronymsListH4Elem = asideBox.appendChild(document.createElement("h4"));
    acronymsListH4Elem.innerHTML = "Common Acronyms";

    asideBox.appendChild(acronymUl);

    // Insert the aside element into the page
    const AcronymsElem = RwbError.TryDocumentQuerySelector("AcronymsElement", "acronyms-list", true, false);
    if (AcronymsElem == null) {
        console.warn("Acronyms element query issue. Skipping.");
        return;
    }
    AcronymsElem.insertAdjacentElement("afterbegin", asideBox);

    // Output console information about this widget action
    console.log(`%c<RWB>%cAdded acronyms element to page.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
  },
}

export default acronymList;
