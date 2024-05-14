import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';

import {
  USER_SORT_SCREEN_DATA,
  USER_SORT_SCREEN_DATA_SUCCESS,
  USER_SORT_SCREEN_DATA_FAIL,
  
  CONNECTION_ERROR
} from './Types';

const GLOBAL = require('../common/Globals');



export const SearchInFriendsFollowersFollowings = (data) => {
 // debugger
  return (dispatch) => {

    
      operation(dispatch);
    //debugger
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    
    var webService = '';
    if (data.requestType == 'follower') 
    { 
      webService = 'SearchInFollowers';
    } 
    else if (data.requestType == 'following')
    {
      webService = 'SearchInFollowings';      
    }
    else
    {
      webService = 'SearchInMyFriends';
    }
    
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.ID,
        "RequestType": data.requestType,
        "UserToken": data.userToken,
        "Keyword" : data.keyword,
        "Latitude" : data.latitude,
        "Longtitude" : data.longtitude
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
           //debugger;
          if (data.maxRowID != null) {
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
  };
};


const operation = (dispatch) => {
  dispatch({
    type: USER_SORT_SCREEN_DATA
  });
};

const operationSuccess = (dispatch, res, userToken) => {
  //debugger;
  dispatch({
    type: USER_SORT_SCREEN_DATA_SUCCESS,
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
    type: USER_SORT_SCREEN_DATA_FAIL
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
