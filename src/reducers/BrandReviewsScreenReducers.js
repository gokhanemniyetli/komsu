import {
    BRAND_REVIEWS_SCREEN_DATA,
    BRAND_REVIEWS_SCREEN_DATA_SUCCESS,
    BRAND_REVIEWS_SCREEN_DATA_FAIL,
    USER_NEWREVIEW_SCREEN_DATA,
    USER_NEWREVIEW_SCREEN_DATA_SUCCESS,
    USER_NEWREVIEW_SCREEN_DATA_FAIL,
    BRAND_NEWREVIEW_SCREEN_DATA,
    BRAND_NEWREVIEW_SCREEN_DATA_SUCCESS,
    BRAND_NEWREVIEW_SCREEN_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingBrandReviews: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BRAND_REVIEWS_SCREEN_DATA:
            return { ...state, res: action.payload, loadingBrandReviews: true, type: action.type };
        case BRAND_REVIEWS_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingBrandReviews: false, type: action.type, userToken: action.user };
        case BRAND_REVIEWS_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingBrandReviews: false, type: action.type };
            
        case USER_NEWREVIEW_SCREEN_DATA:
            return { ...state, res: action.payload, type: action.type };
        case USER_NEWREVIEW_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload,  type: action.type, userToken: action.user };
        case USER_NEWREVIEW_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, type: action.type };

        case BRAND_NEWREVIEW_SCREEN_DATA:
            return { ...state, res: action.payload, type: action.type };
        case BRAND_NEWREVIEW_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload,  type: action.type, userToken: action.user };
        case BRAND_NEWREVIEW_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

