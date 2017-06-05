import { combineReducers } from 'redux';
import tabs from './tabs';
import blacklist from './blacklist';

export default combineReducers({
  tabs,
  blacklist
});
