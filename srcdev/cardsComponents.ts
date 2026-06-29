//--Copyright (c) 2023-2026 Robert A. Howell

import { rwbCardsWidget, webBitsSlideShow, webBitsAccordion } from "./components/webBitsCards.js";
import flashCardGameWidget from "./components/flashcardGameWidget.js";
import RwbPerf from "../srcopen/models/scriptPerf.js";

const RWBCardComponents = {
  buildBrowserClearCacheElem: () => {
    let clearCacheWarningBlock = document.body.insertAdjacentElement("afterbegin",
      document.createElement("div")) as HTMLDivElement;
    let clearCacheWarningPara = clearCacheWarningBlock.insertAdjacentElement("afterbegin",
      document.createElement("p")) as HTMLParagraphElement;

    clearCacheWarningPara.textContent = "You have encountered a problem. Clear the browser cache and data to resolve.";
    clearCacheWarningPara.style.setProperty("color", "var(--clr-Red)");
    clearCacheWarningPara.style.setProperty("font-weight", "bold");
    clearCacheWarningPara.style.setProperty("margin-block", "0");
    clearCacheWarningBlock.style.setProperty("border", "5px dashed var(--clr-Red)");
    clearCacheWarningBlock.style.setProperty("width", "fit-content");

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      clearCacheWarningBlock.style.setProperty("background-color", "hsla(350, 95%, 80%, 0.8)");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      clearCacheWarningBlock.style.setProperty("background-color", "var(--clr-HSLA-Red-Dark)");
    }
    clearCacheWarningBlock.style.setProperty("margin", "20px");
    clearCacheWarningBlock.style.setProperty("padding", "8px");
  },
  checkPage: (page: string) => {
    try {
      switch (page) {
        case "/RandomWebBits/index":
        case "/index":
        case "/":
          rwbCardsWidget.init(); // cards widget initialization
          webBitsSlideShow.init();
          webBitsAccordion.init();
          break;
        case "/RandomWebBits/pages":
        case "/pages":
          rwbCardsWidget.init(); // cards widget initialization
          break;
        // Initialize flashcard components
        case "/flashcards":
          flashCardGameWidget.init();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error loading page component: ${error}`);
    }
  },
  init: () => {
    let page = window.location.pathname;
    const pagePerf = new RwbPerf("Cardcomponents"); //measure performance

    RWBCardComponents.checkPage(page);

    pagePerf.end(); //end performance measure
  },
  load: () => {
    window.addEventListener("DOMContentLoaded", RWBCardComponents.main);
  },
  main: () => {
    try {
      RWBCardComponents.init();
    } catch {
      RWBCardComponents.buildBrowserClearCacheElem();
      console.error("Application error. Clear the browser data and retry.");
    } finally {
      console.debug("Card components initialized.");
    }
  },
};

RWBCardComponents.load();
