const VideoManager = function () {
    let ytvideo = document.querySelector(".video-stream");
    let progressbar = document.querySelector('.ytp-progress-bar-container .ytp-play-progress');
    const adProgressBarColor = "rgb(255, 204, 0)";

    function isAdPlaying() {
        if (!window.location.href.includes("youtube.com/watch")) return false;
        let currentProgressBarColor;
        try {
            currentProgressBarColor = window.getComputedStyle(progressbar)
                .getPropertyValue("background-color");
        } catch (error) {
            progressbar = document.querySelector('.ytp-progress-bar-container .ytp-play-progress');
        }
        return currentProgressBarColor === adProgressBarColor;
    }

    function skipAd() {
        try {
            if (ytvideo.currentTime) {
                ytvideo.currentTime = ytvideo.duration + 1;
            }
        } catch (error) {
            ytvideo = document.querySelector(".video-stream");
            skipAd();
        }
    }

    let observer;
    let observedNode = null;
    const observerConfig = { attributes: true, childList: true, subtree: true };
    const observerCallback = function(){
        if (isAdPlaying()) {
            skipAd();
        }
    }

    function enableObserver() {
        window.addEventListener("hashchange", async () => {
            if (!window.location.href.includes("youtube.com/watch")) return;
            observedNode = await forceFindingNode(".html5-video-player");
            observer = new LimitedMutationObserver(
                observerCallback, observerConfig, observedNode
            );
            observer.observe();
        });
        window.dispatchEvent(new Event("hashchange"));
    }

    function disableObserver(){
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
};