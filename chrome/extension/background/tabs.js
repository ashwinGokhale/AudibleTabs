
var audibleTabObjects;
var audibleTabTitles;
var audibleTabIDs;
var allKeys;
var allBlacklistedURLs;
var check;


function makeTabsString(audibleTabTitles){
        var result = "These tabs are playing audio:\n\n";
            for (var i = 0; i < audibleTabTitles.length; i++) {
                result += (i + 1) + ") " + audibleTabTitles[i] +"\n\n";
            }

            result += "To close all these tabs, press Ctrl(Command)+Shift+C";

            return result;
}

function getTabTitles(){
    audibleTabTitles = [];

    chrome.tabs.query({audible: true}, function(tabs){
         tabs.forEach(function(tab){
            audibleTabTitles.push(tab.title);
          });
        check = makeTabsString(audibleTabTitles);
        });

    return check;
}

function getTabObjects(){
    audibleTabObjects = [];

    chrome.tabs.query({audible: true}, function(tabs){
         tabs.forEach(function(tab){
            audibleTabObjects.push(tab);
          });
    });

    return audibleTabObjects;

}

function closeTabs(){
    audibleTabIDs = [];
    var tempTitles = [];

    chrome.tabs.query({audible: true}, function(tabs){
         tabs.forEach(function(tab){
            audibleTabIDs.push(tab.id);
            tempTitles.push(tab.title);
        });

         if (audibleTabIDs.length == 0) {
            alert("There are no tabs to close");
         }
         else{
            chrome.tabs.remove(audibleTabIDs);

            var tabsClosed = "These tabs have been closed:\n\n";
            for (var i = 0; i < tempTitles.length; i++) {
                tabsClosed += (i+1) + ") " + tempTitles[i] + "\n\n";
            }

            alert(tabsClosed);
        }
      });
}

function getBlacklistedItems(){
    chrome.storage.sync.get(null, function(items) {
        allBlacklistedURLs = [];
        allKeys = Object.keys(items);
        $('#status-message').text("All items have been loaded");

        var getItems = [];
        for (var i = 0; i < allKeys.length; i++) {
            getItems.push(i.toString());
        }

        chrome.storage.sync.get(getItems, function(items) {
            var keys = Object.keys(items);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                $('#to-be-replaced'+i).html(items[key]);
                //addRow();
            }
        });
    });
}

function addRow() {
    blacklistRow++;
    var rowToAdd = '<tr><td><button class="btn btn-primary" id="add-row">Add</button></td>'+
        '<td><button class="btn btn-primary" id="remove-row">Remove</button></td>' +
        '<td><span id="to-be-replaced' + blacklistRow + '"><a id="add-blacklisted">Click here to add entry</a></span><br></td>' +
        '</tr>';

    $('#blacklist-table tr:last').after(rowToAdd);
}


chrome.commands.onCommand.addListener(function (command) {

    // If user presses Ctrl+Shift+S
    if (command === "Show") {
        getTabTitles();

        var endPrint;
        setTimeout(function(){endPrint = check;},100); 

        // Delay the printing of endPrint so that endPrint correctly initializes with the proper String value after getTabTitles is called
        setTimeout(function(){ 
            if (endPrint.length > 84) 
                {alert(endPrint);}

            else{
                alert("There are no tabs currently playing audio");
            }; 

        }, 150);
    }

    // If user presses Ctrl+Shift+C
    if (command === "Close") {
        closeTabs();
    }

    // If user presses Ctrl+Shift+M
    if (command === "Mute") {
        chrome.tabs.getSelected(function (tab){
            chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
        });
    }

    // If User presses Ctrl+Shift+A
    if (command === "MuteAll") {
        chrome.tabs.query({audible: true}, function(tabs){
            tabs.forEach(function(tab){
                chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
            });
        });
    }


});

// Returns an array of all audible tab objects when prompted in popup.js
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    var whichRequest = request.callingBackground;

    if (whichRequest == "requestingTabs")
      sendResponse({sendingTabObjects: getTabObjects()});

    setTimeout(function(){
        if (whichRequest == "highlightThisTab") 
            chrome.tabs.highlight({'tabs': parseInt(request.whichTab)}, function() {});

        else if (whichRequest == "closeThisTab")
            chrome.tabs.remove(parseInt(request.whichTab), function() {});

        else if (whichRequest == "muteThisTab") {
            chrome.tabs.get(parseInt(request.whichTab), function(tab){
                chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
            });
        }    
    },100);

    if (request.getBlacklistedItems == 'needBlacklistedItems')
        sendResponse({sendingBlacklistedItems: getBlacklistedItems()});

    if (request.addBlacklistedURL == 'addURL') {
        allBlacklistedURLs.push(request.thisURL);
        setTimeout(function () {
            chrome.tabs.query({url: allBlacklistedURLs}, function(tabs){
                for (var i = 0; i < tabs.length; i++) {
                    if (allBlacklistedURLs.indexOf(tabs.url) != -1)
                        chrome.tabs.update(tabs.id, {muted: true});
                }
            });
        },100);
    }
});