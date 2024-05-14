import {
    SPECIAL_TO_ME_OPPORTUNITY_DATA,
    SPECIAL_TO_ME_OPPORTUNITY_DATA_SUCCESS,
    SPECIAL_TO_ME_OPPORTUNITY_DATA_FAIL,

    SPECIAL_TO_ME_ACTIVITY_DATA,
    SPECIAL_TO_ME_ACTIVITY_DATA_SUCCESS,
    SPECIAL_TO_ME_ACTIVITY_DATA_FAIL,

    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingSpecialToMeOpportunityList: true,
    connectionError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SPECIAL_TO_ME_OPPORTUNITY_DATA:
            return { ...state, res: action.payload, loadingSpecialToMeOpportunityList: true, type: action.type };
        case SPECIAL_TO_ME_OPPORTUNITY_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSpecialToMeOpportunityList: false, type: action.type, userToken: action.user };
        case SPECIAL_TO_ME_OPPORTUNITY_DATA_FAIL:
            return { ...state, res: action.payload, loadingSpecialToMeOpportunityList: false, type: action.type };

        case SPECIAL_TO_ME_ACTIVITY_DATA:
            return { ...state, res: action.payload, loadingSpecialToMeActivityList: true, type: action.type };
        case SPECIAL_TO_ME_ACTIVITY_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSpecialToMeActivityList: false, type: action.type, userToken: action.user };
        case SPECIAL_TO_ME_ACTIVITY_DATA_FAIL:
            return { ...state, res: action.payload, loadingSpecialToMeActivityList: false, type: action.type };

        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

