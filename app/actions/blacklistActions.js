import * as types from '../constants/ActionTypes';

export const fetchBlacklist = () => {
  return dispatch => {
    getBlacklist()
    .then(blacklist => dispatch({ type: types.GET_BLACKLIST, blacklist }));
  }
};

export const addBlacklist = (item) => {
  getBlacklist()
  .then((blacklist) => {
    blacklist = [...blacklist, item]
    chrome.storage.sync.set({'blacklist': blacklist}, () => dispatch({ type: types.ADD_BLACKLIST, blacklist}));
  });
};

export const removeBlacklist = (item) => {
  return new Promise((resolve, reject) => {
    getBlacklist()
    .then((blacklist) => {
      blacklist = blacklist.filter(tab => tab.url != item.url);
      chrome.storage.sync.set({'blacklist': blacklist}, () => dispatch({ type: types.REMOVE_BLACKLIST, blacklist }));
    })
  })
}

export const getBlacklist = () => {
  return new Promise((resolve, reject) => {
	   chrome.storage.sync.get('blacklist', (obj) => {
       if (!obj)
         resolve([]);
       
       else
         resolve(obj.blacklist)
      });
  });
};