import {getBlacklist}  from '../../../app/actions/blacklistActions'

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
chrome.windows.onCreated.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));
chrome.tabs.onUpdated.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));
chrome.tabs.onRemoved.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));
chrome.tabs.onCreated.addListener(() => chrome.tabs.query({audible: true}, (tabs) => setBadge(tabs)));

// Mute tabs on the blacklist
chrome.tabs.onCreated.addListener(() => chrome.tabs.query({}, (tabs) => updateBlacklist(tabs)));
chrome.tabs.onUpdated.addListener(() => chrome.tabs.query({}, (tabs) => updateBlacklist(tabs)));
chrome.tabs.onRemoved.addListener(() => chrome.tabs.query({}, (tabs) => updateBlacklist(tabs)));

const updateBlacklist = (tabs) => {
	getBlacklist()
	.then((blacklist) => {
		blacklist.forEach((item) => {
			tabs.forEach((tab) => {
				if (tab.url === item.url) {
					chrome.tabs.update(tab.id, {muted: true});
				}
			})
		})
	})
}

const setBadge = (tabs) => {
  if (chrome.browserAction) {
    const count = tabs.length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}