chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'createNewTab') {
    chrome.tabs.create({ url: message.url});
    console.log(message.url);
  }
});


try {
  //ON page change
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      //if (changeInfo.url) {
      chrome.scripting.executeScript({
        files: ['contentScript.js'],
        target: { tabId: tab.id }
      });
      //}
    }
  });

  chrome.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      //if (changeInfo.url) {
      chrome.scripting.executeScript({
        files: ['contentScript.js'],
        target: { tabId: tab.id }
      });
      //}
    }
  });
} catch (e) {
  console.log(e);
}
