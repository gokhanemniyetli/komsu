import {
    USER_GENERALSETTINGS_SCREEN_DATA,
    USER_GENERALSETTINGS_SCREEN_DATA_SUCCESS,
    USER_GENERALSETTINGS_SCREEN_DATA_FAIL,
    SET_USER_GENERALSETTINGS_DATA,
    SET_USER_GENERALSETTINGS_DATA_SUCCESS,
    SET_USER_GENERALSETTINGS_DATA_FAIL,
    SET_USER_GENERALSETTINGS_USER_ALL_DATA,
    CLEAR_USER_ALL_DATA,
    SEARCH_IN_BLOCKED_USERS_DATA,
    SEARCH_IN_BLOCKED_USERS_DATA_SUCCESS,
    SEARCH_IN_BLOCKED_USERS_DATA_FAIL,

    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    userAllData: '',
    loadingUserGeneralSettings: false,
    connectionError: false,
    loadingSetSetting1: false,
    loadingSetSetting2: false, 
    loadingSetSetting3: false, 
    loadingSetSetting4: false, 
    loadingSearchInBlockedUsers: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_GENERALSETTINGS_SCREEN_DATA:
            return { ...state, loadingUserGeneralSettings: true, userGeneralSettingsError: false, type: action.type };
        case USER_GENERALSETTINGS_SCREEN_DATA_SUCCESS:
            // console.log(action);
            return { ...state, userAllData: action.payload, userGeneralSettingsError: false, loadingSetSetting1: false, loadingSetSetting2: false, loadingSetSetting3: false, loadingSetSetting4: false, loadingUserGeneralSettings: false, type: action.type, userToken: action.user };
        case USER_GENERALSETTINGS_SCREEN_DATA_FAIL:
            return { ...state, loadingUserGeneralSettings: false, userGeneralSettingsError: true, type: action.type, loadingSetSetting1: false, loadingSetSetting2: false, loadingSetSetting3: false, loadingSetSetting4: false, errorCode: action.errorCode, errorMessage: action.errorMessage };

        case SET_USER_GENERALSETTINGS_DATA:
            return { ...state, res: action.payload, loadingUserGeneralSettings: true, loadingSetSetting2: true, loadingSetSetting3: true, loadingSetSetting4: true, type: action.type };
        case SET_USER_GENERALSETTINGS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingUserGeneralSettings: false, loadingSetSetting2: false, loadingSetSetting3: false, loadingSetSetting4: false, type: action.type };
        case SET_USER_GENERALSETTINGS_DATA_FAIL:
            return { ...state, res: action.payload, loadingUserGeneralSettings: false, loadingSetSetting2: false, loadingSetSetting3: false, loadingSetSetting4: false, type: action.type };
        
        case SET_USER_GENERALSETTINGS_USER_ALL_DATA:
            // debugger
            return { ...state, userAllData: action.payload, type: action.type, loadingUserGeneralSettings: false, loadingSetSetting2: false, loadingSetSetting3: false, loadingSetSetting4: false, };

        case SEARCH_IN_BLOCKED_USERS_DATA:
            return { ...state, res: action.payload, loadingSearchInBlockedUsers: true, type: action.type };
        case SEARCH_IN_BLOCKED_USERS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSearchInBlockedUsers: false, type: action.type };
        case SEARCH_IN_BLOCKED_USERS_DATA_FAIL:
            return { ...state, res: action.payload, loadingSearchInBlockedUsers: false, type: action.type };

        case CLEAR_USER_ALL_DATA:
            // debugger;
            return { ...state, userAllData: '' }
        case CONNECTION_ERROR:
            return { ...state, connectionError: true}
        default:
            return state;
    }
};

