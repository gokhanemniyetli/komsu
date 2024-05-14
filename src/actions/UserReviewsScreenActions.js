import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
    USER_REVIEWS_SCREEN_DATA,
    USER_REVIEWS_SCREEN_DATA_SUCCESS,
    USER_REVIEWS_SCREEN_DATA_FAIL,
    CONNECTION_ERROR

} from './Types';

const GLOBAL = require('../common/Globals');

export const UserReviewsScreenData = (data) => {
    return (dispatch) => {

        operation(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'UserReviewsScreen';
        var webServiceUrl = webServerUrl + webService;

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ID": data.userID,
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
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })
    };
};


//#region UsersReviewsScreen
const operation = (dispatch) => {
    dispatch({
        type: USER_REVIEWS_SCREEN_DATA
    });
};

const operationSucces = (dispatch, res, userToken) => {
    dispatch({
        type: USER_REVIEWS_SCREEN_DATA_SUCCESS,
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
        type: USER_REVIEWS_SCREEN_DATA_FAIL
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
