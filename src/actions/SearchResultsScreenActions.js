import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  SEARCH_RESULTS_SCREEN_DATA,
  SEARCH_RESULTS_SCREEN_DATA_SUCCESS,
  SEARCH_RESULTS_SCREEN_DATA_FAIL,
  SEARCH_RESULTS_BRANDS_DATA,
  SEARCH_RESULTS_BRANDS_DATA_SUCCESS,
  SEARCH_RESULTS_BRANDS_DATA_FAIL,

  SEARCH_RESULTS_USERS_DATA,
  SEARCH_RESULTS_USERS_DATA_SUCCESS,
  SEARCH_RESULTS_USERS_DATA_FAIL,
  SEARCH_RESULTS_SHOPPINGMALLS_DATA,
  SEARCH_RESULTS_SHOPPINGMALLS_DATA_SUCCESS,
  SEARCH_RESULTS_SHOPPINGMALLS_DATA_FAIL,
  SEARCH_RESULTS_PRODUCTS_DATA,
  SEARCH_RESULTS_PRODUCTS_DATA_SUCCESS,
  SEARCH_RESULTS_PRODUCTS_DATA_FAIL,
  SEARCH_KEYWORD_CHANGED,
  SEARCH_TYPE_CHANGED,
  GET_SEARCH_TYPE,
  SET_SELECTED_KEYWORD,
  CLICK_KEYWORD,
  SEARCH_SUBMIT,
  CLEAR_SEARCH_TEXT,
  CLEAR_SEARCH_DATA,
  CONNECTION_ERROR
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');




// const getCurrentPosition = function () {
//   return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// }


export const SearchTypeChanged = (searchType) => {
  return (dispatch) => {

    dispatch({
      type: SEARCH_TYPE_CHANGED,
      payload: searchType
    });

  };
};

export const GetSearchType = () => {
  return (dispatch) => {

    dispatch({
      type: GET_SEARCH_TYPE
    });

  };
};

export const SetSelectedKeyword = (selectedKeyword) => {
  return (dispatch) => {
    dispatch({
      type: SET_SELECTED_KEYWORD,
      payload: selectedKeyword.selectedKeyword
    });
  };
};

export const ClickKeyword = (value) => {
  return (dispatch) => {
    dispatch({
      type: CLICK_KEYWORD,
      payload: value
    });
  };
};

export const SearchSubmit = () => {
  //debugger;
  return (dispatch) => {
    dispatch({
      type: SEARCH_SUBMIT
    });
  };
};

export const ClearSearchText = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SEARCH_TEXT
    });
  };
};

export const ClearSearchData = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_SEARCH_DATA
    });
  };
};

export const SearchResultsBrandListData = (data) => {
  return (dispatch) => {

    if (data.keyword.length >= 0) {
      searchResultsBrands(dispatch, data.keyword);

      var webServerUrl = GLOBAL.WEB_SERVICE_URL;
      // var webService = 'SearchResultBrandsScreen';
      var webService = 'SearchResultStoresScreen';
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
                // keyword: aranılan kelime
                // search: keyword girilirken 'false', girilen keyword ürün, mağaza, avm içinde aranırken 'true' 
                // searchType: 0: Ürün, 1: mağaza, 2: AVM, 3: kullanıcı
                // latitude, longitude : koordinatlar

                "ID": 0,
                "userToken": data.userToken,
                "Keyword": data.keyword,
                "SearchTypeID": data.searchType,
                "Search": data.search,
                "Latitude": data.latitude ,
              "Longitude": data.longitude 
              })
            })
              .then((res) => res.json())
              .then((res) => {
                if (res != -1) {
                  res = JSON.parse(res);

                  searchResultsBrandsSuccess(dispatch, res, data.userToken);
                }
                else {
                  searchResultsBrandsFail(dispatch, Localizations('Global.ConnectionError'));
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
    }

  };

};

export const SearchResultsShoppingMallListData = (data) => {
  return (dispatch) => {

    if (data.keyword.length >= 0) {
      searchResultsShoppingMalls(dispatch, data.keyword);

      var webServerUrl = GLOBAL.WEB_SERVICE_URL;
      var webService = 'SearchResultShoppingMallsScreen';
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
                // keyword: aranılan kelime
                // search: keyword girilirken 'false', girilen keyword ürün, mağaza, avm içinde aranırken 'true' 
                // searchType: 0: Ürün, 1: mağaza, 2: AVM
                // latitude, longitude : koordinatlar

                "ID": 0,
                "userToken": data.userToken,
                "Keyword": data.keyword,
                "SearchTypeID": data.searchType,
                "Search": data.search,
                "Latitude": data.latitude ,
                "Longitude": data.longitude 
              })
            })
              .then((res) => res.json())
              .then((res) => {
                if (res != -1) {
                  res = JSON.parse(res);

                  searchResultsShoppingMallsSuccess(dispatch, res, data.userToken);
                }
                else {
                  searchResultsShoppingMallsFail(dispatch, Localizations('Global.ConnectionError'));
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
    }

  };

};


export const SearchResultsProductListData = (data) => {
  return (dispatch) => {

    if (data.keyword.length >= 0) {
      searchResultsProducts(dispatch, data.keyword);

      var webServerUrl = GLOBAL.WEB_SERVICE_URL;
      var webService = 'SearchResultProductsScreen';
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
                // keyword: aranılan kelime
                // search: keyword girilirken 'false', girilen keyword ürün, mağaza, avm içinde aranırken 'true' 
                // searchType: 0: Ürün, 1: mağaza, 2: AVM
                // latitude, longitude : koordinatlar

                "ID": 0,
                "userToken": data.userToken,
                "Keyword": data.keyword,
                "SearchTypeID": data.searchType,
                "Search": data.search,
                "Latitude": data.latitude ,
              "Longitude": data.longitude 
              })
            })
              .then((res) => res.json())
              .then((res) => {
                if (res != -1) {
                  res = JSON.parse(res);

                  searchResultsProductsSuccess(dispatch, res, data.userToken);
                }
                else {
                  searchResultsProductsFail(dispatch, Localizations('Global.ConnectionError'));
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
    }

  };

};

export const SearchResultsScreenData = (data) => {
  // console.log(data)
  //console.log("action:" + data.searchType)
  return (dispatch) => {

    operation(dispatch, data.keyword);

    if (data.keyword) {

      if (data.keyword.length >= 0) {
        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'SearchResultsScreen';
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
                  // keyword: aranılan kelime
                  // search: keyword girilirken 'false', girilen keyword ürün, mağaza, avm içinde aranırken 'true' 
                  // searchType: 0: Ürün, 1: mağaza, 2: AVM: 3: Kullanıcı
                  // latitude, longitude : koordinatlar

                  "ID": 0,
                  "userToken": data.userToken,
                  "Keyword": data.keyword,
                  "SearchTypeID": data.searchType,
                  "Search": data.search,
                  "Latitude": data.latitude ,
              "Longitude": data.longitude 
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
      }
    }

  };

};


export const SearchResultsUserListData = (data) => {
  return (dispatch) => {

    if (data.keyword.length >= 0) {
      searchResultsUsers(dispatch, data.keyword);

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
            var webService = 'SearchUsers';
            var webServiceUrl = webServerUrl + webService;

            fetch(webServiceUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                // keyword: aranılan kelime
                // search: keyword girilirken 'false', girilen keyword ürün, mağaza, avm içinde aranırken 'true' 
                // searchType: 0: Ürün, 1: mağaza, 2: AVM, 3: kullanıcı
                // latitude, longitude : koordinatlar

                "ID": 0,
                "userToken": data.userToken,
                "Keyword": data.keyword,
                "SearchTypeID": data.searchType,
                "Search": data.search,
                "Latitude": data.latitude ,
              "Longitude": data.longitude 
              })
            })
              .then((res) => res.json())
              .then((res) => {
                if (res != -1) {
                  res = JSON.parse(res);

                  searchResultsUsersSuccess(dispatch, res, data.userToken);
                }
                else {
                  searchResultsUsersFail(dispatch, Localizations('Global.ConnectionError'));
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
    }

  };

};

//#region keywordList   
const operation = (dispatch, keyword) => {
  dispatch({
    type: SEARCH_RESULTS_SCREEN_DATA,
    payload: keyword
  });
};

const operationSucces = (dispatch, res) => {

  dispatch({
    type: SEARCH_RESULTS_SCREEN_DATA_SUCCESS,
    payload: res
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
    type: SEARCH_RESULTS_SCREEN_DATA_FAIL
  });
};
//#endregion


//#region brandList  
const searchResultsBrands = (dispatch) => {
  dispatch({
    type: SEARCH_RESULTS_BRANDS_DATA
  });
};

const searchResultsBrandsSuccess = (dispatch, res) => {

  dispatch({
    type: SEARCH_RESULTS_BRANDS_DATA_SUCCESS,
    payload: res
  });
};

const searchResultsBrandsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEARCH_RESULTS_BRANDS_DATA_FAIL
  });
};
//#endregion


//#region ShoppingMallList  
const searchResultsShoppingMalls = (dispatch) => {
  dispatch({
    type: SEARCH_RESULTS_SHOPPINGMALLS_DATA
  });
};

const searchResultsShoppingMallsSuccess = (dispatch, res) => {

  dispatch({
    type: SEARCH_RESULTS_SHOPPINGMALLS_DATA_SUCCESS,
    payload: res
  });
};

const searchResultsShoppingMallsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEARCH_RESULTS_SHOPPINGMALLS_DATA_FAIL
  });
};
//#endregion



//#region ProductList  
const searchResultsProducts = (dispatch) => {
  dispatch({
    type: SEARCH_RESULTS_PRODUCTS_DATA
  });
};

const searchResultsProductsSuccess = (dispatch, res) => {

  dispatch({
    type: SEARCH_RESULTS_PRODUCTS_DATA_SUCCESS,
    payload: res
  });
};

const searchResultsProductsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEARCH_RESULTS_PRODUCTS_DATA_FAIL
  });
};
//#endregion




//#region userList  
const searchResultsUsers = (dispatch) => {
  dispatch({
    type: SEARCH_RESULTS_USERS_DATA
  });
};

const searchResultsUsersSuccess = (dispatch, res) => {

  dispatch({
    type: SEARCH_RESULTS_USERS_DATA_SUCCESS,
    payload: res
  });
};

const searchResultsUsersFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEARCH_RESULTS_USERS_DATA_FAIL
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
