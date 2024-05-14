import { AppCenterLogLevel } from 'appcenter';
import React from 'react';
import { View,  Text } from 'react-native';
import { withOrientation } from 'react-navigation';
import { Localizations, FormatDate } from '../../locales/i18n';

const NoContent = ({ size, text }) => {
  return (
    <View style={styles.spinnerStyle}>
      <Text style={styles.spinnerStyle}>{Localizations('Global.NoContent')}</Text>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    margin:20, 
    backgroundColor:'#ff585c',
    color:'white', 
    fontWeight:'bold',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
    //backgroundColor: 'white'
  }
};

export { NoContent };
