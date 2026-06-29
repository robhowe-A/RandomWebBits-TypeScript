//Copyright is optimized out from gulp compile, so add below. 1-30-25, RWB

import { ToDoListElements } from "./widgetMarkupElements.js";
import { localStorageToDoCache } from "./localStorageCaches.js";
//--Copyright (c) 2023-2026 Robert A. Howell
import { RwbParseJson, RwbStringifyJson } from "./rwbJsonConverter.js";
import RwbError from "../../srcopen/models/rwbErrorBus.js";

/**
 * A ToDoList is an HTML widget to store To-Dos in the browser. Instantiate the
 *  ToDoList constructor to create widget markup and functionality. To-Dos are
 *  stored in the browser's Local Storage and read and rendered when the page loads.
 *
 * To create a ToDoList, an element on the page must have '.ToDoList' class. Call the
 *  class constructor, passing in that element to create the widget.
 *
 *       const toDoWidget = new ToDoList();
 *       toDoWidget.createToDoListWidget(toDosElement);
 *
 * Then, the widget is created and To-Dos are retrieved from storage.
 */
export class ToDoList {
  /**Total number of ToDOs*/
  public static toDos: number = 0;
  /**Widget elements used to populate todos */
  private static toDoElements: ToDoListElements;
  private static toDoInStorage: localStorageToDoCache[];
  /**Todo HTML elements */
  private listElements?: ToDoListElements;

  /**
   * Sets the To-Do list widget's elements.
   *
   *      ToDoList.ToDoElements
   * @param toDoElements Widget Elements -- key widget function elements.
   */
  public static setToDoListElements(toDoElements: ToDoListElements) {
    ToDoList.toDoElements = toDoElements;
  };

  /**
   * Random Web Bits uses multiple locations to apply the To-Do List widget. Create
   *  the list markup, passing in a reference element for placement of the widget.
   * @param elem - widget is placed after this reference element.
   */
  public createToDoListWidget(elem: Element) {
    //Insert the widget after the passed in "elem"
    //Dependent on the page, todo widget may have pre-existing markup in place
    //Switch against the current page to determine markup needed
    if (elem == undefined) {
      console.log(`%cThere is no "ToDoList" class on this page.`, "color:orange;");
      return;
    }
    if (!elem.classList.contains("ToDoList")) {
      console.log(`Add "ToDoList" class to ${elem.nodeName} node.`);
      return;
    }
    switch (window.location.pathname) {
      case "/RandomWebBits/":
      case "/RandomWebBits/index":
      case "/index":
      case "/":
      case "/dist/index":
        //Markup does not exist on the page
        //Create table elements needed for the todo list
        const TODOLISTSECTION = elem.insertAdjacentElement("afterend", document.createElement("section"));
        if (TODOLISTSECTION === null){
            console.error("Error in to-do list component.");
            return;
        }
        const HEADER = TODOLISTSECTION.appendChild(document.createElement("h3"));
        const DIV = TODOLISTSECTION.appendChild(document.createElement("div"));
        const TABLE = DIV.appendChild(document.createElement("table"));
        const THEAD = TABLE.appendChild(document.createElement("thead"));
        const TR1 = THEAD.appendChild(document.createElement("tr"));
        const THLEFT = TR1.appendChild(document.createElement("th"));
        const THMIDDLE = TR1.appendChild(document.createElement("th"));
        const TBODY = TABLE.appendChild(document.createElement("tbody"));
        const TFOOT = TABLE.appendChild(document.createElement("tfoot"));
        const TR3 = TFOOT.appendChild(document.createElement("tr"));
        const TD3LEFT = TR3.appendChild(document.createElement("td"));
        const TD3IN = TD3LEFT.appendChild(document.createElement("input"));
        const TD3MIDDLE = TR3.appendChild(document.createElement("td"));
        const INPUT = TD3MIDDLE.appendChild(document.createElement("input"));

        //Add attributes and property values
        TABLE.appendChild(document.createElement("tfoot"));
        TD3IN.setAttribute("aria-label", "Add");
        TD3IN.setAttribute("Value", "Add");
        INPUT.setAttribute("name", "itemINPUT");
        INPUT.setAttribute("type", "text");
        INPUT.setAttribute("aria-label", "Input");
        INPUT.setAttribute("id", "todoInput");
        INPUT.setAttribute("placeholder", "New to-do item");
        HEADER.textContent = "To-Do:";
        TODOLISTSECTION.id = "ToDO";
        THLEFT.textContent = "Complete?";
        THMIDDLE.textContent = "Description";
        TBODY.id = "ToDoItems";
        TD3IN.id = "AddButton";
        TD3IN.type = "button";

        //Create a sample to do item (it is not stored in cache)
        this.createSampleTo_Do(TBODY);

        //With the elements created, set the class list elements
        this.getToDoListElements();
        ToDoList.setToDoListElements(this.listElements!);

        this.populateToDoList();
        this.addToDoEventListeners();

        break;
      case "/RandomWebBits/pages/todos":
      case "/pages/todos":
        //Markup exists on the page already
        //With the elements created, set the class list elements
        this.getToDoListElements();
        ToDoList.setToDoListElements(this.listElements!);

        //Create a sample to do item due to cache empty
        const HTBODY = ToDoList.toDoElements.toDoTableBody;
        if (HTBODY != null) {
          this.createSampleTo_Do(HTBODY);
        }

        this.populateToDoList();
        this.addToDoEventListeners();

        break;
      default:
        console.log("Element is not valid. Please ensure a valid element for ToDo list widget to follow.");
    }
  };

  /**
   * Checks for To-Do items from Local Storage.
   * @returns boolean true or false
   */
  private static getToDoInStorage(checkEmptyValueString: boolean, logMessage: boolean) {
    if (RwbError.checkLocalStorageEqualNull("ToDoList", "ToDos", checkEmptyValueString, false)) {
        if (logMessage) console.info(`%cNo local storage for ToDoList.`, "color:purple;");

     return false;
    }
    let parseStr = localStorage.getItem("ToDos");
    let parseTest = Object.create(new RwbParseJson(parseStr as string));
    if (!parseTest.passed) {
      //parsed JSON is malformed
      localStorage.removeItem("ToDos");
      console.log(
        `%c<RWB>%cDeleted storage key: ToDos`,
        "color:orange;font-size:14px;font-weight:bold;",
        "color:orange;font-size:16px;"
      );
      return false;
    }

    this.toDoInStorage = parseTest.returnObj;
    return true;
  };

  /**
   * Gather necessary elements from the created widget.
   * @returns ToDoElements: ToDoListElements
   */
  private getToDoListElements() {
    //Gather necessary elements from the created widget
    //Each widget location's elements may vary, so a call of getToDoListElements()
    //locates the page's elements to populate the ToDoElements interface.
    let toDoTable: HTMLTableElement;
    let toDoTableBody: HTMLTableSectionElement;
    let addButton: HTMLInputElement;
    let addItemToEnter: HTMLInputElement;

    toDoTable = RwbError.TryDocumentQuerySelector("ToDoList", "#ToDO table", true, true) as HTMLTableElement;
    toDoTableBody = RwbError.TryDocumentQuerySelector(
      "ToDoList",
      "#ToDoItems",
      true,
      true
    ) as HTMLTableSectionElement;
    addButton = RwbError.TryDocumentQuerySelector("ToDoList", "#AddButton", true, true) as HTMLInputElement;
    addItemToEnter = RwbError.TryDocumentQuerySelector(
      "ToDoList",
      'input[name="itemINPUT"]',
      true,
      true
    ) as HTMLInputElement;

    if (toDoTable == null || toDoTableBody == null || addButton == null || addItemToEnter == null) {
        console.warn("An element is missing. The todo list widget may not function as expected.");
        return;
    }

    let toDoElements: ToDoListElements = {
      toDoTable: toDoTable,
      toDoTableBody: toDoTableBody,
      addButton: addButton,
      addItemToEnter: addItemToEnter,
    };
    this.listElements = toDoElements;
  };

  /**
   * Adds a To-Do to Local Storage.
   * @param description - The UI form input description.
   */
  private addToDoToStorage(description: string) {
    //Add the ToDos array to local cache.
    //The 'localstoragetodocache' interface structures the data for later retrieval.
    let toDo: localStorageToDoCache = {
      inCache: false,
      toDoItem: description,
    };
    let toDos: any = []; //ToDo array
    let strgfy;

    const stringifyToDo = (toDoStr: any) => {
      //Call RWBStringifyJSON to stringify the object
      let toDosStrgfyTest = Object.create(new RwbStringifyJson(toDoStr));
      if (!toDosStrgfyTest.passed) {
        //LOGLEAF
        return;
      }
      return toDosStrgfyTest.returnStr;
    };
    //First, read current Local Storage ToDos
    let toDosStorageCache = ToDoList.getToDoInStorage(false, false);
    if (toDosStorageCache) {
      toDos = ToDoList.toDoInStorage;
      toDos.push(toDo);
      //Call RWBStringifyJSON to stringify the object
      strgfy = stringifyToDo(toDos);
      localStorage.setItem("ToDos", strgfy);
    } else {
      toDos.push(toDo);
      //Call RWBStringifyJSON to stringify the object
      strgfy = stringifyToDo(toDos);
      localStorage.setItem("ToDos", strgfy);
      console.log(
        `%c<RWB>%cCreated to-do cache key: ToDos`,
        "color:cyan;font-size:14px;font-weight:bold;",
        "color:cyan;font-size:16px;"
      );
    }
    console.log(`%c<RWB>%cAdded to-do cache: ${description}`, "color:cyan;font-weight:bold;", "color:cyan;");
  };

  /**
   * Removes a To-Do item from Local Storage. The requested To-Do to remove is
   *  pulled individually from the key-value pair object.
   * @param item - the To-Do item requested to remove
   */
  private removeToDoFromStorage(item: string) {
    ToDoList.toDoInStorage = ToDoList.toDoInStorage.filter(toDo => toDo.toDoItem !== item);
    console.log(
      `%c<RWB>%cDeleted todo cache: ${item}`,
      "color:darkcyan;font-weight:bold;",
      "color:darkcyan;"
    );
    let toDoInStorageStrgfyTest = Object.create(new RwbStringifyJson(ToDoList.toDoInStorage));
    if (!toDoInStorageStrgfyTest.passed) {
      //LOGLEAF
      return;
    }
    let jsonStr = toDoInStorageStrgfyTest.returnStr;
    if (jsonStr == "" || jsonStr == "[]") {
      localStorage.removeItem("ToDos");
      console.log(
        `%c<RWB>%cDeleted storage key: ToDos`,
        "color:darkcyan;font-size:14px;font-weight:bold;",
        "color:darkcyan;font-size:16px;"
      );
      return;
    }
    localStorage.setItem("ToDos", jsonStr);
  };

  /**
   * This function creates the necessary markup to add a row to the To-Do table.
   *  A row consists of three columns: a complete tick-box, a description, and a delete button.
   * @param description - User form input to add as a description.
   * @param firstPaint - Boolean value used by adding list storage
   */
  private addToDoRow(description: string, firstPaint: boolean) {
    //Create a table row with checkbox and delete options
    const TABLEBODYITEM = ToDoList.toDoElements.toDoTableBody;
    const TABLEFRAG = document.createDocumentFragment();
    const NEWROW = TABLEFRAG.appendChild(document.createElement("tr")); //Add row
    const FIRSTCOL = NEWROW.appendChild(document.createElement("td")); //Table first data
    const CHECKBOX = FIRSTCOL.appendChild(document.createElement("input")); //Add checkbox
    const NEWITEM = NEWROW.appendChild(document.createElement("td")); //Table second data
    const SECONDCOL = NEWROW.appendChild(document.createElement("td")); //Table third data
    const DELBOX = SECONDCOL.appendChild(document.createElement("input")); //Add deletebox

    //Add attributes and property values
    CHECKBOX.setAttribute("type", "checkbox");
    CHECKBOX.setAttribute("aria-label", "Checkbox");
    CHECKBOX.setAttribute("aria-label", "Delete");
    NEWITEM.setAttribute(
      "num",
      ToDoList.toDos
        ? (() => {
            let elem = document.querySelector("#ToDO td[num]");
            return ((Number(elem?.getAttribute("num")) || -1000) + ToDoList.toDos).toString();
          })()
        : (1).toString()
    );
    NEWITEM.textContent = description; //Populate second col
    ToDoList.toDos++; //Number of Items
    DELBOX.setAttribute("type", "submit");
    DELBOX.setAttribute("value", "Delete");

    if (firstPaint) {
      //Add to list storage
      this.addToDoToStorage(description);
    }

    //Add the row to the ToDos table
    TABLEBODYITEM.appendChild(TABLEFRAG);
    console.log(`%c<RWB>%cCreated to-do table row`, "color:gold;font-weight:bold;", "color:gold;");

    //Add an event listener for when 'delete' is clicked
    DELBOX.addEventListener("click", () => {
      this.deleteButton(DELBOX);
    });
  };

  /**
   * Function called to create the To-Do item rows from To-Dos stored in the browser Local Storage.
   */
  private populateToDoList() {
      if (ToDoList.toDoInStorage) {
      for (let i = 0; i < ToDoList.toDoInStorage.length; i++) {
        this.addToDoRow(ToDoList.toDoInStorage[i].toDoItem, false);
      }
    }
    else {
        ToDoList.getToDoInStorage(true, false);
    }
  };

  /**
   * Add button functionality.
   */
  private addToDoEventListeners() {
    const ADDBUTTON = ToDoList.toDoElements.addButton;
    const ADDITEMENTER = ToDoList.toDoElements.addItemToEnter;
    if (ADDBUTTON == null && ADDITEMENTER == null) {
      throw new Error("Element was not found or is null");
    }
    /**Add input text to the todo list from clicking the add button*/
    ADDBUTTON.addEventListener("click", () => {
      this.addToDoRow(ADDITEMENTER.value, true);
      ADDITEMENTER.value = "";
    });
    /**Add input text to the todo list when using key enter*/
    ADDITEMENTER.addEventListener("keydown", e => {
      if (e.code == "NumpadEnter" || e.code == "Enter") {
        this.addToDoRow(ADDITEMENTER.value, true);
        ADDITEMENTER.value = "";
      }
    });
  };

  /**
   * function determining the delete button. Items are deleted when pushed, but are
   *  not removed from storage without 'Complete?' checkebox checked.
   * @param box input element
   */
  private deleteButton(box: HTMLInputElement) {
    if (
      box.parentNode == null ||
      box.parentNode.previousSibling == null ||
      box.parentNode.previousSibling.previousSibling == null
    ) {
      throw new Error("Missing a table element.");
    }
    const rowChkBx = <HTMLElement>box.parentNode.previousSibling.previousSibling;
    /** Input element */
    const rowChkBxIN = <HTMLInputElement>rowChkBx.childNodes[0];
    const toDoTable: HTMLTableElement = ToDoList.toDoElements.toDoTable;
    const tr: HTMLTableRowElement = <HTMLTableRowElement>box.parentNode.parentNode;
    let i = tr.rowIndex;
    const value = box.parentNode.previousSibling.textContent;
    if (rowChkBxIN.checked) {
      //remove row since completed
      toDoTable.deleteRow(i);
      console.log(
        `%c<RWB>%cDeleted todo row: ${box.parentElement.previousElementSibling.textContent}`,
        "color:goldenrod;font-weight:bold;",
        "color:goldenrod;"
      );
      if (value != "Add a ToDO Item.") {
        ToDoList.toDos--;

        //delete associated storage item
        this.removeToDoFromStorage(value as string);
      }
    } 
    else {
      toDoTable.deleteRow(i);
      console.log(
        `%c<RWB>%cRemoved todo row: ${box.parentElement.previousElementSibling.textContent}`,
        "color:goldenrod;font-weight:bold;",
        "color:goldenrod;"
      );
      ToDoList.toDos--;
    }
  };

  /**
   * This function is called to seed the To-Do List when there are no Local Storage items
   *  which would populate the list. The sample remains on page but is never stored in the browser.
   * @param tBody table body element
   */
  private createSampleTo_Do(tBody: Element) {
    if (ToDoList.getToDoInStorage(false, true)) return;
    //Create a sample entry in the ToDo table as a placeholder
    const TR2 = tBody.appendChild(document.createElement("tr"));
    const TD2LEFT = TR2.appendChild(document.createElement("td"));
    const TD2IN = TD2LEFT.appendChild(document.createElement("input"));
    const TD2MIDDLE = TR2.appendChild(document.createElement("td"));
    const TD2RIGHT = TR2.appendChild(document.createElement("td"));
    const TD2DEL = TD2RIGHT.appendChild(document.createElement("input"));

    //Add attributes and property values
    TD2IN.setAttribute("aria-label", "Checkbox");
    TD2MIDDLE.setAttribute("num", `${1}`);
    TD2IN.setAttribute("aria-label", "Delete");
    TD2DEL.setAttribute("type", "reset");
    TD2DEL.setAttribute("value", "Delete");
    TD2IN.type = "checkbox";
    TD2MIDDLE.textContent = "Add a ToDO Item.";
    ToDoList.toDos++;

    //"Delete" event listener
    TD2DEL.addEventListener("click", () => {
      this.deleteButton(TD2DEL);
      console.log(
        `%c<RWB>%cRemoved todo: ${TD2DEL.parentElement.previousElementSibling.textContent}`,
        "color:purple;font-weight:bold;",
        "color:purple;"
      );
    });
  };
};
