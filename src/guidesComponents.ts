//--Copyright (c) 2023-2026 Robert A. Howell

import slideShowWidget from "./components/guides/slideShowWidget.js";
import { ps_Pwa, ps_At, ps_Ip } from "./components/global/photoSwipe.js";
import RwbPerf from "../srcopen/models/scriptPerf.js";
import RwbError from "../srcopen/models/rwbErrorBus.js";
import linksWidget from "./components/guides/draggable.js";
import acronymList from "./models/acronyms-element.js";

const RWBGuideComponents = {
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
  checkPage: (page: string) => {
    try {
      switch (page) {
        // Initialize slideshow components
        case "/guides/pwaicon":
          ps_Pwa();
          slideShowWidget.init();
          break;
        case "/guides/elementinspect":
          ps_Pwa();
          break;
        case "/guides/https":
          ps_Pwa();
          acronymList.init("/guides/https");
          break;
        case "/guides/clearcookiesquickly":
          ps_At();
          break;
        case "/guides/inspectpages":
          ps_Ip();
          break;
        case "/guides/devtools/lighthousetab":
          let lighthouseTab;
          let lighthouseTabDetailsElem;
          lighthouseTab = RwbError.TryDocumentQuerySelector(
            "GuidesComponenets",
            "article.lh-root",
            true,
            true
          ) as HTMLElement;
          lighthouseTabDetailsElem = RwbError.TryDocumentQuerySelector(
            "GuidesComponenets",
            "#lighthousearticle",
            true,
            true
          ) as HTMLElement;
          if (lighthouseTab == null || lighthouseTabDetailsElem == null) {
              console.warn("A component experienced an issue. Please refresh the page.");
          }
          lighthouseTabDetailsElem.insertAdjacentElement("afterbegin", lighthouseTab);
          ps_At();
          linksWidget.init();
          break;
        case "/guides/devtools/applicationtab":
        case "/guides/devtools/consoletab":
        case "/guides/devtools/cssoverviewtab":
        case "/guides/devtools/elementstab":
        case "/guides/devtools/memorytab":
        case "/guides/devtools/networktab":
        case "/guides/devtools/performancetab":
        case "/guides/devtools/securitytab":
        case "/guides/devtools/sourcestab":
          ps_At();
          linksWidget.init();
          break;
      }
    }
    catch (error) {
      console.error(`Error loading page component: ${error}`);
    }
  },
  init: () => {
    let page = window.location.pathname;
    const pagePerf = new RwbPerf("Guidecomponents"); //measure performance

    RWBGuideComponents.checkPage(page);

    pagePerf.end(); //end performance measure
  },
  main: () => {
    try {
      RWBGuideComponents.init();
    } catch {
      RWBGuideComponents.buildBrowserClearCacheElem();
      console.error("Application error. Clear the browser data and retry.");
    } finally {
      console.debug("Main initialized.");
    }
  },
  load: () => {
    window.addEventListener("DOMContentLoaded", RWBGuideComponents.main);
  },
};

RWBGuideComponents.load();
