
// Returns an array of all audible tab objects when prompted in popup.js
var audibleTabObjects;

function getAllTabs(){
    audibleTabObjects = [];
    chrome.tabs.query( {}, (tabs) => {
         tabs.forEach(function(tab){
            audibleTabObjects.push(tab);
          });
    });
    return audibleTabObjects;
    
}

chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
    var whichRequest = request.callingBackground;

    if (whichRequest == "requestingTabs"){
      let tabs = getAllTabs();
      console.log(tabs);
      sendResponse({sendingTabObjects: tabs});
    }

    if (request.getBlacklistedItems == 'needBlacklistedItems')
        sendResponse({sendingBlacklistedItems: getBlacklistedItems()});
});