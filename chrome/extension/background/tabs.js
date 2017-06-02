chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    if (changeInfo.audible) {
        console.log(`${tab.title} has been triggered`);
    }
});