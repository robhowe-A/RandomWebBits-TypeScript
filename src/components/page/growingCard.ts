//--Copyright (c) 2023-2026 Robert A. Howell

import { GrowingCardElement } from "../../models/growingCard.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

const activeCardsWidget = {
  init: () => {
    customElements.define("growing-card", GrowingCardElement, {
      extends: "li",
    });

    // Bring to console the growing card element count
    const growingCardElems = RwbError.TryDocumentQuerySelectorAll("GrowingCardComponent", 'li[is="growing-card"]', true, false) as NodeListOf<HTMLElement>;
    console.log(`%c<RWB>%c${growingCardElems.length} custom elements found with constructor name: ${growingCardElems[0].constructor.name}.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");

    document.body.addEventListener("click", e => {
      if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLDetailsElement) {
        return;
      }
      e.preventDefault();

      // Array of list items (cards)
      let listLIs: GrowingCardElement[] = Array.from(document.querySelectorAll("#webIDECards li"));

      // Click event to resize the cards if clicking outside of a card
      // When clicking outside a card, resize all cards to normal
      for (let item of listLIs) {
        let tempItem: GrowingCardElement = item;
        if (e.target !== tempItem && !tempItem.contains(e.target as Node)) {
          GrowingCardElement.shrinkCard(tempItem);
        }
      }

      // Reshade all cards because none of them are big
      for (let li of listLIs) {
        GrowingCardElement.shadeInactiveCard(li);
      }
    });
  },
};

export default activeCardsWidget;
