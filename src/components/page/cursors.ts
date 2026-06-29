//--Copyright (c) 2024-2026 Robert A. Howell

import { CursorsPanel } from "../../models/cursorPanel.js";
import dataObj from "../../data/cursorsData.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

const cursorsPanelWidget = {
  AIfunctions: {
    /*
       * AI functions' code was generated with the assistance of GitHub Copilot,
       * an AI programming assistant developed by OpenAI and GitHub.
       * Author: Robert Howell, February 2024
       */
    /**  This function provides the number of rows and the width of the cursor panel
    based on the current window size. */
    getNumOfRows: () => {

      // Implementation depends on your specific case
      switch (true) {
        case window.outerWidth < 350:
          return [36, 200];
        case window.outerWidth <= 450 && window.outerWidth > 350:
          return [18, 300];
        case window.outerWidth <= 650 && window.outerWidth > 450:
          return [9, 400];
        case window.outerWidth >= 650 && window.outerWidth < 1000:
          return [6, 550];
        case window.outerWidth >= 1000 && window.outerWidth < 1800:
          return [4, 900];
        case window.outerWidth >= 1800:
          return [2, 1650];
        default:
          return [18, 300];
      }
    },
    windowOnload: () => {

      window.onload = function () {
        if (document.querySelector("cursors-panel") == null) cursorsPanelWidget.createCursorsPanel();
        else {
          const cursorsPanelElem = RwbError.TryDocumentQuerySelector(
            "CursorsPanel",
            "cursors-panel",
            true,
            true
          );
          if (cursorsPanelElem == null) {
            console.warn("An element is missing. The cursors panel widget may not function as expected.");
            return;
          }
          cursorsPanelElem.remove();
          cursorsPanelWidget.createCursorsPanel();
        }
      };
    },
    windowOnresize: () => {

      window.onresize = function () {
        if (document.querySelector("cursors-panel") == null) cursorsPanelWidget.createCursorsPanel();
        else {
          const cursorsPanelElem = RwbError.TryDocumentQuerySelector(
            "CursorsPanel",
            "cursors-panel",
            true,
            true
          );
          if (cursorsPanelElem == null) {
            console.warn("An element is missing. The cursors panel widget may not function as expected.");
            return;
          }
          cursorsPanelElem.remove();
          cursorsPanelWidget.createCursorsPanel();
        }
      };
    },
  },
  createCursorsPanel: () => {

    const cursorPanel = new CursorsPanel();

    //Add data for use in the panel markup
    cursorPanel.cursorDataObj = dataObj;

    //Dimensions calculation
    let cursorWidgetDimensions;
    cursorWidgetDimensions = cursorsPanelWidget.AIfunctions.getNumOfRows();
    let cursorWidgetWidth = cursorWidgetDimensions[1];
    let cursorWidgetBoxesWidth = (cursorWidgetWidth / dataObj.cursors.length) * cursorWidgetDimensions[0];

    //Cursors panel style properties
    cursorPanel.style.setProperty("width", `${cursorWidgetDimensions[1]}px`);
    cursorPanel.style.setProperty("height", "auto");
    cursorPanel.style.setProperty("font-size", ".65em");
    cursorPanel.classList.add("WebBits-width-full");
    cursorPanel.setElements(cursorWidgetBoxesWidth);

    //Add panel to the page
    const articleElem = RwbError.TryDocumentQuerySelector("CursorsPanel", "#cursors", true, true);
    if (articleElem == null) {
      console.warn("An element is missing. The cursors panel widget may not function as expected.");
      return;
    }
    articleElem.insertAdjacentElement("afterend", cursorPanel);
  },
  init: () => {
    
    //Define the widget's custom element
    window.customElements.define("cursors-panel", CursorsPanel);

    
    //Create the cursor panel markup with event listeners
    cursorsPanelWidget.createCursorsPanel();

    // Bring to console the cursors panel element count
    const cursorsPanelElems = RwbError.TryDocumentQuerySelectorAll("CursorsPanelComponent", 'cursors-panel', true, false) as NodeListOf<HTMLElement>;
    console.log(`%c<RWB>%cCustom element found with constructor name: ${cursorsPanelElems[0].constructor.name}.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");


    //Utilize global event listener window.onload
    cursorsPanelWidget.AIfunctions.windowOnload();

    //Utilize global event listener window.onresize
    cursorsPanelWidget.AIfunctions.windowOnresize();
  },
};

export default cursorsPanelWidget;
