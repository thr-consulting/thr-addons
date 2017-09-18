import {Map} from 'immutable';
import {ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_MESSAGES} from './messagesActions';

const initialState = new Map();

export default function(state = initialState, action) {
	const {message, id, type} = action;

	switch (type) {
		case ADD_MESSAGE:
			return state.set(message.id, message);

		case CLEAR_MESSAGE:
			return state.delete(id);

		case CLEAR_MESSAGES:
			return state.clear();

		default:
			return state;
	}
}
