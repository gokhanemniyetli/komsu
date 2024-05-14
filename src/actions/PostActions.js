import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import futch from '../common/UploadApi';

import {
  POST_DATA,
  POST_DATA_SUCCESS,
  POST_DATA_FAIL,


  GET_FAKE_DATA,
  GET_FAKE_DATA_SUCCESS,
  GET_FAKE_DATA_FAIL,

  GET_POST_BY_ID_DATA,
  GET_POST_BY_ID_DATA_SUCCESS,
  GET_POST_BY_ID_DATA_FAIL,

  SEARCH_IN_MY_FRIENDS,
  SEARCH_IN_MY_FRIENDS_SUCCESS,
  SEARCH_IN_MY_FRIENDS_FAIL,


  GET_NEAR_PLACES,
  GET_NEAR_PLACES_SUCCESS,
  GET_NEAR_PLACES_FAIL,


  BRAND_SEARCH,
  BRAND_SEARCH_SUCCESS,
  BRAND_SEARCH_FAIL,

  SET_ACCESS_TYPE_ID,
  SET_POST_TEXT,
  SELECTED_FRIENDS,
  SELECTED_NEAR_PLACE,
  SELECTED_IMAGES,
  SELECTED_BRAND,
  SET_SURVEY,
  SET_QUESTION,
  SET_PURCHASE,

  CONNECTION_ERROR,
} from './Types';
const uuid = require('uuid');

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// const getCurrentPosition = function () {
//   return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// }




export const ClearPostData = () => {
  return (dispatch) => {
    Alert.alert(
      Localizations('NewPost.LeavePost'),
      Localizations('NewPost.LeavePostText'),
      [
        {
          text: Localizations('NewPost.Leave'),
          onPress: () => (
            clearPostData(dispatch),
            Actions.wallScreen()
          ),
        },
        { text: Localizations('NewPost.Cancel') },
      ],
      { cancelable: false },
    );
  }
}

export const PostData = (data) => {


  return (dispatch) => {
    //     debugger;
    operation(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;

    postFileData = [];

    // Resim ve videolar upload ediliyor.
    //_________________________________________________________________________

    if (data.postImageList) {
      // debugger;
      const formData = new FormData();
      data.postImageList.map((photo, index) => {
        var photoName = uuid.v4() + '.' + photo.Uri.split('.').pop()
        formData.append('photos', {
          uri: photo.Uri,
          type: photo.Type,
          name: photoName
        });

        postFileData.push({ Type: photo.Type, Name: photoName })
      });
      //debugger
      if (data.fakeUser == undefined || data.fakeUser == null || data.fakeUser == '' || data.fakeUser == 0) {
        var uploadURL = webServerUrl + 'UploadFiles?UserToken=' + data.userToken;
      } else {
        var uploadURL = webServerUrl + 'UploadFiles?FakeUserID=' + data.fakeUser;

      }
      futch(uploadURL, {
        method: 'post',
        body: formData
      }, (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total;
        //console.log(progress);
      }).then((res) => console.log(res), (err) => console.log(err))
    }
    //_________________________________________________________________________



    // // Loaction 
    // Promise.all([getCurrentPosition()]).then(function (values) {
    //   getCurrentPosition()
    //     .then((position) => {
    //       var lat = 0.0;
    //       lat = position.coords.latitude;

    //       var long = 0.0;
    //       long = position.coords.longitude;
    //       // Location


          var webService = 'SendPost';
          var webServiceUrl = webServerUrl + webService;
          //debugger
          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "PostedPostID": data.postedPostID,
              "UserToken": data.userToken,
              "AccessTypeID": data.accessTypeID,
              "PostText": data.postText,
              "SharingType": data.sharingType,
              "SharingUserList": data.sharingUserList,
              "PostImageList": postFileData,
              "Place": data.place,
              "Question": data.question,
              "Survey": data.survey,
              "Purchased": data.purchased,
              "FakeShoppingMall": data.fakeShoppingMall,
              "FakeUser": data.fakeUser,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          }).then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                if (res.Success == false && res.Code == 100) {
                  operationFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                  Actions.signInScreen();
                }

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



export const GetFakeData = (data) => {
  return (dispatch) => {
    getFakeData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetFakeData';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": 0,
        "UserToken": data.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getFakeDataSucces(dispatch, res);
        }
        else {
          getFakeDataFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};


export const GetPostByIDData = (data) => {
  return (dispatch) => {
    //   debugger;
    getPostByIDData(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetPostByID';
    var webServiceUrl = webServerUrl + webService;

    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.ID,
        "UserToken": data.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          getPostByIDDataSucces(dispatch, res.Post, data.userToken);
        }
        else {
          getPostByIDDataFail(dispatch, Localizations('Global.ConnectionError'));
          // this.setState({ isLoading : false});
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};

export const SearchInMyFirends = (data) => {
  return (dispatch) => {
    // debugger;
    searchInMyFirends(dispatch);


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
          var webService = 'SearchInMyFriends';
          var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "UserToken": data.userToken,
              "Keyword": data.keyword,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                searchInMyFirendsSuccess(dispatch, res.Users, data.userToken);
              }
              else {
                searchInMyFirendsFail(dispatch, Localizations('Global.ConnectionError'));
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

export const BrandSearch = (data) => {
  return (dispatch) => {
    // debugger;
    brandSearch(dispatch);


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
          var webService = 'SearchInBrands';
          var webServiceUrl = webServerUrl + webService;

          fetch(webServiceUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "ID": 0,
              "UserToken": data.userToken,
              "Keyword": data.keyword,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                brandSearchSuccess(dispatch, res.Brands, data.userToken);
              }
              else {
                brandSearchFail(dispatch, Localizations('Global.ConnectionError'));
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


export const GetNearPlaces = (data) => {
  return (dispatch) => {
    getNearPlaces(dispatch);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'NearPlaces';
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
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                getNearPlacesSuccess(dispatch, res.Places, data.userToken);
              }
              else {
                getNearPlacesFail(dispatch, Localizations('Global.ConnectionError'));
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

//#region Local operations
export const SetAccessTypeID = (data) => {
  //debugger;
  return (dispatch) => {
    setAccessTypeID(dispatch, data.AccessTypeID)
  };
};

const setAccessTypeID = (dispatch, accessTypeID) => {
  dispatch({
    type: SET_ACCESS_TYPE_ID,
    accessTypeID: accessTypeID
  });
};


export const SetPostText = (data) => {
  return (dispatch) => {
    setPostText(dispatch, data.postText)
  };
};

const setPostText = (dispatch, postText) => {
  dispatch({
    type: SET_POST_TEXT,
    postText: postText
  });
};


export const SelectedFriends = (data) => {
  return (dispatch) => {
    selectedFriends(dispatch, data)
  }
}

const selectedFriends = (dispatch, selectedFriendList) => {
  dispatch({
    type: SELECTED_FRIENDS,
    selectedFriendList: selectedFriendList
  });
};


export const SelectedNearPlace = (data) => {
  return (dispatch) => {
    selectedNearPlace(dispatch, data.nearPlace)
  }
}

const selectedNearPlace = (dispatch, selectedNearPlace) => {
  dispatch({
    type: SELECTED_NEAR_PLACE,
    selectedNearPlace: selectedNearPlace
  });
};



export const SelectedBrand = (data) => {
  return (dispatch) => {
    //  debugger;
    selectedBrand(dispatch, data.brand)
  }
}

const selectedBrand = (dispatch, selectedBrand) => {
  dispatch({
    type: SELECTED_BRAND,
    selectedBrand: selectedBrand
  });
};



export const SetSurvey = (data) => {
  return (dispatch) => {
    //  debugger;
    setSurvey(dispatch, data.survey)
  }
}

const setSurvey = (dispatch, survey) => {
  dispatch({
    type: SET_SURVEY,
    survey: survey
  });

  if (survey != null) {
    Actions.post({ survey: survey });
  }
};


export const SetQuestion = (data) => {
  return (dispatch) => {

    setQuestion(dispatch, data.question)
  }
}

const setQuestion = (dispatch, question) => {
  dispatch({
    type: SET_QUESTION,
    question: question
  });

  if (question != null) {
    Actions.post({ question: question });
  }
};



export const SetPurchase = (data) => {
  return (dispatch) => {
    //  debugger;
    setPurchase(dispatch, data.Purchase)
  }
}

const setPurchase = (dispatch, purchase) => {
  dispatch({
    type: SET_PURCHASE,
    purchase: purchase
  });

  if (purchase != null) {
    Actions.post({ purchase: purchase });
  }
};





export const SelectedImages = (data) => {
  //    debugger;
  return (dispatch) => {
    selectedImages(dispatch, data)
  }
}

const selectedImages = (dispatch, images) => {
  dispatch({
    type: SELECTED_IMAGES,
    selectedImages: images
  });
};
//#endregion


//#region GetNearPlaces
const getNearPlaces = (dispatch) => {
  // debugger;
  dispatch({
    type: GET_NEAR_PLACES
  });
};

const getNearPlacesSuccess = (dispatch, nearPlaceList, userToken) => {
  // debugger;
  dispatch({
    type: GET_NEAR_PLACES_SUCCESS,
    nearPlaceList: nearPlaceList,
    user: userToken
  });
  // debugger;
};

const getNearPlacesFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: GET_NEAR_PLACES_FAIL
  });
};
//#endregion


//#region searchInBrands
const brandSearch = (dispatch) => {
  // debugger;
  dispatch({
    type: BRAND_SEARCH
  });
};

const brandSearchSuccess = (dispatch, brandList, userToken) => {
  // debugger;
  dispatch({
    type: BRAND_SEARCH_SUCCESS,
    brandList: brandList,
    user: userToken
  });
  // debugger;
};

const brandSearchFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: BRAND_SEARCH_FAIL
  });
};
//#endregion


//#region searchInMyFirends
const searchInMyFirends = (dispatch) => {
  // debugger;
  dispatch({
    type: SEARCH_IN_MY_FRIENDS
  });
};

const searchInMyFirendsSuccess = (dispatch, friendList, userToken) => {
  // debugger;
  dispatch({
    type: SEARCH_IN_MY_FRIENDS_SUCCESS,
    friendList: friendList,
    user: userToken
  });
  // debugger;
};

const searchInMyFirendsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEARCH_IN_MY_FRIENDS_FAIL
  });
};
//#endregion



//#region GetFakeData
const getFakeData = (dispatch) => {
  dispatch({
    type: GET_FAKE_DATA
  });
};

const getFakeDataSucces = (dispatch, res) => {
  dispatch({
    type: GET_FAKE_DATA_SUCCESS,
    payload: res
  });
};

const getFakeDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: GET_FAKE_DATA_FAIL
  });
};
//#endregion


//#region GetPostByIDData
const getPostByIDData = (dispatch) => {
  // debugger;
  dispatch({
    type: GET_POST_BY_ID_DATA
  });
};

const getPostByIDDataSucces = (dispatch, res, userToken) => {
  // debugger;
  dispatch({
    type: GET_POST_BY_ID_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
  // debugger;
};

const getPostByIDDataFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: GET_POST_BY_ID_DATA_FAIL
  });
};
//#endregion

//#region operation
const operation = (dispatch) => {
  dispatch({
    type: POST_DATA
  });
};

const operationSucces = (dispatch, res, userToken) => {
  dispatch({
    type: POST_DATA_SUCCESS,
    payload: res,
    user: userToken
  });

  clearPostData(dispatch);

  Actions.wallScreen();
};

const clearPostData = (dispatch) => {
  dispatch(SetPostText({ postText: "" }));
  dispatch(SetAccessTypeID({ AccessTypeID: 0 }));
  dispatch(SelectedNearPlace({ nearPlace: null }));
  dispatch(SetQuestion({ question: null }));
  dispatch(SetSurvey({ survey: null }));
  dispatch(SelectedFriends([]));
  dispatch(SelectedImages([]));
  dispatch(SetPurchase({ Purchase: null }))
}

const operationFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: POST_DATA_FAIL
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

