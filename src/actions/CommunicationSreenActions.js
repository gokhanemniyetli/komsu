import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
    GET_FRIEND_REQUESTS_DATA,
    GET_FRIEND_REQUESTS_DATA_SUCCESS,
    GET_FRIEND_REQUESTS_DATA_FAIL,
    SET_FRIEND_RESPONSE_DATA,
    SET_FRIEND_RESPONSE_DATA_SUCCESS,
    SET_FRIEND_RESPONSE_DATA_FAIL,
    GET_MESSAGES_DATA,
    GET_MESSAGES_DATA_SUCCESS,
    GET_MESSAGES_DATA_FAIL,
    GET_CHAT_DATA,
    GET_CHAT_DATA_SUCCESS,
    GET_CHAT_DATA_FAIL,
    GET_CHAT_MESSAGES_DATA,
    GET_CHAT_MESSAGES_DATA_SUCCESS,
    GET_CHAT_MESSAGES_DATA_FAIL,
    SEND_MESSAGE_DATA,
    SEND_MESSAGE_DATA_SUCCESS,
    SEND_MESSAGE_DATA_FAIL,
    CONNECTION_ERROR,
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// const getCurrentPosition = function () {
//     return new Promise(
//         (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//       )
// }



export const GetFriendRequestsData = (value) => {
    return (dispatch) => {
        GetFriendRequests(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'GetFriendRequests';
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
                            "MinRequestID": value.minRequestID,
                            "Count": value.count,
                            "Latitude": value.latitude ,
                            "Longitude": value.longitude 
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res != -1) {
                                res = JSON.parse(res);

                                GetFriendRequestsSuccess(dispatch, res.FriendRequests);
                            }
                            else {
                                GetFriendRequestsFail(dispatch, Localizations('Global.ConnectionError'));
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
        // location
    };
};

export const SetFriendResponseData = (value) => {
    return (dispatch) => {
        SetFriendResponse(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SetFriendResponse';
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
                            "ID": value.ID,
                            "IntParameter1": value.intParameter,
                            "Latitude": value.latitude ,
                            "Longitude": value.longitude 
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res != -1) {
                                res = JSON.parse(res);

                                if (res.Success == false && res.Code == 100) {
                                    SetFriendResponseFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                                    Actions.signInScreen();
                                }

                                SetFriendResponseSuccess(dispatch, res);
                            }
                            else {
                                SetFriendResponseFail(dispatch, Localizations('Global.ConnectionError'));
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

export const GetMessagesData = (value) => {
    return (dispatch) => {
        GetMessages(dispatch);
 
        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'GetMessages';
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
                            "MaxRowID": value.maxRowID,
                            "Count": value.count,
                            "Latitude": value.latitude ,
                            "Longitude": value.longitude 
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res != -1) {
                                res = JSON.parse(res); 
                                GetMessagesSuccess(dispatch, res);
                            }
                            else {
                                GetMessagesFail(dispatch, Localizations('Global.ConnectionError'));
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

export const GetChatData = (value) => {
    return (dispatch) => {
        GetChat(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'GetChat';
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
                            "ID": value.ID,
                            "MinMessageID": value.minMessageID,
                            "LastMessageID": value.lastMessageID,
                            "Count": value.count,
                            "Latitude": value.latitude ,
                            "Longitude": value.longitude 
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res != -1) {
                                res = JSON.parse(res);

                                GetChatSuccess(dispatch, res);
                            }
                            else {
                                GetChatFail(dispatch, Localizations('Global.ConnectionError'));
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

export const GetChatMessagesData = (value) => {
    return (dispatch) => {
        GetChatMessages(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'GetChatMessages';
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
                            "ID": value.ID,
                            "MinMessageID": value.minMessageID,
                            "LastMessageID": value.lastMessageID,
                            "Count": value.count,
                            "Latitude": value.latitude ,
                            "Longitude": value.longitude 
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res != -1) {
                                res = JSON.parse(res);

                                //    debugger 
                                GetChatMessagesSuccess(dispatch, res);
                            }
                            else {
                                GetChatMessagesFail(dispatch, Localizations('Global.ConnectionError'));
                            }
                        })
                        .catch((err) => {
                            connectionError(dispatch, Localizations('Global.ConnectionError'));
                        })

                    // Location
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
        // location
    };
};

export const SendMessageData = (value) => {
    return (dispatch) => {
        SendMessage(dispatch);

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SendMessage';
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
                            "ID": value.ID,
                            "messageText": value.messageText,
                            // "Latitude": value.latitude ,
                            // "Longitude": value.longitude 
                        })
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res != -1) {
                                res = JSON.parse(res);

                                if (res.Success == false && res.Code == 100) {
                                    SendMessageFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                                    Actions.signInScreen();
                                }

                                SendMessageSuccess(dispatch, res);
                            }
                            else {
                                SendMessageFail(dispatch, Localizations('Global.ConnectionError'));
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


//#region GetFriendRequests işlemleri
const GetFriendRequests = (dispatch) => {
    dispatch({
        type: GET_FRIEND_REQUESTS_DATA
    });
};

const GetFriendRequestsSuccess = (dispatch, res) => {
    dispatch({
        type: GET_FRIEND_REQUESTS_DATA_SUCCESS,
        payload: res
    });
};

const GetFriendRequestsFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: GET_FRIEND_REQUESTS_DATA_FAIL
    });
};
//#endregion

//#region SetFriendResponse işlemleri
const SetFriendResponse = (dispatch) => {
    dispatch({
        type: SET_FRIEND_RESPONSE_DATA
    });
};

const SetFriendResponseSuccess = (dispatch, res) => {
    dispatch({
        type: SET_FRIEND_RESPONSE_DATA_SUCCESS,
        payload: res
    });
};

const SetFriendResponseFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SET_FRIEND_RESPONSE_DATA_FAIL
    });
};
//#endregion

//#region GetMessages işlemleri
const GetMessages = (dispatch) => {
    dispatch({
        type: GET_MESSAGES_DATA
    });
};

const GetMessagesSuccess = (dispatch, res) => {
    dispatch({
        type: GET_MESSAGES_DATA_SUCCESS,
        payload: res
    });
};

const GetMessagesFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: GET_MESSAGES_DATA_FAIL
    });
};
//#endregion

//#region GetChat işlemleri
const GetChat = (dispatch) => {
    dispatch({
        type: GET_CHAT_DATA
    });
};

const GetChatSuccess = (dispatch, res) => {
    dispatch({
        type: GET_CHAT_DATA_SUCCESS,
        payload: res
    });
};

const GetChatFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: GET_CHAT_DATA_FAIL
    });
};
//#endregion

//#region GetChatMessages işlemleri
const GetChatMessages = (dispatch) => {
    dispatch({
        type: GET_CHAT_MESSAGES_DATA
    });
};

const GetChatMessagesSuccess = (dispatch, res) => {
    dispatch({
        type: GET_CHAT_MESSAGES_DATA_SUCCESS,
        payload: res
    });
};

const GetChatMessagesFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: GET_CHAT_MESSAGES_DATA_FAIL
    });
};
//#endregion

//#region SendMessages işlemleri
const SendMessage = (dispatch) => {
    dispatch({
        type: SEND_MESSAGE_DATA
    });
};

const SendMessageSuccess = (dispatch, res) => {
    dispatch({
        type: SEND_MESSAGE_DATA_SUCCESS,
        payload: res
    });
};

const SendMessageFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: Localizations('Global.Ok'), onPress: () => null }
        ]
    );
    dispatch({
        type: SEND_MESSAGE_DATA_FAIL
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
