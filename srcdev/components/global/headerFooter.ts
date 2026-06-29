//--Copyright (c) 2023-2026 Robert A. Howell

import NAVITEMS from "../../data/navItems.js";
import RwbError, { RwbDomException } from "../../../srcopen/models/rwbErrorBus.js";
import RwbPerf from "../../../srcopen/models/scriptPerf.js";
import { customElements } from "./preferences.js";

/**
 * Widget to add site header and footer. Instantiated in 'Main' script.
 */
const headerFooter = {
  headerWidget: {
    /**
     * Create header with site logo appended.
     * @param main HTML 'main' element
     * @returns Populated header element
     */
    buildHeader: () => {
      /**
       * Basic HTML header element containing logo (H1)
       */
      const siteHeader = document.createElement("header");
      const siteHeaderContainer = document.createElement("div");
      siteHeaderContainer.classList.add("width-max-center");
      const H1 = document.createElement("H1");
      H1.textContent = "<Random Web Bits>";
      H1.setAttribute("id", "RandomWebBits");
      siteHeaderContainer.append(H1);
      siteHeader.append(siteHeaderContainer);

      return siteHeader;
    },
    buildNavigation: () => {
      // Build the header navigation based on navigation data
      // Create navigation elements
      const headerNavFrag = document.createDocumentFragment();
      const headerNav = headerNavFrag
        .appendChild(document.createElement("nav"))
        .appendChild(document.createElement("ul"));

      // Append nav data to nav elements
      NAVITEMS.map(item => {
        const navListItems = document.createElement("li");
        const navListLinks = document.createElement("a");
        navListItems.prepend(navListLinks);
        headerNav.append(navListItems);

        // Add navigation attributes and property values
        navListLinks.textContent = `${item.innerText}`;
        // Environment links edit, requiring different link relatives to operate
        // Github pages operates from repository, not '/'
        //if (window.location.host == 'robhowe-a.github.io') {
        //link data edit for dev environment
        //navListLinks.setAttribute('href', `/RandomWebBits/${item.hReference}`);
        //} else {
        //link data in other environments
        navListLinks.setAttribute("href", `/${item.hReference}`);
        //}
        navListLinks.setAttribute("title", item.title);
      });

      return headerNavFrag;
        },
    buildPreferencesPanel: (): HTMLDetailsElement => {
      //Prefereneces Menu addition
      let settingsMenu = document.createElement("details");
      settingsMenu.style.setProperty("width", "12rem");
      settingsMenu.style.setProperty("margin-left", "auto");
      settingsMenu.style.setProperty("margin-top", "2em");
      settingsMenu.style.setProperty("color", "var(--clr-all-font-light)");
      let settingsMenuSummary = document.createElement("summary");
      settingsMenuSummary.innerText = "Preferences";
      settingsMenuSummary.style.setProperty("text-align", "right");

      settingsMenu.appendChild(settingsMenuSummary);

      let pillContainer = customElements.pillBtnMarkup();
      pillContainer.id = "themeToggle";
      settingsMenu.appendChild(pillContainer);

      return settingsMenu;
    },
    /**
     * Site header containing navigation links and site logo.
     */
    init: () => {
      const headerperf = new RwbPerf("Header");

      /**
       * HTML 'main' element
       */
      let pageMain: HTMLElement;
      pageMain = RwbError.TryDocumentQuerySelector("HeaderFooter", "main", true, true) as HTMLElement;
      if (pageMain == null) {
        console.warn("Main element not found.");
      }

      /** Header element container */
      let siteHeader: Element | null = null;

      // Add header element to the page
      if (pageMain != null) {
        // 'Main' element exists, add the header to it
        try {
          siteHeader = pageMain.insertAdjacentElement("beforebegin", headerFooter.headerWidget.buildHeader());
        } catch (e) {
          new RwbDomException("DomException", "Check site header element. Encountered error:", e);
        }
      } else {
        // 'Main' element does not exist, add the header to the body
        try {
          siteHeader = document.body.insertAdjacentElement(
            "afterbegin",
            headerFooter.headerWidget.buildHeader()
          );
        } catch (e) {
          new RwbDomException("DomException", "Check site header is not null. Encountered error:", e);
        }
      }

      if (siteHeader == null) {
        console.debug("DomException", "Site header is null. Cannot proceed.");
        return;
      }

      //Append navigation items to header
      try {
        siteHeader.childNodes[0].appendChild(headerFooter.headerWidget.buildNavigation());
      } catch (e) {
        new RwbDomException("DomException", "Cannot prepend navigation items. Encountered error:", e);
      }

      siteHeader.insertAdjacentElement("beforeend", headerFooter.headerWidget.buildPreferencesPanel());
      
      customElements.pillBtnToggleAction("#themeToggle");

      headerperf.end();
    },
  },

  footerWidget: {
    buildFooter: () => {
      const siteFooter = document.createElement("footer");
      const siteFooterContainer = document.createElement("div");
      const footerPara = document.createElement("p");
      const footerCookiesOptionToggle = document.createElement("button");
      footerCookiesOptionToggle.setAttribute("id", "cookiesOptionViewButton");
      footerCookiesOptionToggle.setAttribute("type", "button");
      footerCookiesOptionToggle.textContent = "View Site Usage Notice";
      
      footerCookiesOptionToggle.addEventListener("click", e => {
        headerFooter.footerWidget.toggleSiteUsageNoticeOpen(e);
      })
      footerCookiesOptionToggle.addEventListener("keydown", e => {
        if (e.key !== "Enter") return;
        headerFooter.footerWidget.toggleSiteUsageNoticeOpen(e);
      })
      
      footerPara.textContent = `\u00A9 2022-2026 Random Web Bits. All Rights Reserved.`;

      siteFooterContainer.append(footerPara);
      siteFooterContainer.append(footerCookiesOptionToggle);
      siteFooter.append(siteFooterContainer);

      return siteFooter;
    },
    buildFaviconAttribution: (footer: HTMLElement) => {
      // Favicon attribution section + link to source
      const footerIconPara = document.createElement("p");
      const footerIconLink = document.createElement("a");
      footerIconLink.setAttribute("title", "IconHome: #45026755");
      footerIconLink.setAttribute("target", "_blank");
      footerIconLink.href =
        "https://www.vectorstock.com/royalty-free-vector/maintenance-icon-for-graphic-and-web-design-vector-45026755";
      footerIconLink.target = "_blank";
      footerIconLink.rel = "external noopener";
      footerIconLink.title = "Maintenance icon for graphic and web design Vector Image";
      footerIconLink.textContent = "VectorStock.com";
      footerIconPara.textContent = `Favicon designed by IconHome at `;

      // Append attribution to footer para
      footerIconPara.appendChild(footerIconLink);
      footer.childNodes[0].appendChild(footerIconPara);

      return footerIconPara;
    },
    buildDeveloperAttribution: (footer: HTMLElement) => {
      const devattrib = document.createElement("div");
      const dev = document.createElement("p");
      dev.textContent = "Developed by Robert Howell";

      devattrib.append(dev);
      footer.appendChild(devattrib);

      return;
    },
    init: () => {
      const footerperf = new RwbPerf("Footer");

      // Add footer element to the page end
      let footer: HTMLElement = headerFooter.footerWidget.buildFooter();
      document.body.append(footer);
      footer.childNodes[0].appendChild(headerFooter.footerWidget.buildFaviconAttribution(footer));
      headerFooter.footerWidget.buildDeveloperAttribution(footer);

      footerperf.end();
    },
    toggleSiteUsageNoticeOpen: (e) => {
      e.preventDefault();
      let cookiesOptionDialog = RwbError.TryDocumentQuerySelector("CookiesOptionDialog", "#cookiesOptionForm", true, false);
      if(cookiesOptionDialog == null) {
        console.warn("CookiesOptionDialog could not be found.");
        return;
      }
      if(!cookiesOptionDialog.getAttribute("open")){
        cookiesOptionDialog.style.display = "inline-block";
        cookiesOptionDialog.setAttribute("open", ""); // btn can only open
      }
    },
  },
};

export default headerFooter;
