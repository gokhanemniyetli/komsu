import {
    QUESTION_RESULT_SCREEN_DATA,
    QUESTION_RESULT_SCREEN_DATA_SUCCESS,
    QUESTION_RESULT_SCREEN_DATA_FAIL,
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingQuestionResult: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QUESTION_RESULT_SCREEN_DATA:
            return { ...state, res: action.payload, loadingQuestionResult: true, type: action.type };
        case QUESTION_RESULT_SCREEN_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingQuestionResult: false, type: action.type, userToken: action.user };
        case QUESTION_RESULT_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingQuestionResult: false, type: action.type };
        default:
            return state;
    }
};