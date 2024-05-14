import {
    GET_FRIEND_REQUESTS_DATA,
    GET_FRIEND_REQUESTS_DATA_SUCCESS,
    GET_FRIEND_REQUESTS_DATA_FAIL,
    SET_FRIEND_RESPONSE_DATA,
    SET_FRIEND_RESPONSE_DATA_SUCCESS,
    SET_FRIEND_RESPONSE_DATA_FAIL,
    GET_MESSAGES_DATA,
    GET_MESSAGES_DATA_SUCCESS,
    GET_MESSAGES_DATA_FAIL,
    GET_CHAT_DATA,
    GET_CHAT_DATA_SUCCESS,
    GET_CHAT_DATA_FAIL,
    GET_CHAT_MESSAGES_DATA,
    GET_CHAT_MESSAGES_DATA_SUCCESS,
    GET_CHAT_MESSAGES_DATA_FAIL,
    SEND_MESSAGE_DATA,
    SEND_MESSAGE_DATA_SUCCESS,
    SEND_MESSAGE_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    connectionError: false,
    loadingGetChatMessages: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FRIEND_REQUESTS_DATA:
            return { ...state, res: action.payload, loadingFriendRequests: true, type: action.type };
        case GET_FRIEND_REQUESTS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingFriendRequests: false, type: action.type, userToken: action.user };
        case GET_FRIEND_REQUESTS_DATA_FAIL:
            return { ...state, res: action.payload, loadingFriendRequests: false,  type: action.type };

        case SET_FRIEND_RESPONSE_DATA:
            return { ...state, res: action.payload, loadingSetFriendResponse: true, type: action.type };
        case SET_FRIEND_RESPONSE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSetFriendResponse: false, type: action.type };
        case SET_FRIEND_RESPONSE_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetFriendResponse: false, type: action.type };

        case GET_MESSAGES_DATA:
            return { ...state, res: action.payload, loadingGetMessages: true, type: action.type };
        case GET_MESSAGES_DATA_SUCCESS: 
            return { ...state, res: action.payload, loadingGetMessages: false, type: action.type, userToken: action.user };
        case GET_MESSAGES_DATA_FAIL:
            return { ...state, res: action.payload, loadingGetMessages: false, type: action.type };

        case GET_CHAT_DATA:
            return { ...state, res: action.payload, loadingGetChat: true, type: action.type };
        case GET_CHAT_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingGetChat: false, type: action.type, userToken: action.user };
        case GET_CHAT_DATA_FAIL:
            return { ...state, res: action.payload, loadingGetChat: false, type: action.type };

        case GET_CHAT_MESSAGES_DATA:
            return { ...state, res: action.payload, loadingGetChatMessages: true, type: action.type };
        case GET_CHAT_MESSAGES_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingGetChatMessages: false, type: action.type, userToken: action.user };
        case GET_CHAT_MESSAGES_DATA_FAIL:
            return { ...state, res: action.payload, loadingGetChatMessages: false, type: action.type };

        case SEND_MESSAGE_DATA:
            return { ...state, res: action.payload, loadingSendMessage: true, type: action.type };
        case SEND_MESSAGE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSendMessage: false, type: action.type, userToken: action.user };
        case SEND_MESSAGE_DATA_FAIL:
            return { ...state, res: action.payload, loadingSendMessage: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

