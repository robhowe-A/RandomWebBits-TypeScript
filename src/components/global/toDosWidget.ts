//--Copyright (c) 2023-2026 Robert A. Howell

import { ToDoList } from "../../models/toDo.js";
import RwbError from "../../../srcopen/models/rwbErrorBus.js";

/**
 * Component containing the To-Do List widget's creation.
 */
const toDosWidget = {
  /**
   * Create a To-Do List widget.
   * @param elem - Element containing 'ToDoList' class
   */
  init: () => {
    let toDosElement: HTMLElement;
    toDosElement = RwbError.TryDocumentQuerySelector("ToDoList", ".ToDoList", true, true) as HTMLElement;
    if (toDosElement == null) {
      console.warn("Cannot find container element for todo list widget placement. Skipping its creation.");
      return;
    }

    //ToDoList object
    const toDoWidget = new ToDoList();

    //Creates widget markup and populates To-Do tasks contained in Local Storage
    toDoWidget.createToDoListWidget(toDosElement);
  },
};

export default toDosWidget;
