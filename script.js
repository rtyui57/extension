document.querySelector(".openNewTab").addEventListener('click', function() {
    console.log("Executing")
    chrome.tabs.query({currentWindow: true, active:true}, function(tabs){
        var activeUrl = tabs[0].url
        chrome.tabs.create({ url : activeUrl + "/zip"})
    })
})