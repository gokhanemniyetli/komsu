import {
    STORE_REVIEWS_SCREEN_DATA,
    STORE_REVIEWS_SCREEN_DATA_SUCCESS,
    STORE_REVIEWS_SCREEN_DATA_FAIL,
    STORE_NEWREVIEW_SCREEN_DATA,
    STORE_NEWREVIEW_SCREEN_DATA_SUCCESS,
    STORE_NEWREVIEW_SCREEN_DATA_FAIL,
    SET_STORE_REVIEW_LIKE_DATA,
    SET_STORE_REVIEW_LIKE_DATA_SUCCESS,
    SET_STORE_REVIEW_LIKE_DATA_FAIL,
    SET_BRAND_REVIEW_LIKE_DATA,
    SET_BRAND_REVIEW_LIKE_DATA_SUCCESS,
    SET_BRAND_REVIEW_LIKE_DATA_FAIL,
    SET_SHOPPINGMALL_REVIEW_LIKE_DATA,
    SET_SHOPPINGMALL_REVIEW_LIKE_DATA_SUCCESS,
    SET_SHOPPINGMALL_REVIEW_LIKE_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingStoreReviews: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STORE_REVIEWS_SCREEN_DATA:
            return { ...state, res: action.payload, loadingStoreReviews: true, type: action.type };
        case STORE_REVIEWS_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingStoreReviews: false, type: action.type, userToken: action.user };
        case STORE_REVIEWS_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingStoreReviews: false, type: action.type };

        case STORE_NEWREVIEW_SCREEN_DATA:
            return { ...state, res: action.payload, type: action.type };
        case STORE_NEWREVIEW_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload,  type: action.type, userToken: action.user };
        case STORE_NEWREVIEW_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, type: action.type };

            case SET_STORE_REVIEW_LIKE_DATA:
            return { ...state, likeCount: action.likeCount, changingReviewID: 0, loadingSetReviewLike: true, type: action.type };
        case SET_STORE_REVIEW_LIKE_DATA_SUCCESS:
            return { ...state, likeCount: action.likeCount, changingReviewID: action.changingReviewID, loadingSetReviewLike: false, type: action.type };
        case SET_STORE_REVIEW_LIKE_DATA_FAIL:
            return { ...state, likeCount: action.likeCount, changingReviewID: 0, loadingSetReviewLike: false, type: action.type };

        
        case SET_BRAND_REVIEW_LIKE_DATA:
            return { ...state, likeCount: action.likeCount, changingReviewID: 0, loadingSetReviewLike: true, type: action.type };
        case SET_BRAND_REVIEW_LIKE_DATA_SUCCESS:
            return { ...state, likeCount: action.likeCount, changingReviewID: action.changingReviewID, loadingSetReviewLike: false, type: action.type };
        case SET_BRAND_REVIEW_LIKE_DATA_FAIL:
            return { ...state, likeCount: action.likeCount, changingReviewID: 0, loadingSetReviewLike: false, type: action.type };

        
        case SET_SHOPPINGMALL_REVIEW_LIKE_DATA:
            return { ...state, likeCount: action.likeCount, changingReviewID: 0, loadingSetReviewLike: true, type: action.type };
        case SET_SHOPPINGMALL_REVIEW_LIKE_DATA_SUCCESS:
            return { ...state, likeCount: action.likeCount, changingReviewID: action.changingReviewID, loadingSetReviewLike: false, type: action.type };
        case SET_SHOPPINGMALL_REVIEW_LIKE_DATA_FAIL:
            return { ...state, likeCount: action.likeCount, changingReviewID: 0, loadingSetReviewLike: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

