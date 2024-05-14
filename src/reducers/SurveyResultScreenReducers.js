import {
    SURVEY_RESULT_SCREEN_DATA,
    SURVEY_RESULT_SCREEN_DATA_SUCCESS,
    SURVEY_RESULT_SCREEN_DATA_FAIL,
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingSurveyResult: true,
    connectionError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SURVEY_RESULT_SCREEN_DATA:
            return { ...state, res: action.payload, loadingSurveyResult: true, type: action.type };
        case SURVEY_RESULT_SCREEN_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingSurveyResult: false, type: action.type, userToken: action.user };
        case SURVEY_RESULT_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingSurveyResult: false, type: action.type };
        default:
            return state;
    }
};