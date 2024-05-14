import {
    API_DATA_SUCCESS,
    API_DATA_FAIL,
    SET_OPPORTUNITY_FAVORITE_DATA,
    SET_OPPORTUNITY_FAVORITE_DATA_SUCCESS,
    SET_OPPORTUNITY_FAVORITE_DATA_FAIL
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingOpportunity: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case API_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingOpportunity: true, type: action.type };
        case API_DATA_FAIL:
            return { ...state, res: action.payload, loadingOpportunity: true, type: action.type };

        case SET_OPPORTUNITY_FAVORITE_DATA:
            return { ...state, res: action.payload, loadingSetOpportunityFavorite: true, type: action.type };
        case SET_OPPORTUNITY_FAVORITE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSetOpportunityFavorite: false, type: action.type };
        case SET_OPPORTUNITY_FAVORITE_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetOpportunityFavorite: false, type: action.type };
        default:
            return state;
    }
};

