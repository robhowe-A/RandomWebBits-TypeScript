//--Copyright (c) 2023-2026 Robert A. Howell

/**
 * Interface used for local storage key-value dictionary words
 */
export interface localStorageWord {
  inCache: boolean;
  word: string;
  wordURL: URL;
  cacheName: string;
}

/**
 * Interface used for local storage key-values
 */
export interface localStorageToDoCache {
  inCache: boolean;
  toDoItem: string;
}
