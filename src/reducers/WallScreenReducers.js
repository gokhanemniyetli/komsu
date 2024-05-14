import {
    WALL_USER_SCREEN_DATA,
    WALL_USER_SCREEN_DATA_SUCCESS,
    WALL_USER_SCREEN_DATA_FAIL,
    WALL_POSTS_SCREEN_DATA,
    WALL_POSTS_SCREEN_DATA_SUCCESS,
    WALL_POSTS_SCREEN_DATA_FAIL,
    EXTRA_DATA,
    EXTRA_DATA_SUCCESS,
    
    CONNECTION_ERROR 
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
        case WALL_USER_SCREEN_DATA:
            //debugger
            return { ...state, resUser: action.payload, loadingWallUser: true, type: action.type };
        case WALL_USER_SCREEN_DATA_SUCCESS:
            return { ...state, resUser: action.payload, loadingWallUser: false, type: action.type, userToken: action.user };
        case WALL_USER_SCREEN_DATA_FAIL:
            return { ...state, resUser: action.payload, loadingWallUser: false,  type: action.type };
        
        case WALL_POSTS_SCREEN_DATA:
            //debugger
            return { ...state, resPosts: action.payload, loadingWallPosts: true, type: action.type };
        case WALL_POSTS_SCREEN_DATA_SUCCESS:
            return { ...state, resPosts: action.payload, loadingWallPosts: false, type: action.type, userToken: action.user };
        case WALL_POSTS_SCREEN_DATA_FAIL:
            return { ...state, resPosts: action.payload, loadingWallPosts: false, loadingExtraData: false, type: action.type };
        case EXTRA_DATA:
            return { ...state, resPosts: action.payload, loadingExtraData: true, type: action.type };
        case EXTRA_DATA_SUCCESS:
            return { ...state, resPosts: action.payload, loadingExtraData: false, type: action.type };
        default:
            return state;
    }
};

