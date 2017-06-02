import * as types from '../constants/ActionTypes';

export default function tabs(state = [], action = {}) {
  switch (action.type) {
    case types.GET_TABS:
      return action.tabs;
    

    case types.CLOSE_TAB:
      return state.filter(tab => tab.id !== parseInt(action.id));
    
    case types.HIGHLIGHT_TAB:
      return action.tabs;
    
    case types.MUTE_TAB:
      return action.tabs;
  
    default:
      return state;
  }
}