//--Copyright (c) 2023-2026 Robert A. Howell

import RwbLink from "./rwbLink.js";

/**
 * Used for image Attribution
 */
class AttributionLink extends RwbLink {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  /**Name of the owner */
  public attributedOwner: string;
  /**WebBits article data ID */
  public articleId: number;

  constructor(
    /**Link title */
    title: string,
    /**Link inner text */
    innerText: string,
    /** link href */
    hReference: string,
    /**Name of the owner */
    attributedOwner: string,
    /**WebBits page */
    pageName: string,
    /**WebBits article data ID */
    articleId: number
  ) {
    super(title, innerText, pageName, hReference);
    this.attributedOwner = attributedOwner;
    this.articleId = articleId;
    AttributionLink.count++;
  };
};

export default AttributionLink;
