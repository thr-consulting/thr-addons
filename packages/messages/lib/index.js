import {
	addMessage,
	addErrorMessage,
	addSuccessMessage,
	addWarnMessage,
	clearMessage,
	clearMessages,
} from './messagesActions';
import messagesReducer from './messagesReducer';
import Messages from './Messages';

/**
 * Clears all messages if messages exist. Call from route.onChange().
 * @param store - Redux store
 */
function clearAllMessages(store) {
	if (store.getState().get('messages').size > 0) store.dispatch(clearMessages());
}

export {
	addMessage,
	addErrorMessage,
	addSuccessMessage,
	addWarnMessage,
	clearMessage,
	clearMessages,
	clearAllMessages,
	messagesReducer,
	Messages,
};
