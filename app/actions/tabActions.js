import * as types from '../constants/ActionTypes';

export function getTabs() {
  return { type: types.GET_TABS };
}

export function closeTab(id){
  return { type: types.CLOSE_TAB, id}
}

export function muteTab(id){
  return { type: types.MUTE_TAB, id}
}

export function highlightTab(id){
  return { type: types.HIGHLIGHT_TAB, id}
}