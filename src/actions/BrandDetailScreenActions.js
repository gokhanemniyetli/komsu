import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  BRAND_DETAIL_SCREEN_DATA,
  BRAND_DETAIL_SCREEN_DATA_SUCCESS,
  BRAND_DETAIL_SCREEN_DATA_FAIL,
  SET_BRAND_FAVORITE_DATA,
  SET_BRAND_FAVORITE_DATA_SUCCESS,
  SET_BRAND_FAVORITE_DATA_FAIL,
  CONNECTION_ERROR,
  BRAND_OPPORTUNITYLIST_DATA,
  BRAND_OPPORTUNITYLIST_DATA_SUCCESS,
  BRAND_OPPORTUNITYLIST_DATA_FAIL,
  BRAND_STORELIST_DATA,
  BRAND_STORELIST_DATA_SUCCESS,
  BRAND_STORELIST_DATA_FAIL
} from './Types';

import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');

// get location data ---------------------
var lat = 0.0;
var long = 0.0;
// Geolocation.getCurrentPosition((position) => {
//     lat = parseFloat(position.coords.latitude);
//     long = parseFloat(position.coords.longitude);
//     },
//     (error) => console.log(JSON.stringify(error)),
//     {enableHighAccuracy: true, timeout:20000, maximumAge:1000}
// )

// Geolocation.getCurrentPosition(
//   position => {
//     const initialPosition = JSON.stringify(position);
//     this.setState({initialPosition});
//   },
//   error => Alert.alert('Error', JSON.stringify(error)),
//   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
// );
// this.watchID = Geolocation.watchPosition(position => {
//   const lastPosition = JSON.stringify(position);
//   this.setState({lastPosition});
// });

// --------------------------


export const BrandDetailScreenData = (data) => {
  return (dispatch) => {
    operation(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'BrandDetailScreen';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.brandID,
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


export const BrandOpportunityListData = (value) => {
  //console.log("BrandOpportunityListData içinde")
  return (dispatch) => {
    getOpportunityList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'BrandOpportunitiesScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.brandID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getOpportunityListSucces(dispatch, res);

          // console.log("serverdan gelen Opportunity datası");
          // console.log(res);

        }
        else {
          getOpportunityListFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        getOpportunityListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};

export const SetBrandFavoriteData = (value) => {
  return (dispatch) => {
    setBrandFavorite(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetFavoriteBrand';
    var webServiceUrl = webServerUrl + webService;


    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.brandID,
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
            setBrandFavoriteFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }

          setBrandFavoriteSucces(dispatch, res.Favorite, value.brandID);
        }
        else {
          setBrandFavoriteFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};



//#region opportunityList işlemleri
const getOpportunityList = (dispatch) => {
  dispatch({
    type: BRAND_OPPORTUNITYLIST_DATA
  });
};

const getOpportunityListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: BRAND_OPPORTUNITYLIST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getOpportunityListFail = (dispatch, errorMessage) => {
  Alert.alert(
    'Message',
    errorMessage,
    [
      { text: 'OK', onPress: () => null }
    ]
  );
  dispatch({
    type: BRAND_OPPORTUNITYLIST_DATA_FAIL
  });
};
//#endregion


//#region storeList işlemleri
const getStoreList = (dispatch) => {
  dispatch({
    type: BRAND_STORELIST_DATA
  });
};

const getStoreListSucces = (dispatch, res, userToken) => {
  dispatch({
    type: BRAND_STORELIST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getStoreListFail = (dispatch, errorMessage) => {
  Alert.alert(
    'Message',
    errorMessage,
    [
      { text: 'OK', onPress: () => null }
    ]
  );
  dispatch({
    type: BRAND_STORELIST_DATA_FAIL
  });
};
//#endregion


const operation = (dispatch) => {
  dispatch({
    type: BRAND_DETAIL_SCREEN_DATA
  });
};

const operationSucces = (dispatch, res, userToken) => {

  dispatch({
    type: BRAND_DETAIL_SCREEN_DATA_SUCCESS,
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
    type: BRAND_DETAIL_SCREEN_DATA_FAIL
  });
};


//#region  favori işlemleri
const setBrandFavorite = (dispatch) => {
  dispatch({
    type: SET_BRAND_FAVORITE_DATA
  });
};

const setBrandFavoriteSucces = (dispatch, res, changedID) => {
  dispatch({
    type: SET_BRAND_FAVORITE_DATA_SUCCESS,
    payload: res,
    changedID: changedID
  });
};

const setBrandFavoriteFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_BRAND_FAVORITE_DATA_FAIL
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
