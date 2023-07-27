const textAreaValue = document.getElementById("urls");
chrome.storage.sync.get(["0"], (data)=>(textAreaValue.innerHTML = data[0]))

textAreaValue.addEventListener("keyup",() => {
    chrome.storage.sync.set({0:textAreaValue.value})
    
});

const openButton = document.getElementById("openbtn");
openButton.addEventListener("click", () => {
    chrome.storage.sync.get(["0"], (data)=>{
        var urlLinks = data[0].split('\n').filter(url => url!=="");
        chrome.tabs.query({active:true, lastFocusedWindow:true}, (tabs) => {
            var currentUrl = tabs[0].url;
            if (currentUrl === "chrome://newtab/") {
                chrome.tabs.update({url: urlLinks[0]});
                var startIndex = 1
            } else {
                var startIndex = 0;
            }
            for (let index=startIndex;index<urlLinks.length;index++) {
                var openUrl = urlLinks[index]
                if (openUrl.slice(0,4)!="http") {
                    openUrl = "http://" + openUrl;
                }
                chrome.tabs.create({url: openUrl});
            }
        });
    });
});