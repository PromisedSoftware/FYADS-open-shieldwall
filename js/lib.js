function forceFindingNode(selector) {
    if (!selector) throw new Error("query selector cannot be : \"" + selector + "\"");

    return new Promise((resolve) => {
        let interval_id = null;
        let htmlElement = null;
        if (!interval_id) interval_id = setInterval(() => {
            htmlElement = document.querySelector(selector);
            if (htmlElement){
                clearInterval(interval_id);
                interval_id = null;
                resolve(htmlElement)
            };
        }, 2);
    });
}