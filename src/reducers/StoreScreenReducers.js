import {
    STORE_SCREEN_DATA,
    STORE_SCREEN_DATA_SUCCESS,
    STORE_SCREEN_DATA_FAIL,
    SET_STORE_FAVORITE_DATA_SUCCESS,
    SET_STORE_FAVORITE_DATA_FAIL,
    SET_STORE_FAVORITE_DATA,
    CONNECTION_ERROR,

    GET_DATA
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingStore: true,
    loadingStoreDetail: true,
    loadingOpportunity: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_SCREEN_DATA:
            return { ...state, res: action.payload, loadingStore: true, loadingStoreDetail: true, loadingOpportunity: true, type: action.type };
        case STORE_SCREEN_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingStore: false, loadingStoreDetail: false, loadingOpportunity: false, type: action.type, userToken: action.user };
        case STORE_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingStore: false, loadingStoreDetail: false, loadingOpportunity: false, type: action.type };

        case SET_STORE_FAVORITE_DATA:
            return { ...state, res: action.payload, loadingSetStoreFavorite: true, type: action.type, changedID: 0 };
        case SET_STORE_FAVORITE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSetStoreFavorite: false, type: action.type, changedID:action.changedID  };
        case SET_STORE_FAVORITE_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetStoreFavorite: false, type: action.type };
        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        case GET_DATA:
            return { ...state };
        default:
            return state;
    }
};

