import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';

const Spinner = ({ size, text }) => {
  return (
    <View style={styles.spinnerStyle}>
      {/* {text == false ? null : (text == null ? <Text>{Localizations('Global.Loading')}</Text> : <Text>{text}</Text>)} */}
      
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white'
  }
};

export { Spinner };
