import React from 'react';
import { Text, View, Button, ActivityIndicator, Image } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}
