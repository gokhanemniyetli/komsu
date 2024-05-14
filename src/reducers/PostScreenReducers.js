import {
    SELECT_SURVEY_DATA,
    SELECT_SURVEY_DATA_SUCCESS,
    SELECT_SURVEY_DATA_FAIL,

    RATING_OF_QUESTION_DATA,
    RATING_OF_QUESTION_DATA_SUCCESS,
    RATING_OF_QUESTION_DATA_FAIL,

    SET_POST_LIKE_DATA,
    SET_POST_LIKE_DATA_SUCCESS,
    SET_POST_LIKE_DATA_FAIL,

    SET_POST_SHARE_DATA,
    SET_POST_SHARE_DATA_SUCCESS,
    SET_POST_SHARE_DATA_FAIL,


    DEL_POST_DATA,
    DEL_POST_DATA_SUCCESS,
    DEL_POST_DATA_FAIL,

    SET_POST_REVIEW_DATA,
    SET_POST_REVIEW_DATA_SUCCESS,
    SET_POST_REVIEW_DATA_FAIL,

    GET_POST_ALL_REVIEWS_DATA,
    GET_POST_ALL_REVIEWS_DATA_SUCCESS,
    GET_POST_ALL_REVIEWS_DATA_FAIL,

    SET_REVIEW_CONFIRMATION_DATA,
    SET_REVIEW_CONFIRMATION_DATA_SUCCESS,
    SET_REVIEW_CONFIRMATION_DATA_FAIL,
    GET_POST_ALL_REVIEWS_EXTRA_DATA,
    GET_POST_ALL_REVIEWS_EXTRA_DATA_SUCCESS,


    GET_POST_ALL_LIKES_DATA,
    GET_POST_ALL_LIKES_DATA_SUCCESS,
    GET_POST_ALL_LIKES_DATA_FAIL,
    GET_POST_ALL_LIKES_EXTRA_DATA,
    GET_POST_ALL_LIKES_EXTRA_DATA_SUCCESS,


    SEND_INAPPROPRIATE_CONTENT_DATA,
    SEND_INAPPROPRIATE_CONTENT_DATA_SUCCESS,
    SEND_INAPPROPRIATE_CONTENT_DATA_FAIL,

    CONNECTION_ERROR
} from '../actions/Types';


const INITIAL_STATE = {
    res: '',
    loadingRatingOfQuestion: true,
    loadingBrand: true,
    loadingBrandDetail: true,
    loadingOpportunity: true,
    loadingShoppingMall: true,
    connectionError: false,
    userResponse: 0,
    selected: 0,
    inappropriatedPostID: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {


        case GET_POST_ALL_REVIEWS_DATA:
            return { ...state, res: action.payload, loadingPostAllReviews: true, type: action.type };
        case GET_POST_ALL_REVIEWS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingPostAllReviews: false, type: action.type, userToken: action.user };
        case GET_POST_ALL_REVIEWS_DATA_FAIL:
            return { ...state, res: action.payload, loadingPostAllReviews: false, type: action.type };
        case GET_POST_ALL_REVIEWS_EXTRA_DATA:
            return { ...state, res: action.payload, loadingExtraData: true, loadingPostAllReviewsExtra: true, type: action.type };
        case GET_POST_ALL_REVIEWS_EXTRA_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingExtraData: false, loadingPostAllReviewsExtra: false, type: action.type };

            case GET_POST_ALL_LIKES_DATA:
                return { ...state, res: action.payload, loadingPostAllLikes: true, type: action.type };
            case GET_POST_ALL_LIKES_DATA_SUCCESS:
                return { ...state, res: action.payload, loadingPostAllLikes: false, type: action.type, userToken: action.user };
            case GET_POST_ALL_LIKES_DATA_FAIL:
                return { ...state, res: action.payload, loadingPostAllLikes: false, type: action.type };
            case GET_POST_ALL_LIKES_EXTRA_DATA:
                return { ...state, res: action.payload, loadingExtraData: true, loadingPostAllLikesExtra: true, type: action.type };
            case GET_POST_ALL_LIKES_EXTRA_DATA_SUCCESS:
                return { ...state, res: action.payload, loadingExtraData: false, loadingPostAllLikesExtra: false, type: action.type };
    
       
       
       
                case DEL_POST_DATA:
                return { ...state, res: action.payload, loadingDelPost: true, type: action.type };
            case DEL_POST_DATA_SUCCESS:
                return { ...state, res: action.payload, loadingDelPost: false, type: action.type, userToken: action.user };
            case DEL_POST_DATA_FAIL:
                return { ...state, res: action.payload, loadingDelPost: false, type: action.type };

                
        case SET_POST_REVIEW_DATA:
            return { ...state, res: action.payload, reviewCount: action.reviewCount, review: '', changingPostID: 0, loadingSetPostReview: true, type: action.type };
        case SET_POST_REVIEW_DATA_SUCCESS:
            return { ...state, res: action.payload, reviewCount: action.reviewCount, review: action.review, changingPostID: action.changingPostID, loadingSetPostReview: false, type: action.type, userToken: action.user };
        case SET_POST_REVIEW_DATA_FAIL:
            return { ...state, res: action.payload, reviewCount: action.reviewCount, review: '', changingPostID: 0, loadingSetPostReview: false, type: action.type };


            case SEND_INAPPROPRIATE_CONTENT_DATA:
                return { ...state, res: action.payload, inappropriatedPostID: 0, loadingSendInappropriateContent: true, type: action.type };
            case SEND_INAPPROPRIATE_CONTENT_DATA_SUCCESS:
                // debugger
                return { ...state, res: action.payload, inappropriatedPostID: action.inappropriatedPostID, loadingSendInappropriateContent: false, type: action.type };
            case SEND_INAPPROPRIATE_CONTENT_DATA_FAIL:
                return { ...state, res: action.payload, inappropriatedPostID: action.inappropriatedPostID, loadingSendInappropriateContent: false, type: action.type };
    
    

        case SET_POST_LIKE_DATA:
            return { ...state, res: action.payload, likeCount: action.likeCount, changingPostID: 0, loadingSetPostLike: true, type: action.type };
        case SET_POST_LIKE_DATA_SUCCESS:
            return { ...state, res: action.payload, likeCount: action.likeCount, userLike: action.userLike, changingPostID: action.changingPostID, loadingSetPostLike: false, type: action.type, userToken: action.user };
        case SET_POST_LIKE_DATA_FAIL:
            return { ...state, res: action.payload, likeCount: action.likeCount, changingPostID: 0, loadingSetPostLike: false, type: action.type };

        case SET_REVIEW_CONFIRMATION_DATA:
            return { ...state, confirmationResult: action.confirmationResult, loadingReviewConfirmation: true, type: action.type };
        case SET_REVIEW_CONFIRMATION_DATA_SUCCESS:
            return { ...state, confirmationResult: action.confirmationResult, reviewID: action.reviewID, loadingReviewConfirmation: false, type: action.type };
        case SET_REVIEW_CONFIRMATION_DATA_FAIL:
            return { ...state, confirmationResult: action.confirmationResult, loadingReviewConfirmation: true, type: action.type };

        case SET_POST_SHARE_DATA:
            return { ...state, res: action.payload, shareCount: action.shareCount, changingPostID: 0, loadingSetPostShare: true, type: action.type };
        case SET_POST_SHARE_DATA_SUCCESS:
            return { ...state, res: action.payload, shareCount: action.shareCount, userShare: action.userShare, changingPostID: action.changingPostID, loadingSetPostShare: false, type: action.type, userToken: action.user };
        case SET_POST_SHARE_DATA_FAIL:
            return { ...state, res: action.payload, shareCount: action.shareCount, changingPostID: 0, loadingSetPostShare: false, type: action.type };

        case SELECT_SURVEY_DATA:
            return { ...state, userResponse: 0, selected: 0, loadingSelectSurvey: true, type: action.type };
        case SELECT_SURVEY_DATA_SUCCESS:
            return { ...state, userResponse: action.payload, selected: 1, loadingSelectSurvey: false, type: action.type };
        case SELECT_SURVEY_DATA_FAIL:
            return { ...state, userResponse: 0, selected: 0, loadingSelectSurvey: false, type: action.type };


        case RATING_OF_QUESTION_DATA:
            return { ...state, res: action.payload, loadingRatingOfQuestion: true, type: action.type };
        case RATING_OF_QUESTION_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingRatingOfQuestion: false, type: action.type, userToken: action.user };
        case RATING_OF_QUESTION_DATA_FAIL:
            return { ...state, res: action.payload, loadingRatingOfQuestion: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

