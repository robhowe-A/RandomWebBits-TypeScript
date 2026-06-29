//--Copyright (c) 2023-2026 Robert A. Howell

import { RwbReferenceError } from "../../../srcopen/models/rwbErrorBus.js";

const domainLookup = {
  init: () => {
    // Get the form elements
    let formElemID = "searchWhoIS";
    let form: HTMLFormElement;

    form = document.getElementById(`${formElemID}`) as HTMLFormElement;
    if (form == null) {
      new RwbReferenceError("ElementNotFound", `Element not found: '${formElemID}':`);
    }

    //add form functionality
    form.addEventListener("submit", e => {
      e.preventDefault();
      domainLookup.searchWHOIS();
    });
  },
  searchWHOIS: () => {
    let inputElem = document.getElementById("txtSearch") as HTMLInputElement;
    let outputElem = document.getElementById("WhoISsearch") as HTMLOutputElement;
    outputElem.style.removeProperty("display");

    //build the new url string
    let value = inputElem.value;
    var URL = "https://www.whois.com/whois/" + value;

    //open the new url
    console.log(URL);
    window.open(URL, "_blank");

    //append the output element
    console.log(outputElem);
    outputElem.innerText += `\n${value}`;
  },
};

export default domainLookup;
