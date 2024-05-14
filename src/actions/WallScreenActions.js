import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  WALL_USER_SCREEN_DATA,
  WALL_USER_SCREEN_DATA_SUCCESS,
  WALL_USER_SCREEN_DATA_FAIL,
  WALL_POSTS_SCREEN_DATA,
  WALL_POSTS_SCREEN_DATA_SUCCESS,
  WALL_POSTS_SCREEN_DATA_FAIL,
  EXTRA_DATA,
  EXTRA_DATA_SUCCESS,
  CONNECTION_ERROR
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// const getCurrentPosition = function () {
//   return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// }





export const WallUserScreenData = (data) => {
  return (dispatch) => {

    wallUserScreenData(dispatch);


    // // Loaction 
    // Promise.all([getCurrentPosition()]).then(function (values) {
    //   getCurrentPosition()
    //     .then((position) => {
    //       var lat = 0.0;
    //       lat = position.coords.latitude;

    //       var long = 0.0;
    //       long = position.coords.longitude;
    //       // Location
// debugger;
          var webServerUrl = GLOBAL.WEB_SERVICE_URL;
          var webService = 'WallUserScreen';
          var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "UserToken": data.userToken,
              "Latitude": data.latitude,
              "Longitude": data.longitude
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                //  debugger 
                wallUserScreenDataSuccess(dispatch, res, data.userToken);
              }
              else {
                wallUserScreenDataFail(dispatch, "Baglanti hatasi");
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
    //       console.log(err.message);
    //     });
    // })
    //   .catch((err) => {
    //     if (err.code == 1) {
    //       alert(Localizations('Global.LocationDenied'));
    //       Actions.signInScreen()
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.code == 1) {
    //       alert(Localizations('Global.LocationDenied'));
    //       Actions.signInScreen()
    //     }
    //   });
    // // location

  };
};



const wallUserScreenData = (dispatch) => {
  dispatch({
    type: WALL_USER_SCREEN_DATA
  });
};

const wallUserScreenDataSuccess = (dispatch, res, userToken) => {
  //debugger;
  dispatch({
    type: WALL_USER_SCREEN_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const wallUserScreenDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: WALL_USER_SCREEN_DATA_FAIL
  });
};



export const WallPostsScreenData = (data) => {
  return (dispatch) => {
  //  debugger
    var maxActionID = 0;
    var postCount = 10;
    if (data.maxActionID != null) {
      maxActionID = data.maxActionID;
      postCount = 5;
      extraData(dispatch)
    }
    else {
      wallPostsScreenData(dispatch);
    }


    // // Loaction 
    // Promise.all([getCurrentPosition()]).then(function (values) {
    //   getCurrentPosition()
    //     .then((position) => {
    //       var lat = 0.0;
    //       lat = position.coords.latitude;

    //       var long = 0.0;
    //       long = position.coords.longitude;
    //       // Location

          var webServerUrl = GLOBAL.WEB_SERVICE_URL;
          var webService = 'WallPostsScreen';
          var webServiceUrl = webServerUrl + webService;
          //  debugger;
          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "Count": postCount,
              "MaxActionID": maxActionID,
              "UserToken": data.userToken,
              "Distance": data.distance,
              "Latitude": data.latitude,
              "Longitude": data.longitude
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                // debugger 
                if (data.maxActionID != null) {
                  extraDataSuccess(dispatch, res, data.userToken);
                }
                else {
                  wallPostsScreenDataSuccess(dispatch, res, data.userToken);
                }

              }
              else {
                wallPostsScreenDataFail(dispatch, "Baglanti hatasi");
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


const wallPostsScreenData = (dispatch) => {
  dispatch({
    type: WALL_POSTS_SCREEN_DATA
  });
};

const wallPostsScreenDataSuccess = (dispatch, res, userToken) => {
  // debugger;
  dispatch({
    type: WALL_POSTS_SCREEN_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const wallPostsScreenDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: WALL_POSTS_SCREEN_DATA_FAIL
  });
};




const extraData = (dispatch) => {
  dispatch({
    type: EXTRA_DATA
  });
};

const extraDataSuccess = (dispatch, res, userToken) => {
  //debugger;
  dispatch({
    type: EXTRA_DATA_SUCCESS,
    payload: res,
    user: userToken
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
//#endregion
