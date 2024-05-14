import {
    FAVORITES_SCREEN_DATA,
    FAVORITES_SCREEN_DATA_SUCCESS,
    FAVORITES_SCREEN_DATA_FAIL,
  
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingFavorites: true,
    connectionError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FAVORITES_SCREEN_DATA:
            return { ...state, res: action.payload, loadingFavorites: true,  type: action.type };
        case FAVORITES_SCREEN_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingFavorites: false, type: action.type, userToken: action.user };
        case FAVORITES_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingFavorites: false, type: action.type };

       
        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

