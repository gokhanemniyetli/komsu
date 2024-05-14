import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { GetSessionTicket } from '../common';

import {
  SELECT_SURVEY_DATA,
  SELECT_SURVEY_DATA_SUCCESS,
  SELECT_SURVEY_DATA_FAIL,

  RATING_OF_QUESTION_DATA,
  RATING_OF_QUESTION_DATA_SUCCESS,
  RATING_OF_QUESTION_DATA_FAIL,

  SET_POST_LIKE_DATA,
  SET_POST_LIKE_DATA_SUCCESS,
  SET_POST_LIKE_DATA_FAIL,

  SET_REVIEW_CONFIRMATION_DATA,
  SET_REVIEW_CONFIRMATION_DATA_SUCCESS,
  SET_REVIEW_CONFIRMATION_DATA_FAIL,

  DEL_POST_DATA,
  DEL_POST_DATA_SUCCESS,
  DEL_POST_DATA_FAIL,

  SET_POST_REVIEW_DATA,
  SET_POST_REVIEW_DATA_SUCCESS,
  SET_POST_REVIEW_DATA_FAIL,

  GET_POST_ALL_REVIEWS_DATA,
  GET_POST_ALL_REVIEWS_DATA_SUCCESS,
  GET_POST_ALL_REVIEWS_DATA_FAIL,
  GET_POST_ALL_REVIEWS_EXTRA_DATA,
  GET_POST_ALL_REVIEWS_EXTRA_DATA_SUCCESS,


  GET_POST_ALL_LIKES_DATA,
  GET_POST_ALL_LIKES_DATA_SUCCESS,
  GET_POST_ALL_LIKES_DATA_FAIL,
  GET_POST_ALL_LIKES_EXTRA_DATA,
  GET_POST_ALL_LIKES_EXTRA_DATA_SUCCESS,

  SEND_INAPPROPRIATE_CONTENT_DATA,
  SEND_INAPPROPRIATE_CONTENT_DATA_SUCCESS,
  SEND_INAPPROPRIATE_CONTENT_DATA_FAIL,

  CONNECTION_ERROR
} from './Types';

// import Geolocation from '@react-native-community/geolocation';

const GLOBAL = require('../common/Globals');


// const getCurrentPosition = function () {
//   return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// }

export const SelectSurveyData = (data) => {
  return (dispatch) => {
    // debugger;
    selectSurvey(dispatch);


    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SelectSurveyItem';
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
              "ID": data.surveyItemID,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                selectSurveySucces(dispatch, res.Value);
              }
              else {
                selectSurveyFail(dispatch, "Baglanti hatasi");
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

export const RatingOfQuestionData = (data) => {
  return (dispatch) => {
    ratingOfQuestion(dispatch);

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'RatingOfQuestion';
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
              "ID": data.questionID,
              "Rating": data.rating,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                ratingOfQuestionSucces(dispatch, res.Value);

              }
              else {
                ratingOfQuestionFail(dispatch, "Baglanti hatasi");
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

export const SetReviewConfirmation = (data) => {
  //debugger
  return (dispatch) => {
    setReviewConfirmation(dispatch);
    // console.log(data);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SetReviewConfirmation';
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
              "ID": data.reviewOwnerID,
              "LongParameter1": data.reviewID,
              "IntParameter1": data.actionType,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                setReviewConfirmationSucces(dispatch, res.ConfirmationResult, data.reviewID);
              }
              else {
                setReviewConfirmationFail(dispatch, Localizations('Global.ConnectionError'));
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

export const SetPostLike = (data) => {

  return (dispatch) => {
    setPostLike(dispatch);
    // console.log(data);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'LikePost';
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
              "ID": data.postID,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                if (res.Success == false && res.Code == 100) {
                  setPostLikeFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                  Actions.signInScreen();
                }

                setPostLikeSucces(dispatch, res.Value1, res.Value2, data.postID);
              }
              else {
                setPostLikeFail(dispatch, Localizations('Global.ConnectionError'));
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

export const SetPostReview = (data) => {

  return (dispatch) => {
    setPostReview(dispatch);
    // console.log(data);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'ReviewPost';
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
              "ID": data.postID,
              "messageText": data.reviewText,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                setPostReviewSucces(dispatch, res.Value, res.Review, data.postID);
              }
              else {
                setPostReviewFail(dispatch, Localizations('Global.ConnectionError'));
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



export const DelPost = (data) => {
  // debugger
  return (dispatch) => {
    delPost(dispatch);
    // console.log(data);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'DelPost';
    var webServiceUrl = webServerUrl + webService;

    // debugger;
    fetch(webServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ID": data.PostID,
        "userToken": data.userToken
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res != -1) {
          res = JSON.parse(res);
          // debugger
          delPostSucces(dispatch, res, data.PostID);

          Actions.wallScreen();
        }
        else {
          delPostFail(dispatch, Localizations('Global.ConnectionError'));
        }
      })
      .catch((err) => {
        connectionError(dispatch, Localizations('Global.ConnectionError'));
      })
  };
};





export const SendInappropriateContent = (data) => {

  return (dispatch) => {
    sendInappropriateContent(dispatch);
    // console.log(data);
    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'SendInappropriateContent';
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
              "ID": data.postID,
              "messageText": data.messageText,
              "userToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);

                if (res.Success == false && res.Code == 100) {
                  sendInappropriateContentFail(dispatch, Localizations('Global.RequireUserLoginAlertMessage'));
                  Actions.signInScreen();
                }
                // debugger
                sendInappropriateContentSucces(dispatch, res, data.postID);
              }
              else {
                sendInappropriateContentFail(dispatch, Localizations('Global.ConnectionError'));
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

export const GetPostAllReviews = (data) => {
  //  debugger
  return (dispatch) => {
    var minPostReviewID = 0;
    var reviewCount = 5;
    if (data.minPostReviewID != null) {
      minPostReviewID = data.minPostReviewID;
      reviewCount = 5;
      getPostAllReviewsExtra(dispatch)
    }
    else {
      getPostAllReviews(dispatch);
    }

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetPostAllReviews';
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
              "ID": data.postID,
              "Count": reviewCount,
              "MinReviewID": minPostReviewID,
              "UserToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                if (data.minPostReviewID != null) {
                  getPostAllReviewsExtraSuccess(dispatch, res, data.userToken);
                }
                else {
                  getPostAllReviewsSuccess(dispatch, res.PostReviews, data.userToken);
                }
              }
              else {
                getPostAllReviewsFail(dispatch, Localizations('Global.ConnectionError'));
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

//#region  GetPostAllReviews
const getPostAllReviews = (dispatch) => {

  dispatch({
    type: GET_POST_ALL_REVIEWS_DATA
  });

};

const getPostAllReviewsSuccess = (dispatch, res, userToken) => {
  dispatch({
    type: GET_POST_ALL_REVIEWS_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getPostAllReviewsFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: GET_POST_ALL_REVIEWS_DATA_FAIL
  });
};

const getPostAllReviewsExtra = (dispatch) => {
  dispatch({
    type: GET_POST_ALL_REVIEWS_EXTRA_DATA
  });
};

const getPostAllReviewsExtraSuccess = (dispatch, res, userToken) => {
  dispatch({
    type: GET_POST_ALL_REVIEWS_EXTRA_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

//#endregion






//////////////////////////////////////////////


export const GetPostAllLikes = (data) => {
  //  debugger
  return (dispatch) => {
    var minPostLikeID = 0;
    var likeCount = 10;
    if (data.minPostLikeID != null) {
      minPostLikeID = data.minPostLikeID;
      likeCount = 10;
      getPostAllLikesExtra(dispatch)
    }
    else {
      getPostAllLikes(dispatch);
    }

    var webServerUrl = GLOBAL.WEB_SERVICE_URL;
    var webService = 'GetPostAllLikes';
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
              "ID": data.postID,
              "Count": likeCount,
              "MinLikeID": minPostLikeID,
              "UserToken": data.userToken,
              "Latitude": data.latitude ,
              "Longitude": data.longitude 
            })
          })
            .then((res) => res.json())
            .then((res) => {
              if (res != -1) {
                res = JSON.parse(res);
                if (data.minPostLikeID != null) {
                  getPostAllLikesExtraSuccess(dispatch, res, data.userToken);
                }
                else {
                  getPostAllLikesSuccess(dispatch, res.PostLikes, data.userToken);
                }
              }
              else {
                getPostAllLikesFail(dispatch, Localizations('Global.ConnectionError'));
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


//#region  GetPostAllLikes
const getPostAllLikes = (dispatch) => {

  dispatch({
    type: GET_POST_ALL_LIKES_DATA
  });

};

const getPostAllLikesSuccess = (dispatch, res, userToken) => {
  dispatch({
    type: GET_POST_ALL_LIKES_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

const getPostAllLikesFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: GET_POST_ALL_LIKES_DATA_FAIL
  });
};

const getPostAllLikesExtra = (dispatch) => {
  dispatch({
    type: GET_POST_ALL_LIKES_EXTRA_DATA
  });
};

const getPostAllLikesExtraSuccess = (dispatch, res, userToken) => {
  dispatch({
    type: GET_POST_ALL_LIKES_EXTRA_DATA_SUCCESS,
    payload: res,
    user: userToken
  });
};

//#endregion









//#region  DelPost
const delPost = (dispatch) => {
  dispatch({
    type: DEL_POST_DATA
  });
};

const delPostSucces = (dispatch) => {
  //   debugger;
  dispatch({
    type: DEL_POST_DATA_SUCCESS
  });

};

const delPostFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: DEL_POST_DATA_FAIL
  });
};
//#endregion

//#region  SetPostReview
const setPostReview = (dispatch) => {
  dispatch({
    type: SET_POST_REVIEW_DATA
  });
};

const setPostReviewSucces = (dispatch, reviewCount, review, postID) => {
  //   debugger;
  dispatch({
    type: SET_POST_REVIEW_DATA_SUCCESS,
    reviewCount: reviewCount,
    review: review,
    changingPostID: postID
  });
};

const setPostReviewFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_POST_REVIEW_DATA_FAIL
  });
};
//#endregion

//#region  SendInappropriateContent
const sendInappropriateContent = (dispatch) => {
  dispatch({
    type: SEND_INAPPROPRIATE_CONTENT_DATA
  });
};

const sendInappropriateContentSucces = (dispatch, res, inappropriatedPostID) => {
  //   debugger;
  dispatch({
    type: SEND_INAPPROPRIATE_CONTENT_DATA_SUCCESS,
    payload: res,
    inappropriatedPostID: inappropriatedPostID
  });
};

const sendInappropriateContentFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SEND_INAPPROPRIATE_CONTENT_DATA_FAIL
  });
};
//#endregion

//#region  SetReviewConfirmation
const setReviewConfirmation = (dispatch) => {
  dispatch({
    type: SET_REVIEW_CONFIRMATION_DATA
  });
};

const setReviewConfirmationSucces = (dispatch, confirmationResult, reviewID) => {
  //   debugger;
  dispatch({
    type: SET_REVIEW_CONFIRMATION_DATA_SUCCESS,
    confirmationResult: confirmationResult,
    reviewID: reviewID
  });
};

const setReviewConfirmationFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_REVIEW_CONFIRMATION_DATA_FAIL
  });
};
//#endregion

//#region  SetPostLike
const setPostLike = (dispatch) => {
  dispatch({
    type: SET_POST_LIKE_DATA
  });
};

const setPostLikeSucces = (dispatch, likeCount, userLike, postID) => {
  //   debugger;
  dispatch({
    type: SET_POST_LIKE_DATA_SUCCESS,
    likeCount: likeCount,
    userLike: userLike,
    changingPostID: postID
  });
};

const setPostLikeFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SET_POST_LIKE_DATA_FAIL
  });
};
//#endregion

//#region  Survey işlemleri
const selectSurvey = (dispatch) => {
  dispatch({
    type: SELECT_SURVEY_DATA
  });
};

const selectSurveySucces = (dispatch, res) => {
  dispatch({
    type: SELECT_SURVEY_DATA_SUCCESS,
    payload: res
  });
};

const selectSurveyFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: SELECT_SURVEY_DATA_FAIL
  });
};
//#endregion

//#region  rating işlemleri
const ratingOfQuestion = (dispatch) => {
  dispatch({
    type: RATING_OF_QUESTION_DATA
  });
};

const ratingOfQuestionSucces = (dispatch, res) => {
  dispatch({
    type: RATING_OF_QUESTION_DATA_SUCCESS,
    payload: res
  });
};

const ratingOfQuestionFail = (dispatch, errorMessage) => {
  Alert.alert(
    '',
    errorMessage,
    [
      { text: Localizations('Global.Ok'), onPress: () => null }
    ]
  );
  dispatch({
    type: RATING_OF_QUESTION_DATA_FAIL
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
