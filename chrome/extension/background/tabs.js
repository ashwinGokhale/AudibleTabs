// Handle all commands
chrome.commands.onCommand.addListener( (command) => {
	switch (command) {
		case "Show":
			chrome.tabs.query({audible: true}, (tabs) => {
				alert(
					tabs.reduce((message, tab, i) => message += `${i+1}) ${tab.title}\n` , '')
				);
			});

			break;
		
		case "Close":
			chrome.tabs.query({audible: true}, (tabs) => {
				chrome.tabs.remove(tabs.map(tab => tab.id));
			});
			break;

		case "Mute":
			chrome.tabs.getSelected( (tab) => {
            	chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
        	});
			break;
		
		case "MuteAll":
			chrome.tabs.query({audible: true}, (tabs) => {
            	tabs.forEach((tab) => {
                	chrome.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
            	});
        	});
			break;
	
		default:
			break;
	}
});

// Update badge icon when popup is not active
chrome.tabs.onUpdated.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));
chrome.tabs.onRemoved.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));
chrome.tabs.onCreated.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));

function setBadge(tabs) {
  if (chrome.browserAction) {
    const count = tabs.length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}