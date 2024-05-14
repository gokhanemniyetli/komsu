import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';


import {
  API_DATA_SUCCESS,
  API_DATA_FAIL,

  SET_OPPORTUNITY_FAVORITE_DATA,
  SET_OPPORTUNITY_FAVORITE_DATA_SUCCESS,
  SET_OPPORTUNITY_FAVORITE_DATA_FAIL
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


export const OpportunityDetailScreenData = (data) => {

  return (dispatch) => {

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'OpportunityDetailScreen';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.brandOpportunityID,
        "userToken": data.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);

          operationSucces(dispatch, res);

        }
        else {
          operationFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        operationFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};

export const SetOpportunityFavoriteData = (value) => {
  return (dispatch) => {
    setOpportunityFavorite(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetFavoriteBrandOpportunity';
    var webServiceUrl = webServerUrl + webService;


    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.opportunityID,
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
            setOpportunityFavoriteFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }

          setOpportunityFavoriteSucces(dispatch, res.Favorite);
        }
        else {
          setOpportunityFavoriteFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
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
    type: API_DATA_FAIL
  });
};

const operationSucces = (dispatch, res) => {
  dispatch({
    type: API_DATA_SUCCESS,
    payload: res
  });
};



//#region  favori işlemleri
const setOpportunityFavorite = (dispatch) => {
  dispatch({
    type: SET_OPPORTUNITY_FAVORITE_DATA
  });
};

const setOpportunityFavoriteSucces = (dispatch, res) => {
  dispatch({
    type: SET_OPPORTUNITY_FAVORITE_DATA_SUCCESS,
    payload: res
  });
};

const setOpportunityFavoriteFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_OPPORTUNITY_FAVORITE_DATA_FAIL
  });
};
//#endregion