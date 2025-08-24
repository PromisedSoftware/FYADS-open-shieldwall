const script = document.createElement("script");
script.src = chrome.runtime.getURL("js/before_load/requestInterceptor.js");
(document.head || document.documentElement).prepend(script);
script.remove();