import { Alert, Linking, Platform, PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { IsSignIn, SignOutUser, SetSessionTicket, ClearSessionTicket } from '../common';

import DeviceInfo from 'react-native-device-info';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {
    SIGNIN_CONTROL,
    SIGNIN_CONTROL_SUCCESS,
    SIGNIN_CONTROL_FAIL,
    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL,
    USER_SIGNIN,
    USER_SIGNOUT,
    GET_USER_DATA,
    CLEAR_USER_ALL_DATA,
    UPDATE_LOCATION,
    SET_ADSTATUS
} from './Types';

import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');
var { LocationDenied } = require('../common/GlobalFunctions');

// Androidin versiyonuna göre konum tespitinde parametrelerde düzenleme yapılması gerekmektedir.
// Burada android versiyonu tespit ediliyor ve karşılaştırma yapabilmek için integer a dönüştürülüyor.
//______________________________________________________________________________
var androidVersion = 0;
var intAndroidVersion = 0;

if (DeviceInfo.getSystemName() == 'Android') {
    androidVersion = DeviceInfo.getSystemVersion();
    // console.log(androidVersion);
    if (androidVersion.indexOf('.') > -1) {
        intAndroidVersion = parseInt(androidVersion.split('.')[0]);
    }
    else {
        intAndroidVersion = parseInt(androidVersion);
    }
    // console.log(intAndroidVersion);
    // console.log(intAndroidVersion >= 10);
}
//______________________________________________________________________________

// Uygulamanın location a erişim izni var mı?
//______________________________________________________________________________
const requestLocationPermission = async () => {

    if (Platform.OS != 'ios') {

        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {
                //debugger
                // console.log(data);
                // The user has accepted to enable the location services
                // data can be :
                //  - "already-enabled" if the location services has been already enabled
                //  - "enabled" if user has clicked on OK button in the popup
                // console.log(data);
                //debugger
                if (data != "already-enabled") {
                    Actions.startScreen();
                }
                else {
                    if (granted) {
                        // console.log("You can use the ACCESS_FINE_LOCATION")
                    }
                    else {
                        LocationDenied(0);
                    }
                }
            }).catch(err => {
                //   debugger
                // console.log(err);

                Actions.startScreen();

                // console.log("error verdi actions çalışmadı")
                // The user has not accepted to enable the location services or something went wrong during the process
                // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                // codes : 
                //  - ERR00 : The user has clicked on Cancel button in the popup
                //  - ERR01 : If the Settings change are unavailable
                //  - ERR02 : If the popup has failed to open
            });
    }
};
//______________________________________________________________________________

// cihaz konumu 3 saniyede alınamazsa daha uzun süre arka planda çalışılarak konumunun alınması ve set edilmesi işlemleri
//______________________________________________________________________________
async function getCurrentPositionLongTime(dispatch, userData, swoqyUserToken, firebaseToken) {
    // console.log("getCurrentPositionLongTime")
    debugger
    Geolocation.getCurrentPosition(
        position => {
            if (position.coords != undefined) {
                userData.Latitude = position.coords.latitude;
                userData.Longitude = position.coords.longitude;

                getDeviceInfo(swoqyUserToken, firebaseToken, position.coords.latitude, position.coords.longitude, position.coords, dispatch)
            }

            dispatch({
                type: UPDATE_LOCATION,
                userData: userData
            });
        },
        err => {

            // console.log("Doğruluğu yüksek konum ALINAMADI")

            Geolocation.getCurrentPosition(
                position => {
                    if (position.coords != undefined) {
                        userData.Latitude = position.coords.latitude;
                        userData.Longitude = position.coords.longitude;

                        getDeviceInfo(swoqyUserToken, firebaseToken, position.coords.latitude, position.coords.longitude, position.coords, dispatch)
                    }

                    dispatch({
                        type: UPDATE_LOCATION,
                        userData: userData
                    });
                },
                err2 => {
                    console.log("Doğruluğu düşük uzun konum ALINAMADI")

                },
                {
                    enableHighAccuracy: false,
                    timeout: 20000,
                    maximumAge: 60000
                }
            );
        },
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60000
        },
    );
}
//______________________________________________________________________________

// function error(err) {
//     // debugger
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//     if (err.code == 1) {
//         LocationDenied(0);
//     }

//     if (err.code == 3) {
//         //         LocationDenied(0);
//     }

// }

const getCurrentPosition = function () {

    requestLocationPermission()

    return new Promise((resolve, reject) => {

        // console.log("Doğruluğu yüksek konum alınacak")

        Geolocation.getCurrentPosition(
            position => {
                // console.log("Doğruluğu yüksek konum alındı")
                resolve(position);
            },
            // err => resolve(err => { 
            //     debugger;
            //     console.log("komun alınırken hata oluştu.") ;
            // }),
            err => {

                // console.log("Doğruluğu yüksek konum ALINAMADI")

                Geolocation.getCurrentPosition(
                    position => {
                        // console.log("Doğruluğu düşük konum alındı")
                        resolve(position);
                    },
                    err2 => {
                        // console.log("Doğruluğu düşük konum ALINAMADI")
                        reject(err2);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 10000,
                        maximumAge: 60000
                    }
                );
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 60000
            }
        );
    });
}

export const SignInControl = (firebaseToken) => {
    return (dispatch) => {
        dispatch({ type: SIGNIN_CONTROL });

        IsSignIn().then((swoqyUserToken) => {

            Promise.all([getCurrentPosition(), DeviceInfo]).then(function (values) {


                //#region  Current Location __________________________________________
                getCurrentPosition()
                    .then((position) => {
                        if (position.coords == undefined) {
                            // console.log("Konum alınamadı. 1")
                        }
                        else {
                            lat = position.coords.latitude;
                            long = position.coords.longitude;
                            positionCoords = position.coords;
                        }

                        getDeviceInfo(swoqyUserToken, firebaseToken, lat, long, positionCoords, dispatch)
                    })
                    .catch((err) => {

                        // console.log("konum alanamadı")

                    });
                //#endregion _________________________________________________________
            })
                .catch((err) => {

                    getDeviceInfo(swoqyUserToken, firebaseToken, 0.0, 0.0, undefined, dispatch)


                    // if (err.code == 1) {
                    //     LocationDenied(0);
                    // }
                });
            // }
        })
            .catch((err) => {
                // console.log("user login değil")
            })
    }
}

function getDeviceInfo(swoqyUserToken, firebaseToken, lat, long, positionCoords, dispatch) {
    //#region  device Info __________________________________________
    var deviceName = "";
    DeviceInfo.getDeviceName().then(dName => {
        deviceName = dName;
    });

    var manufacturer = "";
    DeviceInfo.getManufacturer().then(m => {
        manufacturer = m;
    });

    var emtyData = JSON.stringify({
        "Latitude": lat,
        "Longitude": long
    })

    emptyUserData = JSON.parse(emtyData);

    var userAgent = "";
    var deviceInfo = "";
    DeviceInfo.getUserAgent().then(uAgent => {
        userAgent = uAgent;

        deviceInfo = JSON.stringify({
            "DeviceUniqueID": DeviceInfo.getUniqueId(),
            "Manufacturer": manufacturer,
            "Model": DeviceInfo.getModel(),
            "SystemName": DeviceInfo.getSystemName(),
            "SystemVersion": DeviceInfo.getSystemVersion(),
            "BundleID": DeviceInfo.getBundleId(),
            "BuildNumber": DeviceInfo.getBuildNumber(),
            "Version": DeviceInfo.getVersion(),
            "DeviceName": deviceName,
            "UserAgent": userAgent,
            "Brand": DeviceInfo.getBrand(),
            "Latitude": lat,
            "Longitude": long
        });

        callWebService(swoqyUserToken, firebaseToken, lat, long, positionCoords, deviceInfo, dispatch);
    });
    //#endregion _____________________________________________________________
}

function callWebService(swoqyUserToken, firebaseToken, lat, long, positionCoords, deviceInfo, dispatch) {
    // Web Service ___________________________________________________
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'getUserData';
    var webServiceUrl = webServerUrl + '/' + webService;
    fetch(webServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "ID": 0,
            "UserToken": swoqyUserToken,
            "Latitude": lat,
            "Longitude": long,
            "SessionDevice": JSON.parse(deviceInfo),
            "FirebaseToken": firebaseToken
        })
    })
        .then((res) => res.json())
        .then((res) => {
            if (res != "null") {
                res = JSON.parse(res);

                var data = JSON.stringify({
                    "UserNameSurname": res.UserNameSurname,
                    "UserPhoto": res.UserPhoto,
                    "DefaultLanguage": res.DefaultLanguage,
                    "DefaultCurrency": res.DefaultCurrency,
                    "PostAccess": res.PostAccess,
                    "AdminUser": res.AdminUser,
                    "Latitude": lat,
                    "Longitude": long,
                    "DeviceInfo": deviceInfo
                })

                userData = JSON.parse(data);

                // Konum tespiti yapılamamışsa arka planda yeniden konum tespit edilmeye çalışılıyor.
                //_________________________________________________________
                if (positionCoords == undefined) {
                    // debugger
                    getCurrentPositionLongTime(dispatch, userData, swoqyUserToken, firebaseToken);
                }
                //_________________________________________________________


                if (swoqyUserToken == null) {
                    signInControlFail(dispatch);
                } else {
                    signInControlSuccess(dispatch, swoqyUserToken, userData);
                }
                getUserDataSuccess(dispatch, userData);
            }
            else {
                // server'dan veri gelmezse sadece kullanıcının konum bilgisi yazılıyor.
                getUserDataSuccess(dispatch, emptyUserData);

                signInControlFail(dispatch);
            }
            //Kullanıcı giriş yaptı. yönlendirme yapılacak. kullanıcının id si de parameter olarak alındı. 
        })
        .catch((err) => {
            // Bir bağlantı hatası olursa sadece kullanıcının konum bilgisi yazılıyor.
            getUserDataSuccess(dispatch, emptyUserData);

            signInControlFail(dispatch);
        })

    // _____________________________________________________________
}

const GetUserData = (dispatch, token) => {

    return (dispatch) => {

        if (token != "") {

            var webServerUrl = GLOBAL.WEB_SERVICE_URL;
            var webService = 'getUserData';
            var webServiceUrl = webServerUrl + '/' + webService;

            fetch(webServiceUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userToken": token
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res != "null") {
                        //                        debugger;
                        res = JSON.parse(res);

                        var data = JSON.stringify({
                            "UserNameSurname": res.UserNameSurname,
                            "UserPhoto": res.UserPhoto,
                            "DefaultLanguage": res.DefaultLanguage,
                            "DefaultCurrency": res.DefaultCurrency,
                            "PostAccess": res.PostAccess,
                            "AdminUser": res.AdminUser
                        })

                        userData = JSON.parse(data);

                        getUserDataSuccess(dispatch, userData);
                    }
                    else {
                        signInControlFail(dispatch);
                    }
                    //Kullanıcı giriş yaptı. yönlendirme yapılacak. kullanıcının id si de parameter olarak alındı. 
                })
                .catch((err) => {
                    signInControlFail(dispatch);
                })
        } else {
            signInControlFail(dispatch);
        }
    }
}

export const SignOut = () => {
    return (dispatch) => {
        dispatch({ type: SIGNOUT });

        SignOutUser().then((result) => {
            if (result) {
                signOutSuccess(dispatch);
            }
            else {
                signOutFail(dispatch);
            }
        })
    }
}














export const SetAdStatus = (value) => {
    //debugger;
    return (dispatch) => {
        setAdStatus(dispatch, value.AdStatus);
    };
};

const setAdStatus = (dispatch, adStatus) => {
    //debugger;
    dispatch({
        type: SET_ADSTATUS,
        adStatus: adStatus
    });
};








const signInControlSuccess = (dispatch, swoqyUserToken, userData) => {
    //debugger;
    dispatch({
        type: USER_SIGNIN,
        userToken: swoqyUserToken,
        userData: userData
    });

    dispatch({
        type: SIGNIN_CONTROL_SUCCESS,
        payload: swoqyUserToken
    });
    // console.log("signInControlSuccess")

    Actions.wallScreen({ fromStartScreen: 1 });

};

const signInControlFail = (dispatch) => {
    dispatch({
        type: SIGNIN_CONTROL_FAIL
    });

    Actions.signInScreen();
};

const signOutSuccess = (dispatch) => {
    dispatch({
        type: USER_SIGNOUT
    });

    dispatch({
        type: SIGNOUT_SUCCESS
    });
    // debugger;
    dispatch({
        type: CLEAR_USER_ALL_DATA
    });


    Actions.signInScreen({ signOut: true });
};

const signOutFail = (dispatch) => {
    dispatch({
        type: SIGNOUT_FAIL
    });

    Actions.wallScreen();
};


const getUserDataSuccess = (dispatch, userData) => {

    dispatch({
        type: GET_USER_DATA,
        userData: userData
    });
};
