import {
    USERPROFILE_SCREEN_DATA,
    USERPROFILE_SCREEN_DATA_SUCCESS,
    USERPROFILE_SCREEN_DATA_FAIL,
    USERPROFILE_EXTRA_DATA,
    USERPROFILE_EXTRA_DATA_SUCCESS,
    SET_USER_FOLLOWS_DATA,
    SET_USER_FOLLOWS_DATA_SUCCESS,
    SET_USER_FOLLOWS_DATA_FAIL,
    SET_USER_BANS_DATA,
    SET_USER_BANS_DATA_SUCCESS,
    SET_USER_BANS_DATA_FAIL,
    SET_USER_FRIENDS_DATA,
    SET_USER_FRIENDS_DATA_SUCCESS,
    SET_USER_FRIENDS_DATA_FAIL,
    CONNECTION_ERROR 
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingUserProfile: true,
    loadingStore: true,
    loadingStoreDetail: true,
    loadingOpportunity: true,
    connectionError: false,
    bannedPostID: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERPROFILE_SCREEN_DATA:
            return { ...state, res: action.payload, loadingUserProfile: true, type: action.type };
        case USERPROFILE_SCREEN_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingUserProfile: false, type: action.type, userToken: action.user };
        case USERPROFILE_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingUserProfile: false, loadingExtraData: false,  type: action.type };
        
        case USERPROFILE_EXTRA_DATA:
            return { ...state, res: action.payload, loadingUserProfileExtraData: true, type: action.type };
        case USERPROFILE_EXTRA_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingUserProfileExtraData: false, type: action.type,  userToken: action.user  };
        
        case SET_USER_FRIENDS_DATA:
            return { ...state, res: action.payload, loadingSetUserFriends: true, type: action.type };
        case SET_USER_FRIENDS_DATA_SUCCESS:
            // debugger;
            return { ...state, res: action.payload, loadingSetUserFriends: false, type: action.type };
        case SET_USER_FRIENDS_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetUserFriends: false, type: action.type };

        case SET_USER_FOLLOWS_DATA:
            return { ...state, res: action.payload, loadingSetUserFollows: true, type: action.type };
        case SET_USER_FOLLOWS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSetUserFollows: false, type: action.type };
        case SET_USER_FOLLOWS_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetUserFollows: false, type: action.type };

        case SET_USER_BANS_DATA:
            return { ...state, res: action.payload, bannedPostID: 0, loadingSetUserBans: true, type: action.type };
        case SET_USER_BANS_DATA_SUCCESS:
            //debugger
            return { ...state, res: action.payload, bannedPostID: action.bannedPostID, loadingSetUserBans: false, type: action.type };
        case SET_USER_BANS_DATA_FAIL:
            return { ...state, res: action.payload, bannedPostID: action.bannedPostID, loadingSetUserBans: false, type: action.type };

        default:
            return state;
    }
};

