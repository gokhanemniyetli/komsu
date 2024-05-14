import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';
import {  SetSessionTicket, ClearSessionTicket } from '../common';
import {LoginManager} from 'react-native-fbsdk';


import { 
SIGNOUT_USER,
SIGNOUT_USER_SUCCESS,
SIGNOUT_USER_FAIL } from './Types';

const GLOBAL = require('../common/Globals');



export const UserSignOut = ({userToken}) => {
    
    return (dispatch) => {
        
        signOut(dispatch);
        

        var webServerUrl = GLOBAL.WEB_SERVICE_URL;
        var webService = 'UserSignOut';
        var webServiceUrl = webServerUrl +  webService;

       // console.log(userToken);

        fetch(webServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userToken":userToken,
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res != -1) 
            {
                if (res == "true") {
                    LoginManager.logOut();
                    ClearSessionTicket();
                    signOutSucces(dispatch, String(res));

                } else {
                    signOutFail(dispatch, "Sistem çıkış hatası!");
                }
            }
            else
            {
                signOutFail(dispatch, "Hata oluştu!");
            }
            
        })
        .catch((err) => {
        
            signInFail(dispatch, Localizations('Global.ConnectionError') + "\n" + err);
        })
    }
}

const signOut = (dispatch) => {
    
    dispatch({
        type: SIGNOUT_USER
    });


};


const signOutFail = (dispatch, errorMessage) => {
    Alert.alert(
        '',
        errorMessage,
        [
            { text: 'OK', onPress: () => null }
        ]
    );
    
    dispatch({
        type: SIGNOUT_USER_FAIL
    });

};

const signOutSucces = (dispatch, userToken) => {
   // console.log("success");
    dispatch({
        type: SIGNOUT_USER_SUCCESS
    });
    
    Alert.alert(
        'Swoqy hesabınızdan çıkış yaptınız.',
        "Swoqy ana ekranına yönlendirildiniz.",
        [
            { text: 'OK', onPress: () => null }
        ]
    );

    Actions.wallScreen();
};
