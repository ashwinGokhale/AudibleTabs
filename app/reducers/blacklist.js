import * as types from '../constants/ActionTypes';

export default function tabs(state = [], action = {}) {
	switch (action.type) {
		case types.GET_BLACKLIST:
			console.log(action);
			return action.blacklist;

		case types.REMOVE_BLACKLIST:
			return state.filter(tab => tab.url != parseInt(action.url));

		case types.ADD_BLACKLIST:
			return action.blacklist;

		default:
			return state;
	}
}