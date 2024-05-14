import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  USERPROFILE_SCREEN_DATA,
  USERPROFILE_SCREEN_DATA_SUCCESS,
  USERPROFILE_SCREEN_DATA_FAIL,
  USERPROFILE_EXTRA_DATA,
  USERPROFILE_EXTRA_DATA_SUCCESS,
  SET_USER_FOLLOWS_DATA,
  SET_USER_FOLLOWS_DATA_SUCCESS,
  SET_USER_FOLLOWS_DATA_FAIL,
  SET_USER_FRIENDS_DATA,
  SET_USER_FRIENDS_DATA_SUCCESS,
  SET_USER_FRIENDS_DATA_FAIL,

  SET_USER_BANS_DATA,
  SET_USER_BANS_DATA_SUCCESS,
  SET_USER_BANS_DATA_FAIL,
  CONNECTION_ERROR
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');



// const getCurrentPosition = function () {
//   return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// }



export const UserProfileScreenData = (data) => {
  // debugger
  return (dispatch) => {

    var maxPostID = 0;
    var postCount = 15;
    if (data.maxPostID != null) {
      maxPostID = data.maxPostID;
      postCount = 3;
      extraData(dispatch)
    }
    else {
      operation(dispatch);
    }

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'UserProfileScreen';
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
              "ID": data.ID,
              "Count": postCount,
              "MaxPostID": maxPostID,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                // debugger;
                if (data.maxPostID != null) {
                  extraDataSuccess(dispatch, res, data.userToken);
                }
                else {
                  operationSuccess(dispatch, res, data.userToken);
                }
              }
              else {
                operationFail(dispatch, "Baglanti hatasi");
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
    // location
  };
};


export const SetUserFriendsData = (value) => {
  return (dispatch) => {
    setUserFriends(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetFriends';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.ID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);

          if (res.Success == false && res.Code == 100) {
            setUserFriendsFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }

          setUserFriendsSucces(dispatch, res.IsFriend);
        }
        else {
          setUserFriendsFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};


export const SetUserFollowsData = (value) => {
  return (dispatch) => {
    setUserFollows(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetFollows';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.ID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);

          if (res.Success == false && res.Code == 100) {
            setUserFollowsFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }

          setUserFollowsSucces(dispatch, res.IsFollow);
        }
        else {
          setUserFollowsFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};

export const SetUserBansData = (value) => {
  return (dispatch) => {
    setUserBans(dispatch);
    // debugger
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetBans';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.ID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          // debugger        
          if (res.Success == false && res.Code == 100) {
            setUserBansFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }

          setUserBansSucces(dispatch, res.IsBanned, value.PostID);
        }
        else {
          setUserBansFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};


const operation = (dispatch) => {
  dispatch({
    type: USERPROFILE_SCREEN_DATA
  });
};

const operationSuccess = (dispatch, res, userToken) => {
  //debugger;
  dispatch({
    type: USERPROFILE_SCREEN_DATA_SUCCESS,
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
    type: USERPROFILE_SCREEN_DATA_FAIL
  });
};




const extraData = (dispatch) => {
  dispatch({
    type: USERPROFILE_EXTRA_DATA
  });
};

const extraDataSuccess = (dispatch, res, userToken) => {
  //debugger;
  dispatch({
    type: USERPROFILE_EXTRA_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};


//#region userFriend i≈ülemleri
const setUserFriends = (dispatch) => {
  dispatch({
    type: SET_USER_FRIENDS_DATA
  });
};

const setUserFriendsSucces = (dispatch, res) => {
  // debugger
  dispatch({
    type: SET_USER_FRIENDS_DATA_SUCCESS,
    payload: res
  });
};

const setUserFriendsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_USER_FRIENDS_DATA_FAIL
  });
};
//#endregion


//#region userFollow i≈ülemleri
const setUserFollows = (dispatch) => {
  dispatch({
    type: SET_USER_FOLLOWS_DATA
  });
};

const setUserFollowsSucces = (dispatch, res) => {
  dispatch({
    type: SET_USER_FOLLOWS_DATA_SUCCESS,
    payload: res
  });
};

const setUserFollowsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_USER_FOLLOWS_DATA_FAIL
  });
};
//#endregion


//#region userBan i≈ülemleri
const setUserBans = (dispatch) => {
  dispatch({
    type: SET_USER_BANS_DATA
  });
};

const setUserBansSucces = (dispatch, res, bannedPostID) => {
  dispatch({
    type: SET_USER_BANS_DATA_SUCCESS,
    payload: res,
    bannedPostID: bannedPostID
  });
  //debugger
};

const setUserBansFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_USER_BANS_DATA_FAIL
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
//#endregion
