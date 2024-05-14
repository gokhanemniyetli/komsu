import {
    POST_DATA,
    POST_DATA_SUCCESS,
    POST_DATA_FAIL,

    GET_FAKE_DATA,
    GET_FAKE_DATA_SUCCESS,
    GET_FAKE_DATA_FAIL,

    GET_POST_BY_ID_DATA,
    GET_POST_BY_ID_DATA_SUCCESS,
    GET_POST_BY_ID_DATA_FAIL,

    SEARCH_IN_MY_FRIENDS,
    SEARCH_IN_MY_FRIENDS_SUCCESS,
    SEARCH_IN_MY_FRIENDS_FAIL,

    GET_NEAR_PLACES,
    GET_NEAR_PLACES_SUCCESS,
    GET_NEAR_PLACES_FAIL,


    BRAND_SEARCH,
    BRAND_SEARCH_SUCCESS,
    BRAND_SEARCH_FAIL,

    SET_ACCESS_TYPE_ID,
    SET_POST_TEXT,
    SELECTED_FRIENDS,
    SELECTED_NEAR_PLACE,
    SELECTED_BRAND,
    SELECTED_IMAGES,
    SET_SURVEY,
    SET_QUESTION,
    SET_PURCHASE,


    CONNECTION_ERROR,
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingPost: true,
    connectionError: false,
    rePost: '',

    accessTypeID: 0,
    PostText: '',
    SharingType: 0,
    //friendList: '',
    //PostImageList: '',
    //selectedNearPlace: '',
    //Place: '',
    //Survey: '',
    //Purchase: '',
    //Question: '',
    Latitude: '',
    Longitude: '',

    selectedFriendList: []

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACCESS_TYPE_ID:
           //  debugger;
            return { ...state, accessTypeID: action.accessTypeID  };
        case SET_POST_TEXT:
            // debugger;
            return { ...state, PostText: action.postText};

        case SELECTED_FRIENDS:
            // debugger;
            return { ...state, selectedFriendList: action.selectedFriendList  };

        case SELECTED_NEAR_PLACE:
            // debugger;
            return { ...state, selectedNearPlace: action.selectedNearPlace  };

        case SELECTED_BRAND:
            // debugger;
            return { ...state, selectedBrand: action.selectedBrand  };

        case SET_SURVEY:
            // debugger;
            return { ...state, Survey: action.survey  };

        case SET_QUESTION:
            // debugger;
            return { ...state, Question: action.question  };

        case SET_PURCHASE:
            // debugger;
            return { ...state, Purchase: action.purchase };

        case SELECTED_IMAGES:
            //    debugger;
            return { ...state, selectedImages: action.selectedImages, type: action.type };


        case BRAND_SEARCH:
            return { ...state, brandList: action.brandList, loadingBrandSearch: true, type: action.type };
        case BRAND_SEARCH_SUCCESS:
            return { ...state, brandList: action.brandList, loadingBrandSearch: false, type: action.type, userToken: action.user };
        case BRAND_SEARCH_FAIL:
            return { ...state, brandList: action.brandList, loadingBrandSearch: false, type: action.type };



        case GET_NEAR_PLACES:
            return { ...state, nearPlaceList: action.nearPlaceList, loadingNearPlaceList: true, type: action.type };
        case GET_NEAR_PLACES_SUCCESS:
            return { ...state, nearPlaceList: action.nearPlaceList, loadingNearPlaceList: false, type: action.type, userToken: action.user };
        case GET_NEAR_PLACES_FAIL:
            return { ...state, nearPlaceList: action.nearPlaceList, loadingNearPlaceList: false, type: action.type };


        case GET_FAKE_DATA:
            return { ...state, res: action.payload, loadingFakeData: true, type: action.type };
        case GET_FAKE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingFakeData: false, type: action.type, userToken: action.user };
        case GET_FAKE_DATA_FAIL:
            return { ...state, res: action.payload, loadingFakeData: false, type: action.type };



        case GET_POST_BY_ID_DATA:
            return { ...state, rePost: action.payload, loadingPost: true, type: action.type };
        case GET_POST_BY_ID_DATA_SUCCESS:
            return { ...state, rePost: action.payload, loadingPost: false, type: action.type, userToken: action.user };
        case GET_POST_BY_ID_DATA_FAIL:
            return { ...state, rePost: action.payload, loadingPost: false, type: action.type };


        case SEARCH_IN_MY_FRIENDS:
            // debugger;    
            return { ...state, friendList: action.friendList, loadingPostPrivacySpecificFriends: true, type: action.type };
        case SEARCH_IN_MY_FRIENDS_SUCCESS:
            //  debugger;
            return { ...state, friendList: action.friendList, loadingPostPrivacySpecificFriends: false, type: action.type, userToken: action.user };
        case SEARCH_IN_MY_FRIENDS_FAIL:
            return { ...state, friendList: action.friendList, loadingPostPrivacySpecificFriends: false, type: action.type };


        case POST_DATA:
            return { ...state, res: action.payload, loadingPost: true, type: action.type };
        case POST_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingPost: false, type: action.type, userToken: action.user };
        case POST_DATA_FAIL:
            return { ...state, res: action.payload, loadingPost: false, type: action.type };
        
            default:
            return state;
    }
};

