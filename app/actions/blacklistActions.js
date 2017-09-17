import * as types from '../constants/ActionTypes';

export const fetchBlacklist = () => {
  return dispatch => {
	getBlacklist()
	.then(blacklist => {
	  dispatch({ type: types.GET_BLACKLIST, blacklist })
	});
  }
};

export const addBlacklist = (item) => {
  return dispatch => {
	getBlacklist()
	.then((blacklist) => {
	  blacklist.push(item);
	  chrome.storage.sync.set({'blacklist': blacklist}, () => {
		updateExistingTabs(true, item);
		dispatch({ type: types.ADD_BLACKLIST, item});
	  });
	});
  }
};

export const removeBlacklist = (item) => {
  return dispatch => {
	getBlacklist()
	.then((blacklist) => {
	  blacklist = blacklist.filter(element => element.url != item.url);
	  chrome.storage.sync.set({'blacklist': blacklist}, () => {
		updateExistingTabs(false, item);
		dispatch({ type: types.REMOVE_BLACKLIST, item });
	  });
	})
  }
}

export const updateBlacklist = (item) => {
  return dispatch => {
	getBlacklist()
	.then((blacklist) => {
	  blacklist.forEach((element, index) => {
		if (element.url == item.url) {
		  blacklist[index] = item;
		}
	  });
	  chrome.storage.sync.set({'blacklist': blacklist}, () => {
		  updateExistingTabs(true, item);
		  dispatch({ type: types.UPDATE_BLACKLIST, item })
	  });
	})
  }
}

export const clearBlacklist = () => {
  return dispatch => {
	chrome.storage.sync.clear(() => dispatch({ type: types.CLEAR_BLACKLIST }));
  }
}

const updateExistingTabs = (shouldMute, item) => {
  chrome.tabs.query({}, (tabs) => {
	tabs.forEach((tab) => {
	  if (tab.url === item.url) {
		chrome.tabs.update(tab.id, {muted: shouldMute});
	  }
	})
  });
}

export const getBlacklist = () => {
  return new Promise((resolve, reject) => {
	   chrome.storage.sync.get('blacklist', (obj) => {
	   if (!Object.keys(obj).length)
		 resolve([]);

	  resolve(obj.blacklist);
	  });
  });
};
