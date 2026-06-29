//--Copyright (c) 2025-2026 Robert A. Howell

const onError = {
  isOffline: {
    wordFetchError: (searchElems: any): boolean => {
      //Check network connection
      if (!navigator.onLine) {
        //Offline request; set error message
        searchElems.errorElem.classList.add("error");
        searchElems.errorElem.innerText += "Cannot search offline. Check your network connection.";
        console.warn("This component cannot make an offline fetch.");
        return true;
      }
      else
        return false;
    },
    authorFetchError: (errorElem: HTMLElement): boolean => {
      //Check network connection
      if (!navigator.onLine) {
        //Offline request
        errorElem.classList.add("error");
        errorElem.innerText += "Cannot search offline. Check your network connection.";
        console.warn("This component cannot make an offline fetch.");
        return true;
      }
      else
        return false;
    },
  }
};

export default onError;
