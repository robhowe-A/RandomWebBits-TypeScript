//--Copyright (c) 2023-2026 Robert A. Howell

import expandingListDOMWidget from "./components/page/expandingListDomWidget.js";
import activeCardsWidget from "./components/page/growingCard.js";
import { cssexColorCode, htmlexColorCode, urlexColorCode } from "./components/page/colorCode.js";
import RwbPerf from "../srcopen/models/scriptPerf.js";
import domainLookup from "./components/page/domainLookup.js";
import sliderBar from "./components/page/sliderBar.js";
import hslColorWidget from "./components/page/hslColor.js";
import latencyCalculator from "./components/page/calculate.js";
import boxList from "./components/page/boxList.js";
import cursorsPanelWidget from "./components/page/cursors.js";
import { ps_At } from "./components/global/photoSwipe.js";
import acronymList from "./models/acronyms-element.js";

const RWBPageComponents = {
  buildBrowserClearCacheElem: () => {
    let clearCacheWarningBlock = document.body.insertAdjacentElement("afterbegin",
      document.createElement("div")) as HTMLDivElement;
    let clearCacheWarningPara = clearCacheWarningBlock.insertAdjacentElement("afterbegin",
      document.createElement("p")) as HTMLParagraphElement

    clearCacheWarningPara.textContent = "You have encountered a problem. Clear the browser cache and data to resolve.";
    clearCacheWarningPara.style.setProperty("color", "var(--clr-Red)");
    clearCacheWarningPara.style.setProperty("font-weight", "bold");
    clearCacheWarningPara.style.setProperty("margin-block", "0");
    clearCacheWarningBlock.style.setProperty("border", "5px dashed var(--clr-Red)");
    clearCacheWarningBlock.style.setProperty("width", "fit-content")

    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      clearCacheWarningBlock.style.setProperty("background-color", "hsla(350, 95%, 80%, 0.8)");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      clearCacheWarningBlock.style.setProperty("background-color", "var(--clr-HSLA-Red-Dark)");
    }
    clearCacheWarningBlock.style.setProperty("margin", "20px");
    clearCacheWarningBlock.style.setProperty("padding", "8px");
  },
  _checkPage: (page: string) => {
    try {
      switch (page) {
        // dom.html page uses expandingLists component
        case "/pages/dom":
          expandingListDOMWidget.init();
          acronymList.init("/pages/dom");
          break;
        case "/pages/svg":
          expandingListDOMWidget.init();
          acronymList.init("/pages/svg");
          break;
        // Initialize webIDE widget
        case "/pages/webides":
          activeCardsWidget.init();
          break;
        // Initialize CSSEX components
        case "/pages/css":
          cssexColorCode.init();
          break;
        // Initialize htmlexColorCode components
        case "/pages/html":
          htmlexColorCode.init();
          break;
        // Initialize urlexColorCode components
        case "/pages/url":
          urlexColorCode.init();
          break;
        // Initialize domain name lookup
        case "/pages/domainlookup":
          domainLookup.init();
          acronymList.init("/pages/domainlookup");
          break;
        case "/pages/markup":
          sliderBar.init();
          acronymList.init("/pages/markup");
          break;
        // Initialize HSL color picker
        case "/pages/hsl":
          hslColorWidget.init();
          break;
        // Initialize Propagation Latency calculator
        case "/pages/latency":
          latencyCalculator.init();
          acronymList.init("/pages/latency");
          break;
        case "/pages/hyperlink":
          boxList.init();
          break;
        case "/pages/cursors":
          cursorsPanelWidget.init();
          break;
        case "/pages/htmlresponses":
          ps_At();
          acronymList.init("/pages/htmlresponses");
          break;
        case "/pages/chatgpt":
          ps_At();
          break;
        case "/pages/paint3d":
          ps_At();
          break;
        case "/pages/boinc":
          ps_At();
          break;
        case "/pages/networkspeed":
          acronymList.init("/pages/networkspeed");
          break;
        case "/pages/wifi":
          acronymList.init("/pages/wifi");
          break;
        case "/pages/ipaddress":
          acronymList.init("/pages/ipaddress");
          break;
        case "/pages/drives":
          acronymList.init("/pages/drives");
          break;
        case "/pages/dns":
          acronymList.init("/pages/dns");
          break;
        case "/pages/javascript":
          acronymList.init("/pages/javascript");
          break;
        case "/pages/http":
          acronymList.init("/pages/http");
          break;
      }
    } catch (error) {
      console.error(`Error loading page component: ${error}`);
    }
  },
  get checkPage() {
    return this._checkPage;
  },
  set checkPage(value) {
    this._checkPage = value;
  },
  init: () => {
    let page = window.location.pathname;
    const pagePerf = new RwbPerf("Pagecomponents"); //measure performance

    //customElements.define("acronyms-list", AcronymsElem);
    RWBPageComponents.checkPage(page);

    pagePerf.end(); //end performance measure
  },
  load: () => {
    window.addEventListener("DOMContentLoaded", RWBPageComponents.main);
    //TODO: Loading screen logic
  },
  main: () => {
    try {
      RWBPageComponents.init();
    } catch {
      RWBPageComponents.buildBrowserClearCacheElem();
      console.error("Application error. Clear the browser data and retry.");
    } finally {
      console.debug("Page components initialized.");
    }
  },
};

RWBPageComponents.load();
