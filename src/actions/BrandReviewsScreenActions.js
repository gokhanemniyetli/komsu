import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
    BRAND_REVIEWS_SCREEN_DATA,
    BRAND_REVIEWS_SCREEN_DATA_SUCCESS,
    BRAND_REVIEWS_SCREEN_DATA_FAIL,
    USER_NEWREVIEW_SCREEN_DATA,
    USER_NEWREVIEW_SCREEN_DATA_SUCCESS,
    USER_NEWREVIEW_SCREEN_DATA_FAIL,
    BRAND_NEWREVIEW_SCREEN_DATA,
    BRAND_NEWREVIEW_SCREEN_DATA_SUCCESS,
    BRAND_NEWREVIEW_SCREEN_DATA_FAIL,
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


export const BrandReviewsScreenData = (data) => {
    return (dispatch) => {
        //console.log("BrandReviewScreenActions1")
        operation(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'BrandReviewsScreen';
        var webServiceUrl = webServerUrl + webService;
// debugger
        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.brandID,
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


export const UserNewReviewScreenData = (data) => {
    return (dispatch) => {
        //console.log("BrandReviewScreenActions2")

        userNewReview(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'UserNewReviewScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": 0,
                "userToken": data.userToken
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    userNewReviewSucces(dispatch, res, data.userToken);
                }
                else {
                    userNewReviewFail(dispatch, Localizations('Global.ConnectionError'));
                    // this.setState({ isLoading : false});
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};

export const BrandNewReviewSendData = (data) => {
    return (dispatch) => {
        // debugger;
        //console.log("BrandReviewScreenActions3")

        newReview(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'BrandNewReviewsScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.brandID,
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


//#region BrandsReviewsScreen
const operation = (dispatch) => {
    // debugger;
    dispatch({
        type: BRAND_REVIEWS_SCREEN_DATA
    });
};

const operationSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: BRAND_REVIEWS_SCREEN_DATA_SUCCESS,
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
        type: BRAND_REVIEWS_SCREEN_DATA_FAIL
    });
};
//#endregion


//#region UserNewReviewScreen
const userNewReview = (dispatch) => {
    // debugger;
    dispatch({
        type: USER_NEWREVIEW_SCREEN_DATA
    });
};

const userNewReviewSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: USER_NEWREVIEW_SCREEN_DATA_SUCCESS,
        payload: res,
        user: userToken
    });

};

const userNewReviewFail = (dispatch, errorMessage) => {
    // debugger;
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: USER_NEWREVIEW_SCREEN_DATA_FAIL
    });
};
//#endregion


//#region NewReviewsScreen
const newReview = (dispatch) => {
    // debugger;
    dispatch({
        type: BRAND_NEWREVIEW_SCREEN_DATA
    });
};

const newReviewSucces = (dispatch, res, userToken) => {
    //  debugger;
    dispatch({
        type: BRAND_NEWREVIEW_SCREEN_DATA_SUCCESS,
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
        type: BRAND_NEWREVIEW_SCREEN_DATA_FAIL
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
