//--Copyright (c) 2023-2026 Robert A. Howell

import apiDemo from "./components/page/apidemo.js";
import dictionaryWidget from "./components/page/dictionaryWidget.js";
import toDosWidget from "./components/global/toDosWidget.js";

const RWBRequestComponents = {
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
  init: () => {
    const page: string = window.location.pathname;

    // Add ToDos widget if an element with that class is on a page
    if (page == "/pages/todos" || page == "/index" || page == "/" || page == "") {
      toDosWidget.init();
    }
    
    // Add Dictionary Widget on a page
    if (page == "/guides/smtp"
      || page == "/pages/dns"
      || page == "/pages/dictionaryword"
      || page == "/index"
      || page == "/"
      || page == "") {
        dictionaryWidget.init();
    }

    // Add api example widget to specific page
    if (page == "/pages/api") {
      apiDemo.init();
    }
  },
  load: () => {
    window.addEventListener("DOMContentLoaded", RWBRequestComponents.main);
  },
  main: () => {
    try {
      RWBRequestComponents.init();
    } catch {
      RWBRequestComponents.buildBrowserClearCacheElem();
      console.trace("Application error. Clear the browser data and retry.");
    } finally {
      console.debug("Request components initialized.");
    }
  },
};

RWBRequestComponents.load();
