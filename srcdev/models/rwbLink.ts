//--Copyright (c) 2023-2026 Robert A. Howell

/**
 * HTML link element data. Used with anchor tags.
 */
class RwbLink {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  /**HTML title attribute */
  public title: string;
  /**Inner text string */
  public innerText: string;
  /**The page the link is associated to */
  public pageName: string;
  /**HTML href attribute */
  public hReference: string;

  constructor(title: string, innerText: string, pageName: string, hReference: string) {
    (this.title = title),
      (this.innerText = innerText),
      (this.pageName = pageName),
      (this.hReference = hReference),
      RwbLink.count++;
  };
};

export default RwbLink;
