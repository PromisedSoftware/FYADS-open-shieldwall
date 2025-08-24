// https://googlesyndication.com
// https://ad.doubleclick.net
// https://googleads.g.doubleclick.net/pagead/id
// https://www.youtube.com/youtubei/v1/player/ad_break?prettyPrint=false
// https://www.youtube.com/pagead/adview?ai
// https://www.youtube.com/api/stats/qoe?fmt
const adServices = [
    {i:[14,15,16,25], a:["s","y","n","."]},
    {i:[8,9,10], a:["a","d","."]},
    {i:[14,15,16,17], a:["a","d","s","."]},
    {i:[42,43,44,45], a:["/","a","d","_"]},
    {i:[28,29,31,32], a:["a","d", "a","d"]},
    {i:[34,35,36,37], a:["q","o","e", "?"]},
];

const isLinkForbidden = function (arg) {
    let link;
    if(typeof arg === "string" ) link= arg;
    else if(arg instanceof Request) link = arg.url;
    else link = String(arg);

    for (let i = 0; i < adServices.length; i++) {
        for(let j=0; j< adServices[i].i.length; j++){
            if(
                link.charAt(adServices[i].i[j]) !== adServices[i].a[j]
            )break;
            if(j+1 >= adServices[i].i.length){
                return true;
            }
        }
    }
    return false;
}

function Filter(callback){
    function isRuleViolated(...args){
        return callback(...args);
    }
    return{violateRules:(...args)=>isRuleViolated(...args)}
}
function FilterChain(){
    const filters =[];
    function isAllowedToPass(...args){
        for(let i=0; i< filters.length; i++){
            if(filters[i].violateRules(...args)) return false;
        }
        return true;
    }
    return{
        addFilter:function(callback){filters.push(Filter(callback)); return this;},
        isAllowed:(...args)=>{return isAllowedToPass(...args);}
    }
}

const fetchRequestInterceptor = (() => {
    const requestFilterChain = FilterChain();
    const responseFilterChain = FilterChain();
    requestFilterChain.addFilter(isLinkForbidden);

    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        let isOk = requestFilterChain.isAllowed(...args);
        if(!isOk){
            console.log("Youtube request not allowed, blocked");
            return new Promise("",{status:200});
        }
        return originalFetch(...args);
    }
})();