import {
    SIGNIN_CONTROL,
    SIGNIN_CONTROL_SUCCESS,
    SIGNIN_CONTROL_FAIL,
    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL,
    USER_SIGNIN,
    USER_SIGNOUT,
    GET_USER_DATA,
    UPDATE_LOCATION,
    SET_ADSTATUS
} from '../actions/Types';

const INITIAL_STATE = {
    loading: false,
    loadingSignIn: false,
    adStatus: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNIN_CONTROL:
            return { ...state, loading: true };
        case SIGNIN_CONTROL_SUCCESS:
            //debugger;
            return { ...state, loading: false };
        case SIGNIN_CONTROL_FAIL:
            return { ...state, loading: false };
        case SIGNOUT:
            return { ...state, loading: true };
        case SIGNOUT_SUCCESS:
            return { ...state, loading: false };
        case SIGNOUT_FAIL:
            return { ...state, loading: false };

        case USER_SIGNIN:
            //  debugger
            return { ...state, SwoqyUserToken: action.userToken, SwoqyUserData: action.userData, loadingSignIn: true }
        case USER_SIGNOUT:
            // debugger
            var data = JSON.stringify({
                "UserNameSurname": null,
                "UserPhoto": null,
                "DefaultLanguage": null,
                "DefaultCurrency": null,
                "PostAccess": null,
                "AdminUser": null,
                "Latitude": state.SwoqyUserData.Latitude,
                "Longitude": state.SwoqyUserData.Longitude
            })

            userData = JSON.parse(data);
            return { ...state, SwoqyUserToken: null, SwoqyUserData: userData, loadingSignIn: false }
        case GET_USER_DATA:
            // debugger
            return { ...state, SwoqyUserData: action.userData, loadingSignIn: false }


        case UPDATE_LOCATION:
            return { ...state, SwoqyUserData: action.userData }



        case SET_ADSTATUS:
            return { ...state, adStatus: action.adStatus }

        default:
            return state;
    }
};

