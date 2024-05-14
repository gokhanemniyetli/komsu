import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
    SHOPPINGMALL_REVIEWS_SCREEN_DATA,
    SHOPPINGMALL_REVIEWS_SCREEN_DATA_SUCCESS,
    SHOPPINGMALL_REVIEWS_SCREEN_DATA_FAIL,
    SHOPPINGMALL_NEWREVIEW_SCREEN_DATA,
    SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_SUCCESS,
    SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_FAIL,
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


export const ShoppingMallReviewsScreenData = (data) => {
    return (dispatch) => {
        //  debugger;
        operation(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'ShoppingMallReviewsScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.shoppingMallID,
                "userToken": data.userToken
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

export const ShoppingMallNewReviewSendData = (data) => {
    return (dispatch) => {
        //  debugger;
        newReview(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'ShoppingMallNewReviewsScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.shoppingMallID,
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


//#region StoresReviewsScreen
const operation = (dispatch) => {
    // debugger;
    dispatch({
        type: SHOPPINGMALL_REVIEWS_SCREEN_DATA
    });
};

const operationSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: SHOPPINGMALL_REVIEWS_SCREEN_DATA_SUCCESS,
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
        type: SHOPPINGMALL_REVIEWS_SCREEN_DATA_FAIL
    });
};
//#endregion


//#region NewReviewsScreen
const newReview = (dispatch) => {
    // debugger;
    dispatch({
        type: SHOPPINGMALL_NEWREVIEW_SCREEN_DATA
    });
};

const newReviewSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_SUCCESS,
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
        type: SHOPPINGMALL_NEWREVIEW_SCREEN_DATA_FAIL
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
