import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { SetSessionTicket, ClearSessionTicket, SetSessionLanguage } from '../common';
import DeviceInfo from 'react-native-device-info';

import {

    USER_SIGNIN_START,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,

    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    SIGNIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    USER_SIGNIN,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    UPDATE_LOCATION

} from './Types';


import Geolocation from '@react-native-community/geolocation';


const GLOBAL = require('../common/Globals');





// Androidin versiyonuna göre konum tespitinde parametrelerde düzenleme yapılması gerekmektedir.
// Burada android versiyonu tespit ediliyor ve karşılaştırma yapabilmek için integer a dönüştürülüyor.
//______________________________________________________________________________
var androidVersion = 0;
var intAndroidVersion = 0;

if (DeviceInfo.getSystemName() == 'Android') {
    androidVersion = DeviceInfo.getSystemVersion();

    if (androidVersion.indexOf('.') > -1) {
        intAndroidVersion = parseInt(androidVersion.split('.')[0]);
    }
    else {
        intAndroidVersion = parseInt(androidVersion);
    }
}
//______________________________________________________________________________




// cihaz konumu 3 saniyede alınamazsa daha uzun süre arka planda çalışılarak konumunun alınması ve set edilmesi işlemleri
//______________________________________________________________________________
async function getCurrentPositionLongTime(dispatch, userData) {
    Geolocation.getCurrentPosition(
        position => {
            if (position.coords != undefined) {
                userData.Latitude = position.coords.latitude;
                userData.Longitude = position.coords.longitude;
            }

            dispatch({
                type: UPDATE_LOCATION,
                userData: userData
            });
        },
        err => (console.log(err)),
        {
            enableHighAccuracy: intAndroidVersion >= 10 ? true : false,
            timeout: 30000,
            maximumAge: 60000
        },
    );
}
//______________________________________________________________________________



const getCurrentPosition = function () {
    return new Promise(resolve => {
        Geolocation.getCurrentPosition(
            position => {
                resolve(position);
            },
            err => resolve(err => { console.log("komun alınırken hata oluştu.") }),
            {
                enableHighAccuracy: intAndroidVersion >= 10 ? true : false,
                timeout: 3000,
                maximumAge: 60000
            }
        );
    });
}




export const emailChanged = (email) => {
    return (dispatch) => {
        dispatch({
            type: EMAIL_CHANGED,
            payload: email
        });
    };
};

export const passwordChanged = (password) => {
    return (dispatch) => {
        dispatch({
            type: PASSWORD_CHANGED,
            payload: password
        });
    };
};

export const UserSignIn = ({ email, password, isSignOut }) => {
    //    debugger
    return (dispatch) => {
        dispatch({ type: USER_SIGNIN_START });
  
        if (email != "" && password != "") {

            var webServerUrl = GLOBAL.WEB_SERVICE_URL;
            var webService = 'UserSignIn';
            var webServiceUrl = webServerUrl + '/' + webService;

            fetch(webServiceUrl, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: "include",
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res != "null") {
                        res = JSON.parse(res);

                        signInSucces(dispatch, res, isSignOut);
                    }
                    else {
                        signInFail(dispatch, Localizations('SignIn.IncorrectEmailOrPassword'));
                    }
                    //Kullanıcı giriş yaptı. yönlendirme yapılacak. kullanıcının id si de parameter olarak alındı. 
                })
                .catch((err) => {
        
                    signInFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
                })
        } else {
            signInFail(dispatch, Localizations('SignIn.YouCanEmailAndPassword'));
        }
    }
}

export const FacebookUserSignIn = ({ token, isSignOut, systemLanguage }) => {
    //  debugger
    return (dispatch) => {
        dispatch({ type: USER_SIGNIN_START });

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'FacebookSignIn';
        var webServiceUrl = webServerUrl + '/' + webService;
        if (token != "") {
            fetch(webServiceUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": token,
                    "SystemLanguage": systemLanguage
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res != -1) {
                        if (res.UserToken != "") {
                            // debugger;
                            signInSucces(dispatch, res, isSignOut);
                        }
                        else if (res.FacebookID != "") {
                            signInFail(dispatch, Localizations('SignIn.IncorrectEmailOrPassword'));
                        }
                    }
                    else {
                        signInFail(dispatch, Localizations('SignIn.FacebookUserError'));
                    }
                })
                .catch((err) => {
                    signInFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
                })
        } else {
            // console.log(9);

            signInFail(dispatch, Localizations('SignIn.FacebookUserError'));
        }
    }
}



export const AppleUserSignIn = ({ user }) => {
    //debugger
    try {
        return (dispatch) => {
            //  debugger
            dispatch({ type: USER_SIGNIN_START });

            var webServerUrl = GLOBAL.WEB_SERVICE_URL;
            var webService = 'AppleSignIn';
            var webServiceUrl = webServerUrl + '/' + webService;

            if (user != "") {
                fetch(webServiceUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "Token": "",
                        "AppleID": user.user ? user.user : "",
                        "FirstName": (user.givenName ? user.givenName + (user.middleName ? " " + user.middleName : "") : ""),
                        "LastName": user.familyName ? user.familyName : "",
                        "Email": user.email ? user.email : "",
                        "SwoqyUserID": 0,
                        "SwoqyToken": "",
                        "Success": true,
                        "Code": 0,
                        "Message": "",
                        "InternalMessage": "",
                        "SystemLanguage": user.systemLanguage
                    })
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res != -1) {
                            if (res.UserToken != "") {
                                // debugger;
                                signInSucces(dispatch, res);
                            }
                            else if (res.FacebookID != "") {
                                signInFail(dispatch, Localizations('SignIn.IncorrectEmailOrPassword'));
                            }
                        }
                        else {
                            signInFail(dispatch, Localizations('SignIn.FacebookUserError'));
                        }
                    })
                    .catch((err) => {
                        signInFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
                    })
            } else {
                // console.log(9);

                signInFail(dispatch, Localizations('SignIn.FacebookUserError'));
            }
        }
    } catch (error) {
        //console.log(e);
    }

}


export const ForgotPassword = (data) => {
    return (dispatch) => {
        forgotPassword(dispatch);
        if (data.email != "") {

            var webServerUrl = GLOBAL.WEB_SERVICE_URL;
            var webService = 'ForgotPassword';
            var webServiceUrl = webServerUrl + '/' + webService;

            fetch(webServiceUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": data.email
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res != "null") {
                        res = JSON.parse(res);
                        forgotPasswordSucces(dispatch, res);
                    }
                    else {
                        forgotPasswordFail(dispatch, Localizations('SignIn.IncorrectEmailOrPassword'));
                    }
                })
                .catch((err) => {

                    forgotPasswordFail(dispatch, Localizations('Global.ConnectionError') + "\n" + toString());
                })
        } else {
            forgotPasswordFail(dispatch, Localizations('SignIn.YouCanEmailAndPassword'));
        }
    }
}

const signInFail = (dispatch, errorMessage) => {
    // console.log("error");

    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );

    ClearSessionTicket();

    dispatch({
        type: USER_SIGNIN_FAIL
    });


};

const signInSucces = (dispatch, data, isSignOut) => {
    // console.log("success:" + data);
    //debugger
    Promise.all([getCurrentPosition()]).then(function (values) {
        getCurrentPosition()
            .then((position) => {
                var lat = 0.0;
                var long = 0.0;
                if (position.coords == undefined) {
                    console.log("Konum alınamadı.")
                }
                else {
                    lat = position.coords.latitude;
                    long = position.coords.longitude;
                }



                var userData = JSON.stringify({
                    "UserNameSurname": data.UserNameSurname,
                    "UserPhoto": data.UserPhoto,
                    "DefaultLanguage": data.DefaultLanguage,
                    "DefaultCurrency": data.DefaultCurrency,
                    "PostAccess": data.PostAccess,
                    "SocialMediaUser": data.SocialMediaUser,
                    "AdminUser": data.AdminUser,
                    "AppleUser": data.AppleUser ? data.AppleID : "",
                    "Latitude": lat,
                    "Longitude": long
                })

                SetSessionTicket(data.UserToken);

                var language = '';
                if (data.DefaultLanguage) {
                    switch (data.DefaultLanguage) {
                        case 1:
                            language = 'tr';
                            break;
                        case 2:
                            language = 'en';
                            break;
                        case 3:
                            language = 'es';
                            break;
                        case 4:
                            language = 'it';
                            break;
                        case 5:
                            language = 'fr';
                            break;
                        case 6:
                            language = 'zh';
                            break;
                        case 7:
                            language = 'ja';
                            break;
                        case 8:
                            language = 'hi';
                            break;
                        case 9:
                            language = 'ru';
                            break;
                        case 10:
                            language = 'pt';
                            break;
                        case 11:
                            language = 'ar';
                            break;
                        case 12:
                            language = 'de';
                            break;
                        case 13:
                            language = 'ko';
                            break;

                        default:
                            break;
                    }
                    // debugger
                    SetSessionLanguage(language);
                }


                userData = JSON.parse(userData);

                // Konum tespiti yapılamamışsa arka planda yeniden konum tespit edilmeye çalışılıyor.
                //_________________________________________________________
                if (position.coords == undefined) {
                    getCurrentPositionLongTime(dispatch, userData);
                }
                //_________________________________________________________


                dispatch({
                    type: USER_SIGNIN_SUCCESS
                });
                // debugger;
                dispatch({
                    type: USER_SIGNIN,
                    userData: userData,
                    userToken: data.UserToken
                });

                // dispatch({
                //     type: LOGIN_USER_SUCCESS
                // });

                if (isSignOut == true) {
                    Actions.wallScreen();
                }


            })
            .catch((err) => {
                // debugger;
                console.error(err.message);
            });
    });

};


const forgotPassword = (dispatch) => {
    dispatch({
        type: FORGOT_PASSWORD
    });
};

const forgotPasswordSucces = (dispatch, data) => {
    dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data
    });
};


const forgotPasswordFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );

    dispatch({
        type: FORGOT_PASSWORD_FAIL
    });
};
