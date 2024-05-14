import _ from 'lodash'
import React, { Component } from 'react';
import { Button, Text, TextInput, View, ScrollView, StyleSheet, ImageBackground, Image, TouchableOpacity, FlatList, Linking,  Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { selectedKeyword, SearchResultsScreenData, ClickKeyword, SearchSubmit, SearchTypeChanged, ClearSearchText, ClearSearchData, ClearPostData /* , searchKeywordChanged, GetSearchType*/ } from '../actions';

import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

import SearchResultsList from '../components/SearchResultsList';
import SearchResultsProductList from '../components/SearchResultsProductList';
import SearchResultsBrandList from '../components/SearchResultsBrandList';
import SearchResultsShoppingMallList from '../components/SearchResultsShoppingMallList';
import SearchResultsUserList from '../components/SearchResultsUserList';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle } = require('../styles/SwoqyStyles');

class SearchResultsScreen extends Component {

  constructor(props) {
    super(props);
    // textInput DOM elemanını kaydetmek için bir ref oluşturun
    this.textInput = React.createRef();
  }

  state = {
    res: '', loadingSearchResult: false, type: '', userToken: '', scrollableTabViewHeight: 50,
    productSearch: false, brandSearch: false, userSearch: false, shoppingMallSearch: false,
    keyword: ''
  };


  //#region Component operations
  UNSAFE_componentWillMount() {
    // this.props.SearchTypeChanged(1);
  }

  componentDidMount() {
    this.SetTextFocus();
    
    
  }

  SetTextFocus = () => {
    if (!this.inputField.isFocused()) 
    {
      this.inputField.focus();
      setTimeout(() => {
        this.SetTextFocus();
      }, 200);
    }
  }

  
  UNSAFE_componentWillReceiveProps(nextProps) {
    res = nextProps.res;

    if (nextProps.showKeywordList) {
      this.setState({
        scrollableTabViewHeight: 50
      })
    }
    else {
      this.setState({
        scrollableTabViewHeight: 300
      })
    }

    //console.log(nextProps);
    if (nextProps.type == 'search_results_screen_data_success') {
      this.setState({
        lstResults: res.LstResults,
      });
    } else if (nextProps.type == 'clear_search_data') {
      this.setState({
        lstKeywords: res,
      });
    } else if (nextProps.type == 'search_type_changed') {
      this.props.SearchResultsScreenData({ keyword: nextProps.keyword, search: false, searchType: nextProps.searchType, userToken: nextProps.SwoqyUserToken,
        latitude: this.props.SwoqyUserData.Latitude,
        longitude: this.props.SwoqyUserData.Longitude  })
    } else if (nextProps.type == 'set_selected_keyword') {
      //  console.log('nextProps')
      this.props.SearchResultsScreenData({ keyword: nextProps.keyword, search: false, searchType: nextProps.searchType, userToken: nextProps.SwoqyUserToken,
        latitude: this.props.SwoqyUserData.Latitude,
        longitude: this.props.SwoqyUserData.Longitude  })
      this.props.SearchSubmit();
      // this._search();
    } else if (nextProps.type == 'search_submit') {
      // console.log(nextProps)
      // this.props.SearchResultsScreenData( {keyword:nextProps.keyword, search:true, searchType:nextProps.searchType, userToken: nextProps.SwoqyUserToken })
      this._search();
    }
  }
  //#endregion

  //#region click functions

  _clickBack = () => {
    if (Actions.state.routes.length >= 2) {
      if (Actions.state.routes[Actions.state.routes.length - 2].routeName == "userSettingsPersonalInformationScreen") {
        Actions.userSettingsPersonalInformationScreen();
      } else if (Actions.state.routes[Actions.state.routes.length - 1].routeName == "post") {
        this.clearPostData();
      } else if (
        (Actions.state.routes[Actions.state.routes.length - 1].routeName == "searchResultsScreen") ||
        (Actions.state.routes[Actions.state.routes.length - 1].routeName == "friendRequestsScreen") ||
        (Actions.state.routes[Actions.state.routes.length - 1].routeName == "messageListScreen")
      ) {
        Actions.wallScreen();
      } else if (
        (Actions.state.routes[Actions.state.routes.length - 1].routeName == "messageViewScreen")
      ) {
        Actions.messageListScreen();
      }
      else {
        this.clearSearchText();
        Actions.pop();
      }
    }
    else {
      this.clearSearchText();
      Actions.wallScreen();
    }
  }

  _clickOutdoorMap = () => {
    Actions.outdoorMapScreen({ ID: 0, OperationType: 0 });
  }

  clearSearchText = () => {
    this.props.ClearSearchText();
  }
  
  _clickSearchResultsItem = (item) => {

    //debugger
    this.props.SearchTypeChanged(item.ref.props.page);
    this.props.SearchResultsScreenData({ keyword: this.props.keyword, search: false, searchType: item.ref.props.page, userToken: this.props.SwoqyUserToken,
      latitude: this.props.SwoqyUserData.Latitude,
      longitude: this.props.SwoqyUserData.Longitude  })
  }
  //#endregion

  onTouchStart = () => {
    onChangeText(this.props.keyword);
    //Actions.searchResultsScreen();
  }

  onChangeText = (keyword) => {
    //debugger
    this.props.ClickKeyword(true);
    this.props.SearchResultsScreenData({ keyword: keyword, search: false, searchType: this.props.searchType, userToken: this.props.SwoqyUserToken,
      latitude: this.props.SwoqyUserData.Latitude,
      longitude: this.props.SwoqyUserData.Longitude  })

    //console.log(this.props.keyword)
  }


  onFocus = () => {
    onChangeText(this.props.keyword);
  }

  onBlur = () => {
  }


  _search = () => {
    // arama yönlendirmeleri buradan yapılacak.

    switch (this.props.searchType) {
      case 0:
        this.setState({
          productSearch: true,
          brandSearch: false,
          shoppingMallSearch: false,
          userSearch: false
        })
        break;
      case 1:
        this.setState({
          productSearch: false,
          brandSearch: true,
          shoppingMallSearch: false,
          userSearch: false
        })
        break;
      case 2:
        this.setState({
          productSearch: false,
          brandSearch: false,
          shoppingMallSearch: true,
          userSearch: false
        })
        break;
      case 3:
        this.setState({
          productSearch: false,
          brandSearch: false,
          shoppingMallSearch: false,
          userSearch: true
        })
        break;
      default:
        break;
    }
  }

  //#region render operations
  renderSearchResultsArea = () => {
    //console.log(this.state)
    // if (!this.props.loadingKeywordList) {
    return (
      // <ImageBackground 
      // keyboardShouldPersistTaps='never' 
      // source={require('../images/signInBackground.png')} style={{ flex: 1 }}>

<View keyboardShouldPersistTaps='never'
style={{ backgroundColor:'#ff585c', flex:1}}>

        <View 
         
        keyboardShouldPersistTaps='never'
        style={{ flex: 1 }}>
          <ScrollableTabView
            contentProps={{   }}
            // keyboardShouldPersistTaps={'always'}
            style={{ flex: 1, height: this.state.scrollableTabViewHeight, }}
            // prerenderingSiblingsNumber={0}
            scrollWithoutAnimation={false}
            renderTabBar={() => <DefaultTabBar />}
            // tabBarBackgroundColor='white'
            tabBarTextStyle={{ fontSize: 15, color: 'white' }}
            tabBarUnderlineStyle={{ backgroundColor: 'white' }}
            ref={(tabView) => { this.tabView = tabView }}
            //onPress={console.log("clicklendi")}
            onChangeTab={this._clickSearchResultsItem}>
            {/* <SearchResultsProductList tabView={this.tabView} tabName="product" tabLabel={Localizations('Global.Product').toUpperCase()} productSearch={this.state.productSearch} /> */}
            {/* <SearchResultsBrandList page={1} tabView={this.tabView} tabName="store" tabLabel={Localizations('Global.Brand')} brandSearch={this.state.brandSearch} />
            <SearchResultsShoppingMallList
              page={2}
              style={{ backgroundColor: 'white' }}
              tabView={this.tabView} tabName="shoppingMall" tabLabel={Localizations('Global.ShoppingMall')} shoppingMallSearch={this.state.shoppingMallSearch} /> */}
            <SearchResultsUserList page={1} tabView={this.tabView} tabName="user" tabLabel={Localizations('Global.Users')} userSearch={this.state.userSearch} style={{ backgroundColor: 'white' }} />
          </ScrollableTabView>

          {
            (this.props.showKeywordList) &&
            <View style={{ position: 'absolute', top: 50, left: 0, width: '100%' }}
            keyboardShouldPersistTaps='never'

            >
              {(!this.props.loadingKeywordList) &&
                <SearchResultsList
                keyboardShouldPersistTaps='never'
                  contentProps={{ keyboardShouldPersistTaps: 'never'  }}

                  // tabView={this.tabView} tabName="product" tabLabel={Localizations('Global.Product').toUpperCase()} 
                  keywordList={this.state.lstResults} />
                // : <View style={{ height: 200, backgroundColor: 'white' }}><Spinner></Spinner></View>
              }
            </View>
          }
        </View>
      {/* </ImageBackground> */}
      </View>
    )
    // }
  }

  render() {

    //console.log(this.props.keyword);
    /// Server kaynaklı sorun olduğunda görüntülenecek.
    if (!this.props.connectionError) {
      return (
        <View style={{ flex: 1 }}
          keyboardShouldPersistTaps="never"
           >
           {/* <ImageBackground source={require('../images/signInBackground.png')} style={{ width: '100%', height: 45 }}> */}
            <View style={styles1.container1}>
              <View style={{}}>
                <TouchableOpacity style={container.row} onPress={this._clickBack.bind(this)} >
                  <Image
                    style={[styles1.imageStyle, { marginRight: 10 }]}
                    source={require('../images/icons/geri.png')}
                  />
                 
                </TouchableOpacity>
              </View>

              <View style={[container.row, { flex: 1, height: 35, marginRight: 10, paddingRight: 10, backgroundColor: 'white' }]}>
                <View>
                  <Image
                    style={[styles1.imageStyle, { margin: 10 }]}
                    source={require('../images/icons/search.png')}
                  />
                </View>

                <TextInput
                  style={styles1.textInputStyle}
                  value={this.props.keyword}
                  onChangeText={keyword => { this.onChangeText((keyword)) }}
                  onBlur={() => this.onBlur()}
                  onFocus={() => { this.onFocus() }}
                  placeholder={Localizations('Header-Navigation.HeaderText')}
                  keyboardType='default'
                  onSubmitEditing={this.props.SearchSubmit}
                  returnKeyType='search'
                  onTouchStart={() => { this.onTouchStart() }}
                  autoFocus={true}

                  //ref={this.textInput} 
                  ref={(input) => { this.inputField = input; }}
                />


              </View>

              {/* <View >
                <TouchableOpacity style={container.center} onPress={() => this._clickOutdoorMap()} >
                  <Image
                    style={[styles1.imageStyle, { tintColor: 'white' }]}
                    source={require('../images/icons/adres.png')}
                  />
                </TouchableOpacity>
              </View> */}
            </View>
          {/* </ImageBackground>  */}
          
          {this.renderSearchResultsArea()}
        </View>
      )
    }
    return (
      <ShowMessage backgroundStyle="bgStyle"
        textStyle="txtStyle"
        text={Localizations('Global.ConnectionError')}
      />
    );
  }
  //#endregion
}

const mapStateToProps = ({ searchResultsScreenResponse, startScreenResponse }) => {
  const { res, keyword, selectedKeyword, search, searchType, showKeywordList, loadingKeywordList, type, userToken } = searchResultsScreenResponse;
  const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
  return {
    res, keyword, selectedKeyword, search, searchType, showKeywordList, loadingKeywordList, type, userToken, SwoqyUserToken, SwoqyUserData
  };
}

export default connect(mapStateToProps, { SearchResultsScreenData, ClickKeyword, SearchSubmit, SearchTypeChanged, ClearSearchText, ClearSearchData, ClearPostData })(SearchResultsScreen);


const styles1 = StyleSheet.create({
  container1: {
    // marginTop: Platform.OS == 'ios' ? NativeModules.StatusBarManager.HEIGHT : 0,
    // marginTop: Platform.OS == 'ios' ? 26 : 0,
    height: 45,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    // elevation: 5,
    position: 'relative',
  },
  textInputStyle: {
    flex: 1,
    fontSize: 16,
    padding: 3
    // borderColor: '#ff585c',
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // tintColor: '#ff5a5d',
  },
});
