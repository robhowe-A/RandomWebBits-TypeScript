//--Copyright (c) 2023-2026 Robert A. Howell

import { client } from "../../models/client.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

const notFound404Widget = {
  init: () => {
    let client404 = new client(); //TODO: document.referrer & referrer-policy checking
    let clientRefferInfo: HTMLSpanElement;
    let clientRttInfo: HTMLSpanElement;
    let clientPlatformInfo: HTMLSpanElement;
    clientRefferInfo = RwbError.TryDocumentQuerySelector(
      "FourOhFour",
      "#clientreferrer",
      true,
      true
    ) as HTMLSpanElement;
    clientRttInfo = RwbError.TryDocumentQuerySelector("FourOhFour", "#clientrtt", true, true) as HTMLSpanElement;
    clientPlatformInfo = RwbError.TryDocumentQuerySelector(
      "FourOhFour",
      "#clientplat",
      true,
      true
    ) as HTMLSpanElement;

    //Fill information secion
    clientRefferInfo.textContent = client404.oldURL ? client404.oldURL : window.location.href;
    clientRttInfo.textContent = `${
      client404.connectiontype ? client404.connectiontype : "No connection type found."
    }`;
    clientRttInfo.textContent += `, rtt of ${
      client404.connectionrtt ? client404.connectionrtt : "No rtt found."
    }`;
    clientPlatformInfo.textContent = client404.browserplatform
    ? client404.browserplatform
    : "No platform information found.";
    clientPlatformInfo.textContent += `, ${
      client404.useragent ? client404.useragent : "No user agent info."
    }`;

    //Provide a link to go back where you came from
    let goBackLink: HTMLLinkElement;
    goBackLink = RwbError.TryDocumentQuerySelector("FourOhFour", "#oldURL", true, true) as HTMLLinkElement;
    if (goBackLink == null) return;

    if (client404.oldURL.includes("404.html")) {
      client404.oldURL = window.location.origin;
    }
    let goBackHref = client404.oldURL ? client404.oldURL : window.location.origin;
    goBackLink.setAttribute("href", `${goBackHref}`);
    goBackLink.setAttribute("title", goBackHref);
  },
};

export default notFound404Widget;
