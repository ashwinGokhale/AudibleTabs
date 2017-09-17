import * as types from '../constants/ActionTypes';

export default function tabs(state = [], action = {}) {
	switch (action.type) {
		case types.GET_BLACKLIST:
			return action.blacklist;
		
		case types.ADD_BLACKLIST:
			return [...state, action.item];

		case types.UPDATE_BLACKLIST:
			return state.map(element => {
				if (element.url === action.item.url) return action.item;
				return element;
			});

		case types.REMOVE_BLACKLIST:
			return state = state.filter(element => element.url !== action.url);;
		
		case types.CLEAR_BLACKLIST:
			return [];

		default:
			return state;
	}
}