"strict mode";
//--Copyright (c) 2023-2026 Robert A. Howell
import headerFooter from "./components/global/headerFooter.js";
import classComponents from "./components/classComponents.js";
import RwbPerf from "../srcopen/models/scriptPerf.js";
import colorScheme from "./components/global/colorScheme.js";
import RwbError from "../srcopen/models/rwbErrorBus.js";

const mainPerf = new RwbPerf("main");

// entry point
/**
 * TypeScript entry point. This script initializes page components and models.
 * Start is the entry point.
 */
const RWB = {
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
  buildCookiesOptionDialogElem: () => {
    //Create dialog markup
    const element = RwbError.TryDocumentQuerySelector("MainElements","html", true, false) as HTMLElement;
    const dialog = element.insertAdjacentElement("beforeend", document.createElement("dialog")) as HTMLDialogElement;

    const dialogHeading = dialog.insertAdjacentElement("afterbegin", document.createElement("h3")) as HTMLParagraphElement;
    const dialogPara = dialog.insertAdjacentElement("beforeend", document.createElement("p")) as HTMLParagraphElement;
    const dialogPara2 = dialog.insertAdjacentElement("beforeend", document.createElement("p")) as HTMLParagraphElement;
    const dialogUl = dialog.insertAdjacentElement("beforeend", document.createElement("ul")) as HTMLUListElement;
    const dialogLi = dialogUl.insertAdjacentElement("beforeend", document.createElement("li")) as HTMLLIElement;
    const dialogLi2 = dialogUl.insertAdjacentElement("beforeend", document.createElement("li")) as HTMLLIElement;
    const dialogForm = dialog.insertAdjacentElement("beforeend", document.createElement("form")) as HTMLFormElement;
    const dialogFormButton = dialogForm.insertAdjacentElement("afterbegin", document.createElement("button")) as HTMLButtonElement;
    const dialogFormButton2= dialogForm.insertAdjacentElement("beforeend", document.createElement("button")) as HTMLButtonElement;

    dialogHeading.textContent = "Site Usage Notice"
    dialogPara.textContent = "This website uses browser cookies for anonymous traffic information capture.";
    dialogPara2.textContent = "This notice informs site users of anonymized information capture including:";
    const dialogParaStrong = dialogPara2.insertAdjacentElement("afterbegin", document.createElement("strong")) as HTMLElement;
    const dialogParaStrong_ul = dialogPara2.insertAdjacentElement("afterbegin", document.createElement("u")) as HTMLElement;
    dialogParaStrong_ul.textContent = "Note";
    dialogParaStrong.textContent = ": ";
    dialogLi.textContent = "storing the connection's hashed IP address";
    dialogLi2.textContent = "storing the user-agent";
    dialogForm.setAttribute("method", "dialog");
    dialogFormButton.textContent = "Accept";
    dialogFormButton2.textContent = "Close";

    //Set dialog attributes
    dialog.setAttribute("id", "cookiesOptionForm");
    dialog.toggleAttribute("open");
    dialog.style.setProperty("display", "inline-block");
    dialog.style.setProperty("position", "fixed");
    dialog.style.setProperty("width", "400px");
    dialogPara2.style.setProperty("margin-bottom", "0");
    dialogUl.style.setProperty("margin-block", "0");
    dialogUl.style.setProperty("padding-bottom", "32px");
    dialogFormButton.style.setProperty("width", "max-content");
    dialogFormButton.style.setProperty("margin-right", "8px");
    dialogFormButton2.style.setProperty("width", "min-content");

    dialogFormButton.addEventListener("click", () => {
      localStorage.setItem("cookiesOption", "Accepted");
      dialog.toggleAttribute("open");
      dialog.style.setProperty("display", "none");
      //dialog.remove();
    });
    dialogFormButton2.addEventListener("click", () => {
      dialog.toggleAttribute("open");
      dialog.style.setProperty("display", "none");
    });
  },
  init: () => {
    // Add header and footer components
    headerFooter.headerWidget.init();
    headerFooter.footerWidget.init();

    //Check browser color scheme preference
    colorScheme.setColorTheme(false, 0);

    let page: string = window.location.pathname;

    // Initialize element components
    classComponents.init(page);

    // Resume prevention of the Flash of Unstyled Content
    let FOUCPrevention = RwbError.TryDocumentQuerySelector("Loading", ".loading", true, false);
    if (FOUCPrevention != null)
      FOUCPrevention.classList.remove("loading");

    mainPerf.end();
  },
  main: () => {
    try {
      RWB.init();
    } catch {
      RWB.buildBrowserClearCacheElem();
      console.error("Application error. Clear the browser data and retry.");
    } finally {
      console.debug("Main initialized.")
    }
  },
  start: () => {
    //Check user acceptance
    const userCookiesAcceptance = localStorage.getItem("cookiesOption");

    if (!userCookiesAcceptance) {
      RWB.buildCookiesOptionDialogElem();
    }

    // Event fired before assets are rendered to the page
    window.addEventListener("DOMContentLoaded", RWB.main);

    let loadingComp: HTMLElement | null;
    loadingComp = RwbError.TryDocumentQuerySelector("LoadingComp", "body aside:first-of-type", true, true) as HTMLElement;
    loadingComp.classList.add("loading");
    loadingComp.innerText = "Page loading."; 
    loadingComp.remove(); //TODO - not remove until after loaded
  },
};

RWB.start();
