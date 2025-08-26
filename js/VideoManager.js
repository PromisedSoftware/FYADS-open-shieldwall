const VideoManager = function () {
    const NAME_ID = "video_manager";
    const videoSelector = ".video-stream.html5-main-video";
    const progressBarSelector = ".ytp-progress-bar-container .ytp-play-progress";
    let ytvideo = document.querySelector(videoSelector);

    let progressbar = document.querySelector(progressBarSelector);
    const adProgressBarColor = "rgb(255, 204, 0)";

    function isAdPlaying() {
        if (!window.location.href.includes("youtube.com/watch")) return false;
        let currentProgressBarColor;
        try {
            currentProgressBarColor = window.getComputedStyle(progressbar)
                .getPropertyValue("background-color");
        } catch (error) {
            progressbar = document.querySelector(progressBarSelector);
        }
        return currentProgressBarColor === adProgressBarColor;
    }

    function skipAd() {
        try {
            if (ytvideo.currentTime) {
                ytvideo.currentTime = ytvideo.duration + 1;
            }
        } catch (error) {
            ytvideo = document.querySelector(videoSelector);
            skipAd();
        }
    }

    let observer;
    let observedNode = null;
    const observerConfig = { attributes: true, childList: false, subtree: false };
    const observerCallback = function(){
        console.log("callback called")
        if (isAdPlaying()) skipAd();
    }

    async function enableObserver() {
        observedNode = await forceFindingNode(".html5-video-player#movie_player",20,null);
        console.log(observedNode);
        console.log("constr obs");
        observer = new LimitedMutationObserver(
                observerCallback, observerConfig, observedNode);
        observer.observe();
    }

    function disableObserver(){
        observer.disconnect();
    }

    return {
        getId:()=>{return NAME_ID},
        setEnabled: (isEnabled) => {
            if (isEnabled) enableObserver();
            else disableObserver();
        }
    }
};