import {
    HELP_REQUEST_SCREEN_DATA,
    HELP_REQUEST_SCREEN_DATA_SUCCESS,
    HELP_REQUEST_SCREEN_DATA_FAIL,

    SEND_HELP_REQUEST_DATA,
    SEND_HELP_REQUEST_DATA_SUCCESS,
    SEND_HELP_REQUEST_DATA_FAIL,

    MY_HELP_REQUEST_SCREEN_DATA,
    MY_HELP_REQUEST_SCREEN_DATA_SUCCESS,
    MY_HELP_REQUEST_SCREEN_DATA_FAIL,


    MY_PREVIOUS_HELPS_SCREEN_DATA,
    MY_PREVIOUS_HELPS_SCREEN_DATA_SUCCESS,
    MY_PREVIOUS_HELPS_SCREEN_DATA_FAIL,

    HELP_REQUEST_DETAIL_SCREEN_DATA,
    HELP_REQUEST_DETAIL_SCREEN_DATA_SUCCESS,
    HELP_REQUEST_DETAIL_SCREEN_DATA_FAIL,

    CITIES_DATA,
    CITIES_DATA_SUCCESS,
    CITIES_DATA_FAIL,


    SEARCH_HELP_REQUEST_DATA,
    SEARCH_HELP_REQUEST_DATA_SUCCESS,
    SEARCH_HELP_REQUEST_DATA_FAIL,

    HELP_REQUEST_ACTION_DATA,
    HELP_REQUEST_ACTION_DATA_SUCCESS,
    HELP_REQUEST_ACTION_DATA_FAIL,

    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingBrand: true,
    loadingBrandDetail: true,
    loadingOpportunity: true,
    loadingShoppingMall: true,
    connectionError: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HELP_REQUEST_SCREEN_DATA:
            return { ...state, resHelpRequest: action.payload, loadingHelpRequest: true, type: action.type };
        case HELP_REQUEST_SCREEN_DATA_SUCCESS:
            //debugger
            return { ...state, resHelpRequest: action.payload, loadingHelpRequest: false, type: action.type, userToken: action.user };
        case HELP_REQUEST_SCREEN_DATA_FAIL:
            return { ...state, resHelpRequest: action.payload, loadingHelpRequest: false, type: action.type };

        case SEND_HELP_REQUEST_DATA:
            return { ...state, resSendHelpRequest: action.payload, loadingSendHelpRequest: true, type: action.type };
        case SEND_HELP_REQUEST_DATA_SUCCESS:
            //debugger
            return { ...state, resSendHelpRequest: action.payload, loadingSendHelpRequest: false, type: action.type, userToken: action.user };
        case SEND_HELP_REQUEST_DATA_FAIL:
            return { ...state, resSendHelpRequest: action.payload, loadingSendHelpRequest: false, type: action.type };

        case MY_HELP_REQUEST_SCREEN_DATA:
            return { ...state, resMyHelpRequest: action.payload, loadingMyHelpRequest: true, type: action.type };
        case MY_HELP_REQUEST_SCREEN_DATA_SUCCESS:
            //debugger
            return { ...state, resMyHelpRequest: action.payload, loadingMyHelpRequest: false, type: action.type, userToken: action.user };
        case MY_HELP_REQUEST_SCREEN_DATA_FAIL:
            return { ...state, resMyHelpRequest: action.payload, loadingMyHelpRequest: false, type: action.type };



        case MY_PREVIOUS_HELPS_SCREEN_DATA:
            return { ...state, resMyPreviousHelps: action.payload, loadingMyPreviousHelps: true, type: action.type };
        case MY_PREVIOUS_HELPS_SCREEN_DATA_SUCCESS:
            //debugger
            return { ...state, resMyPreviousHelps: action.payload, loadingMyPreviousHelps: false, type: action.type, userToken: action.user };
        case MY_PREVIOUS_HELPS_SCREEN_DATA_FAIL:
            return { ...state, resMyPreviousHelps: action.payload, loadingMyPreviousHelps: false, type: action.type };




        case CITIES_DATA:
            return { ...state, resCities: action.payload, loadingCities: true, type: action.type };
        case CITIES_DATA_SUCCESS:
            //debugger
            return { ...state, resCities: action.payload, loadingCities: false, type: action.type, userToken: action.user };
        case CITIES_DATA_FAIL:
            return { ...state, resCities: action.payload, loadingCities: false, type: action.type };


        case HELP_REQUEST_DETAIL_SCREEN_DATA:
            return { ...state, resHelpRequestDetailScreen: action.payload, loadingHelpRequestDetailScreen: true, type: action.type };
        case HELP_REQUEST_DETAIL_SCREEN_DATA_SUCCESS:
            //debugger
            return { ...state, resHelpRequestDetailScreen: action.payload, loadingHelpRequestDetailScreen: false, type: action.type, userToken: action.user };
        case HELP_REQUEST_DETAIL_SCREEN_DATA_FAIL:
            return { ...state, resHelpRequestDetailScreen: action.payload, loadingHelpRequestDetailScreen: false, type: action.type };


        case HELP_REQUEST_ACTION_DATA:
            return { ...state, resHelpRequestAction: action.payload, loadingHelpRequestAction: true, type: action.type };
        case HELP_REQUEST_ACTION_DATA_SUCCESS:
            //debugger
            return { ...state, resHelpRequestAction: action.payload, loadingHelpRequestAction: false, type: action.type, userToken: action.user };
        case HELP_REQUEST_ACTION_DATA_FAIL:
            return { ...state, resHelpRequestAction: action.payload, loadingHelpRequestAction: false, type: action.type };



        case SEARCH_HELP_REQUEST_DATA:
            return { ...state, resSearchHelpRequest: action.payload, loadingSearchHelpRequest: true, type: action.type };
        case SEARCH_HELP_REQUEST_DATA_SUCCESS:
            //debugger
            return { ...state, resSearchHelpRequest: action.payload, loadingSearchHelpRequest: false, type: action.type, userToken: action.user };
        case SEARCH_HELP_REQUEST_DATA_FAIL:
            return { ...state, resSearchHelpRequest: action.payload, loadingSearchHelpRequest: false, type: action.type };


        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

