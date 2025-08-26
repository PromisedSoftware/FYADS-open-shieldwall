/*
* Query selector is invoked immidietly, then it predicts if next interval will be
* called within max time, if false it will call reject before counter hit maximum time.
* this is designed to find element or terminate as soon as possible and should stay that way.
*/
function forceFindingNode(selector, intervalMS = 20, maxTime = null) {
    if (!selector) throw new Error("query selector cannot be : \"" + selector + "\"");
    if (intervalMS < 1) intervalMS = 1;

    return new Promise((resolve,reject) => {
        let interval_id = null;
        let htmlElement = null;
        let currentTime = 0;
        if (!interval_id) interval_id = setInterval((() => {
            function find() {
                currentTime += intervalMS;
                htmlElement = document.querySelector(selector);
                if (htmlElement) {
                    clearInterval(interval_id);
                    interval_id = null;
                    resolve(htmlElement)
                }
                else if(currentTime >= maxTime && maxTime !== null) reject();
            }
            return find;
        })(), intervalMS);
    });
}