"strict mode";
//--Copyright (c) 2023-2026 Robert A. Howell
import WebBit from "../models/webBit.js";
import AttributionLink from "../models/attributionLink.js";

// Create new AA (Arbitrary Article)

/**
 * "Arbitrary Articles' section card data."
 */
const arbitraryArticles = new Array(
  new WebBit(
   "Domainlookup",
   1,
   "Domain Lookup",
   "Check an available domain using WhoIS API search",
   new Date(2022, 12, 4),
   "pages/domainlookup",
   "library/img/whois.webp",
   "WhoIs Lookup",
   new AttributionLink(
     "domain icons",
     "Domain icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/domain",
     "Flaticon",
     "Domain Lookup",
     1
   )
  ),
  new WebBit(
   "Htmlresponses",
   2,
   "HTML Frames",
   "View HTML page response status information",
   new Date(2022, 12, 11),
   "pages/htmlresponses",
   "library/img/HTML_Frames.webp",
   "HTML frames example",
   new AttributionLink(
     "code icons",
     "Code icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/code",
     "Flaticon",
     "HTML Frames",
     2
   )
  ),
  new WebBit(
   "Webtech",
   5,
   "Wappalyzer",
   "Wappalyzer browser extension",
   new Date(2023, 11, 19),
   "pages/webtech",
   "library/img/wappalyzer-logo.webp",
   "Browser extension logo. A white w on a purple tile.",
   new AttributionLink(
     "Wappalyzer app",
     "Graphical logo for Wappalyzer.",
     "https://www.wappalyzer.com/logos/",
     "Wappalyzer",
     "Wappalyzer",
     5
   )
  ),
  new WebBit(
    "Jsonobject",
    6,
    "jsonObject",
    "JSON object notation",
    new Date(2023, 1, 9),
    "pages/jsonobject",
    //"library/img/json.webp",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/json.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=mqRMX9%2FqsnE7CE%2BO2l1a13J8EDVIGAfBYhZ4uXJeYb4%3D",
    "JSON logo: A grey circle with artistic spirals.",
    new AttributionLink(
      "JavaScript Object Notation",
      "Graphical logo for JSON.",
      "https://www.json.org/",
      "json.org",
      "jsonObject",
      6
    )
  ),
  new WebBit(
   "Wi-Fi",
   7,
   "Wi-Fi Version",
   "Determine Wifi Version",
   new Date(2023, 1, 16),
   "pages/wifi",
   "library/img/wifi.webp",
   "Wi-Fi logo with a black circle background.",
   new AttributionLink(
     "Wireless Fidelity",
     "Wi-Fi graphical logo.",
     "https://www.wi-fi.org/who-we-are/our-brands",
     "WiFi Alliance",
     "Wi-Fi Version",
     7
   )
  ),
  new WebBit(
   "Chatgpt",
   8,
   "Preview chatGPT",
   "Chat with an AI for research and development.",
   new Date(2023, 1, 28),
   "pages/chatgpt",
   "library/img/ai.webp",
   "Decorative AI logo",
   new AttributionLink(
     "ai icons",
     "Ai icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/ai",
     "Flaticon",
     "Preview chatGPT",
     8
   )
  ),
  new WebBit(
   "Paint3d",
   9,
   "Paint 3D",
   "Edit pictures or screen captures using paint 3D",
   new Date(2023, 1, 28),
   "pages/paint3d",
   "library/img/prototype.webp",
   "Colorful prototyping icon",
   new AttributionLink(
     "prototype icons",
     "Prototype icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/prototype",
     "Flaticon",
     "Paint 3D",
     9
   )
  ),
  new WebBit(
   "Dictionary",
   10,
   "Dictionary Terms",
   "List dictionary terms using a dictionary API",
   new Date(2023, 1, 30),
   "pages/dictionaryword",
   "library/img/dictionary.webp",
   "Dictionary icon depiction",
   new AttributionLink(
     "dictionary icons",
     "Dictionary icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/dictionary",
     "Flaticon",
     "Dictionary Terms",
     10
   )
  ),
  new WebBit(
   "Boinc",
   11,
   "Contribute for Science United",
   "Pivot the unused computing potential for science",
   new Date(2023, 2, 6),
   "pages/boinc",
   "library/img/boinc_glossy.webp",
   "BOINC logo",
   new AttributionLink(
     "BOINC icons",
     "BOINC icon designed by Michal Krakowiak. Copyright © 2024 University of California",
     "https://boinc.berkeley.edu/logo.php",
     "BOINC",
     "Contribute for Science United",
     11
   )
  ),
  new WebBit(
   "IPAddress",
   12,
   "IP Address Lookup",
   "Lookup public and local IP addresses",
   new Date(2023, 2, 13),
   "pages/ipaddress",
   "library/img/ip.webp",
   "IP location and browser icon",
   new AttributionLink(
     "IP icons",
     "IP icons created by kerismaker - Flaticon",
     "https://www.flaticon.com/free-icons/ip",
     "Flaticon",
     "IP Address Lookup",
     12
   )
  ),
  new WebBit(
   "HTMLMarkup",
   13,
   "HTML Source Code",
   "Reveal HTML source code and JavaScript",
   new Date(2023, 2, 26),
   "pages/markup",
   "library/img/HTML_source.webp",
   "HTML frames icon",
   new AttributionLink(
     "html icons",
     "Html icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/html",
     "Flaticon",
     "HTML Source Code",
     13
   )
  ),
  new WebBit(
   "Networkspeed",
   15,
   "Network Speed Test",
   "Test the network adapters with a PowerShell script",
   new Date(2023, 3, 7),
   "pages/networkspeed",
   "library/img/page-speed.webp",
   "Speed test dial icon",
   new AttributionLink(
     "page speed icons",
     "Page speed icons created by Prosymbols Premium - Flaticon",
     "https://www.flaticon.com/free-icons/page-speed",
     "Flaticon",
     "Network Speed",
     15
   )
  ),
  new WebBit(
   "PowerShelldrives",
   17,
   "PowerShell Drives",
   "Similar to an HDD, except it is only in PowerShell",
   new Date(2023, 3, 20),
   "pages/drives",
   "library/img/terminal.webp",
   "Computer terminal icon",
   new AttributionLink(
     "terminal icons",
     "Terminal icons created by Flat Icons - Flaticon",
     "https://www.flaticon.com/free-icons/terminal",
     "Flaticon",
     "PowerShell Drives",
     17
   )
  ),
  new WebBit(
    "LEARN__DNS",
    20,
    "How DNS works",
    "A general overview of Domain Name System",
    new Date(2023, 4, 4),
    "pages/dns",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/dns.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=N0I6zExpNJP0lW3gc8KYod%2FHGNS3WycF6L96e3Lu5J0%3D",
    "DNS drawing attached to a keyboard",
    new AttributionLink(
      "dns icons",
      "Dns icons created by kerismaker - Flaticon",
      "https://www.flaticon.com/free-icons/dns",
      "Flaticon",
      "LEARN: DNS",
      20
    )
  ),
  new WebBit(
   "LEARN__Google",
   22,
   "Google is #1 website",
   "Google is the #1 trafficked site",
   new Date(2023, 11, 19),
   "pages/googleplatform",
   "library/img/search-engine.webp",
   "A bar graph icon",
   new AttributionLink(
     "rank icons",
     "Rank icons created by Pixelmeetup - Flaticon",
     "https://www.flaticon.com/free-icons/rank",
     "Flaticon",
     "LEARN: Google",
     22
   )
  ),
  new WebBit(
    "DOM",
    23,
    "DOM",
    "Review the DOM with a DOM tree",
    new Date(2023, 4, 27),
    "pages/dom",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/tree.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=jsjxwlDs94Ln73rAumT3s62oHlW3hP3dgSnSBZQgY4M%3D",
    "A tree icon",
    new AttributionLink(
      "tree icons",
      "Tree icons created by justicon - Flaticon",
      "https://www.flaticon.com/free-icons/tree",
      "Flaticon",
      "DOM",
      23
    )
  ),
  new WebBit(
    "Webide",
    24,
    "WebIDE",
    "Try skipping the download by using a web IDE",
    new Date(2023, 5, 3),
    "pages/webides",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/ux.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=oPlqXi51DH1XvqFJGiHf9WUbnNhVKSXlEXS3yaiy62o%3D",
    "A computer application icon",
    new AttributionLink(
      "design icons",
      "Design icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/design",
      "Flaticon",
      "webides",
      24
    )
  ),
  new WebBit(
    "SVG",
    25,
    "SVG",
    "Find an SVG and learn about the SVG language",
    new Date(2023, 5, 9),
    "pages/svg",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/svg.svg?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=n9cOaqqUUc%2FAsKA4tTWwcELOGR9MrKCG6W3x9%2BiXJqs%3D",
    "An svg icon example.",
    new AttributionLink(
      "scalable vector graphics",
      "SVG icon created by Harvey Rayner",
      "http://www.w3.org/Graphics/SVG/",
      "W3C",
      "svg",
      25
    )
  ),
  new WebBit(
    "Disable_Javascript",
    26,
    "Disable JavaScript",
    "Disable the JavaScript to test website function",
    new Date(2023, 5, 22),
    "pages/javascript",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/software-application.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=8KVNzevk1BVPxjt4yHiuwDgbZ5%2FLDr7CZcIyMCASUW4%3D",
    "A javascript function icon.",
    new AttributionLink(
      "web coding icons",
      "Web coding icons created by Muhammad Atif - Flaticon",
      "https://www.flaticon.com/free-icons/web-coding",
      "Flaticon",
      "JavaScript",
      26
    )
  ),
  new WebBit(
   "LEARN__HTTP",
   28,
   "HTTP",
   "HTTP makes sending and receiving web pages possible.",
   new Date(2023, 6, 12),
   "pages/http",
   "library/img/http.webp",
   "Http verb in front of a globe icon.",
   new AttributionLink(
     "http icons",
     "Http icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/http",
     "Flaticon",
     "LEARN: HTTP",
     28
   )
  ),
  new WebBit(
    "CSSdef",
    29,
    "CSS",
    "CSS styles the elements within a page.",
    new Date(2023, 6, 19),
    "pages/css",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/css-3.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=RS3eNbMzXRSCikmisGzBPsRXyc0MfL9hXHYWWzV%2Bids%3D",
    "A CSS three logo.",
    new AttributionLink(
      "css icons",
      "Css icons created by Pixel perfect - Flaticon",
      "https://www.flaticon.com/free-icons/css",
      "Flaticon",
      "CSS",
      29
    )
  ),
  new WebBit(
    "Latency",
    32,
    "Latency",
    "Travel latency can slow down a website.",
    new Date(2023, 7, 18),
    "pages/latency",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/chronometer.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=t0Z%2FgjoXWDqbl4ntob8tHf%2F3WWxUs4LwZHlcWRqSMx4%3D",
    "A stopwatch icon.",
    new AttributionLink(
      "timer icons",
      "Timer icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/timer",
      "Flaticon",
      "Latency",
      32
    )
  ),
  new WebBit(
    "HTMLdef",
    33,
    "Create HTML elements",
    "Learn the parts and syntax of an HTML element",
    new Date(2023, 7, 25),
    "pages/html",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/html.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=JWJfy1F11Iu0BTunl%2F9ewF1ZMP%2FNWtJYOpymlCD4S74%3D",
    "HTML element syntax icon.",
    new AttributionLink(
      "html icons",
      "Html icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/html",
      "Flaticon",
      "Create HTML elements",
      33
    )
  ),
  new WebBit(
    "URL",
    34,
    "URL Address Examples",
    "Learn the parts and syntax of a URL",
    new Date(2023, 8, 7),
    "pages/url",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/www.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=Ph0sccxUiz673ccnGENTM8A0Ss%2BMAlIBWOYUfueG5Yk%3D",
    "URL example icon",
    new AttributionLink(
      "url icons",
      "Url icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/url",
      "Flaticon",
      "Create HTML elements",
      34
    )
  ),
  new WebBit(
   "DataStorage",
   35,
   "Data Storage",
   "Local storage saves data when needed for concurrent page surfing.",
   new Date(2023, 8, 14),
   "pages/datastorage",
   "library/img/server.webp",
   "Data storage icon",
   new AttributionLink(
     "server icons",
     "Server icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/server",
     "Flaticon",
     "Data Storage",
     35
   )
  ),
  new WebBit(
    "HSL",
    36,
    "Hue, Saturation, and Lightness",
    "HSL colors manipulate hues.",
    new Date(2023, 9, 6),
    "pages/hsl",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/color-wheel.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=ehnA34QzIKFRncHOTrICT9Iej%2Fsg%2BizTSrA5l53KDuM%3D",
    "Color wheel icon",
    new AttributionLink(
      "variety icons",
      "Variety icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/variety",
      "Flaticon",
      "Hue, Saturation, and Lightness",
      36
    )
  ),
  new WebBit(
   "To-Do_List",
   37,
   "To-Do List",
   "A ToDo list available through JavaScript and localStorage.",
   new Date(2023, 9, 28),
   "pages/todos",
   "library/img/check.webp",
   "To-do list notepad",
   new AttributionLink(
     "tasks icons",
     "Tasks icons created by popcornarts - Flaticon",
     "https://www.flaticon.com/free-icons/tasks",
     "Flaticon",
     "To-Do List",
     37
   )
  ),
  new WebBit(
    "Hyperlink",
    48,
    "Hyperlinks",
    "Hyperlinks allow people to navigate freely from one website to another.",
    new Date(2024, 1, 2),
    "/pages/hyperlink",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/backlink.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=TLGL0j7XjHJ4MzgZB8hiJWjfRy1scGv48SenhL3OhhQ%3D",
    "Icon depiction of two web pages connected by a hyperlink",
    new AttributionLink(
      "backlink icons",
      "Backlink icons created by nawicon - Flaticon",
      "https://www.flaticon.com/free-icons/backlink",
      "Flaticon",
      "LEARN: Hyperlinks",
      48
    )
  ),
  new WebBit(
    "WebAPI",
    49,
    "Web API",
    "Websites can share data via an API interaction.",
    new Date(2024, 1, 31),
    "/pages/api",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/api.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=suFPJSr85YrtuYIcg%2Bdd%2FYkg9F9NpTIPhqhneVAi5%2B4%3D",
    "Icon depicting a web browser api.",
    new AttributionLink(
      "api icons",
      "Api icons created by Eucalyp - Flaticon",
      "https://www.flaticon.com/free-icons/api",
      "Flaticon",
      "LEARN: Web API",
      49
    )
  ),
  new WebBit(
    "browserCursors",
    50,
    "Browser Cursors",
    "Browser cursors improve interaction by changing the pointer icon.",
    new Date(2024, 2, 19),
    "/pages/cursors",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/cursor.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=OuWNnzCZfWUj9ayD0K7Adko8J2n9bMX7%2FsHck22%2BWj0%3D",
    "Icon depicting a cursor.",
    new AttributionLink(
      "cursor icons",
      "Cursor icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/cursor",
      "Flaticon",
      "Browser Cursors",
      50
    )
  )
);

/**
 * "Guide Shorts' section card data."
 */
const guideShorts = new Array(
  new WebBit(
    "Httpscert",
    4,
    "HTTPS Certificate",
    "Select to view a website's HTTPS certificate",
    new Date(2022, 12, 26),
    "guides/https",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/https_cert.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=IBcLJYqd0qtebmKX7wu7iumg6pPt4MmMxmurolsz3i0%3D",
    "Cursor selecting HTTPS certificate",
    new AttributionLink(
      "ssl certificate icons",
      "Ssl certificate icons created by inipagistudio - Flaticon",
      "https://www.flaticon.com/free-icons/ssl-certificate",
      "Flaticon",
      "HTTPS Certificate",
      4
    )
  ),
  new WebBit(
    "Searchverticals",
    14,
    "GUIDE: Search Verticals",
    "Optimize your search engine news and results",
    new Date(2023, 2, 26),
    "guides/searchverticals",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/search_settings.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=9OR6UJkiINwOVhUb74dxIWuxe7rODoB3IYa2tF%2BYtNA%3D",
    "Search settings icon",
    new AttributionLink(
      "content writing icons",
      "Content writing icons created by Vectors Tank - Flaticon",
      "https://www.flaticon.com/free-icons/content-writing",
      "Flaticon",
      "Search Verticals",
      14
    )
  ),
  new WebBit(
    "SMTP",
    16,
    "GUIDE: SMTP and Email",
    "Learn Email protocols and port numbers",
    new Date(2023, 3, 13),
    "guides/smtp",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/communications.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=WpJI5awmDfJDiKW0mTzZpsSasCVX2eCmLIaWH%2FEVfME%3D",
    "Email server-stack with mail icon",
    new AttributionLink(
      "server icons",
      "Server icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/server",
      "Flaticon",
      "SMTP and Email",
      16
    )
  ),
  new WebBit(
    "Devtools",
    19,
    "GUIDE: Dev Application",
    "Review dev tool's application tab",
    new Date(2023, 3, 27),
    "guides/devtools/applicationtab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/tool-box.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=5hOrm1vAM3o7qtbgcFA57RH4fDDaxZ4XdEXidoYBaHc%3D",
    "Developer's tool kit icon",
    new AttributionLink(
      "toolbox icons",
      "Toolbox icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/toolbox",
      "Flaticon",
      "GUIDE: Dev Application",
      19
    )
  ),
  new WebBit(
   "Devtoolstwo",
   21,
   "GUIDE: Inspect Pages",
   "Open the developer's toolbox another way",
   new Date(2023, 4, 10),
   "guides/inspectpages",
   "library/img/tool-box2.webp",
   "Developer's tool kit icon two",
   new AttributionLink(
     "toolbox icons",
     "Toolbox icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/toolbox",
     "Flaticon",
     "GUIDE: Inspect Pages",
     21
   )
  ),
  new WebBit(
   "PWAIcon",
   27,
   "GUIDE: Install as PWA applications",
   "Progressive websites have an installation option",
   new Date(2023, 5, 27),
   "guides/pwaicon",
   "library/img/app-development.webp",
   "App development icon",
   new AttributionLink(
     "development icons",
     "Development icons created by Design Circle - Flaticon",
     "https://www.flaticon.com/free-icons/development",
     "Flaticon",
     "JavaScript",
     27
   )
  ),
  new WebBit(
   "Clearcookies",
   30,
   "GUIDE: Clear cookies quickly",
   "Don't waste time sifting through settings",
   new Date(2023, 7, 2),
   "guides/clearcookiesquickly",
   "library/img/cookies.webp",
   "Browser cookie icon",
   new AttributionLink(
     "cookie icons",
     "Cookie icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/cookie",
     "Flaticon",
     "GUIDE: Clear cookies quickly",
     30
   )
  ),
  new WebBit(
    "InspectElement",
    38,
    "Element Inspect",
    "See an element's metadata using hover details.",
    new Date(2023, 10, 9),
    "guides/elementinspect",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/checked.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=q2WDYTEQHTp9jLYystbqcbInI27nPoz%2BFMdNuo33Vdg%3D",
    "Inspect element icon depiction",
    new AttributionLink(
      "inspection icons",
      "Inspection icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/inspection",
      "Flaticon",
      "Element Inspect",
      38
    )
  ),
  new WebBit(
    "DevToolsElements",
    39,
    "Guide: Dev Elements",
    "Review dev tool's elements tab",
    new Date(2023, 10, 28),
    "guides/devtools/elementstab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/web-development.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=f3NzQusXSoeJafwCP4B2iaR4mEqzxo23JZNCpBF%2FDi8%3D",
    "Computer depiction of developer's tools",
    new AttributionLink(
      "development icons",
      "Development icons created by Flat-icons-com - Flaticon",
      "https://www.flaticon.com/free-icons/development",
      "Flaticon",
      "Guide: Dev Elements",
      39
    )
  ),
  new WebBit(
    "DevToolsConsole",
    40,
    "GUIDE: Dev Console",
    "Review dev tool's console tab",
    new Date(2023, 10, 29),
    "guides/devtools/consoletab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/terminal2.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=sYg9fdsUVnBe%2FO%2FhJ6MQ4TXB8J5oqLuAWFt9pqIS9eg%3D",
    "Icon depiction of developer's tools",
    new AttributionLink(
      "terminal icons",
      "Terminal icons created by Smashicons - Flaticon",
      "https://www.flaticon.com/free-icons/terminal",
      "Flaticon",
      "GUIDE: Dev Console",
      40
    )
  ),
  new WebBit(
    "DevToolsSources",
    41,
    "GUIDE: Dev Sources",
    "Review dev tool's sources tab",
    new Date(2023, 10, 30),
    "guides/devtools/sourcestab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/terminal3.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=h1a%2FM0bVoR6EekXuHXe68ukgNiAuCa766dwDAP0tY58%3D",
    "Icon depiction of developer's tools",
    new AttributionLink(
      "terminal icons",
      "Terminal icons created by Smashicons - Flaticon",
      "https://www.flaticon.com/free-icons/terminal",
      "Flaticon",
      "GUIDE: Dev Sources",
      41
    )
  ),
  new WebBit(
    "DevToolsNetwork",
    42,
    "GUIDE: Dev Network",
    "Review dev tool's network tab",
    new Date(2023, 10, 31),
    "guides/devtools/networktab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/terminal4.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=ZvXl7TFFcUXcJ%2FpZHgKKO5rqA8v7YtmvrVu89%2BaxYaM%3D",
    "Icon depiction of developer's tools",
    new AttributionLink(
      "terminal icons",
      "Terminal icons created by Smashicons - Flaticon",
      "https://www.flaticon.com/free-icons/terminal",
      "Flaticon",
      "GUIDE: Dev Network",
      42
    )
  ),
  new WebBit(
    "DevToolsPerformance",
    43,
    "GUIDE: Dev Performance",
    "Review dev tool's performance tab",
    new Date(2023, 11, 1),
    "guides/devtools/performancetab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/terminal5.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=0bojtrbCRXsQeTaktSFbciOzFxDEUlJXiBhlMR4bUew%3D",
    "Icon depiction of developer's tools",
    new AttributionLink(
      "terminal icons",
      "Terminal icons created by Smashicons - Flaticon",
      "https://www.flaticon.com/free-icons/terminal",
      "Flaticon",
      "GUIDE: Dev Performance",
      43
    )
  ),
  new WebBit(
    "DevToolsMemory",
    44,
    "GUIDE: Dev Memory",
    "Review dev tool's memory tab",
    new Date(2023, 11, 2),
    "guides/devtools/memorytab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/terminal6.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=6AQY6XasQhuE45pf3r%2FAp0%2FPaO4ymCGh4B1PKJia5RI%3D",
    "Icon depiction of developer's tools",
    new AttributionLink(
      "terminal icons",
      "Terminal icons created by Smashicons - Flaticon",
      "https://www.flaticon.com/free-icons/terminal",
      "Flaticon",
      "GUIDE: Dev Memory",
      44
    )
  ),
  new WebBit(
    "DevToolsSecurity",
    45,
    "GUIDE: Dev Security",
    "Review dev tool's security tab",
    new Date(2023, 11, 3),
    "guides/devtools/securitytab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/ssl.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=aG7PWVOB0R0iun9iYveLmddfR04OnjF2letcxEoJkZM%3D",
    "Icon depiction of security items: a lock and a shield",
    new AttributionLink(
      "ssl icons",
      "Ssl icons created by Freepik - Flaticon",
      "https://www.flaticon.com/free-icons/ssl",
      "Flaticon",
      "GUIDE: Dev Security",
      45
    )
  ),
  new WebBit(
    "DevToolsLighthouse",
    46,
    "GUIDE: Dev Lighthouse",
    "Review dev tool's Lighthouse tab",
    new Date(2023, 11, 19),
    "/guides/devtools/lighthousetab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/lighthouse.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=klp0dWSAZoUNpwDCPKlDBc5TNl0uCrpoGede5ON6zII%3D",
    "Icon depiction of a lighthouse",
    new AttributionLink(
      "lighthouse icons",
      "Lighthouse icons created by BZZRINCANTATION - Flaticon",
      "https://www.flaticon.com/free-icons/lighthouse",
      "Flaticon",
      "GUIDE: Dev Lighthouse",
      46
    )
  ),
  new WebBit(
    "DevToolsCSSOverview",
    47,
    "GUIDE: Dev CSS Overview",
    "Review dev tool's CSS Overview tab",
    new Date(2023, 11, 19),
    "/guides/devtools/cssoverviewtab",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/terminal7.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=yy9USHfNKfiUSHdgpwyv66hMFpbzwheP5s7b2Bt7X9Y%3D",
    "Icon depiction of developer's tools",
    new AttributionLink(
      "terminal icons",
      "Terminal icons created by Smashicons - Flaticon",
      "https://www.flaticon.com/free-icons/terminal",
      "Flaticon",
      "GUIDE: Dev CSS Overview",
      47
    )
  )
);

/**
 * "Explore section card data."
 */
const explores = new Array(
  new WebBit(
    "Nasa",
    3,
    "EXPLORE: NASA Pages",
    "Explore the NASA domain. Learn about the universe via NASA links",
    new Date(2022, 12, 18),
    "explore/nasa",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/NASA.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=VHJRiSewcRQJvZhFCfXhJQ5KeBV815M5cgvZxnV2tJ0%3D",
    "NASA Artemis Logo",
    new AttributionLink(
      "NASA",
      "Image source via the National Aeronautics and Space Administration",
      "https://www.nasa.gov/audience/forstudents/5-8/features/symbols-of-nasa.html",
      "NASA",
      "NASA Pages",
      3
    )
  ),
  new WebBit(
   "Virtualtour",
   18,
   "EXPLORE: Virtual Tours",
   "Explore the real world in a web browser",
   new Date(2023, 3, 23),
   "explore/virtualtour",
   "library/img/google-expeditions.webp",
   "Google Expeditions logo from FLATICON",
   new AttributionLink(
     "google expeditions icons",
     "Google expeditions icons created by Freepik - Flaticon",
     "https://www.flaticon.com/free-icons/google-expeditions",
     "Flaticon",
     "Virtual Tour",
     18
   )
  ),
  new WebBit(
    "Webb",
    31,
    "James Webb Space Telescope",
    "Discover the science mission of NASA's James Webb Space Telescope (JWST)",
    new Date(2023, 7, 3),
    "explore/webbtelescope",
    "https://agilestockfuncdev.blob.core.windows.net/appservices-rwb/JWST_poster.webp?sv=2025-01-05&se=2035-03-05T00%3A00%3A00Z&sr=b&sp=r&sig=OP37c7V30UEZ3zl%2BnBJqlVBq%2FGEyPgjxGcHRqlJzk7Q%3D",
    "James Webb space telescope poster image",
    new AttributionLink(
      "Hexagon Litho (2018)",
      "James Webb Space Telescope icon provided by nasa.gov",
      "https://jwst.nasa.gov/content/features/educational/print.html",
      "jwst.nasa.gov",
      "James Webb Space Telescope icon",
      31
    )
  )
);

/**
 * Multidimensional array. Rows are the different sections. Columns
 * contain each article's data belonging in that section.
 */
const WEBBITDATA = [arbitraryArticles, guideShorts, explores];
export default WEBBITDATA;
