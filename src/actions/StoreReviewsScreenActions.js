import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
    STORE_REVIEWS_SCREEN_DATA,
    STORE_REVIEWS_SCREEN_DATA_SUCCESS,
    STORE_REVIEWS_SCREEN_DATA_FAIL,
    STORE_NEWREVIEW_SCREEN_DATA,
    STORE_NEWREVIEW_SCREEN_DATA_SUCCESS,
    STORE_NEWREVIEW_SCREEN_DATA_FAIL,
    SET_STORE_REVIEW_LIKE_DATA,
    SET_STORE_REVIEW_LIKE_DATA_SUCCESS,
    SET_STORE_REVIEW_LIKE_DATA_FAIL,
    SET_BRAND_REVIEW_LIKE_DATA,
    SET_BRAND_REVIEW_LIKE_DATA_SUCCESS,
    SET_BRAND_REVIEW_LIKE_DATA_FAIL,
    SET_SHOPPINGMALL_REVIEW_LIKE_DATA,
    SET_SHOPPINGMALL_REVIEW_LIKE_DATA_SUCCESS,
    SET_SHOPPINGMALL_REVIEW_LIKE_DATA_FAIL,
    CONNECTION_ERROR

} from './Types';

import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// get location data ---------------------
var lat = 0.0;
var long = 0.0;
// return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// --------------------------


export const StoreReviewsScreenData = (data) => {
    return (dispatch) => {
        // debugger;
        operation(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'StoreReviewsScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.storeID,
                "userToken": data.userToken,
                "Latitude": data.latitude,
                "Longitude": data.longitude
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    operationSucces(dispatch, res, data.userToken);
                }
                else {
                    operationFail(dispatch, Localizations('Global.ConnectionError'));
                    // this.setState({ isLoading : false});
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};

export const StoreNewReviewSendData = (data) => {
    return (dispatch) => {
        // debugger;
        newReview(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'StoreNewReviewsScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.storeID,
                "userToken": data.userToken,
                "Point": data.point,
                "ReviewTitle": data.txtTitle,
                "ReviewText": data.txtReview,
                "Latitude": lat,
                "Longitude": long
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    newReviewSucces(dispatch, res, data.userToken);
                }
                else {
                    newReviewFail(dispatch, Localizations('Global.ConnectionError'));
                    // this.setState({ isLoading : false});
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};

export const SetStoreReviewLike = (value) => {

    return (dispatch) => {
        setStoreReviewLike(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SetStoreReviewLike';
        var webServiceUrl = webServerUrl + webService;


        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": value.reviewID,
                "userToken": value.userToken,
                "Latitude": lat,
                "Longitude": long
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    if (res.Success == false && res.Code == 100) {
                        setStoreReviewLikeFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                        Actions.signInScreen();
                      }

                    setStoreReviewLikeSucces(dispatch, res.LikeCount, value.reviewID);
                }
                else {
                    setStoreReviewLikeFail(dispatch, Localizations('Global.ConnectionError'));
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};

export const SetBrandReviewLike = (value) => {

    return (dispatch) => {
        setBrandReviewLike(dispatch);
//console.log(value);
        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SetBrandReviewLike';
        var webServiceUrl = webServerUrl + webService;


        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": value.reviewID,
                "userToken": value.userToken,
                "Latitude": lat,
                "Longitude": long
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    if (res.Success == false && res.Code == 100) {
                        setBrandReviewLikeFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                        Actions.signInScreen();
                      }

                    setBrandReviewLikeSucces(dispatch, res.LikeCount, value.reviewID);
                }
                else {
                    setBrandReviewLikeFail(dispatch, Localizations('Global.ConnectionError'));
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};

export const SetShoppingMallReviewLike = (value) => {

    return (dispatch) => {

       // console.log(value)
        setShoppingMallReviewLike(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SetShoppingMallReviewLike';
        var webServiceUrl = webServerUrl + webService;


        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": value.reviewID,
                "userToken": value.userToken,
                "Latitude": lat,
                "Longitude": long
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    if (res.Success == false && res.Code == 100) {
                        setShoppingMallReviewLikeFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                        Actions.signInScreen();
                      }

                    setShoppingMallReviewLikeSucces(dispatch, res.LikeCount, value.reviewID);
                }
                else {
                    setShoppingMallReviewLikeFail(dispatch, Localizations('Global.ConnectionError'));
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};


//#region StoresReviewsScreen
const operation = (dispatch) => {
    // debugger;
    dispatch({
        type: STORE_REVIEWS_SCREEN_DATA
    });
};

const operationSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: STORE_REVIEWS_SCREEN_DATA_SUCCESS,
        payload: res,
        user: userToken
    });
};

const operationFail = (dispatch, errorMessage) => {
    // debugger;
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: STORE_REVIEWS_SCREEN_DATA_FAIL
    });
};
//#endregion


//#region NewReviewsScreen
const newReview = (dispatch) => {
    // debugger;
    dispatch({
        type: STORE_NEWREVIEW_SCREEN_DATA
    });
};

const newReviewSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: STORE_NEWREVIEW_SCREEN_DATA_SUCCESS,
        payload: res,
        user: userToken
    });

};

const newReviewFail = (dispatch, errorMessage) => {
    // debugger;
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: STORE_NEWREVIEW_SCREEN_DATA_FAIL
    });
};
//#endregion


//#region  SetStoreReviewLike
const setStoreReviewLike = (dispatch) => {
    dispatch({
        type: SET_STORE_REVIEW_LIKE_DATA
    });
};

const setStoreReviewLikeSucces = (dispatch, likeCount, reviewID) => {
    //   debugger;
    dispatch({
        type: SET_STORE_REVIEW_LIKE_DATA_SUCCESS,
        likeCount: likeCount,
        changingReviewID: reviewID
    });
};

const setStoreReviewLikeFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SET_STORE_REVIEW_LIKE_DATA_FAIL
    });
};
//#endregion


//#region  SetBrandReviewLike
const setBrandReviewLike = (dispatch) => {
    dispatch({
        type: SET_BRAND_REVIEW_LIKE_DATA
    });
};

const setBrandReviewLikeSucces = (dispatch, likeCount, reviewID) => {
    //   debugger;
    dispatch({
        type: SET_BRAND_REVIEW_LIKE_DATA_SUCCESS,
        likeCount: likeCount,
        changingReviewID: reviewID
    });
};

const setBrandReviewLikeFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SET_BRAND_REVIEW_LIKE_DATA_FAIL
    });
};
//#endregion


//#region  SetShoppingMallReviewLike
const setShoppingMallReviewLike = (dispatch) => {
    dispatch({
        type: SET_SHOPPINGMALL_REVIEW_LIKE_DATA
    });
};

const setShoppingMallReviewLikeSucces = (dispatch, likeCount, reviewID) => {
    //   debugger;
    dispatch({
        type: SET_SHOPPINGMALL_REVIEW_LIKE_DATA_SUCCESS,
        likeCount: likeCount,
        changingReviewID: reviewID
    });
};

const setShoppingMallReviewLikeFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SET_SHOPPINGMALL_REVIEW_LIKE_DATA_FAIL
    });
};
//#endregion



const connectionError = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: CONNECTION_ERROR
    });
};
