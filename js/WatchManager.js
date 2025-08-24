/**
 * Experimental
 */
const WatchManager = function () {
    function isPanelDisplayed() {
        const button = document.querySelector("tp-yt-paper-dialog #confirm-button button");
        return button? true:false;
    }

    function confirmWatching() {
        const button = document.querySelector("tp-yt-paper-dialog #confirm-button button");
        button.click();
        button.remove();
    }

    let observer;
    let observedNode = null;
    const observerConfig = { attributes: true, childList: true, subtree: true };
    const observerCallback = function () {
        if (isPanelDisplayed()) confirmWatching();
    }

    function enableObserver() {
        window.addEventListener("hashchange", async () => {
            if (!window.location.href.includes("youtube.com/watch")) return;
            observedNode = await forceFindingNode("tp-yt-app-drawer");
            observer = new LimitedMutationObserver(
                observerCallback, observerConfig, observedNode
            );
            observer.limitRate(200);
            observer.observe();
        });
        window.dispatchEvent(new Event("hashchange"));
    }

    function disableObserver() {
        if(!observer) return;
        observer.disconnect();
        observer.takeRecords();
        observedNode = null;
        observer = null;
    }

    return {
        setEnabled: (isEnabled) => {
            if (isEnabled) enableObserver();
            else disableObserver();
        }
    }
}