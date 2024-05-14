import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  HELP_REQUEST_SCREEN_DATA,
  HELP_REQUEST_SCREEN_DATA_SUCCESS,
  HELP_REQUEST_SCREEN_DATA_FAIL,
  SEND_HELP_REQUEST_DATA,
  SEND_HELP_REQUEST_DATA_SUCCESS,
  SEND_HELP_REQUEST_DATA_FAIL,

  MY_HELP_REQUEST_SCREEN_DATA,
  MY_HELP_REQUEST_SCREEN_DATA_SUCCESS,
  MY_HELP_REQUEST_SCREEN_DATA_FAIL,

  CITIES_DATA,
  CITIES_DATA_SUCCESS,
  CITIES_DATA_FAIL,


  MY_PREVIOUS_HELPS_SCREEN_DATA,
  MY_PREVIOUS_HELPS_SCREEN_DATA_SUCCESS,
  MY_PREVIOUS_HELPS_SCREEN_DATA_FAIL,

  HELP_REQUEST_DETAIL_SCREEN_DATA,
  HELP_REQUEST_DETAIL_SCREEN_DATA_SUCCESS,
  HELP_REQUEST_DETAIL_SCREEN_DATA_FAIL,


  SEARCH_HELP_REQUEST_DATA,
  SEARCH_HELP_REQUEST_DATA_SUCCESS,
  SEARCH_HELP_REQUEST_DATA_FAIL,


  HELP_REQUEST_ACTION_DATA,
  HELP_REQUEST_ACTION_DATA_SUCCESS,
  HELP_REQUEST_ACTION_DATA_FAIL,

  CONNECTION_ERROR
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// const getCurrentPosition = function () {
//   return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// }





//#region HelpRequestScreenData
export const HelpRequestScreenData = (data) => {
  return (dispatch) => {
    operation(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'HelpRequestScreen';
    var webServiceUrl = webServerUrl + webService;

    // // Loaction 
    // Promise.all([getCurrentPosition()]).then(function (values) {
    //   getCurrentPosition()
    //     .then((position) => {
    //       var lat = 0.0;
    //       lat = position.coords.latitude;

    //       var long = 0.0;
    //       long = position.coords.longitude;
    //       // Location


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

    //       // Location
    //     })
    //     .catch((err) => {
    //       // debugger;
    //       console.error(err.message);
    //     });
    // })
    // .catch((err) => {
    //   if (err.code == 1) {
    //     alert(Localizations('Global.LocationDenied'));
    //     Actions.signInScreen()
    //   }
    // });
    // // location
  };
};



const operation = (dispatch) => {
  dispatch({
    type: HELP_REQUEST_SCREEN_DATA
  });
};

const operationSucces = (dispatch, res, userToken) => {

  dispatch({
    type: HELP_REQUEST_SCREEN_DATA_SUCCESS,
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
    type: HELP_REQUEST_SCREEN_DATA_FAIL
  });
};
//#endregion HelpRequestSceenData




//#region SendHelpRequestData
export const SendHelpRequestData = (data) => {
  return (dispatch) => {
    sendHelpRequestData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SendHelpRequest';
    var webServiceUrl = webServerUrl + webService;


    // // Loaction 
    // Promise.all([getCurrentPosition()]).then(function (values) {
    //   getCurrentPosition()
    //     .then((position) => {
    //       var lat = 0.0;
    //       lat = position.coords.latitude;

    //       var long = 0.0;
    //       long = position.coords.longitude;
    //       // Location

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "UserToken": data.userToken,
              "NameSurname": data.nameSurname,
              "Phone": data.phone,
              "Email": data.email,
              "Address": data.address,
              "City": data.city,
              "Request": data.request,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                sendHelpRequestDataSucces(dispatch, res);
              }
              else {
                sendHelpRequestDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

    //       // Location
    //     })
    //     .catch((err) => {
    //       // debugger;
    //       console.error(err.message);
    //     });
    // })
    // .catch((err) => {
    //   if (err.code == 1) {
    //     alert(Localizations('Global.LocationDenied'));
    //     Actions.signInScreen()
    //   }
    // });
    // // location
  };
};



const sendHelpRequestData = (dispatch) => {
  dispatch({
    type: SEND_HELP_REQUEST_DATA
  });
};

const sendHelpRequestDataSucces = (dispatch, res) => {

  dispatch({
    type: SEND_HELP_REQUEST_DATA_SUCCESS,
    payload: res
  });
};

const sendHelpRequestDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEND_HELP_REQUEST_DATA_FAIL
  });
};
//#endregion HelpSceenData




//#region MyHelpRequestScreenData
export const MyHelpRequestScreenData = (data) => {
  return (dispatch) => {
    myHelpRequestScreenData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetMyHelpRequests';
    var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "UserToken": data.userToken,
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                myHelpRequestScreenDataSucces(dispatch, res);
              }
              else {
                myHelpRequestScreenDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

  };
};



const myHelpRequestScreenData = (dispatch) => {
  dispatch({
    type: MY_HELP_REQUEST_SCREEN_DATA
  });
};

const myHelpRequestScreenDataSucces = (dispatch, res) => {

  dispatch({
    type: MY_HELP_REQUEST_SCREEN_DATA_SUCCESS,
    payload: res
  });
};

const myHelpRequestScreenDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: MY_HELP_REQUEST_SCREEN_DATA_FAIL
  });
};
//#endregion MyHelpRequestScreenData





//#region MyPreviousHelpsScreenData
export const MyPreviousHelpsScreenData = (data) => {
  return (dispatch) => {
    myPreviousHelpsScreenData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetMyPreviousHelps';
    var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "UserToken": data.userToken,
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                myPreviousHelpsScreenDataSucces(dispatch, res);
              }
              else {
                myPreviousHelpsScreenDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

  };
};



const myPreviousHelpsScreenData = (dispatch) => {
  dispatch({
    type: MY_PREVIOUS_HELPS_SCREEN_DATA
  });
};

const myPreviousHelpsScreenDataSucces = (dispatch, res) => {

  dispatch({
    type: MY_PREVIOUS_HELPS_SCREEN_DATA_SUCCESS,
    payload: res
  });
};

const myPreviousHelpsScreenDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: MY_PREVIOUS_HELPS_SCREEN_DATA_FAIL
  });
};
//#endregion MyPreviousHelpsScreenData





//#region HelpRequestDetailScreenData
export const HelpRequestDetailScreenData = (data) => {
  return (dispatch) => {
    helpRequestDetailScreenData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'HelpRequestDetailScreen';
    var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": data.helpRequestID,
              "UserToken": data.userToken,
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                helpRequestDetailScreenDataSucces(dispatch, res);
              }
              else {
                helpRequestDetailScreenDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

  };
};



const helpRequestDetailScreenData = (dispatch) => {
  dispatch({
    type: HELP_REQUEST_DETAIL_SCREEN_DATA
  });
};

const helpRequestDetailScreenDataSucces = (dispatch, res) => {

  dispatch({
    type: HELP_REQUEST_DETAIL_SCREEN_DATA_SUCCESS,
    payload: res
  });
};

const helpRequestDetailScreenDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: HELP_REQUEST_DETAIL_SCREEN_DATA_FAIL
  });
};
//#endregion HelpRequestDetailScreenData



//#region HelpRequestAction
export const HelpRequestActionData = (data) => {
  return (dispatch) => {
    helpRequestActionData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'HelpRequestAction';
    var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": data.ID,
              "UserToken": data.userToken,
              "IntParameter1": data.action
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                helpRequestActionDataSucces(dispatch, res);
              }
              else {
                helpRequestActionDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

  };
};



const helpRequestActionData = (dispatch) => {
  dispatch({
    type: HELP_REQUEST_ACTION_DATA
  });
};

const helpRequestActionDataSucces = (dispatch, res) => {

  dispatch({
    type: HELP_REQUEST_ACTION_DATA_SUCCESS,
    payload: res
  });
};

const helpRequestActionDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: HELP_REQUEST_ACTION_DATA_FAIL
  });
};
//#endregion HelpRequestDetailScreenData





//#region CitiesData
export const CitiesData = (data) => {
  return (dispatch) => {
    citiesData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetCities';
    var webServiceUrl = webServerUrl + webService;

    // // Loaction 
    // Promise.all([getCurrentPosition()]).then(function (values) {
    //   getCurrentPosition()
    //     .then((position) => {
    //       var lat = 0.0;
    //       lat = position.coords.latitude;

    //       var long = 0.0;
    //       long = position.coords.longitude;
    //       // Location
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

                citiesDataSucces(dispatch, res, data.userToken);
              }
              else {
                citiesDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

    //       // Location
    //     })
    //     .catch((err) => {
    //       // debugger;
    //       console.error(err.message);
    //     });
    // })
    // .catch((err) => {
    //   if (err.code == 1) {
    //     alert(Localizations('Global.LocationDenied'));
    //     Actions.signInScreen()
    //   }
    // });
    // // location
  };
};



const citiesData = (dispatch) => {
  dispatch({
    type: CITIES_DATA
  });
};

const citiesDataSucces = (dispatch, res, userToken) => {

  dispatch({
    type: CITIES_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const citiesDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: CITIES_DATA_FAIL
  });
};
//#endregion HelpRequestSceenData



//#region SearchHelpRequestData
export const SearchHelpRequestData = (data) => {
  return (dispatch) => {
    searchHelpRequestData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SearchHelpRequests';
    var webServiceUrl = webServerUrl + webService;
  //  debugger;
          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": data.CityID,
              "UserToken": data.userToken,
              "IntParameter1" : data.NearMe,
              "Latitude": data.latitude,
              "Longitude": data.longitude
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                searchHelpRequestDataSucces(dispatch, res);
              }
              else {
                searchHelpRequestDataFail(dispatch, Localizations('Global.ConnectionError'));
                // this.setState({ isLoading : false});
              }
            })
            .catch((err) => {
              connectionError(dispatch, Localizations('Global.ConnectionError'));
            })

  };
};



const searchHelpRequestData = (dispatch) => {
  dispatch({
    type: SEARCH_HELP_REQUEST_DATA
  });
};

const searchHelpRequestDataSucces = (dispatch, res) => {

  dispatch({
    type: SEARCH_HELP_REQUEST_DATA_SUCCESS,
    payload: res
  });
};

const searchHelpRequestDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEARCH_HELP_REQUEST_DATA_FAIL
  });
};
//#endregion SearchHelpRequestData




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
//#endregion
