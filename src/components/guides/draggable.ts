//--Copyright (c) 2023-2026 Robert A. Howell

import RwbError, { RwbDomException, RwbInvalidValueError } from "../../../srcopen/models/rwbErrorBus.js";
import { RwbParseJson, RwbStringifyJson } from "../../models/rwbJsonConverter.js";

const linksWidget = {
  addDraggableBoxes: (allBoxes: NodeListOf<HTMLLIElement>, allLinks: NodeListOf<HTMLSpanElement>) => {
    // global variables
    // Make the DIV element draggable:
    let movingObject: HTMLSpanElement;
    let allBoxesCoordinates: any[] = [];

    // Add box dataset attributes
    const populateBoxAttributes = () => {
      for (let i = 0; i < allBoxes.length; i++) {
        // Add box number to dataset
        allBoxes[i].setAttribute("data-arrayList-boxnumber", `${i + 1}`);

        // Check box has only one link, fill attribute
        if (allBoxes[i].querySelectorAll("a").length == 1) {
          allBoxes[i].setAttribute("filled", "true");
        } else {
          console.warn(
            "Widget function may not work as intended due to having too many links in box element."
          );
        }
      }
    };
    // Add link dataset attributes
    const populateListAttributes = () => {
      for (let i = 0; i < allLinks.length; i++) {
        //add link number to dataset
        allLinks[i].setAttribute("data-arrayList-linknumber", `${i + 1}`);
      }
    };
    // Create box coordinates array, add box number to dataset
    const createBoxCoordinates = () => {
      for (let i = 0; i < allBoxes.length; i++) {
        // Create box object
        let box = {
          name: `box${i}`,
          boxNumber: i,
          centerX: allBoxes[i].getBoundingClientRect().left,
          centerY: allBoxes[i].getBoundingClientRect().top + allBoxes[i].getBoundingClientRect().height / 2,
        };

        allBoxesCoordinates.push(box);
      }
    };
    // Update filled attribute if box contains link
    const setBoxFilledAttribute = () => {
      allBoxes.forEach(box => {
        if (box.querySelectorAll("a").length == 0) {
          box.setAttribute("filled", "false");
        } else if (box.querySelectorAll("a").length > 1) {
          box.setAttribute("filled", "overfilled");
        } else if (box.querySelectorAll("a").length == 1) {
          box.setAttribute("filled", "true");
        }
      });
    };
    // Move the draggable element to the empty list slot
    const moveElementToEmpty = () => {
      let overFilledBox = document.querySelector(
        '.showSpace li[data-arrayList-type="box"][filled="overfilled"]'
      );
      if (overFilledBox == null) return;
      let overFilledOrigLink;
      let overFilledLinks = overFilledBox.querySelectorAll('span[data-arrayList-type="link"]');

      //Move link out from overfilled box
      if (overFilledLinks.length > 1) overFilledOrigLink = overFilledLinks[1];
      let falseFilledBox = document.querySelector(
        '.showSpace li[data-arrayList-type="box"][filled="false"]'
      ) as HTMLElement;
      if (falseFilledBox == null) {
        console.debug("An element is found null.");
      }
      falseFilledBox.insertAdjacentElement("afterbegin", overFilledOrigLink);

      setBoxFilledAttribute();
    };
    //returns the distance of two points
    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    const dragElement = (draggableElmnt: HTMLSpanElement) => {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

      const dragMouseDown = (e: MouseEvent | TouchEvent) => {
        movingObject = draggableElmnt;
        e.preventDefault();
        const movingObjectLink = movingObject.querySelector("a") as HTMLAnchorElement;
        if (e.target == movingObjectLink) {
          closeDragElement();
          document.addEventListener("touchend", () => {
            window.location.href = movingObjectLink.href;
          });
          return;
        }
        movingObject.style.position = "absolute";

        // get the mouse cursor position at startup:
        if (e.type == "mousedown") {
          let event: MouseEvent = e as MouseEvent;
          pos3 = event.clientX + movingObject.getBoundingClientRect().width / 2;
          pos4 = event.clientY;

          // position element when clicked
          movingObject.style.left = `${event.clientX}px`;

          // call a function whenever the cursor moves:
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }
        if (e.type == "touchstart") {
          let event: TouchEvent = e as TouchEvent;
          pos3 = event.touches[0].clientX + movingObject.getBoundingClientRect().width / 2;
          pos4 = event.touches[0].clientY;

          // position element when clicked
          movingObject.style.left = `${event.touches[0].clientX}px`;

          // call a function with mobile touches:
          document.ontouchend = closeDragElement;
          document.ontouchmove = elementDrag;
        }
      };

      const elementDrag = (e: MouseEvent | TouchEvent) => {
        // calculate the new cursor position:
        if (e.type == "mousemove") {
          let event: MouseEvent = e as MouseEvent;
          pos1 = pos3 - event.clientX;
          pos2 = pos4 - event.clientY;
          pos3 = event.clientX;
          pos4 = event.clientY;
        }
        if (e.type == "touchmove") {
          let event: TouchEvent = e as TouchEvent;
          pos1 = pos3 - event.touches[0].clientX;
          pos2 = pos4 - event.touches[0].clientY;
          pos3 = event.touches[0].clientX;
          pos4 = event.touches[0].clientY;
        }
        // set the element's new position:
        draggableElmnt.style.top = draggableElmnt.offsetTop - pos2 + "px";
        draggableElmnt.style.left = draggableElmnt.offsetLeft - pos1 + "px";
        //get center of draggable element
        let elmntCenterX =
          draggableElmnt.getBoundingClientRect().left + draggableElmnt.getBoundingClientRect().width / 2;
        let elmntCenterY =
          draggableElmnt.getBoundingClientRect().top + draggableElmnt.getBoundingClientRect().height / 2;

        let distancesFromCursorToBoxes: number[] = []; //all box distances from drag location
        for (let box of allBoxesCoordinates) {
          distancesFromCursorToBoxes.push(getDistance(box.centerX, box.centerY, elmntCenterX, elmntCenterY));
        }
        //find the closest box by distance
        let lowestDistToBox = Math.min(...distancesFromCursorToBoxes);

        //set the closest box
        let closestBox;
        let closestBoxElem;

        closestBox = allBoxesCoordinates[distancesFromCursorToBoxes.findIndex(num => num == lowestDistToBox)];
        closestBoxElem = allBoxes[closestBox.boxNumber];
        closestBoxElem.insertAdjacentElement("afterbegin", draggableElmnt);
        setBoxFilledAttribute();
        moveElementToEmpty();
        closestBox = null;
      };

      const closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchstart = null;
        document.ontouchmove = null;

        movingObject.removeAttribute("style");
        linksWidget.store(false);
      };

      draggableElmnt.onmousedown = dragMouseDown;
      draggableElmnt.ontouchstart = dragMouseDown;
      window.addEventListener("touchstart", e => {
        console.log("touchstart...");
      });
    };
    populateBoxAttributes();
    populateListAttributes();
    createBoxCoordinates();
    allLinks.forEach(link => dragElement(link));
    // Reset box coordinates when scrolling
    window.onscroll = () => {
      allBoxesCoordinates = [];
      createBoxCoordinates();
    };
  },
  addNavMenu: () => {
    const NAVMENU = `
    <nav id="DevTabs">
    <ol class="showSpace">
        <li draggable="true" title="GUIDE: Dev Elements&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/elementstab" title="GUIDE: Dev Elements&lt;/RWB&gt;">Elements</a></span></li>
        <li draggable="true" title="GUIDE: Dev Console&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/consoletab" title="GUIDE: Dev Console&lt;/RWB&gt;">Console</a></span></li>
        <li draggable="true" title="GUIDE: Dev Sources&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/sourcestab" title="GUIDE: Dev Sources&lt;/RWB&gt;">Sources</a></span></li>
        <li draggable="true" title="GUIDE: Dev Network&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/networktab" title="GUIDE: Dev Network&lt;/RWB&gt;">Network</a></span></li>
        <li draggable="true" title="GUIDE: Dev Performance&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/performancetab" title="GUIDE: Dev Performance&lt;/RWB&gt;">Performance</a></span></li>
        <li draggable="true" title="GUIDE: Dev Memory&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/memorytab" title="GUIDE: Dev Memory&lt;/RWB&gt;">Memory</a></span></li>
        <li draggable="true" title="GUIDE: Dev Application&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/applicationtab" title="GUIDE: Dev Application&lt;/RWB&gt;">Application</a></span></li>
        <li draggable="true" title="GUIDE: Dev Security&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/securitytab" title="GUIDE: Dev Security&lt;/RWB&gt;">Security</a></span></li>
        <li draggable="true" title="GUIDE: Dev Lighthouse&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/lighthousetab" title="GUIDE: Dev Lighthouse&lt;/RWB&gt;">Lighthouse</a></span></li>
        <li draggable="true" title="GUIDE: Dev CSS Overview&lt;/RWB&gt;" data-arrayList-type="box"><span draggable="true" data-rwb-type="link" data-arrayList-type="link"><a href="/guides/devtools/cssoverviewtab" title="GUIDE: Dev CSS Overview&lt;/RWB&gt;">CSS Overview</a></span></li>
    </ol>
        <div class="btns">
            <button class="button resetNav">reset</button>
            <button class="button hideNav">hide</button>
        </div>
    </nav>
    `;
    let navMenuElem = document.createElement("div");
    navMenuElem.innerHTML = NAVMENU;

    //add navmenu to main element
    const MAIN = RwbError.TryDocumentQuerySelector("DragNav", "main#DevTools", true, true) as HTMLElement;
    if (MAIN == null) {
      console.warn("Cannot find container element for navmenu placement. Skipping its creation.");
      return;
    }
    MAIN.insertAdjacentElement("afterbegin", navMenuElem);
  },
  addMenuBts: (
    devTabsNav: HTMLElement,
    draggableNavListOrder: Map<string, number>,
    defaultBoxOrder: NodeListOf<HTMLSpanElement>
  ) => {
    const setDevTabsTabIndexZero = (list: NodeListOf<HTMLAnchorElement>) => {
      if (list == undefined) {
        linksWidget.logComponentError();
        return;
      }
      list.forEach(li => {
        li.setAttribute("tabindex", "-1");
      });
    };
    const removeDevTabsTabIndex = (list: NodeListOf<HTMLAnchorElement>) => {
      if (list == undefined) {
        linksWidget.logComponentError();
        return;
      }
      list.forEach(li => {
        li.removeAttribute("tabindex");
      });
    };
    const setDevTabsMenuCollapsePreference = () => {
      //check nav menu open
      if (RwbError.TryDocumentQuerySelector("DevNav", "#DevTabs .hideNav.closed", true, false)) {
        localStorage.setItem("hideDevNav", "true");
      } else {
        localStorage.removeItem("hideDevNav");
      }
    };
    const hideNavMenu = (
      showSpaceList: HTMLOListElement,
      showSpaceListLINK: NodeListOf<HTMLAnchorElement>
    ) => {
      if (showSpaceList == undefined || showSpaceListLINK == undefined) {
        linksWidget.logComponentError();
        return;
      }
      devTabsMenuExpandBTN.classList.add("closed");
      devTabsMenuExpandBTN.classList.remove("open");

      showSpaceList.style.setProperty("max-height", "0");
      showSpaceList.style.setProperty("transition", "max-height .25s ease-out");
      showSpaceList.style.setProperty("overflow", "hidden");
      devTabsNavResetBTN.style.setProperty("display", "none");
      devTabsMenuExpandBTN.innerText = "expand";

      //add tab index -1
      setDevTabsTabIndexZero(showSpaceListLINK);
    };

    // Menu buttons
    let devTabsMenuExpandBTN = RwbError.TryDocumentQuerySelector(
      "DragNav",
      "#DevTabs .hideNav",
      true,
      true
      ) as HTMLElement;
    let devTabsNavResetBTN = RwbError.TryDocumentQuerySelector(
      "DragNav",
      "#DevTabs .resetNav",
      true,
      true
    ) as HTMLElement;

    if (devTabsMenuExpandBTN == null || devTabsNavResetBTN == null) {
      console.warn("The page experienced an error. Component function may be altered.");
      return;
    }
    devTabsMenuExpandBTN.classList.add("open");

    const showSpaceList = devTabsNav.querySelector(".showSpace") as HTMLOListElement;
    const showSpaceListLINK = devTabsNav.querySelectorAll(".showSpace a") as NodeListOf<HTMLAnchorElement>;

    if (!RwbError.checkLocalStorageEqualNull("DevNav", "hideDevNav", false, false)) {
      hideNavMenu(showSpaceList, showSpaceListLINK);
    }

    //Menu expanding/hiding event
    devTabsMenuExpandBTN.addEventListener("click", e => {
      e.preventDefault();

      if (devTabsMenuExpandBTN.classList.contains("open")) {
        //Menu is hidden
        hideNavMenu(showSpaceList, showSpaceListLINK);
      } else {
        //Menu is showing
        devTabsMenuExpandBTN.classList.add("open");
        devTabsMenuExpandBTN.classList.remove("closed");

        showSpaceList.style.setProperty("max-height", "200px");
        showSpaceList.style.setProperty("transition", "max-height .25s ease-in");
        devTabsNavResetBTN.style.removeProperty("display");
        devTabsMenuExpandBTN.innerText = "hide";

        //remove tab index attr
        removeDevTabsTabIndex(showSpaceListLINK);
      }

      //save menu close preference
      setDevTabsMenuCollapsePreference();
    });

    //Menu reset event
    devTabsNavResetBTN.addEventListener("click", e => {
      e.preventDefault();
      localStorage.removeItem("dragNav");

      let i = 1;
      draggableNavListOrder.forEach((value, key) => {
        draggableNavListOrder.set(key, i);
        i++;
      });

      linksWidget.store(true, draggableNavListOrder);
      linksWidget.linksOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      linksWidget.fromSavedOrder(true, defaultBoxOrder);
    });
  },
  checkValidStorageObjs: (objects: any[]) => {
    if (objects == undefined) {
      linksWidget.logComponentError();
      return;
    }
    const removeStorageLogError = () => {
      localStorage.removeItem("dragNav");
      console.log(`%c<RWB>%cRemoved storage key: dragNav`, "color:red;font-weight:bold;", "color:red;");
    };
    let boxesCount = linksWidget.getDraggableNavItems().length;
    if (objects.length !== boxesCount) {
      removeStorageLogError();
      return false;
    }
    //check each object valid
    for (let obj of objects) {
      if (typeof obj.linkNumber != "number" || obj.linkNumber < 0 || obj.linkNumber > boxesCount) {
        removeStorageLogError();
        return false;
      }
    }
    return true;
  },
  fromSavedOrder: (reset?: Boolean, defaultBoxOrder?: NodeListOf<HTMLSpanElement>) => {
    if (linksWidget.linksOrder.length == 0) return;
    let liContainer = document.querySelector("#DevTools #DevTabs .showSpace") as HTMLLIElement;
    let allLinks: any = linksWidget.getDraggableNavItems();
    let copyOfAllLinks = allLinks;

    if (reset && defaultBoxOrder != undefined) {
      copyOfAllLinks = defaultBoxOrder;
      console.log("%cReset link order requested.", "color:lightgreen");
    }

    let currentBox = liContainer.querySelectorAll(`li`) as NodeListOf<HTMLLIElement>;
    for (let i = 0; i < allLinks.length; i++) {
      currentBox[i].removeChild(allLinks[i]);
    }
    for (let i = 0; i < allLinks.length; i++) {
      currentBox[i].appendChild(copyOfAllLinks[linksWidget.linksOrder[i] - 1]);
      console.debug(`%clinksOrder is: ${linksWidget.linksOrder[i]}, position: ${i}`, "color:lightgreen;");
    }
  },
  getDraggableNavItems: () =>
    document.querySelectorAll('.showSpace span[data-arrayList-type="link"]') as NodeListOf<HTMLLIElement>,
  getDraggableNavOrder: () => {
    let draggableNavList: Map<string, number> = new Map();
    let allLinks = linksWidget.getDraggableNavItems();
    for (let link of Array.from(allLinks)) {
      let n = link.dataset.arraylistLinknumber as unknown;
      let linkChild = <HTMLAnchorElement>link.children[0];
      let name = linkChild.innerText;
      let num: number;
      try {
        if (n == "") {
          console.warn("Cannot add value to list.");
        }

        num = Number(n);
        if (num < 1 || num > linksWidget.getDraggableNavItems().length) {
          throw new RwbInvalidValueError("dragNavRangeError", "Value must be greater than 1.");
        }
      } catch {
        console.warn("Cannot add value to list.");
        num = -1;
      }
      draggableNavList.set(name, num);
    }
    return draggableNavList;
  },
  init: () => {
    //Add menu to page
    linksWidget.addNavMenu();

    //Add drag functionality
    let allBoxes = document.querySelectorAll(
      '.showSpace li[data-arrayList-type="box"]'
    ) as NodeListOf<HTMLLIElement>;
    let allLinks = linksWidget.getDraggableNavItems();
    const copyOfAllLinks = allLinks;

    if (allBoxes.length < 2 || allLinks.length < 2) return;
    let devTabsNav = document.querySelector("#DevTabs") as HTMLElement;

    let defaultBtnOrder = linksWidget.getDraggableNavOrder();
    linksWidget.retrieve();
    linksWidget.fromSavedOrder();
    linksWidget.addDraggableBoxes(allBoxes, allLinks);
    linksWidget.store(false);
    window.addEventListener("resize", e => linksWidget.addDraggableBoxes(allBoxes, allLinks));

    // add reset option
    linksWidget.addMenuBts(devTabsNav, defaultBtnOrder, copyOfAllLinks);
  },
  linksOrder: [] as number[],
  logComponentError: () => {
    console.warn("The DevNav component experienced an error. Please refresh the page to retry.");
  },
  retrieve: () => {
    let navOrderFromStorage = localStorage.getItem("dragNav") as string;
    if (navOrderFromStorage == null) return;
    let parseTest = Object.create(new RwbParseJson(navOrderFromStorage));
    if (!parseTest.passed) {
      localStorage.removeItem("dragNav");
      console.log(
        `%c<RWB>%cDeleted storage key: dragNav`,
        "color:skyblue;font-size:14px;font-weight:bold;",
        "color:skyblue;font-size:16px;"
      );
      return;
    }
    let navLinkOrder = parseTest.returnObj;
    //if valid items are stored, keep the stored order
    if (linksWidget.checkValidStorageObjs(navLinkOrder)) {
      for (let link of navLinkOrder) {
        linksWidget.linksOrder.push(link.linkNumber);
      }
    } else {
      linksWidget.setlinksOrderDefault();
    }
  },
  setlinksOrderDefault: () => {
    //valid items prevent from adding to page, so reset
    for (let i = 1; i <= linksWidget.getDraggableNavItems().length; i++) {
      linksWidget.linksOrder.push(i);
    }
  },
  store: (reset: Boolean, draggableNavListOrder?: Map<string, number>) => {
    //remove the old list
    localStorage.removeItem("dragNav");
    let draggableNavStore: object[] = [];

    if (!reset || draggableNavListOrder == undefined) {
      draggableNavListOrder = linksWidget.getDraggableNavOrder();
    }

    let storeNavItems: string;

    draggableNavListOrder.forEach((value, key) => {
      if (value === -1 || Number.isNaN(value)) {
        throw new RwbInvalidValueError(
          "dragNavRangeError",
          "An invalid value prevents storing nav item order. Please refresh and retry."
        );
        return;
      }
      //add nav link information
      let draggableTab: object = {
        boxName: key,
        linkNumber: value,
      };
      draggableNavStore.push(draggableTab);
    });

    let strfyTest = Object.create(new RwbStringifyJson(draggableNavStore));
    if (!strfyTest.passed) {
      console.warn(
        `%c<RWB>%cCannot create storage key: dragNav`,
        "color:skyblue;font-weight:bold;",
        "color:skyblue;"
      );
      return;
    }
    storeNavItems = strfyTest.returnStr;

    //store ordered list in browser
    try {
      localStorage.setItem("dragNav", storeNavItems);
      console.log(
        `%c<RWB>%cCreated storage key: dragNav`,
        "color:skyblue;font-weight:bold;",
        "color:skyblue;"
      );
    } catch {
      throw new RwbDomException(
        "dragNav_setItem",
        'Could not set local storage "dragNav"',
        "exception encountered: "
      );
    }
  },
};

export default linksWidget;
