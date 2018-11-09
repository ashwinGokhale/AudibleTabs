function saveState(state) {
	chrome.storage.local.set({ state: JSON.stringify(state) });
}

// tabs unmarked count
function setBadge(tabs) {
	if (chrome.browserAction) {
		const count = tabs.length;
		chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
	}
}

export default function() {
	return next => (reducer, initialState) => {
		const store = next(reducer, initialState);
		store.subscribe(() => {
			const state = store.getState();
			saveState(state);
			setBadge(state.tabs);
		});
		return store;
	};
}
