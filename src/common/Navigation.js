import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, Text, ImageBackground } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';

const Navigation = (props) => {

  const { container, touchStyle, textStyle, imageStyle } = styles;
  this.props = {
    home: (
      <TouchableOpacity style={touchStyle} onPress={() => Actions.wallScreen()} >
        <Image source={require('../images/icons/stream.png')} style={imageStyle} />
        <Text style={textStyle}>{Localizations('Header-Navigation.Stream')}</Text>
      </TouchableOpacity>
    ),
    favourite: (
      <TouchableOpacity style={touchStyle} onPress={() => Actions.favoritesScreen()} >
        <Image source={require('../images/icons/heartAktif.png')} style={imageStyle} />
        <Text style={textStyle}>{Localizations('Header-Navigation.Help')}</Text>
      </TouchableOpacity>
    ),
    special: (
      <TouchableOpacity style={touchStyle} onPress={() => Actions.specialToMeScreen()}  >
        <Image source={require('../images/icons/banaOzel.png')} style={imageStyle} />
        <Text style={textStyle}>{Localizations('Header-Navigation.Special')}</Text>
      </TouchableOpacity>
    ),
    // qr: (
    //   <TouchableOpacity style={touchStyle} onPress={() => Actions.storeScreen({ storeID: 9 })} >      
    //     <Image source={require('../images/icons/qrKimligim.png')} style={imageStyle} />
    //     <Text style={textStyle}>{Localizations('Header-Navigation.QR')}</Text>
    //   </TouchableOpacity>
    // ),
    account: (
      <TouchableOpacity style={touchStyle} onPress={() => Actions.userGeneralSettingsScreen()} >
        <Image source={require('../images/icons/hesabim.png')} style={imageStyle} />
        <Text style={textStyle}>{Localizations('Header-Navigation.Account')}</Text>
      </TouchableOpacity>
    ),
  }

  if (props.navigationType === true) {

    return (
      (imageStyle.tintColor = 'white'),
      (
        // <ImageBackground source={require('../images/signInBackground.png')} style={[{ width: '100%',  }]}>
        <View style={{ backgroundColor: '#ff585c', width: '100%' }}>

          <View style={container}>
            {this.props.home}
            {this.props.special}
            {this.props.favourite}
            {this.props.qr}
            {this.props.account}
          </View>
          {/* </ImageBackground> */}
        </View>
      )
    );
  } else if (props.navigationType === false) {
    // console.log("navigasyon2");

    return (
      (imageStyle.tintColor = 'grey'),
      (
        <View style={container}>
          {this.props.home}
          {this.props.account}
        </View>
      )
    );
  } else {

    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    //height: 55,
    //backgroundColor: '#ff585c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    //width: '100%',
    //position: 'relative',
    bottom: 0,
    borderTopWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    //elevation: 5
  },
  touchStyle: {
    flex: 1,
    alignItems: 'center'
  },
  textStyle: {
    // fontWeight: 'normal',
    fontSize: 11,
    color: 'white'
  },
  imageStyle: {
    height: 24,
    width: 24,
    margin: 2,
    resizeMode: 'contain',
    tintColor: 'white'
  },
});

export default Navigation;
