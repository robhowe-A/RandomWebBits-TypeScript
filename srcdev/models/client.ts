//--Copyright (c) 2023-2026 Robert A. Howell

export class client {
  public oldURL = document.referrer;
  public browserplatform: string;
  public useragent = window.navigator.userAgent;
  public connectiontype;
  public connectionrtt;

  constructor() {
    this.browserplatform = this.setbrowserplatform();
    this.connectiontype = this.setconnectiontype();
    this.connectionrtt = this.setconnectionrtt();
  };

  private setbrowserplatform() {
    if ("userAgentData" in window.navigator) {
      //userAgentData is NavigatorUAData type, not found in TypeScript.
      //Known to Edge browser: Object.getPrototypeOf(window.navigator.userAgentData)
      let userAgentData: any = window.navigator.userAgentData as object;
      let platformdata: string = <string>userAgentData.platform;
      return platformdata;
    } else return "";
  };

  private setconnectiontype() {
    if ("connection" in window.navigator) {
      //connection is NetworkInformation type, not found in TypeScript.
      //Known to Edge browser: Object.getPrototypeOf(window.navigator.connection)
      let connection: any = window.navigator.connection as object;
      let effectivetype: string = <string>connection.effectiveType;
      return effectivetype;
    } else this.connectiontype = "";
  };

  private setconnectionrtt() {
    if ("connection" in window.navigator) {
      let connection: any = window.navigator.connection as object;
      let rtt: string = <string>connection.rtt;
      return rtt;
    } else this.connectionrtt = "";
  };
};
