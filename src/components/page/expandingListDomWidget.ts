//--Copyright (c) 2023-2026 Robert A. Howell

import { ExpandingListElement } from "../../models/expandingList.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

const expandingListDOMWidget = {
  init: () => {
    // Define the expanding list element, for use within the page
    customElements.define("expanding-list", ExpandingListElement, {
      extends: "ul",
    });

    // Bring to console the expanding list element count
    const expandingListElems = RwbError.TryDocumentQuerySelectorAll("ExpandingListComponent", 'ul[is="expanding-list"]', true, false) as NodeListOf<HTMLElement>;
    console.log(`%c<RWB>%cCustom element found with constructor name: ${expandingListElems[0].constructor.name}.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
    
    // Update expanding list element properties
    // "DOM" page specific properties
    // Add a title attribute to all li-span that can expand further
    const expandableLiOpenOpen = RwbError.TryDocumentQuerySelectorAll("ExpandingListLiOpen", 'ul[is="expanding-list"] li span:first-child', true, false);
    const expandableLiCloseSpan = RwbError.TryDocumentQuerySelectorAll("ExpandingListLiOpen", `ul[is="expanding-list"] li span:nth-child(3)`, true, false);

    // Set attributes and property values for expanding-element expandable elements
    for (let span of Array.from(expandableLiOpenOpen)) {
      span.setAttribute("title", "Select to expand...");
      span.setAttribute("tabindex", "0");
      // Add a click event listener to the 'DOM' items elements
      // --->when clicked, change the title property to reflect open or closed status
      span.addEventListener("click", e => {
        e.preventDefault();
        span.getAttribute("title") == "Select to expand..."
        ?
          (() => {
            span.setAttribute("title", "Select to close...");
            if (span.nextElementSibling == null || span.nextElementSibling.nextElementSibling == null) return;
            span.nextElementSibling.nextElementSibling.setAttribute(
              "title",
              "Select opening element tag to close."
            );
          })()
        : 
          (() => {
            span.setAttribute("title", "Select to expand...");
            if (span.nextElementSibling == null || span.nextElementSibling.nextElementSibling == null) return;
            span.nextElementSibling.nextElementSibling.setAttribute(
              "title",
              "Select opening element tag to expand."
            );
          })();
      });
    }
    // Set property of closing span elements
    for (let span of Array.from(expandableLiCloseSpan)) {
      span.setAttribute("title", "Select opening element tag to expand.");
    }
  },
};

export default expandingListDOMWidget;
