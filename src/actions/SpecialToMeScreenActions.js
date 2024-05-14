import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  SPECIAL_TO_ME_OPPORTUNITY_DATA,
  SPECIAL_TO_ME_OPPORTUNITY_DATA_SUCCESS,
  SPECIAL_TO_ME_OPPORTUNITY_DATA_FAIL,
  
  SPECIAL_TO_ME_ACTIVITY_DATA,
  SPECIAL_TO_ME_ACTIVITY_DATA_SUCCESS,
  SPECIAL_TO_ME_ACTIVITY_DATA_FAIL, 


  CONNECTION_ERROR

} from './Types';

const GLOBAL = require('../common/Globals');

export const SpecialToMeOpportunityListData = (data) => {
  return (dispatch) => {
    specialToMeOpportunityListData(dispatch);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SpecialToMeOpportunityList';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": 0,
        "userToken": data.userToken,
        "Latitude": data.latitude,
        "Longitude": data.longitude
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);

          specialToMeOpportunityListDataSucces(dispatch, res, data.userToken);
        }
        else {
          specialToMeOpportunityListDataFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};


export const SpecialToMeActivityListData = (value) => {
  // console.log("value");
  // console.log(value);

  return (dispatch) => {
    getSpecialToMeActivityList(dispatch);
    
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SpecialToMeActivityList';
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
        if (res != -1) 
        {
          res = JSON.parse(res);
          getSpecialToMeActivityListSucces(dispatch, res);

          // console.log("serverdan gelen activity datası");
          // console.log(res);

        }
        else
        {
          getSpecialToMeActivityListFail(dispatch, Localizations('Global.ConnectionError'));
            // this.setState({ isLoading : false});
        }
    })
    .catch((err) => {
      getSpecialToMeActivityListFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        //alert(this.state.lblConnectionError + "\n" + err);
        //this.setState({ isLoading : false});

    })
  };
};




//#region activityList işlemleri
const getSpecialToMeActivityList = (dispatch) => {
  dispatch({
    type: SPECIAL_TO_ME_ACTIVITY_DATA
  });
};

const getSpecialToMeActivityListSucces = (dispatch, res, userToken) => {
// console.log("actionda");
// console.log(res);
  dispatch({
      type: SPECIAL_TO_ME_ACTIVITY_DATA_SUCCESS,
      payload: res,
      user: userToken
  });
};

const getSpecialToMeActivityListFail = (dispatch, errorMessage) => {
  Alert.alert(
      'Message',
      errorMessage,
      [
      { text: 'OK', onPress: () => null }
      ]
  );
  dispatch({
      type: SPECIAL_TO_ME_ACTIVITY_DATA_FAIL
  });
};
//#endregion


//#region operation
const specialToMeOpportunityListData = (dispatch) => {
  dispatch({
    type: SPECIAL_TO_ME_OPPORTUNITY_DATA
  });
};

const specialToMeOpportunityListDataSucces = (dispatch, res, userToken) => {
  dispatch({
    type: SPECIAL_TO_ME_OPPORTUNITY_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const specialToMeOpportunityListDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SPECIAL_TO_ME_OPPORTUNITY_DATA_FAIL
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

