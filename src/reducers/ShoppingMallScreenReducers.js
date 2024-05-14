import { 
    SHOPPINGMALL_SCREEN_DATA, 
    SHOPPINGMALL_SCREEN_DATA_SUCCESS, 
    SHOPPINGMALL_SCREEN_DATA_FAIL,
    SHOPPINGMALL_STORELIST_DATA,
    SHOPPINGMALL_STORELIST_DATA_SUCCESS,
    SHOPPINGMALL_STORELIST_DATA_FAIL, 
    SHOPPINGMALL_FLOORPLANLIST_DATA,
    SHOPPINGMALL_FLOORPLANLIST_DATA_SUCCESS,
    SHOPPINGMALL_FLOORPLANLIST_DATA_FAIL, 
    SHOPPINGMALL_PHOTOLIST_DATA,
    SHOPPINGMALL_PHOTOLIST_DATA_SUCCESS,
    SHOPPINGMALL_PHOTOLIST_DATA_FAIL, 
    SHOPPINGMALL_OPPORTUNITYLIST_DATA,
    SHOPPINGMALL_OPPORTUNITYLIST_DATA_SUCCESS,
    SHOPPINGMALL_OPPORTUNITYLIST_DATA_FAIL, 
    SHOPPINGMALL_ACTIVITYLIST_DATA,
    SHOPPINGMALL_ACTIVITYLIST_DATA_SUCCESS,
    SHOPPINGMALL_ACTIVITYLIST_DATA_FAIL, 
    SHOPPINGMALL_SERVICELIST_DATA,
    SHOPPINGMALL_SERVICELIST_DATA_SUCCESS,
    SHOPPINGMALL_SERVICELIST_DATA_FAIL, 
    SET_SHOPPINGMALL_FAVORITE_DATA,
    SET_SHOPPINGMALL_FAVORITE_DATA_SUCCESS,
    SET_SHOPPINGMALL_FAVORITE_DATA_FAIL,
    CONNECTION_ERROR,
    SELECTED_SEPERATOR_TITLE_CHANGE
} from '../actions/Types';

const INITIAL_STATE = {
 res: '',
 loadingShoppingMall:true,
 loadingOpportunity:true,
 connectionError:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOPPINGMALL_SCREEN_DATA:
            return { ...state, res: action.payload, loadingShoppingMall:true, loadingOpportunity:true, type:action.type };
        case SHOPPINGMALL_SCREEN_DATA_SUCCESS:
        // console.log(action.user);
            return { ...state, res: action.payload, loadingShoppingMall:false, loadingOpportunity:false, type:action.type, userToken:action.user };
        case SHOPPINGMALL_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingShoppingMall:false, loadingOpportunity:false, type:action.type };

        case SHOPPINGMALL_STORELIST_DATA:
            return { ...state, res: action.payload, loadingStoreList:true, type:action.type};
        case SHOPPINGMALL_STORELIST_DATA_SUCCESS:
            return { ...state, storeList: action.payload, res: action.payload, loadingStoreList:false, userToken:action.user, type:action.type };
        case SHOPPINGMALL_STORELIST_DATA_FAIL:
            return { ...state, res: action.payload, loadingStoreList:false, type:action.type};

        case SHOPPINGMALL_FLOORPLANLIST_DATA:
            return { ...state, res: action.payload, loadingFloorPlanList:true, type:action.type};
        case SHOPPINGMALL_FLOORPLANLIST_DATA_SUCCESS:
            return { ...state, floorPlanList: action.payload, res: action.payload, loadingFloorPlanList:false, userToken:action.user, type:action.type };
        case SHOPPINGMALL_FLOORPLANLIST_DATA_FAIL:
            return { ...state, res: action.payload, loadingFloorPlanList:false, type:action.type};

        case SHOPPINGMALL_PHOTOLIST_DATA:
            return { ...state, res: action.payload, loadingPhotoList:true, type:action.type};
        case SHOPPINGMALL_PHOTOLIST_DATA_SUCCESS:
            return { ...state, photoList: action.payload, res: action.payload, loadingPhotoList:false, userToken:action.user, type:action.type };
        case SHOPPINGMALL_PHOTOLIST_DATA_FAIL:
            return { ...state, res: action.payload, loadingPhotoList:false, type:action.type};
        
        case SHOPPINGMALL_OPPORTUNITYLIST_DATA:
            return { ...state, res: action.payload, loadingOpportunityList:true, type:action.type};
        case SHOPPINGMALL_OPPORTUNITYLIST_DATA_SUCCESS:
            return { ...state, opportunityList: action.payload, res: action.payload, loadingOpportunityList:false, userToken:action.user, type:action.type };
        case SHOPPINGMALL_OPPORTUNITYLIST_DATA_FAIL:
            return { ...state, res: action.payload, loadingOpportunityList:false, type:action.type};

            case SHOPPINGMALL_ACTIVITYLIST_DATA:
            return { ...state, res: action.payload, loadingActivityList:true, type:action.type};
        case SHOPPINGMALL_ACTIVITYLIST_DATA_SUCCESS:
            return { ...state, activityList: action.payload, res: action.payload, loadingActivityList:false, userToken:action.user, type:action.type };
        case SHOPPINGMALL_ACTIVITYLIST_DATA_FAIL:
            return { ...state, res: action.payload, loadingActivityList:false, type:action.type};

        case SHOPPINGMALL_SERVICELIST_DATA:
            return { ...state, res: action.payload, loadingServiceList:true, type:action.type};
        case SHOPPINGMALL_SERVICELIST_DATA_SUCCESS:
            return { ...state, serviceList: action.payload, res: action.payload, loadingServiceList:false, userToken:action.user, type:action.type };
        case SHOPPINGMALL_SERVICELIST_DATA_FAIL:
            return { ...state, res: action.payload, loadingServiceList:false, type:action.type};


        case SET_SHOPPINGMALL_FAVORITE_DATA:
            return { ...state, res: action.payload, loadingSetShoppingMallFavorite:true, type:action.type, changedID:0 };
        case SET_SHOPPINGMALL_FAVORITE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSetShoppingMallFavorite:false, type:action.type, changedID: action.changedID };
        case SET_SHOPPINGMALL_FAVORITE_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetShoppingMallFavorite:false, type:action.type };
        case CONNECTION_ERROR:
            return { ...state, connectionError:true} 

        case SELECTED_SEPERATOR_TITLE_CHANGE:
            return { ...state, selectedSeperatorTitle:action.payload}
        default:
            return state;
    }
};

