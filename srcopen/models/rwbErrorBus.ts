//--Copyright (c) 2023-2026 Robert A. Howell

/** Create this object to record reference errors. */
export default class RwbError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;

  constructor() {
    RwbError.count++;
  };

  /**
   * Check an element is null using querySelector()
   * E.G.: 
   *      return <element>.querySelector(cssQuery);
   * 
   * @param elementName - A name for the component in use.
   * @param element - A name for the element to query.
   * @param cssQuery - A css string.
   * @param logWarningMessageOnNull - Choose to log a message to console.
   * @param logErrorOnNull - Choose to supress the exception log.
   * @returns Element from css query provided or null
   */
  public static TryElementQuerySelector(
    elementName: string,
    element: HTMLElement,
    cssQuery: string,
    logWarningMessageOnNull?: boolean,
    logErrorOnNull?: boolean
    ) : HTMLElement | null {
    let logMsg: boolean; 
    let logErrNull: boolean;

    if (typeof (logWarningMessageOnNull) == 'undefined') logMsg = true; //Log message option default
    else logMsg = logWarningMessageOnNull as boolean;
    if (typeof (logErrorOnNull) == 'undefined') logErrNull = false; //Supress message option default
    else logErrNull = logErrorOnNull as boolean;

    let query: string = `${cssQuery}`;
    let returnElem: HTMLElement | null;
    try {
      returnElem = element.querySelector(query);
      if (returnElem == null) {
        if (logMsg) console.warn(`%cNo element found with query: ${query}.`, "color: orange;");
        if (logErrNull) Object.create(new RwbReferenceError(`${elementName}NullReference`, `Element(${element}) not found`));
        return null;
      }
      return returnElem;
    } catch {
      throw new RwbReferenceError("QueryElement", `Could not get element: '${query}'`);
    }
  };

  /**
   * Check an element query selector all using querySelectorAll()
   * E.G.:
   *      return <element>.querySelectorAll(cssQuery);
   * 
   * @param elementName - A name for the component in use.
   * @param element - A name for the element to query.
   * @param cssQuery - A css string.
   * @param logWarningMessageOnNull - Choose to log a message to console.
   * @param logErrorOnNull - Choose to supress the exception log.
   * @returns Node list of elements from css query provided or null
   */
  public static TryElementQuerySelectorAll(
    elementName: string,
    element: HTMLElement,
    cssQuery: string,
    logWarningMessageOnNull?: boolean,
    logErrorOnNull?: boolean
    ): NodeListOf<HTMLElement> | null {
    let logMsg: boolean;
    let logErrNull: boolean;

    if (typeof (logWarningMessageOnNull) == 'undefined') logMsg = true; //Log message option default
    else logMsg = logWarningMessageOnNull as boolean;
    if (typeof (logErrorOnNull) == 'undefined') logErrNull = false; //Supress message option default
    else logErrNull = logErrorOnNull as boolean;

    let query: string = `${cssQuery}`;
    let elemList: NodeListOf<HTMLElement> | null;
    try {
      elemList = element.querySelectorAll(query);
      if (elemList == null || elemList.length == 0) {
        if (logMsg) console.warn(`%cNo elements found with query: ${query}.`, "color: orange;");
        if (logErrNull) Object.create(new RwbReferenceError(`${elementName}NullReference`, `Element(${element}) not found`));
        return null;
      }
      return elemList;
    } catch {
      throw new RwbReferenceError("QueryElement", `Could not get element: '${query}'`);
    }
  };

  /**
  * Check an element is null using querySelector()
  * E.G.:
  *       return document.querySelector(cssQuery);
  *       
  * @param componentName - A name for the component in use.
  * @param cssQuery - A css string.
  * @param logWarningMessageOnNull - Choose to log a message to console.
  * @param logErrorOnNull - Choose to supress the exception log.
  * @returns HTMLElement from css query provided or null
  */
  public static TryDocumentQuerySelector(
    componentName: string,
    cssQuery: string,
    logWarningMessageOnNull?: boolean,
    logErrorOnNull?: boolean
    ): HTMLElement | null {
    let logMsg: boolean;
    let logErrNull: boolean;

    if (typeof (logWarningMessageOnNull) == 'undefined') logMsg = true; //Log message option default
    else logMsg = logWarningMessageOnNull as boolean;
    if (typeof (logErrorOnNull) == 'undefined') logErrNull = false; //Supress message option default
    else logErrNull = logErrorOnNull as boolean;

    let query: string = `${cssQuery}`;
    let elem: HTMLElement | null;

    try {
      elem = document.querySelector(query);

      if (elem == null) {
        if (logMsg) console.warn(`%cNo element found with query: ${query}.`, "color: orange;");
        if (logErrNull) Object.create(new RwbReferenceError(`${componentName}-NullReference`, `Element not found`));
        return null;
      }
      return elem;
    } catch {
      throw new RwbReferenceError("GetDocumentElement", `Could not get element: '${query}'`);
    }
  };

  /**
  * Check an element query selector all using querySelectorAll()
  * E.G.: 
  *      return document.querySelectorAll(cssQuery);
  * 
  * @param elementName
  * @param element
  * @param cssQuery
  * @param logWarningMessageOnNull
  * @param logErrorOnNull
  * @returns Node list of elements from query provided or null
  */
  public static TryDocumentQuerySelectorAll(
    elementName: string,
    cssQuery: string,
    logWarningMessageOnNull?: boolean,
    logErrorOnNull?: boolean
    ): NodeListOf<HTMLElement> | null {
    let logMsg: boolean;
    let logErrNull: boolean;

    if (typeof (logWarningMessageOnNull) == 'undefined') logMsg = true; //Log message option default
    else logMsg = logWarningMessageOnNull as boolean;
    if (typeof (logErrorOnNull) == 'undefined') logErrNull = false; //Supress message option default
    else logErrNull = logErrorOnNull as boolean;

    let query: string = `${cssQuery}`;
    let elemList: NodeListOf<HTMLElement> | null;

    try {
      elemList = document.querySelectorAll(query);
      if (elemList == null || elemList.length == 0) {
        if (logMsg) console.warn(`%cNo elements found with query: ${query}.`, "color: orange;");
        if (logErrNull) Object.create(new RwbReferenceError(`${elementName}NullReference`, `Elements not found in document`));
          return null;
      }
      return elemList;
    } catch {
      throw new RwbReferenceError("QueryElement", `Could not get element: '${query}'`);
    }
  };

  /**
  * Find if local storage is null. Optional choose to also check if local storage string is empty.
  *
  * @param componentName - A name for the component in use.
  * @param key - The key's name you're checking for.
  * @param checkForEmptyString - Optional parameter to check for empty key-value.
  * @param logWarningMessageOnNull - Choose to log a message to console.
  * @returns true or false
  */
  public static checkLocalStorageEqualNull(
    componentName: string,
    key: string,
    checkForEmptyString?: boolean,
    logWarningMessageOnNull?: boolean
    ): boolean {
    let logMsg: boolean;
    let chkEmpty: boolean;

    if (typeof (checkForEmptyString) == 'undefined') chkEmpty = false; //Default to not check for empty string
    else chkEmpty = checkForEmptyString as boolean;
    if (typeof (logWarningMessageOnNull) == 'undefined') logMsg = true; //Default to log message for null
    else logMsg = logWarningMessageOnNull as boolean;

    if (localStorage.getItem(`${key}`) == null) {
      if (logMsg) console.warn(`%cNo local storage for ${componentName}.`, "color:purple;");
      return true;
    }
    else {
      if (chkEmpty)
        return RwbError.checkLocalStorageNullOrEmpty(componentName, key, logMsg);
      else
        return false;
    }
  };

  /**
  * Find if local storage is null or empty. The result dependent on output from: localStorage.getItem(`${key}`)
  * 
  * @param componentName - A name for the component in use.
  * @param key - The key's name you're checking for.
  * @param logWarningMessageOnEmpty - Choose to log a message to console.
  * @param logErrorOnNullorEmpty - Choose to write an error to console.
  * @returns true or false
  */
  public static checkLocalStorageNullOrEmpty(componentName: string, key: string, logWarningMessageOnEmpty?: boolean, logErrorOnNullorEmpty?: boolean): boolean {
    let logMsg: boolean;
    let logErrNullOrEmpty: boolean;

    if (typeof (logWarningMessageOnEmpty) == 'undefined') logMsg = true; //Default to log message
    else logMsg = logWarningMessageOnEmpty as boolean;
    if (typeof (logErrorOnNullorEmpty) == 'undefined') logErrNullOrEmpty = false; //Default to not write error
    else logErrNullOrEmpty = logErrorOnNullorEmpty as boolean;

    try {
      switch (localStorage.getItem(`${key}`)) {
        case null: { //return true if null
          if (logMsg) console.warn(`%cLocal storage key not found: ${key}.`, "color: yellow;font-weight:bold;");
          if (logErrNullOrEmpty) Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Key not found`));
          return true;
        }
        case "[]":
        case "": { //return true if empty
          if (logMsg)console.warn(`%cLocal storage value is empty for key: ${key}`, "color: yellow;font-weight:bold;");
          if (logErrNullOrEmpty) Object.create(new RwbReferenceError(`${componentName}ReferenceException`, `Value is empty`));
          return true;
        }
        default: {
        return false;
        }
      }
    } catch {
      throw new Error(`Could not get local storage key: ${key}`);
    }
  };
};

/** Create this object to store reference error data. */
export class RwbReferenceError extends ReferenceError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public page: string;
  private refError: ReferenceError;

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
    this.page = window.location.pathname;
    let err = new ReferenceError(this.message);
    this.refError = err;
    console.error(
      `%c<RWB>%cExecution experienced a reference error:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.refError,
      "color:red;font-weight:bold;"
    );
    RwbReferenceError.count++;
  };
};

/** Create this object to store syntax error data. */
export class RwbSyntaxError extends SyntaxError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public page: string;
  private syntaxError: SyntaxError;

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
    this.page = window.location.pathname;
    let err = new SyntaxError(this.message);
    this.syntaxError = err;
    console.error(
      `%c<RWB>%cExecution experienced a syntax error:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.syntaxError,
      "color:red;font-weight:bold;"
    );
    RwbSyntaxError.count++;
  };
};

export class RwbDomException extends DOMException {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public stack: any;
  public page: string;
  private domError: DOMException;

  constructor(name: string, message: string, error: any) {
    super();
    this.name = name;
    this.message = message;
    this.stack = error;
    this.page = window.location.pathname;
    let err = new DOMException(this.message);
    this.domError = err;
    console.error(
      `%c<RWB>%cExecution experienced a DOM error:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.stack,
      "color:red;font-weight:bold;"
    );
    RwbDomException.count++;
  };

  static ThrowError(name: string, message: string, error: any) {
      throw new DOMException(message);
  };
};

export class RwbInvalidValueError extends RangeError {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public name: string;
  public message: string;
  public page: string;
  private syntaxError: RangeError;

  constructor(name: string, message: string) {
    super();
    this.name = name;
    this.message = message;
    this.page = window.location.pathname;
    let err = new RangeError(this.message);
    this.syntaxError = err;
    console.error(
      `%c<RWB>%cValue out of range exception:\n%o\n%c</RWB>`,
      "color:red;font-weight:bold;",
      "color:red;",
      this.syntaxError,
      "color:red;font-weight:bold;"
    );
    RwbSyntaxError.count++;
  };
};
