chrome.storage.local.get('tabs', (obj) => {
  let tabs = obj.tabs;
  if (tabs) {
    tabs = JSON.parse(tabs);
    const len = tabs.length;
    if (len > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {
    // Initial
    chrome.browserAction.setBadgeText({ text: '1' });
  }
});
