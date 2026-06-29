"strict mode";
//--Copyright (c) 2024-2026 Robert A. Howell
// Data source: MDN (https://developer.mozilla.org/en-US/docs/Web/CSS/cursor), February 2024
const dataObj = {
  cursors: [
    {
      name: "auto",
      browserDefault: true,
      type: "general",
      description:
        "The UA will determine the cursor to display based on the current context. E.g., equivalent to text when hovering text.",
    },
    {
      name: "default",
      browserDefault: true,
      type: "general",
      description: "The platform-dependent default cursor. Typically an arrow.",
    },
    {
      name: "none",
      browserDefault: true,
      type: "general",
      description: "No cursor is rendered.",
    },
    {
      name: "context-menu",
      browserDefault: true,
      type: "links and status",
      description: "A context menu is available.",
    },
    {
      name: "help",
      browserDefault: true,
      type: "links and status",
      description: "Help information is available.",
    },
    {
      name: "pointer",
      browserDefault: true,
      type: "links and status",
      description: "The cursor is a pointer that indicates a link. Typically an image of a pointing hand.",
    },
    {
      name: "progress",
      browserDefault: true,
      type: "links and status",
      description:
        "The program is busy in the background, but the user can still interact with the interface (in contrast to wait).",
    },
    {
      name: "wait",
      browserDefault: true,
      type: "links and status",
      description:
        "The program is busy, and the user can't interact with the interface (in contrast to progress). Sometimes an image of an hourglass or a watch.",
    },
    {
      name: "cell",
      browserDefault: true,
      type: "selection",
      description: "The table cell or set of cells can be selected.",
    },
    {
      name: "crosshair",
      browserDefault: true,
      type: "selection",
      description: "Cross cursor, often used to indicate selection in a bitmap.",
    },
    {
      name: "text",
      browserDefault: true,
      type: "selection",
      description: "The text can be selected. Typically the shape of an I-beam.",
    },
    {
      name: "vertical-text",
      browserDefault: true,
      type: "selection",
      description: "The vertical text can be selected. Typically the shape of a sideways I-beam.",
    },
    {
      name: "alias",
      browserDefault: true,
      type: "drag and drop",
      description: "An alias or shortcut is to be created.",
    },
    {
      name: "copy",
      browserDefault: true,
      type: "drag and drop",
      description: "Something is to be copied.",
    },
    {
      name: "move",
      browserDefault: true,
      type: "drag and drop",
      description: "Something is to be moved.",
    },
    {
      name: "no-drop",
      browserDefault: true,
      type: "drag and drop",
      description: "An item may not be dropped at the current location.",
    },
    {
      name: "not-allowed",
      browserDefault: true,
      type: "drag and drop",
      description: "The requested action will not be carried out.",
    },
    {
      name: "grab",
      browserDefault: true,
      type: "drag and drop",
      description: "Something can be grabbed (dragged to be moved).",
    },
    {
      name: "grabbing",
      browserDefault: true,
      type: "drag and drop",
      description: "Something is being grabbed (dragged to be moved).",
    },
    {
      name: "all-scroll",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Something can be scrolled in any direction (panned).",
    },
    {
      name: "col-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "An item/column can be resized horizontally.",
    },
    {
      name: "row-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "An item/row can be resized vertically.",
    },
    {
      name: "n-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "e-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "s-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "w-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "ne-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "nw-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "se-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "sw-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Some edge is to be moved.",
    },
    {
      name: "ew-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Bidirectional resize cursor.",
    },
    {
      name: "ns-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Bidirectional resize cursor.",
    },
    {
      name: "nesw-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Bidirectional resize cursor.",
    },
    {
      name: "nwse-resize",
      browserDefault: true,
      type: "resizing and scrolling",
      description: "Bidirectional resize cursor.",
    },
    {
      name: "zoom-in",
      browserDefault: true,
      type: "zooming",
      description: "Something can be zoomed (magnified) in or out.",
    },
    {
      name: "zoom-out",
      browserDefault: true,
      type: "zooming",
      description: "Something can be zoomed (magnified) in or out.",
    },
  ],
};

export default dataObj;
