//--Copyright (c) 2024-2026 Robert A. Howell

/**This object is a view widget to show different pointers in the browser. */
export class CursorsPanel extends HTMLElement {
  /**This property holds cursor data from MDN */
  cursorDataObj: any;

  constructor() {
    super();

    this.style.display = "block";
  };

  // Define observed attributes
  static get observedAttributes() {
    return ["cursorDataObj"];
  };

  // React to attribute changes
  attributeChangedCallback(name: string, newData: object) {
    if (name === "cursorDataObj") {
      this.cursorDataObj = newData;
    }
  };

  // Create a view panel for cursor data
  clickData(cursorData: any) {
    let detailsPanel = document.querySelector("cursors-panel + div");
    if (detailsPanel != null) {
      detailsPanel.remove();
    }
    let detailsBox = document.createElement("div");
    this.insertAdjacentElement("afterend", detailsBox);
    // Example data: JSON object
    // name: "auto",
    // browserDefault: true,
    // type: "General",
    // description: "The UA will determine the cursor to display based on the current context. E.g., equivalent to text when hovering text."
    let detailsBoxH4 = detailsBox.appendChild(document.createElement("h4"));
    let detailsBoxDetails = detailsBox.appendChild(document.createElement("p"));
    let detailsBoxDetailsAttribution = detailsBox.appendChild(document.createElement("p"));

    let MDNLinkHREF = "https://developer.mozilla.org/en-US/docs/Web/CSS/cursor";
    let MDNHLinkTitle = "cursor - CSS: Cascading Style Sheets | MDN";
    let MDNHLinkTarget = "_blank";
    let MDNHLinkRel = "external noopener";

    detailsBoxDetailsAttribution.innerHTML = `Data source: <a href="${MDNLinkHREF}" title="${MDNHLinkTitle}" target="${MDNHLinkTarget}" rel="${MDNHLinkRel}" style="color: var(--clr-all-font-black)">${MDNHLinkTitle}</a>`;

    //Details box elements' inner text
    detailsBoxH4.innerText = `Details:`;
    detailsBoxDetails.innerHTML = `name: <span><b>${cursorData.name}</b></span><br>type: <span><b>${cursorData.type}</b></span><br>browserDefault: <span><b>${cursorData.browserDefault}</b></span><br>description: <span><b>${cursorData.description}</b></span>`;

    //Details box styles
    detailsBox.style.setProperty("text-align", "left");
    detailsBox.style.setProperty("padding", "0 2rem .5rem 2rem");
    detailsBox.style.setProperty("border-radius", ".5rem");
    detailsBox.style.setProperty("border", "3px solid var(--clr-all-primary-800)");
    detailsBox.style.setProperty("background-color", "var(--clr-header-blue)");
    detailsBox.style.setProperty("width", "75%");
    detailsBox.style.setProperty("margin-inline", "auto");
    detailsBox.style.setProperty("margin-top", "2em");
    detailsBox.style.setProperty("color", "var(--clr-all-font-light)");

    detailsBoxDetails.style.setProperty("display", "contents");
    detailsBoxH4.style.setProperty("margin-block", ".5rem .75rem");

    detailsBoxDetailsAttribution.style.setProperty("text-align", "left");
    detailsBoxDetailsAttribution.style.setProperty("font-size", ".8em");
    detailsBoxDetailsAttribution.style.setProperty("color", "var(--clr-all-font-black)");
    detailsBoxDetailsAttribution.style.setProperty("margin-top", ".5rem");
  };

  /** This function populates the cursor panel container with individual boxes
   * containing a number and the cursor's name.
   */
  setElements(boxeswidth: number) {
    for (let i = 0; i < this.cursorDataObj.cursors.length; i++) {
      //Assign the cursor to working variable, for readability
      let currentCursor = this.cursorDataObj.cursors[i];

      //Add elements to the cursors panel
      let boxDiv = document.createElement("div");
      let innerboxDiv = document.createElement("div");
      let numH2 = document.createElement("p");
      let namePara = document.createElement("p");

      //Cursors panel box elements properties
      boxDiv.style.setProperty("display", "grid");
      boxDiv.style.setProperty("height", "100%");
      boxDiv.style.setProperty("justify-content", "center");
      boxDiv.style.setProperty("text-align", "center");
      numH2.style.setProperty("margin", "0");
      innerboxDiv.style.setProperty("width", `${boxeswidth}px`);
      innerboxDiv.style.setProperty("aspect-ratio", "1");
      innerboxDiv.style.setProperty("display", "inline-block");
      namePara.style.setProperty("transform", "translateY(-.5rem)");
      namePara.style.setProperty("margin", "0");
      namePara.style.setProperty("font-weight", "bold");
      namePara.style.setProperty("color", "var(--clr-header-blue)");

      //Number the cursor
      let numH2Number = i + 1;
      numH2.innerText = `${numH2Number}`;

      //Name the cursor
      namePara.innerText = `${currentCursor.name}`;

      //Add elements to the widget
      boxDiv.appendChild(numH2);
      boxDiv.appendChild(namePara);
      innerboxDiv.appendChild(boxDiv);
      this.appendChild(innerboxDiv);

      //Change box color when mouse is hovered over it
      innerboxDiv.addEventListener("mouseover", e => {
        let initialBgColor = innerboxDiv.style.backgroundColor;
        innerboxDiv.style.setProperty("cursor", `${currentCursor.name}`);

        //<RWB></RWB> log to console cursor hover
        console.info(`Cursor widget cursor: ${currentCursor.name}`);

        innerboxDiv.style.backgroundColor = "green";
        innerboxDiv.setAttribute("title", `${currentCursor.name}`);

        //Return background color to before the hover started
        innerboxDiv.addEventListener("mouseout", e => {
          innerboxDiv.style.setProperty("background-color", initialBgColor);
        });
      });

      //Click event, change the display data
      innerboxDiv.addEventListener("click", e => {
        this.clickData(currentCursor);
      });

      //Give the boxes a background color grouped by cursor type
      switch (currentCursor.type) {
        case "general":
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-200)");
          break;
        case "links and status":
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-300)");
          break;
        case "selection":
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-400)");
          break;
        case "drag and drop":
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-500)");
          break;
        case "resizing and scrolling":
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-600)");
          break;
        case "zooming":
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-700)");
          break;
        default:
          innerboxDiv.style.setProperty("background-color", "var(--clr-primary-200)");
          break;
      }
    }
  };
};
