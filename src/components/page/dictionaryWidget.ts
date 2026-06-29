//--Copyright (c) 2025-2026 Robert A. Howell

import { DictionarySearch } from "../../models/dictionarySearch.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

/**
 * Component containing the dictionary widget's creation.
 */
const dictionaryWidget = {
  /**
   * This initialization function creates a dictionary search widget by calling the
   *  constructor.
   * @param elem - Element containing 'dictionaryWidget' class
   */
  init: () => {
    let dictionaryWidgetStartingElement: HTMLElement;
    dictionaryWidgetStartingElement = RwbError.TryDocumentQuerySelector("DictionaryWidget", ".dictionaryWidget", true, true) as HTMLElement;
    if (dictionaryWidgetStartingElement == null) {
      console.warn("A widget has experienced an issue. Skipping its creation.");
      return;
    }
  
    // DictionarySearch constructor
    Object.create(new DictionarySearch(dictionaryWidgetStartingElement));
    console.log(`%c<RWB>%cAdded dictionary component.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
  },
};

export default dictionaryWidget;
