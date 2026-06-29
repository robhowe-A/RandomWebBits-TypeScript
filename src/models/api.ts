//--Copyright (c) 2023-2026 Robert A. Howell

import SendRequestObjectData from '../scripts/interop-wrapper.js'; //GitHub Copilot Chat import, 12-5-2025

/**
 * apiGet is for fetch requests. Use an apiGet object to manipulate the fetch
 *  request into either:
 *
 * 1. returning data
 *
 * --or --
 *
 * 2. storing the request in the browser cache to retrieve later
 */
export class apiGet {
  public errorElem: HTMLElement;
  public sendToBrowserCache: boolean = false;
  public inCache: boolean = false;
  private getUrl: URL;
  private browserCacheName: string | null;

  /**
   * This constructor gathers all the needed information for fetch and/or browser
   *  storage.
   *
   * @param getUrl - the (full) url of data request.
   * @param sendToBrowserCache  - Boolean value determining fetch caching.
   * @param browserCacheName - If storing the request in browser cache, this string provides the name for storage.
   * @param errorElem - Should the fetch request fail, return error status to this element.
   */
  constructor(
    getUrl: URL,
    sendToBrowserCache: boolean,
    errorElem: HTMLElement,
    browserCacheName: string | null
  ) {
    this.getUrl = getUrl;
    this.sendToBrowserCache = sendToBrowserCache;
    this.browserCacheName = browserCacheName;
    this.errorElem = errorElem;
  };

  /**
   *
   * @returns this.sendToBrowserCache
   */
  public getSendToBrowserCache() {
    return this.sendToBrowserCache;
  };

  /**
   *
   * @returns this.getUrl
   */
  public getGetUrl() {
    return this.getUrl;
  };

  /**
   * Flip this.sendToBrowserCache boolean value from the current value.
   */
  public setSendToBrowserCache() {
    return this.sendToBrowserCache ? false : true;
  };

  /**
   * A fetch request can take URL or string parameter. This function sets the apiGet
   *  object for a URL fetch by creating a URL from the string, or passing the URL.
   * @param url - the (full) url of data request.
   */
  public setGetUrl(url: URL | string) {
    if (typeof url === "string") {
      this.getUrl = new URL(url);
    } else {
      this.getUrl = url;
    }
  };

  /**
   * A public function creating a data promise object for the called fetch function. If
   *  the request needs added to browser storage, the fetch is made and sent to
   *  storage. A cloned copy of the fetched data is returned and the original request is
   *  sent to the cache. Without sending to browser cache, the fetch is requested and
   * returned.
   *
   * @param getUrl - the (full) url of data request.
   * @returns dataCachePromise: Promise<unknown>
   */
  public async apiGet(getUrl: URL) {
    //Check if the request is for cache storage
    if (this.sendToBrowserCache) {
      //The returned data is packages as a Promise object
      let dataCachePromise = new Promise((resolve, reject) => {
        if ("caches" in window) {
          //Open cache and check for request existing in Cache Storage
          window.caches
          .open(this.browserCacheName as string)
          .then(cache => {
            caches.match(getUrl).then(result => {
              if (result === undefined) {
                //No matches for this request in Storage Cache, so fetch the request normally
                //Call .NET server to fetch
                let dotnetFetch: Request = SendRequestObjectData(getUrl) as Request;

                //Returned request doesn't have .clone() for request caching, so solely resolve 
                //instead of add to cache cache: 1 - 28 - 25, RWB
                resolve(dotnetFetch);
                this.inCache = false;

              } else {
                this.inCache = true;

                //Cache hit success, return the response data
                resolve(result.json().then(text => text));
              }
            });
          })
          .catch(e => {
            //Cannot open Storage Cache
            console.error(`%cProblem opening Cache Storage. Name: ${this.browserCacheName}`, "color: grey");
            this.sendToBrowserCache = false;
          })
        }
      });
      //The promise has resolved --> return the promise data
      dataCachePromise.then((response: any) => {
        return response;
      });
      return dataCachePromise;
    } else {
      let dataCachePromise = new Promise((resolve, reject) => {
        resolve(this.fetchData(getUrl));
      });
      dataCachePromise.then(data => {
        return data;
      });
      return dataCachePromise;
    }
  };

  /**
   * Checks whether the requested response is of valid status 'OK' and '200'
   * @param res - the fetched response.
   * @returns - returns res.json() on success or returns response on failure.
   */
  private apiResponseErrorCheck(res: Response) {
    if (res.status == 404) {
      this.errorElem.classList.add("error");
      this.errorElem.innerText = "404 fetch error!";
      return res;
    }
    if (!res.ok || res.status != 200) {
      throw new Error(res.ok + ": " + res.status);
    }

    return res.json();
  };

  /**
   * The fetch request, returning a fetch promise.
   * @param getUrl - the (full) url of data request.
   * @returns data.text() or data based on the instance returned.
   */
  private fetchData(getUrl: URL) {
    return fetch(getUrl)
      .then(response => this.apiResponseErrorCheck(response))
      .then(data => {
        if (data instanceof Response) {
          return data.text();
        } else return data;
      })
      .catch((e: any) => {
        console.debug(e);
        this.errorElem.classList.add("error");
        this.errorElem.innerText = `${e.message}`;
      });
  };
};
