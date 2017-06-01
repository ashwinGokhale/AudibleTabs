import * as types from '../constants/ActionTypes';

export const getTabs = (tabs) => {
  return { type: types.GET_TABS, tabs };
}

export const removeTab = (id) => {
  return { type: types.CLOSE_TAB, id}
}

export const muteTab = (id) => {
  return { type: types.MUTE_TAB, id}
}

export const setTab = (id) => {
  return { type: types.HIGHLIGHT_TAB, id}
}

export const fetchTabs = () => {
  return dispatch => {
    getAllTabs()
    .then(tabs => dispatch(getTabs(tabs)));
  }
}

export const closeTab = (id) => {
  return dispatch => {
    chrome.tabs.remove(parseInt(id), () => {
      console.log('Removing: ', id);
      dispatch(removeTab({id: id}));
    });
  }
}

export const highlightTab = (id) => {
  return dispatch => {
    chrome.tabs.highlight({'tabs': parseInt(id)}, () => {
      dispatch(setTab({id: id}));
    });
  }
}

export const getAllTabs = () => {
  return new Promise((resolve, reject) => {
      chrome.tabs.query({/*audible: true*/}, function(tabs) {
          resolve(tabs);
      });
  });
}