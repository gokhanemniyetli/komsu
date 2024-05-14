import { Alert, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';


import { SignOut } from '../actions';

// import { Actions } from 'react-native-router-flux';

import {
    USER_GENERALSETTINGS_SCREEN_DATA,
    USER_GENERALSETTINGS_SCREEN_DATA_SUCCESS,
    USER_GENERALSETTINGS_SCREEN_DATA_FAIL,
    SET_USER_GENERALSETTINGS_DATA,
    SET_USER_GENERALSETTINGS_DATA_SUCCESS,
    SET_USER_GENERALSETTINGS_DATA_FAIL,
    SET_USER_GENERALSETTINGS_USER_ALL_DATA,
    SEARCH_IN_BLOCKED_USERS_DATA,
    SEARCH_IN_BLOCKED_USERS_DATA_SUCCESS,
    SEARCH_IN_BLOCKED_USERS_DATA_FAIL,

    CONNECTION_ERROR
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// const getCurrentPosition = function () {
//     return new Promise(
//         (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//       )
// }


export const UserGeneralSettingsScreenData = (data) => {
    return (dispatch) => {
        operation(dispatch);
        // debugger
        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'UserGeneralSettingsScreen';
        var webServiceUrl = webServerUrl + webService;

        // // Loaction 
        // Promise.all([getCurrentPosition()]).then(function (values) {
        //     getCurrentPosition()
        //         .then((position) => {
        //             var lat = 0.0;
        //             lat = position.coords.latitude;

        //             var long = 0.0;
        //             long = position.coords.longitude;
        //             // Location

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userToken": data.userToken,
                "Latitude": data.latitude,
                "Longitude": data.longitude
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    // debugger;
                    operationSuccess(dispatch, res, data.userToken);
                }
                else {
                    operationFail(dispatch, Localizations('Global.ConnectionError'));
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

        //             // Location
        //         })
        //         .catch((err) => {
        //             // debugger;
        //             console.error(err.message);
        //         });
        // })
        // .catch((err) => {
        //     if (err.code == 1) {
        //       alert(Localizations('Global.LocationDenied'));
        //       Actions.signInScreen()
        //     }
        //   });
        // // location
    };
};

export const SetUserGeneralSettingsData = (value) => {

    return (dispatch) => {
        //   debugger
        setUserGeneralSettings(dispatch);
        //value.userToken = "";
        if (value.userToken || (value.OperationType == 0 || value.OperationType == 1)) {
            var webServerUrl = GLOBAL.WEB_SERVICE_URL;
            var webService = 'SetUserGeneralSettings';
            var webServiceUrl = webServerUrl + webService;

            if (value.selectedImage) {
                userPhoto = {
                    Uri: value.selectedImage.uri,
                    Type: value.selectedImage.mime,
                    Name: value.selectedImage.name,
                    ImageFile: value.selectedImage.data
                };
            } else {
                userPhoto = null
            }


            // if (value.BirthDate == "") {
            //     birthdate = null;
            // }
            // else {
            //     birthdate = value.BirthDate;
            // }
//debugger
            fetch(webServiceUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    "Name": value.name,
                    "Surname": value.surname,
                    "Phone": value.phone,
                    "Email": value.email,
                    "BirthDate": null,
                    "DefaultLanguage": value.DefaultLanguage,
                    // "DefaultCurrency": value.DefaultCurrency,
                    "DefaultCurrency": 1,
                    "AccountStatus": value.accountStatus,
                    "Password": value.password,
                    "NewPassword": value.newPassword,
                    "ProfileViewer": value.profileViewer,
                    "PostAccess": value.postAccess,
                    "PostCommentAutoPublish": value.postCommentAutoPublish,
                    "ForwardEventsNearMe": value.forwardEventsNearMe,
                    "ForwardEventsMostNearMe": value.forwardEventsMostNearMe,
                    "WhoFriend": value.whoFriend,
                    "FriendMessage": value.friendMessage,
                    "FollowingMessage": value.followingMessage,
                    "FollowerMessage": value.followerMessage,
                    "OperationType": value.OperationType,
                    "UserToken": value.userToken,
                    "UserPhoto": userPhoto,
                    "Eula1": value.eula1,
                    "Eula2": value.eula2,
                    "InappropriateContent": value.InappropriateContent,
                    "SessionDevice": value.deviceInfo,
                    "SystemLanguage": value.systemLanguage

                })
            })
                .then((res) => res.json())
                .then((res) => {
                    // debugger
                    if (res != -1) {
                        res = JSON.parse(res);
                        //  debugger
                        if (res.Code >= 300) {
                            switch (res.Code) {
                                case 300:
                                    operationFail(dispatch,
                                        Localizations('Setting.SecurityPassword.WrongCurrentPassword'),
                                        res.Code
                                    );
                                    break;
                                case 301:
                                    operationFail(dispatch,
                                        Localizations('Setting.SecurityPassword.ExistingPhone'),
                                        res.Code
                                    );
                                    break;
                                case 302:
                                    operationFail(dispatch,
                                        Localizations('Setting.SecurityPassword.ExistingEmail'),
                                        res.Code
                                    );
                                    break;

                                default:
                                    break;
                            }

                        }
                        else {
                            setUserGeneralSettingsSuccess(dispatch, res);

                            // if (value.OperationType == 1) {
                            //     var strDate = value.BirthDate;
                            //     var d = strDate.replace('/Date(', '').replace(')/', '');
                            //     var myObj = JSON.parse('{"date_item":"' + d + '"}'),
                            //         myDate = new Date(1 * myObj.date_item);
                            //     value.BirthDate = myDate;
                            // }
                            // debugger;
                            setUserGeneralSettingsUserAllData(dispatch, value);

                        }
                    }
                    else {
                        setUserGeneralSettingsFail(dispatch, Localizations('Global.ConnectionError'));
                    }
                })
                .catch((err) => {
                    connectionError(dispatch, Localizations('Global.ConnectionError'));
                })
        }
        else {
            setUserGeneralSettingsUserAllData(dispatch, value);
        }
    };
};

export const SearchInBlockedUsersData = (value) => {
    return (dispatch) => {
        SearchInBlockedUsers(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SearchInBlockedUsers';
        var webServiceUrl = webServerUrl + webService;


        // // Loaction 
        // Promise.all([getCurrentPosition()]).then(function (values) {
        //     getCurrentPosition()
        //         .then((position) => {
        //             var lat = 0.0;
        //             lat = position.coords.latitude;

        //             var long = 0.0;
        //             long = position.coords.longitude;
        //             // Location


        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userToken": value.userToken,
                "ID": 0,
                "Keyword": '',
                "Latitude": data.latitude,
                "Longitude": data.longitude
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res != -1) {
                    res = JSON.parse(res);

                    SearchInBlockedUsersSuccess(dispatch, res);
                }
                else {
                    SearchInBlockedUsersFail(dispatch, Localizations('Global.ConnectionError'));
                }
            })
            .catch((err) => {
                connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

        //             // Location
        //         })
        //         .catch((err) => {
        //             // debugger;
        //             console.error(err.message);
        //         });
        // })
        // .catch((err) => {
        //     if (err.code == 1) {
        //       alert(Localizations('Global.LocationDenied'));
        //       Actions.signInScreen()
        //     }
        //   });
        // // location
    };
};

//#region operation işlemleri
const operation = (dispatch) => {
    dispatch({
        type: USER_GENERALSETTINGS_SCREEN_DATA
    });
};

const operationSuccess = (dispatch, res, userToken) => {
    //debugger;
    dispatch({
        type: USER_GENERALSETTINGS_SCREEN_DATA_SUCCESS,
        payload: res,
        user: userToken
    });
};

const operationFail = (dispatch, errorMessage, errorCode) => {
    Alert.alert(
        'Error !',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: USER_GENERALSETTINGS_SCREEN_DATA_FAIL,
        errorCode: errorCode,
        errorMessage: errorMessage
    });

    if (errorCode) {
        switch (errorCode) {
            case 300:
                //Actions.userSettingsSecurityPasswordScreen();
                break;

            case 301:
            case 302:
                // Actions.userSettingsPersonalInformationScreen();
                //Actions.pop();
                break;

            default:
                break;
        }
    }
};
//#endregion

//#region setUserGeneralSettings işlemleri
const setUserGeneralSettings = (dispatch) => {
    //debugger
    dispatch({
        type: SET_USER_GENERALSETTINGS_DATA
    });
};

const setUserGeneralSettingsSuccess = (dispatch, res) => {
    //debugger
    dispatch({
        type: SET_USER_GENERALSETTINGS_DATA_SUCCESS,
        payload: res
    });


};

const setUserGeneralSettingsFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SET_USER_GENERALSETTINGS_DATA_FAIL
    });
};
//#endregion

//#region SearchInBlockedUsers işlemleri
const SearchInBlockedUsers = (dispatch) => {
    dispatch({
        type: SEARCH_IN_BLOCKED_USERS_DATA
    });
};

const SearchInBlockedUsersSuccess = (dispatch, res) => {
    dispatch({
        type: SEARCH_IN_BLOCKED_USERS_DATA_SUCCESS,
        payload: res
    });
};

const SearchInBlockedUsersFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SEARCH_IN_BLOCKED_USERS_DATA_FAIL
    });
};
//#endregion


const setUserGeneralSettingsUserAllData = (dispatch, value) => {
    dispatch({
        type: SET_USER_GENERALSETTINGS_USER_ALL_DATA,
        payload: value
    });
    // debugger
    switch (value.OperationType) {
        case 0:
            //Actions.signInScreen({ signOut: 1 });
            // {
            //     Alert.alert(
            //         '',
            //         Localizations('SignIn.SignOn'),
            //         [
            //             { text: Localizations('Global.Ok') }
            //         ]
            //     )
            // }


            //debugger;
            if (Platform.OS != "ios") {
                SignOut();
            }

            Actions.signInScreen({ firstLoginEmail: value.email, firstLoginPassword: value.newPassword });


            break;

        case 1:
            if (value.userToken) {
                Actions.userGeneralSettingsScreen();
            }
            else {
                Actions.userSettingsSecurityPasswordScreen();
            }
            break;

        case 2:
        case 3:
        case 4:
            Actions.userGeneralSettingsScreen();
            break;

        default:
            break;
    }

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
