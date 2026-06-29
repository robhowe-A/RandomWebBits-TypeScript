//--Copyright (c) 2023-2026 Robert A. Howell
//Author: Robert A Howell, April 2023
//Original Author(s): Mozilla Contributors, MDN
//Source distribution: https://github.com/mdn/web-components-examples/tree/main/expanding-list-web-component

import RwbError from "../../srcopen/models/rwbErrorBus.js";

export class ExpandingListElement extends HTMLUListElement {
  /**Counts the number of objects instantiated */
  public static count: number = 0;

  constructor() {
    // Always call super first in constructor
    // Return value from super() is a reference to this element
    super();

    // Get ul and li elements that are a child of this custom ul element
    // li elements can be containers if they have uls within them
    const uls = RwbError.TryElementQuerySelectorAll("ExpandingListClass", this, "ul", true, true);
    const lis = RwbError.TryElementQuerySelectorAll("ExpandingListClass", this, "li", true, true);
    if (uls == null || lis == null) {
      console.error("The page has experienced an error. The components may be degraded.");
      return;
    }

    // Hide all child uls
    // These lists will be shown when the user clicks a higher level container
    uls.forEach(ul => {
      ul.style.display = "none";
    });

    // Look through each li element in the ul
    lis.forEach(li => {
      // If this li has a ul as a child, decorate it and add a click handler
      if (li.querySelectorAll("ul").length > 0) {
        // Add an attribute which can be used  by the style
        // to show an open or closed icon
        li.setAttribute("class", "closed");

        // Wrap the li element's text in a new span element
        // so we can assign style and event handlers to the span
        const childText = li.childNodes[0];
        const newSpan = document.createElement("span");

        // Copy text from li to span, set cursor style
        newSpan.textContent = childText.textContent;
        newSpan.style.cursor = "pointer";

        // Add click handler to this span
        newSpan.onclick = this.showul;
        newSpan.addEventListener("keydown", event => {
        if (event.code == "NumpadEnter" || event.code == "Enter") {
          let nextul = event.target as any;
          // next sibling to the span should be the ul
          nextul = newSpan.nextElementSibling;
          this.ToggleVisibility(nextul);
        }
        });

        if (childText.parentNode == null) {
            console.error("Parent node not found. Exiting. ");
            return;
        }
        // Add the span and remove the bare text node from the li
        childText.parentNode.insertBefore(newSpan, childText);
        childText.parentNode.removeChild(childText);
      }
    });
    ExpandingListElement.count++;
  };

  // li click handler
  private showul = (e: any) => {
    // next sibling to the span should be the ul
    let nextul = e.target.nextElementSibling;
    this.ToggleVisibility(nextul);
  };

  private ToggleVisibility = (nextul: any) => {
    // Toggle visible state and update class attribute on ul
    if (nextul.style.display == "block") {
      nextul.style.display = "none";
      nextul.parentNode.setAttribute("class", "ulistelem-closed");
    } 
    else {
      nextul.style.display = "block";
      nextul.parentNode.setAttribute("class", "ulistelem-open");
    }
    nextul = nextul as HTMLUListElement;
    console.info(`${nextul.localName} display toggled.`);
  };
};
