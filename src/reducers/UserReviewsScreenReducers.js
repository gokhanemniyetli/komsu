import {
    USER_REVIEWS_SCREEN_DATA,
    USER_REVIEWS_SCREEN_DATA_SUCCESS,
    USER_REVIEWS_SCREEN_DATA_FAIL,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingUserReviews: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_REVIEWS_SCREEN_DATA:
            return { ...state, res: action.payload, loadingUserReviews: true, type: action.type };
        case USER_REVIEWS_SCREEN_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingUserReviews: false, type: action.type, userToken: action.user };
        case USER_REVIEWS_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingUserReviews: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

