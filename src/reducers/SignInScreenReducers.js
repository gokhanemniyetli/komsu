import {
    SIGNIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, EMAIL_CHANGED, PASSWORD_CHANGED,

    USER_SIGNIN_START, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,



    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL
} from '../actions/Types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loadingSignIn: false, loadingForgotPassword: false, loadingNewAccount: false, LoadingNoSignIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // #region Login olma durumları
        case USER_SIGNIN_START:
            // debugger;
            return { ...state, loadingSignIn: true }
        case USER_SIGNIN_SUCCESS:
            return { ...state, loadingSignIn: false }
        case USER_SIGNIN_FAIL:
            return { ...state, loadingSignIn: false }
        // #endregion 



        
        case SIGNIN_USER:
            // debugger
            return { ...state, loadingSignIn: true };
        case LOGIN_USER_SUCCESS:
            // debugger
            return { ...state, loadingSignIn: false };
        case LOGIN_USER_FAIL:
            // debugger
            return { ...state, loadingSignIn: false };

        case FORGOT_PASSWORD:
            return { ...state, success: false, code: '', loadingForgotPassword: true, type: action.type };
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, success: action.payload.Success, code: action.payload.Code, loadingForgotPassword: false, type: action.type };
        case FORGOT_PASSWORD_FAIL:
            return { ...state, success: false, code: '', loadingForgotPassword: false, type: action.type };

        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

