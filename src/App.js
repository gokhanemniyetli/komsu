import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import Router from './Router';
import { View, Text, TouchableOpacity, ImageBackground, I18nManager } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import codePush from 'react-native-code-push';
import { Localizations, SetLocale } from '../locales/i18n';
import { Spinner, } from './common';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

import { GetSessionLanguage } from './common';

import AsyncStorage from '@react-native-community/async-storage';


import OfflineNotice from './components/OfflineNotice';
import NavigationTabBar from './common/Navigation';


class App extends Component {
  state = { loadingApp: false }



  async UNSAFE_componentWillMount()  {
    //debugger
    this.setState({
      loadingApp: true
    });

    //var language = await AsyncStorage.getItem('@sessionLanguage');


    await GetSessionLanguage().then((language) => {
      //debugger;
      if (language != null) {
        //console.log('language alındı: ' + language)
        SetLocale(language);
      }
      else {
        //console.log('language alınırken hata oldu! ')
      }
    });


    this.setState({
      loadingApp: false
    });
  }


  render() {
    //debugger;
    const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
    if (!this.state.loadingApp) {
      return (
        <View style={{ backgroundColor:'#ff585c', flex:1 }}>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }} >

            <Provider store={store} style={{ flex: 1 }}>
              <MenuProvider >


                <Router />
              </MenuProvider>
            
            </Provider>
          </SafeAreaView>
        </View>
      );
    }
    else {
      return <View></View>;
    }
  }
}


const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
  // checkFrequency: codePush.CheckFrequency.MANUAL
};
// export default (App);
export default codePush(codePushOptions)(App);
