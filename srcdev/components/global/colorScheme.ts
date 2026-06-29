//--Copyright (c) 2024-2026 Robert A. Howell

import { customElements } from "./preferences.js"
import RwbError, { RwbDomException } from "../../../srcopen/models/rwbErrorBus.js";

const colorScheme = {
  checkLocalStorageForNullOrEmpty: (): boolean => {
    if (RwbError.checkLocalStorageNullOrEmpty("ColorScheme", "color-scheme-preference", true)) {
      localStorage.removeItem("color-scheme-preference");
      console.error(
        "Local storage key has been removed. Refresh the page to generate a new key-value pair."
      );
      return true;
    }
    return false;
  },
  getThemeToggleContainer: () => {
    //Change the toggle button to match the displayed theme
    let themeToggleContainer = RwbError.TryDocumentQuerySelector("themeToggleContainer", "#themeToggle", true, true);
    if (themeToggleContainer == null) RwbDomException.ThrowError("themeToggleContainer", "Toggle function missing. Please retry.", null);
    return themeToggleContainer;
  },
  getToggleBtnState: (): number => {
    let themeToggleContainer = colorScheme.getThemeToggleContainer();
    let themeToggleInputElems = themeToggleContainer!.querySelectorAll("input");
    let themeToggleInputDark = themeToggleInputElems[0];
    let themeToggleInputLight = themeToggleInputElems[1];
    if (themeToggleInputDark.hasAttribute("checked")) return 1; //dark mode was rendered
    if (themeToggleInputLight.hasAttribute("checked")) return 2; //light mode was rendered
    return 0;
  },
  toggleThemeBtnState: () => {
    let themeCacheUserPref;
    let themeCacheBrowserPref;
    if (!colorScheme.checkLocalStorageForNullOrEmpty()){
      themeCacheUserPref = colorScheme.getUserPreference();
      themeCacheBrowserPref = colorScheme.getBrowserPreference();
    }
    else {
      themeCacheUserPref = colorScheme.getSystemPreference();
      themeCacheBrowserPref = themeCacheUserPref;
    }

    let themeToggleContainer = colorScheme.getThemeToggleContainer();
    let themeToggleBtn = RwbError.TryElementQuerySelector("themeToggleBtn", themeToggleContainer!, "div.toggle", true, false);
    if (themeToggleBtn == null) RwbDomException.ThrowError("themeToggleBtn", "The query returned no element", null);

    let themeToggleLabel = RwbError.TryElementQuerySelector("themeToggleLabel", themeToggleContainer!, "p", true, false);
    if (themeToggleLabel == null) RwbDomException.ThrowError("themeToggleLabel", "The query returned no element", null);

    let themeToggleInputElems = themeToggleContainer!.querySelectorAll("input");
    let themeToggleInputDark = themeToggleInputElems[0];
    let themeToggleInputLight = themeToggleInputElems[1];
    
    if (themeCacheUserPref == "dark") {
      //Initial state is light mode. Toggle checked and add 'enabled' class
      themeToggleInputDark.toggleAttribute("checked");
      themeToggleInputLight.removeAttribute("checked");
      themeToggleContainer!.classList.add("enabled");
      themeToggleBtn!.classList.add("Dark");
      themeToggleBtn!.classList.remove("Light");
      themeToggleLabel!.innerText = "Dark";
      return;
    } 

    if (themeCacheUserPref == "light") {
      //Initial state is dark mode. Remove checked and remove 'enabled' class
      themeToggleInputDark.removeAttribute("checked");
      themeToggleInputLight.toggleAttribute("checked");
      themeToggleContainer!.classList.add("enabled");
      themeToggleBtn!.classList.add("Light");
      themeToggleBtn!.classList.remove("Dark");
      themeToggleLabel!.innerText = "Light";

      return;
    }

    themeToggleInputDark.removeAttribute("checked");
    themeToggleInputLight.removeAttribute("checked");
    themeToggleContainer!.classList.remove("enabled");
    themeToggleBtn!.classList.remove("Dark");
    themeToggleBtn!.classList.remove("Light");

    if (themeCacheUserPref == "browser" && themeCacheBrowserPref == "dark"){
      themeToggleBtn!.classList.add("Dark");
      themeToggleBtn!.classList.remove("Light");
    } else { 
      themeToggleBtn!.classList.add("Light");
      themeToggleBtn!.classList.remove("Dark");
    }

    themeToggleLabel!.innerText = "Browser";
    return;
  },
  getSystemPreference: (): string => {
    //Check the browser system preference by matching a media query
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return ""; //LOGLEAF
  },
  getBrowserPreference: () => {
    //Get the stored system preference from local cache
    return JSON.parse(localStorage.getItem("color-scheme-preference")!)["browserPreference"];
  },
  getUserPreference: () => {
    //Get the stored user preference from local cache
    let userPreference = JSON.parse(localStorage.getItem("color-scheme-preference")!)["userPreference"];
    if (userPreference == "none") {
      return colorScheme.getBrowserPreference();
    } else {
      return userPreference;
    }
  },
  /**This function initializes theme preference options in the header. The system preference and
   * user preference are stored in local cache. If a user preference has not been chosen, the system
   * preference takes precedence.
   */
  setColorTheme: (userRequestChange: boolean, userPreference: number) => {
    //Output the current theme preference detection
    const logUserPreference = (newPreference: string) => {
      console.debug(`User preference changed to ${newPreference} theme colors.`);
    };

    //Output a theme preference change log
    const logSystemPreferenceChange = (newPreference: string) => {
      console.log(`Browser theme colors preference changed.`);
    };
    /**Store browser color scheme preference in a map */
    let colorSchemePreferences = new Map([
      ["browserPreference", "none"],
      ["userPreference", "none"],
    ]);

    /**Set the site up for color theme changes */
    const init = (changeBrowserPreference: boolean, userPreference: number) => {
      let preferenceToSetTo = colorScheme.getSystemPreference();
      if (colorSchemePreferences.get("browserPreference") == "none") {
        //Get the current browser preference
        colorSchemePreferences.set("browserPreference", preferenceToSetTo);
        preferenceToSetTo = colorSchemePreferences.get("browserPreference") as string;
      }

      //If the user has requested a previous change
      if (
        !colorScheme.checkLocalStorageForNullOrEmpty() &&
        !changeBrowserPreference &&
        colorSchemePreferences.get("userPreference") != "none"
      ) {
        preferenceToSetTo = colorScheme.getUserPreference();
      }

      //If the user has requested a change
      if (userPreference == 2){
        preferenceToSetTo = "light";
      }
      if (userPreference == 1) {
        preferenceToSetTo = "dark";
      }
      if (userPreference == 0 && !changeBrowserPreference)
        preferenceToSetTo = "browser";

      //Add user's preference option to local storage
      colorScheme.setLocalStorage(
        preferenceToSetTo,
        changeBrowserPreference,
        userPreference,
        colorSchemePreferences
      );

      //Log the current action
      if (userPreference >= 0 && !changeBrowserPreference) {
        logUserPreference(preferenceToSetTo);
      }
      if (changeBrowserPreference) {
        logSystemPreferenceChange(preferenceToSetTo);
      }
    };

    if (colorScheme.checkLocalStorageForNullOrEmpty()) {
      userPreference = -1;
      init(false, userPreference);
    }
    if (userPreference >= 0 && userRequestChange) {
      init(false, userPreference);
    }

    colorScheme.setDomElements(colorScheme.getUserPreference());
    colorScheme.toggleThemeBtnState();

    /**Check for color scheme preference change */
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      colorScheme.checkLocalStorageForNullOrEmpty();
      //Change the browser preferences
      init(true, 0);
      colorScheme.setDomElements(colorScheme.getUserPreference());
    });
  },
  setDomElements: (preference: string) => {
    if (preference == "browser"){
      preference = colorScheme.getSystemPreference();
    }
    //Set the body light/dark mode class
    document.body.classList.remove(`${colorScheme.toggleTheme(preference)}Mode`);
    document.body.classList.add(`${preference}Mode`);
  },
  setLocalStorage: (
    //Store theme preferences in local storage
    newPreference: string,
    changeBrowserPreference: boolean,
    userPreference: number,
    colorSchemePreferences: Map<String, string>
  ) => {
    if (userPreference == 0 && changeBrowserPreference == false){
      colorScheme.setLocalStorageUserChange(newPreference);
      return;
    }
    if (changeBrowserPreference) {
      colorScheme.setLocalStorageBrowserChange(newPreference);
      return;
    }
    if (userPreference > 0) {
      colorScheme.setLocalStorageUserChange(newPreference);
      return;
    }

    localStorage.setItem(
      "color-scheme-preference",
      JSON.stringify(Object.fromEntries(colorSchemePreferences))
    );
  },
  setLocalStorageBrowserChange: (newPreference: string) => {
    //This function changes the browser preference
    let currentColorSchemePreferences = JSON.parse(localStorage.getItem("color-scheme-preference")!);
    currentColorSchemePreferences.browserPreference = `${newPreference}`;
    localStorage.setItem("color-scheme-preference", JSON.stringify(currentColorSchemePreferences));
  },
  setLocalStorageUserChange: (newPreference: string) => {
    //This function changes the user preference
    let currentColorSchemePreferences = JSON.parse(localStorage.getItem("color-scheme-preference")!);
    currentColorSchemePreferences.userPreference = `${newPreference}`;
    localStorage.setItem("color-scheme-preference", JSON.stringify(currentColorSchemePreferences));
  },
  toggleTheme: (theme: string) => {

    //Function to toggle light, dark string
    if (theme == "light") {
      return "dark";
    } else {
      return "light";
    }
  },
};

export default colorScheme;
