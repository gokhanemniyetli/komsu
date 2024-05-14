import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  
  SHOPPINGMALL_SCREEN_DATA,
  SHOPPINGMALL_SCREEN_DATA_SUCCESS,
  SHOPPINGMALL_SCREEN_DATA_FAIL,

  SHOPPINGMALL_STORELIST_DATA,
  SHOPPINGMALL_STORELIST_DATA_SUCCESS,
  SHOPPINGMALL_STORELIST_DATA_FAIL,

  SHOPPINGMALL_FLOORPLANLIST_DATA,
  SHOPPINGMALL_FLOORPLANLIST_DATA_SUCCESS,
  SHOPPINGMALL_FLOORPLANLIST_DATA_FAIL,

  SHOPPINGMALL_PHOTOLIST_DATA,
  SHOPPINGMALL_PHOTOLIST_DATA_SUCCESS,
  SHOPPINGMALL_PHOTOLIST_DATA_FAIL,

  SHOPPINGMALL_OPPORTUNITYLIST_DATA,
  SHOPPINGMALL_OPPORTUNITYLIST_DATA_SUCCESS,
  SHOPPINGMALL_OPPORTUNITYLIST_DATA_FAIL,

  SHOPPINGMALL_ACTIVITYLIST_DATA,
  SHOPPINGMALL_ACTIVITYLIST_DATA_SUCCESS,
  SHOPPINGMALL_ACTIVITYLIST_DATA_FAIL,

  SHOPPINGMALL_SERVICELIST_DATA,
  SHOPPINGMALL_SERVICELIST_DATA_SUCCESS,
  SHOPPINGMALL_SERVICELIST_DATA_FAIL,

  SET_SHOPPINGMALL_FAVORITE_DATA,
  SET_SHOPPINGMALL_FAVORITE_DATA_SUCCESS,
  SET_SHOPPINGMALL_FAVORITE_DATA_FAIL,
  CONNECTION_ERROR,

  SELECTED_SEPERATOR_TITLE_CHANGE

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

export const ShoppingMallScreenData = (data) => {
  return (dispatch) => {
    operation(dispatch);

    // console.log(data.storeID);
    // console.log(data.userToken);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallScreen';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.shoppingMallID,
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

export const SetShoppingMallFavoriteData = (value) => {
  return (dispatch) => {
    setShoppingMallFavorite(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetFavoriteShoppingMall';
    var webServiceUrl = webServerUrl + webService;


    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
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
            setShoppingMallFavoriteFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
            Actions.signInScreen();
          }

          setShoppingMallFavoriteSucces(dispatch, res.Favorite, value.shoppingMallID);
        }
        else {
          setShoppingMallFavoriteFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};

export const ShoppingMallActivityList = (data) => {
  // debugger;
  //   console.log("önemli");

  return (dispatch) => {
    operation(dispatch);

    // console.log(data.storeID);
    // console.log(data.userToken);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallActivitiesScreen';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.shoppingMallID,
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
  };
};


export const ShoppingMallStoreListData = (value) => {
  // console.log("value");
  // console.log(value);

  return (dispatch) => {
    getStoreList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallStoresScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getStoreListSucces(dispatch, res);

          // console.log("serverdan gelen store datası");
          // console.log(res);

        }
        else {
          getStoreListFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        getStoreListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};

export const ShoppingMallFloorPlanListData = (value) => {
  // console.log("value");
  // console.log(value);

  return (dispatch) => {
    getFloorPlanList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallFloorPlansScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getFloorPlanListSucces(dispatch, res);

          // console.log("serverdan gelen FloorPlan datası");
          // console.log(res);

        }
        else {
          getFloorPlanListFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        getFloorPlanListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};



export const ShoppingMallPhotoListData = (value) => {
  // console.log("value");
  // console.log(value);

  return (dispatch) => {
    getPhotoList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallPhotosScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getPhotoListSucces(dispatch, res);

          // console.log("serverdan gelen Photo datası");
          // console.log(res);

        }
        else {
          getPhotoListFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        getPhotoListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};


export const ShoppingMallOpportunityListData = (value) => {

  return (dispatch) => {
    getOpportunityList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallOpportunitiesScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
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

export const ShoppingMallActivityListData = (value) => {
  // console.log("value");
  // console.log(value);

  return (dispatch) => {
    getActivityList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallActivitiesScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getActivityListSucces(dispatch, res);

          // console.log("serverdan gelen activity datası");
          // console.log(res);

        }
        else {
          getActivityListFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        getActivityListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};


export const ShoppingMallServiceListData = (value) => {
  // console.log("value");
  // console.log(value);

  return (dispatch) => {
    getServiceList(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ShoppingMallServicesScreen';
    var webServiceUrl = webServerUrl + webService;
    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": value.shoppingMallID,
        "userToken": value.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getServiceListSucces(dispatch, res);

          // console.log("serverdan gelen service datası");
          // console.log(res);

        }
        else {
          getServiceListFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        getServiceListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

      })
  };
};


export const SelectedSeperatorTitleChange = (selectedSeperatorTitle) => {
  return (dispatch) => {
    setSelectedSeperatorTitle(dispatch, selectedSeperatorTitle);
  }
}


//#region storeList işlemleri
const getStoreList = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_STORELIST_DATA
  });
};

const getStoreListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: SHOPPINGMALL_STORELIST_DATA_SUCCESS,
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
    type: SHOPPINGMALL_STORELIST_DATA_FAIL
  });
};
//#endregion


//#region floorPlanList işlemleri
const getFloorPlanList = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_FLOORPLANLIST_DATA
  });
};

const getFloorPlanListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: SHOPPINGMALL_FLOORPLANLIST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getFloorPlanListFail = (dispatch, errorMessage) => {
  Alert.alert(
    'Message',
    errorMessage,
    [
      { text: 'OK', onPress: () => null }
    ]
  );
  dispatch({
    type: SHOPPINGMALL_FLOORPLANLIST_DATA_FAIL
  });
};
//#endregion


//#region photoList işlemleri
const getPhotoList = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_PHOTOLIST_DATA
  });
};

const getPhotoListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: SHOPPINGMALL_PHOTOLIST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getPhotoListFail = (dispatch, errorMessage) => {
  Alert.alert(
    'Message',
    errorMessage,
    [
      { text: 'OK', onPress: () => null }
    ]
  );
  dispatch({
    type: SHOPPINGMALL_PHOTOLIST_DATA_FAIL
  });
};
//#endregion



//#region opportunityList işlemleri
const getOpportunityList = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_OPPORTUNITYLIST_DATA
  });
};

const getOpportunityListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: SHOPPINGMALL_OPPORTUNITYLIST_DATA_SUCCESS,
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
    type: SHOPPINGMALL_OPPORTUNITYLIST_DATA_FAIL
  });
};
//#endregion



//#region activityList işlemleri
const getActivityList = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_ACTIVITYLIST_DATA
  });
};

const getActivityListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: SHOPPINGMALL_ACTIVITYLIST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getActivityListFail = (dispatch, errorMessage) => {
  Alert.alert(
    'Message',
    errorMessage,
    [
      { text: 'OK', onPress: () => null }
    ]
  );
  dispatch({
    type: SHOPPINGMALL_ACTIVITYLIST_DATA_FAIL
  });
};
//#endregion


//#region serviceList işlemleri
const getServiceList = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_SERVICELIST_DATA
  });
};

const getServiceListSucces = (dispatch, res, userToken) => {
  // console.log("actionda");
  // console.log(res);
  dispatch({
    type: SHOPPINGMALL_SERVICELIST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getServiceListFail = (dispatch, errorMessage) => {
  Alert.alert(
    'Message',
    errorMessage,
    [
      { text: 'OK', onPress: () => null }
    ]
  );
  dispatch({
    type: SHOPPINGMALL_SERVICELIST_DATA_FAIL
  });
};
//#endregion

const setSelectedSeperatorTitle = (dispatch, selectedSeperatorTitle) => {
  dispatch({
    type: SELECTED_SEPERATOR_TITLE_CHANGE,
    payload: selectedSeperatorTitle
  });
}

//#region operation işlemleri
const operation = (dispatch) => {
  dispatch({
    type: SHOPPINGMALL_SCREEN_DATA
  });
};

const operationSucces = (dispatch, res, userToken) => {

  dispatch({
    type: SHOPPINGMALL_SCREEN_DATA_SUCCESS,
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
    type: SHOPPINGMALL_SCREEN_DATA_FAIL
  });
};
//#endregion

//#region  favori işlemleri
const setShoppingMallFavorite = (dispatch) => {
  dispatch({
    type: SET_SHOPPINGMALL_FAVORITE_DATA
  });
};

const setShoppingMallFavoriteSucces = (dispatch, res, changedID) => {
  // console.log(res)
  dispatch({
    type: SET_SHOPPINGMALL_FAVORITE_DATA_SUCCESS,
    payload: res,
    changedID : changedID
  });
};

const setShoppingMallFavoriteFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_SHOPPINGMALL_FAVORITE_DATA_FAIL
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

