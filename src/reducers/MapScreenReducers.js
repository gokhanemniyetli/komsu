import {
    MAP_SCREEN_DATA,
    MAP_SCREEN_DATA_SUCCESS,
    MAP_SCREEN_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingMap: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAP_SCREEN_DATA:
            return { ...state, res: action.payload, loadingMap: true, type: action.type };
        case MAP_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingMap: false, type: action.type, userToken: action.user };
        case MAP_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingMap: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

