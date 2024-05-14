
import _ from 'lodash'
import React, { Component } from 'react';
import { Text, Button, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

export default class UserAddedScreen extends Component {

  render() {
    return (
      


      <View style={{flex:1, backgroundColor:'white', alignContent:'center', }}>

          <View >
            <Text style={textStyle.settingStyle.general}>Kaydınız gerçekleşmiştir.</Text>
          </View>
          <View style={[container.row.sb, { marginVertical: 5 }]}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Button
                title="Giriş yap"
                onPress={() => Actions.signInScreen()}
              />
            </View>

          </View> 
      </View>
    );
  }
}
