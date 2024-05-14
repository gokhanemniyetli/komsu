import {
    SEARCH_RESULTS_SCREEN_DATA,
    SEARCH_RESULTS_SCREEN_DATA_SUCCESS,
    SEARCH_RESULTS_SCREEN_DATA_FAIL,
    SEARCH_RESULTS_BRANDS_DATA,
    SEARCH_RESULTS_BRANDS_DATA_SUCCESS,
    SEARCH_RESULTS_BRANDS_DATA_FAIL,
    SEARCH_RESULTS_USERS_DATA,
    SEARCH_RESULTS_USERS_DATA_SUCCESS,
    SEARCH_RESULTS_USERS_DATA_FAIL,
    SEARCH_RESULTS_SHOPPINGMALLS_DATA,
    SEARCH_RESULTS_SHOPPINGMALLS_DATA_SUCCESS,
    SEARCH_RESULTS_SHOPPINGMALLS_DATA_FAIL,
    SEARCH_RESULTS_PRODUCTS_DATA,
    SEARCH_RESULTS_PRODUCTS_DATA_SUCCESS,
    SEARCH_RESULTS_PRODUCTS_DATA_FAIL,
    SEARCH_KEYWORD_CHANGED,
    SEARCH_TYPE_CHANGED,
    GET_SEARCH_TYPE,
    SET_SELECTED_KEYWORD,
    CLICK_KEYWORD,
    SEARCH_SUBMIT,
    CLEAR_SEARCH_TEXT,
    CLEAR_SEARCH_DATA,
    CONNECTION_ERROR
} from '../actions/Types';

const INITIAL_STATE = {
    res: '',
    loadingBrand: true,
    loadingOpportunity: true,
    loadingShoppingMall: true,
    // loadingShoppingMallList: true,
    loadingUser: true,
    connectionError: false,
    keyword: '',
    showKeywordList: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_RESULTS_SCREEN_DATA:
            //debugger
            return { ...state, keyword: action.payload, loadingKeywordList: true, type: action.type };
        case SEARCH_RESULTS_SCREEN_DATA_SUCCESS:
            //debugger
            return { ...state, res: action.payload, loadingKeywordList: false, type: action.type };
        case SEARCH_RESULTS_SCREEN_DATA_FAIL:
            return { ...state, loadingKeywordList: false, type: action.type };

        case SEARCH_RESULTS_BRANDS_DATA:
            return { ...state, loadingBrandList: true, type: action.type, changeID: 0 };
        case SEARCH_RESULTS_BRANDS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingBrandList: false, type: action.type, changeID: action.changeID };
        case SEARCH_RESULTS_BRANDS_DATA_FAIL:
            return { ...state, loadingBrandList: false, type: action.type };

        case SEARCH_RESULTS_USERS_DATA:
            return { ...state, loadingUserList: true, type: action.type };
        case SEARCH_RESULTS_USERS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingUserList: false, type: action.type };
        case SEARCH_RESULTS_USERS_DATA_FAIL:
            return { ...state, loadingUserList: false, type: action.type };

        case SEARCH_RESULTS_SHOPPINGMALLS_DATA:
            return { ...state, loadingShoppingMallList: true, type: action.type };
        case SEARCH_RESULTS_SHOPPINGMALLS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingShoppingMallList: false, type: action.type };
        case SEARCH_RESULTS_SHOPPINGMALLS_DATA_FAIL:
            return { ...state, loadingShoppingMallList: false, type: action.type };

        case SEARCH_RESULTS_PRODUCTS_DATA:
            return { ...state, loadingProductList: true, type: action.type };
        case SEARCH_RESULTS_PRODUCTS_DATA_SUCCESS:
            return { ...state, res: action.payload, loadingProductList: false, type: action.type };
        case SEARCH_RESULTS_PRODUCTS_DATA_FAIL:
            return { ...state, loadingProductList: false, type: action.type };


        case SEARCH_KEYWORD_CHANGED:
            return { ...state, keyword: action.payload, type: action.type };
        case SEARCH_TYPE_CHANGED:
            return { ...state, searchType: action.payload, type: action.type };
        case GET_SEARCH_TYPE:
            return { ...state, type: action.type };
        case SET_SELECTED_KEYWORD:
            return { ...state, search: true, keyword: action.payload, selectedKeyword: action.payload, showKeywordList: false, type: action.type };
        case CLICK_KEYWORD:
            return { ...state, showKeywordList: action.payload, type: action.type };
        case SEARCH_SUBMIT:
            return { ...state, search: true, showKeywordList: false, type: action.type };
        case CLEAR_SEARCH_TEXT:
            return { ...state, keyword: '', type: action.type };
        case CLEAR_SEARCH_DATA:
            return { ...state, res: '', showKeywordList: false, type: action.type };

        default:
            return state;
    }
};

