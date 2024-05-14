import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Localizations, FormatDate } from '../../locales/i18n';


import { EMAIL_CHANGED, RESET_USER_PASSWORD } from './Types';

export const emailChanged_2 = (email) => {
  return (dispatch) => {
    dispatch({
      type: EMAIL_CHANGED,
      payload: email
    });
  };
};

export const resetUserPassword_2 = (email) => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_PASSWORD,
      payload: email
    });
  };
};


