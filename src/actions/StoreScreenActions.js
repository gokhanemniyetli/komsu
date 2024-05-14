import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  STORE_SCREEN_DATA,
  STORE_SCREEN_DATA_SUCCESS,
  STORE_SCREEN_DATA_FAIL,
  SET_STORE_FAVORITE_DATA,
  SET_STORE_FAVORITE_DATA_SUCCESS,
  SET_STORE_FAVORITE_DATA_FAIL,
  CONNECTION_ERROR,
  GET_DATA

} from './Types';

import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');

// get location data ---------------------
var lat = 0.0;
var long = 0.0;
// return new Promise(
//   (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
// )

// --------------------------


export const getData = () => {
  return (dispatch) => {
    getOldData(dispatch)
  }
}

export const StoreScreenData = (data) => {
  return (dispatch) => {
    operation(dispatch);
    // console.log("StoreScreenData")
    // console.log(data);
    // console.log(data.userToken);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'StoreScreen';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.storeID,
        "userToken": data.userToken,
        "Latitude": lat,
        "Longitude": long
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
  };
};

export const SetStoreFavoriteData = (value) => {
  return (dispatch) => {
    setFavorite(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetFavoriteStore';
    var webServiceUrl = webServerUrl + webService;


    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.storeID,
        "userToken": value.userToken,
        "Latitude": lat,
        "Longitude": long
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);

          if (res.Success == false && res.Code == 100) {
            setFavoriteFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }
          setFavoriteSucces(dispatch, res.Favorite, value.storeID);
        }
        else {
          setFavoriteFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};

const getOldData = (dispatch) => {
  dispatch({ type: GET_DATA });
}

const operation = (dispatch) => {
  dispatch({
    type: STORE_SCREEN_DATA
  });
};

const operationSucces = (dispatch, res, userToken) => {
  //debugger;
  dispatch({
    type: STORE_SCREEN_DATA_SUCCESS,
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
    type: STORE_SCREEN_DATA_FAIL
  });
};


//#region  favori işlemleri
const setFavorite = (dispatch) => {
  dispatch({
    type: SET_STORE_FAVORITE_DATA
  });
};

const setFavoriteSucces = (dispatch, res, changedID) => {
  dispatch({
    type: SET_STORE_FAVORITE_DATA_SUCCESS,
    payload: res,
    changedID: changedID
  });
};

const setFavoriteFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_STORE_FAVORITE_DATA_FAIL
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
