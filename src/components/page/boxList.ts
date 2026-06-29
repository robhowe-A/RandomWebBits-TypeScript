//--Copyright (c) 2024-2026 Robert A. Howell

import RwbError from "../../../srcopen/models/rwbErrorBus.js";

const boxList = {
  init: () => {
    const getHLBL = () => {
      //Get the Hyperlink container element
      hyperlinkBoxList = RwbError.TryDocumentQuerySelector(
        "HyperlinkBoxList",
        "#Hyperlink .boxList",
        true,
        true
      ) as HTMLDivElement;
      if (hyperlinkBoxList == null) {
        console.warn("The page has experienced an error. The components may be degraded.");
        return;
      }
    };
    const getHBLCount = () => {
      //Get the anchor elements
      hyperlinkBoxListAnchor = document.querySelectorAll(
        "#Hyperlink .boxList a"
      ) as NodeListOf<HTMLAnchorElement>;
      if (hyperlinkBoxListAnchor == null) {
        console.warn("Error getting an anchor from query selector `#Hyperlink .boxList a`");
        return;
      }
    };
    const calculateBoxListCommonFactors = (colCount: any) => {
      if (colCount === undefined || colCount == null) {
        hlBLCount = hyperlinkBoxListAnchor.length;
      } else {
        hlBLCount = colCount;
      }
      factors = []; //set factors list to 0 length
      //Get the multiplication factors of the anchors count
      for (let i = 1; i <= hlBLCount / 2; i++) {
        if (hlBLCount % i == 0) {
          if (!factors.includes(i)) {
            factors.push(i);
          }
          let secondFactor = Math.floor(hlBLCount / i);
          if (!factors.includes(secondFactor)) {
            factors.push(secondFactor);
          }
        }
      }

      //Sort the list
      factors.sort((a, b) => b - a);
    };
    const calculateSetColumnNum = () => {
      hlBLWidth = hyperlinkBoxList.offsetWidth;
      //Check if the number of elements wide isn't a factor
      for (let x of factors) {
        if (hlBLWidth / x >= 200) {
          setColumnCount = x;
          break;
        }
      }
      if (setColumnCount == -1) {
        console.warn("A problem with the widget was encountered. Please refresh and retry.");
      }
    };
    const setBoxListWidth = (setColumnCount: number) => {
      //Function to sets the box list's width style
      let containerPixelWidth = `${setColumnCount * hlBLAWidth}px`;
      hyperlinkBoxList.style.setProperty("width", containerPixelWidth);
      hyperlinkBoxList.style.setProperty("margin-inline", "auto");
    };
    const setContainerWidthInitial = () => {
      //Set the container width if elem count is not a match
      if (currentColumnMeasureCount !== setColumnCount) {
        setBoxListWidth(setColumnCount);
        isChanged = true;
        logAddOn = `Changed column count to ${setColumnCount}.`;
      } else {
        hyperlinkBoxList.style.setProperty("width", `${hlBLAWidth * currentColumnMeasureCount}px`);
        hyperlinkBoxList.style.setProperty("margin-inline", "auto");
      }
    };
    const setContainerWidthOnResize = () => {
      const currentColMeasure = (currentSetWidthNum: number) => {
        //Divide the container width by the element(anchor) width
        currentColumnMeasureCount = Math.floor(currentSetWidthNum / hlBLAWidth);
      };
      const calculations = (colCount: any) => {
        calculateBoxListCommonFactors(colCount);
        calculateSetColumnNum();
      };
      let currentSetWidthNum: number;
      //Store then remove the hard-coded width
      //The width has been set based on the user's current window width
      //Tt needs changed based on the resize change
      currentSetWidth = hyperlinkBoxList.style.width;
      currentSetWidthNum = Number.parseInt(currentSetWidth.substring(0, currentSetWidth.length - 2));
      hyperlinkBoxList.style.removeProperty("width");

      //Recalculate column measurements and counts
      currentColMeasure(currentSetWidthNum);
      getHLBL();
      getHBLCount();
      calculations(null);

      //Change the container width if current width has too many
      if (currentColumnMeasureCount !== setColumnCount) {
        if (factors.includes(setColumnCount)) {
          setBoxListWidth(setColumnCount);
          console.debug("Box list column count: ", setColumnCount);
          return;
        } else {
          //Find the nearest square rounded down
          //This is the what the column width should be
          //Unused code, due to squares implementation.
          //Factors will always include 1 and the number of elements.
          //If decided to disallow single columns, prime number columns need calculated
          // in addition to this code block, which finds the nearest square, rounded down.
          setColumnCount = Math.pow(Math.floor(Math.sqrt(hlBLCount)), 2);
          let colCount: any = setColumnCount;
          calculations(colCount);
          setBoxListWidth(setColumnCount);
        }
      }
      if (!factors.includes(currentColumnMeasureCount)) {
        //Not enough elements for this many full columns
        console.debug("Cannot meet column count ", currentColumnMeasureCount);
      }

      //Restore the width due to no changes.
      hyperlinkBoxList.style.setProperty("width", `${currentSetWidthNum}px`);
    };

    //Component variables, initializations
    let hyperlinkBoxList: any;
    getHLBL();
    let hyperlinkBoxListAnchor: any = [];
    getHBLCount();
    let hlBLCount: number = hyperlinkBoxListAnchor.length;
    let hlBLAWidth: number = hyperlinkBoxListAnchor[0].offsetWidth;
    let hlBLWidth: number = hyperlinkBoxList.offsetWidth;
    let currentColumnMeasureCount: number = Math.floor(hlBLWidth / hlBLAWidth);
    let setColumnCount: number = -1;
    let factors: number[] = [];
    let currentSetWidth: string = hyperlinkBoxList.style.width;
    calculateBoxListCommonFactors(null);
    calculateSetColumnNum();
    let isChanged: boolean = false;
    let logAddOn: string = "";

    //Box list width will be different for various screen sizes
    //Set the initial width to calculate factors and set the initial element width
    setContainerWidthInitial();

    //Log if component column width changed
    if (isChanged) {
      console.info(`Box list column count calculated to be: ${setColumnCount}. ${logAddOn}`);
    } else {
      console.info(
        `Box list column count found to be: ${setColumnCount}. Column count is ${currentColumnMeasureCount}.`
      );
    }

    //Run the logic needed for a window resize event
    window.onresize = setContainerWidthOnResize;

    console.log(`%c<RWB>%cBox list component initialized.`, "color:darkcyan;font-weight:bold;", "color:darkcyan;");
  },
};

export default boxList;
