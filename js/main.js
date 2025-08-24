let videoAdManager = VideoManager();
let watchManager = WatchManager(); //experimental
const fyads = FYADS(videoAdManager,watchManager);

requestAnimationFrame(()=>{
    fyads // Enable all features and start
        .videoAdSkipping(true)
        .confirmWatching(true)
});