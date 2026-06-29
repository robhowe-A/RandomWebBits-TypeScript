//--Copyright (c) 2024-2026 Robert A. Howell

import colorScheme from "./colorScheme.js";
import { Counter } from "../../models/counter.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

const customElements_Preferences = {
  pillBtnMarkup: () => {
    //Pill toggle
    let themeToggle = document.createElement("label");
    themeToggle.innerText = "Theme: ";
    themeToggle.style.setProperty("margin-right", ".5rem");
    let themeToggleLight = document.createElement("input");
    let themeToggleDark = document.createElement("input");
    themeToggleLight.setAttribute("type", "radio");
    themeToggleLight.setAttribute("value", "dark");
    themeToggleLight.setAttribute("name", "theme");
    themeToggleDark.setAttribute("type", "radio");
    themeToggleDark.setAttribute("value", "light");
    themeToggleDark.setAttribute("name", "theme");
    themeToggleLight.style.setProperty("display", "none");
    themeToggleDark.style.setProperty("display", "none");
    themeToggle.appendChild(themeToggleLight);
    themeToggle.appendChild(themeToggleDark);

    //Toggle Button
    let pillContainer = document.createElement("div");
    pillContainer.style.setProperty("display", "flex");
    pillContainer.style.setProperty("flex-wrap", "nowrap");
    pillContainer.style.setProperty("justify-content", "center");
    pillContainer.style.setProperty("align-items", "center");
    pillContainer.style.setProperty("height", "2.5rem");
    let pill = document.createElement("div");
    pill.style.setProperty("width", "58px");
    pill.style.setProperty("height", "22px");
    pill.style.setProperty("border-radius", "50px");
    pill.style.setProperty("position", "relative");
    pill.setAttribute("tabindex", "0");
    let pillBtn = document.createElement("div");
    pillBtn.style.setProperty("width", "18px");
    pillBtn.style.setProperty("aspect-ratio", "1/1");
    pillBtn.style.setProperty("position", "absolute");
    pillBtn.style.setProperty("top", "2px");
    pillBtn.style.setProperty("left", "2px");
    pillBtn.style.setProperty("border-radius", "50px");
    
    
    pill.appendChild(pillBtn);

    //Text label
    let choice = document.createElement("p");
    choice.innerText = "Browser";
    choice.style.setProperty("margin-left", ".5rem");
    choice.style.setProperty("width", "8ch");
    
    pillContainer.appendChild(themeToggle);
    pillContainer.appendChild(pill);
    pillContainer.appendChild(choice);

    return pillContainer;
    },
  pillToggleFunc: () => {
    //Initial state is browser, next state may vary
    let initial: Counter = Object.create(new Counter(-1));

    let initialState = colorScheme.getToggleBtnState();
    //add event toggle position counter
    if (initialState == 0 && initial.count == -1)
      initial.count = 1;
    if (initialState == 1 && initial.count == -1)
      initial.count = 2;
    if (initialState == 2 && initial.count == -1)
      initial.count = 0;

    //Click once, system
    //Click twice, light
    //Click three, dark
    //userPreference changes means the user has clicked the theme toggle button
    let userPreference;

    switch (initial.count) {
      case 0:
        userPreference = 0;
        break;
      case 1:
        userPreference = 1;
        break;
      case 2:
        userPreference = 2;
    }

    //Change the theme
    colorScheme.setColorTheme(true, userPreference);

    initial.count++;

    if (initial.count == 3) {
        initial.count = 0;
    }
  },
  pillBtnToggleAction: (pillQuery: string) => {
    if (pillQuery == null) {
      console.warn("Null query. Use a different query string.");
    }
    //Select the element
    let pillElem = RwbError.TryDocumentQuerySelector("PreferencesPillElem", `${pillQuery}`, true, false) as HTMLElement;
    //Assign variables to element's children
    let pillToggle = RwbError.TryElementQuerySelector("PreferencesPillToggleElem", pillElem, "div", true, true) as HTMLElement;
    let pillSwitch = RwbError.TryElementQuerySelector("PreferencesPillSwitchElem", pillToggle, "div", true, true);

    if (pillElem == null || pillToggle == null || pillSwitch == null) {
      console.warn("A preferences element is null. Check the markup.");
      return;
    }
    //Toggle button style
    pillToggle.style.setProperty("cursor", "pointer");
    pillToggle.classList.add("toggle");
    pillSwitch.classList.add("switch");

    //Toggle button event listener
    pillToggle.addEventListener("click", e => {
      e.preventDefault();
      customElements_Preferences.pillToggleFunc();
    });
    //Toggle button mouse listener
    pillToggle.addEventListener("keydown", e => {
      if (e.key !== "Enter")
        return;
      e.preventDefault();
      customElements_Preferences.pillToggleFunc();
    });
  },
};

export { customElements_Preferences as customElements };
