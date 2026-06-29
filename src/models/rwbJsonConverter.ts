//--Copyright (c) 2023-2026 Robert A. Howell

import { RwbSyntaxError } from "../../srcopen/models/rwbErrorBus.js";

/** An RwbParseJson parses json and stores the parsed string with the result. */
export class RwbParseJson {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public returnObj?: object | null;
  public passed: boolean;
  private parseStr: string;

  /**Create this object to store parse results and parsed
   * JSON object.
   */
  constructor(parseStr: string) {
    RwbParseJson.count++;
    this.parseStr = parseStr;
    this.passed = this.parseJson();
  };

  private parseJson() {
    try {
      this.returnObj = JSON.parse(this.parseStr);
      console.groupCollapsed("%cString converted successfully:", "color:slategrey;");
      console.debug("Stack trace locating conversion success: ")
      console.trace(`%c${this.parseStr}`, "color:slategrey;");
      console.groupEnd();
    } catch (e: any) {
      this.returnObj = null;
      new RwbSyntaxError("ParseError", e.message);
      return false;
    }
    return true;
  };
};

/** An RwbParseJson tests whether an object can be stringified into a valid
 * json string. */
export class RwbStringifyJson {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public returnStr?: string | null;
  public passed: boolean;
  private json: any;
  /**Create this object to store parse results and parsed
   * JSON object.
   */
  constructor(json: any) {
    RwbStringifyJson.count++;
    this.json = json;
    this.passed = this.stringifyJson();
  };

  private stringifyJson() {
    try {
      this.returnStr = JSON.stringify(this.json);
      console.groupCollapsed("%cJSON converted successfully:", "color:slategrey;");
      console.trace(`%c${this.json}`, "color:slategrey;");
      console.groupEnd();
    } catch (e: any) {
      this.returnStr = null;
      new RwbSyntaxError("StringifyError", e.message);
      return false;
    }
    return true;
  };
};
