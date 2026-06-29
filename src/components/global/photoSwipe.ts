"strict mode";
//--Copyright (c) 2023-2026 Robert A. Howell
import PhotoSwipeLightbox from "../../esm/photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "../../esm/photoswipe/photoswipe.esm.js";

const photoSwipe_AppTab = () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#devTools-Gallery",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  });
  const options = {
    gallery: "#devTools-Picture",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const all = {
    gallery: "#ElementsTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allConsole = {
    gallery: "#ConsoleTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allSources = {
    gallery: "#SourcesTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allNetwork = {
    gallery: "#NetworkTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allPerformance = {
    gallery: "#PerformanceTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allMemory = {
    gallery: "#MemoryTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allSecurity = {
    gallery: "#SecurityTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allLighthouse = {
    gallery: "#LighthouseTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allCSSOverview = {
    gallery: "#CSSOverviewTab",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allClearCookies = {
    gallery: "#ClearCookies",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allHtmlResponses = {
    gallery: "#HtmlResponses",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allChatGPT = {
    gallery: "#chatGPT",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allPaint3D = {
    gallery: "#paint3D",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const allBoinc = {
    gallery: "#BOINC",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  };
  const picbox = new PhotoSwipeLightbox(options);
  const page = new PhotoSwipeLightbox(all);
  const pageConsole = new PhotoSwipeLightbox(allConsole);
  const pageSources = new PhotoSwipeLightbox(allSources);
  const pageNetwork = new PhotoSwipeLightbox(allNetwork);
  const pagePerformance = new PhotoSwipeLightbox(allPerformance);
  const pageMemory = new PhotoSwipeLightbox(allMemory);
  const pageSecurity = new PhotoSwipeLightbox(allSecurity);
  const pageLighthouse = new PhotoSwipeLightbox(allLighthouse);
  const pageCSSOverview = new PhotoSwipeLightbox(allCSSOverview);
  const pageClearCookies = new PhotoSwipeLightbox(allClearCookies);
  const pageHtmlResponses = new PhotoSwipeLightbox(allHtmlResponses);
  const pageChatGPT = new PhotoSwipeLightbox(allChatGPT);
  const pagePaint3D = new PhotoSwipeLightbox(allPaint3D);
  const pageBoinc = new PhotoSwipeLightbox(allBoinc);

  lightbox.init();
  picbox.init();
  page.init();
  pageConsole.init();
  pageSources.init();
  pageNetwork.init();
  pagePerformance.init();
  pageMemory.init();
  pageSecurity.init();
  pageLighthouse.init();
  pageCSSOverview.init();
  pageClearCookies.init();
  pageHtmlResponses.init();
  pageChatGPT.init();
  pagePaint3D.init();
  pageBoinc.init();
};

const photoSwipe_Pwa = () => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: "#Instructions",
    children: ".pswp-gallery__item",
    imageClickAction: "zoom",
    tapAction: "zoom",
    pswpModule: PhotoSwipe,
  });
  lightbox.init();
};

const photoSwipe_InspctPgs = () => {
  const options = {
    gallery: "#inspectPages-Gallery",
    children: ".pswp-gallery__item",
    pswpModule: PhotoSwipe,
  };
  const lightbox2 = new PhotoSwipeLightbox(options);
  lightbox2.init();
};

export { photoSwipe_Pwa as ps_Pwa, photoSwipe_AppTab as ps_At, photoSwipe_InspctPgs as ps_Ip };
