class LimitedMutationObserver{
    #_observer;
    #_node;
    #_config;
    #_defaultLimitMs;
    constructor(callback,config,node){
        if(!callback) throw new Error("Callback function cannot be unspecified");
        if(!config) console.warn("Observer configuration was not specified, remember to add it later");
        if(!node) console.warn("Observer node was not specified, remember to add it later");
        this.#_observer = new MutationObserver(()=>{
            callback();
            this.#limtObserver(this.#_defaultLimitMs);
        });
        this.#_node = node;
        this.#_config = config;
        this.#_defaultLimitMs = 16;
    }

    enableObserver(){
        if(!this.#_config) throw new Error("Observer configuration is invalid: " + this.#_config);
        return this.#_observer.observe(this.#_node,this.#_config);
    }
    setNode(node){
        this.#_node = node;
    }
    setConfig(config){
        this.#_config = config;
    }
    disconnect(){
        return this.#_observer.disconnect();
    }
    takeRecords(){
        return this.#_observer.takeRecords();
    }
    observe(){
        return this.enableObserver();
    }
    limitRate(milliseconds){
        this.#_defaultLimitMs = milliseconds;
    }

    #_timeout_observer_id = null;
    #limtObserver(maxRefreshRate){
        this.disconnect();
        this.takeRecords();
        if(this.#_timeout_observer_id) return;
        this.#_timeout_observer_id = setTimeout(()=>{
            this.#_observer.observe(this.#_node,this.#_config);
            this.#_timeout_observer_id = null;
        },maxRefreshRate);
    }
}