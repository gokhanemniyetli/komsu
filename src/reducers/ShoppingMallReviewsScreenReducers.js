import {
    SHOPPINGMALL_REVIEWS_SCREEN_DATA,
    SHOPPINGMALL_REVIEWS_SCREEN_DATA_SUCCESS,
    SHOPPINGMALL_REVIEWS_SCREEN_DATA_FAIL,
    SHOPPINGMALL_NEWREVIEW_SCREEN_DATA,
    SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_SUCCESS,
    SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingShoppingMallReviews: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOPPINGMALL_REVIEWS_SCREEN_DATA:
            return { ...state, res: action.payload, loadingShoppingMallReviews: true, type: action.type };
        case SHOPPINGMALL_REVIEWS_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingShoppingMallReviews: false, type: action.type, userToken: action.user };
        case SHOPPINGMALL_REVIEWS_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingShoppingMallReviews: false, type: action.type };

        case SHOPPINGMALL_NEWREVIEW_SCREEN_DATA:
            return { ...state, res: action.payload, type: action.type };
        case SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload, type: action.type, userToken: action.user };
        case SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

