import {
    USER_SORT_SCREEN_DATA,
    USER_SORT_SCREEN_DATA_SUCCESS,
    USER_SORT_SCREEN_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingUserSort: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SORT_SCREEN_DATA:
            return { ...state, res: action.payload, loadingUserSort: true, type: action.type };
        case USER_SORT_SCREEN_DATA_SUCCESS:
            //debugger
            return { ...state, res: action.payload, loadingUserSort: false, type: action.type, userToken: action.user };
        case USER_SORT_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingUserSort: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

