//Copyright is optimized out from gulp compile, so add below. 1-30-25, RWB

import AttributionLink from "./attributionLink.js";
//--Copyright (c) 2023-2026 Robert A. Howell

/**
 * This class holds the data for 'WebBit' article cards. Key information
 * of the article's contents are contained: name, description, data created,
 * etc.
 */
class WebBit {
  /**Counts the number of objects instantiated */
  public static count: number = 0;
  public id: string;
  public articleNumber: number;
  public name: string;
  public description: string;
  public dateCreated: Date;
  public articleLink: string;
  public cardImage: string;
  public cardImageAlt: string;
  public linkAttribution: AttributionLink | undefined;

  constructor(
    id: string,
    articleNumber: number,
    name: string,
    description: string,
    dateCreated: Date,
    articleLink: string,
    cardImage: string,
    cardImageAlt: string,
    linkAttribution?: AttributionLink
  ) {
    this.id = id;
    this.name = name;
    this.articleNumber = articleNumber;
    this.description = description;
    this.dateCreated = dateCreated;
    this.articleLink = articleLink;
    this.cardImage = cardImage;
    this.cardImageAlt = cardImageAlt;
    this.linkAttribution = linkAttribution;
    WebBit.count++;
  };
};

export default WebBit;
