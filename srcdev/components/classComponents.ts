//--Copyright (c) 2023-2026 Robert A. Howell

import RwbPerf from "../../srcopen/models/scriptPerf.js";
import RwbError from "../../srcopen/models/rwbErrorBus.js";
import notFound404Widget from "../components/global/404.js";
import AbbrOpen from "../models/abbrDescription.js";

const classComponents = {
  /**
   * Attribute tags on mobile do not have hover option. This function adds a click
   *  ability to define an abbr tag, than rely on the title attribute.
   */
  abbrDefinitions: () => {
    const mobileabbrperf = new RwbPerf("Mobileabbrperf"); //start performance measure

    /**Give all abbr elements option to click to reveal the expanded description. */
    const allabbreviationelems = document.querySelectorAll("abbr");

    if (allabbreviationelems.length > 0) {
      for (let abbr of Array.from(allabbreviationelems)) {
        let abbrev = new AbbrOpen(abbr);
        abbrev.revealAbbrDescription();
      }
    }
    /**Check for 404 class component */
    classComponents.fourohfour();

    mobileabbrperf.end(); //end performance measure
  },
  fourohfour: () => {
    if (RwbError.TryDocumentQuerySelector("PageComponents", "#Four-Oh-Four", false, false) !== null)
      notFound404Widget.init();
  },
  init: (page: string) => {
    const classperf = new RwbPerf("Classcomponents"); //begin performance measure



    // Add abbr definitions
    classComponents.abbrDefinitions();

    // Add RWB links definitions: appends "" to anchor href text (required previously for Netlify anchor)
    classComponents.rwbDataTypeAnchor();

    classperf.end(); //end performance measure
  },
  rwbDataTypeAnchor: () => {
    try{
      switch (location.pathname) {
        case "/guides/clearcookiesquickly":
          const rwbLink0 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink0[0].href = "/guides/devtools/applicationtab";
          break;
        case "/guides/devtools/applicationtab":
          const rwbLink1 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink1[0].href = "/guides/clearcookiesquickly";
          break;
        case "/guides/devtools/consoletab":
          const rwbLink2 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink2[0].href = "/explore/webbtelescope";
          rwbLink2[1].href = "/pages/dom";
          break;
        case "/guides/devtools/elementstab":
          const rwbLink3 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink3[0].href = "/pages/dom";
          break;
        case "/guides/devtools/networktab":
          const rwbLink5 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink5[0].href = "/pages/htmlresponses";
          break;
        case "/guides/devtools/securitytab":
          const rwbLink11 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink11[0].href = "/guides/https";
          break;
        case "/guides/devtools/lighthousetab":
          const rwbLink12 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink12[0].href = "/pages/hsl";
          break;
        case "/guides/devtools/cssoverviewtab":
          const rwbLink13 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink13[0].href = "/pages";
          break;
        case "/pages/datastorage":
          const rwbLink8 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink8[0].href = "/pages/markup";
          rwbLink8[1].href = "/guides/devtools/applicationtab";
          break;
        case "/pages/htmlresponses":
          const rwbLink9 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink9[0].href = "/guides/devtools/networktab";
          rwbLink9[1].href = "/pages/webides";
          break;
        case "/pages/url":
          const rwbLink10 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink10[0].href = "/pages/domainlookup";
          break;
        case "/pages/api":
          const rwbLink14 = document.querySelectorAll(
            "span[data-rwb-type=link] a"
          ) as NodeListOf<HTMLAnchorElement>;
          rwbLink14[0].href = "/pages/dom";
          rwbLink14[1].href = "/pages/url";
          break;
        default:
          console.debug("No elements of type data-rwb-type=link found."); //shown with verbose logging
      }
    }
    catch (error) {
      console.error(`Error loading page component: ${error}`);
    }
  },
};

export default classComponents;
