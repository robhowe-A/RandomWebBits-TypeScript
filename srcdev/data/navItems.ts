"strict mode";
//--Copyright (c) 2023-2026 Robert A. Howell
import RwbLink from "../models/rwbLink.js";

/**
 * Header navigation link data
 */
const homeNavLink = new RwbLink("Index", "Home", "Home", "");

const pagesNavLink = new RwbLink("Pages", "Pages", "Pages", "pages");

const gameNavLink = new RwbLink("Game", "FlashCards", "Game", "flashcards");

/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
export default NAVITEMS;
