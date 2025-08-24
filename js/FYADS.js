const FYADS = (videoManager,watchManager)=>{
    return {
        videoAdSkipping:function(enable){
            videoManager.setEnabled(enable);
            return this;
        },
        confirmWatching:function(enable){
            watchManager.setEnabled(enable);
            return this;
        }
    }
}