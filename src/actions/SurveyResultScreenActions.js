import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
    SURVEY_RESULT_SCREEN_DATA,
    SURVEY_RESULT_SCREEN_DATA_SUCCESS,
    SURVEY_RESULT_SCREEN_DATA_FAIL,
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

export const SurveyResultScreenData = (data) => {
    return (dispatch) => {
        operation(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SurveyResult';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.surveyID,
                "userToken": data.userToken,
                "Latitude": lat,
                "Longitude": long
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    operationSuccess(dispatch, res, data.userToken);
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

const operation = (dispatch) => {
    dispatch({
        type: SURVEY_RESULT_SCREEN_DATA
    });
};

const operationSuccess = (dispatch, res, userToken) => {
    //debugger;
    dispatch({
        type: SURVEY_RESULT_SCREEN_DATA_SUCCESS,
        payload: res,
        user: userToken
    });
};

const operationFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SURVEY_RESULT_SCREEN_DATA_FAIL
    });
};

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