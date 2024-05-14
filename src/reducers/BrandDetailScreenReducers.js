import {
    BRAND_DETAIL_SCREEN_DATA,
    BRAND_DETAIL_SCREEN_DATA_SUCCESS,
    BRAND_DETAIL_SCREEN_DATA_FAIL,
    SET_BRAND_FAVORITE_DATA,
    SET_BRAND_FAVORITE_DATA_SUCCESS,
    SET_BRAND_FAVORITE_DATA_FAIL,
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
        case BRAND_DETAIL_SCREEN_DATA:
            return { ...state, res: action.payload, loadingBrand: true, loadingBrandDetail: true, loadingOpportunity: true, loadingStore: true, type: action.type };
        case BRAND_DETAIL_SCREEN_DATA_SUCCESS:
            // console.log(action.user);
            return { ...state, res: action.payload, loadingBrand: false, loadingBrandDetail: false, loadingOpportunity: false, loadingStore: false, type: action.type, userToken: action.user };
        case BRAND_DETAIL_SCREEN_DATA_FAIL:
            return { ...state, res: action.payload, loadingBrand: false, loadingBrandDetail: false, loadingOpportunity: false, loadingStore: false, type: action.type };

        case SET_BRAND_FAVORITE_DATA:
            return { ...state, res: action.payload, loadingSetBrandFavorite: true, type: action.type, changedID: 0 };
        case SET_BRAND_FAVORITE_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingSetBrandFavorite: false, type: action.type, changedID:action.changedID };
        case SET_BRAND_FAVORITE_DATA_FAIL:
            return { ...state, res: action.payload, loadingSetBrandFavorite: false, type: action.type };
        case CONNECTION_ERROR:
            return { ...state, connectionError: true }
        default:
            return state;
    }
};

