import React, { Component } from 'react';
import { Platform, Text, TextInput, TouchableOpacity, View, Image, NativeModules, StyleSheet, ImageBackground } from 'react-native';
import { SearchResultsScreenData, ClickKeyword, SearchSubmit, SearchTypeChanged, ClearSearchText, ClearSearchData, ClearPostData /* , searchKeywordChanged, GetSearchType*/ } from '../actions';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LetterCircle } from '../common';

const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class Header extends Component {
  constructor() {
    super();
    this.state = {
      disableButton: false,
    };
  }





  _clickBack = () => {
    // console.log("geri tuşuna basıldı")
    Actions.pop();

    // console.log(Actions.state)
    // if (Actions.state.routes.length >= 2) {
    //   if (Actions.state.routes[Actions.state.routes.length - 2].routeName == "userSettingsPersonalInformationScreen") {
    //     Actions.userSettingsPersonalInformationScreen();
    //   } else if (Actions.state.routes[Actions.state.routes.length - 1].routeName == "post") {
    //     this.clearPostData();
    //   } else if (
    //     (Actions.state.routes[Actions.state.routes.length - 1].routeName == "searchResultsScreen") ||
    //     (Actions.state.routes[Actions.state.routes.length - 1].routeName == "friendRequestsScreen") ||
    //     (Actions.state.routes[Actions.state.routes.length - 1].routeName == "messageListScreen")
    //   ) {
    //     Actions.wallScreen();
    //   } else if (
    //     (Actions.state.routes[Actions.state.routes.length - 1].routeName == "messageViewScreen")
    //   ) {
    //     Actions.messageListScreen();
    //   }
    //   else {
    //     //this.clearSearchText();
    //     Actions.pop();
    //   }
    // }
    // else {
    //   //this.clearSearchText();
    //   Actions.wallScreen();
    // }
  }


  _clickOutdoorMap = () => {
    Actions.outdoorMapScreen({ ID: 0, OperationType: 0 });
  }
  clearSearchText = () => {
    this.props.ClearSearchText();
  }
  clearSearchData = () => {
    this.props.ClearSearchData();
  }
  clearPostData = () => {
    this.props.ClearPostData()
  }
  //#region Component operations
  UNSAFE_componentWillMount()  {

    // console.log(this.props) 

    this.props.ClearSearchText();
    this.props.SearchTypeChanged(1);
  }


  componentWillUnmount() {
    //this.props.ClearSearchText();
  }

  //#endregion

  Header1 = p => {

    // console.log(p);

    var rightButtonLabel = Localizations('Global.Finish');



    onTouchStart = () => { 
      onChangeText(p.keyword);

      if (Actions.currentScene != 'searchResultsScreen') {
        Actions.searchResultsScreen();
      }
      p.ClickKeyword(true);
    }

    onFocus = () => {
    }

    onBlur = () => {
    }

    onChangeText = (keyword) => {
      
      p.SearchResultsScreenData({
        keyword: keyword, search: false, searchType: p.searchType, userToken: p.SwoqyUserToken,
        latitude: this.props.SwoqyUserData.Latitude,
        longitude: this.props.SwoqyUserData.Longitude
      })
    }


    _clickJump = (rightButtonJumpPage) => {
      // debugger
      if (this.refs["SaveTouchable"]) {
        if (this.refs["SaveTouchable"].props) {
          this.refs["SaveTouchable"].props.disabled = true;
        }
      }
      // console.log(this.refs["SaveTouchable"].props.disabled);

      // console.log(p);
      // console.log(this);
      // debugger
      // this.setState({
      //   disableButton: true
      // });

      switch (rightButtonJumpPage) {
        case "postPrivacySpecificFriendsScreen":
          Actions.post()
          break;
        case "postScreen":
          // debugger  
          rightButtonLabel = Localizations('NewPost.Share') ;
          p.parentMethod();
          break;
        // case "postSurveyScreen":
        //   p.parentMethod();
        //   break;
        // case "postQuestionScreen":
        //   p.parentMethod();
        //   break;
        // case "postPurchaseScreen":
        //   p.parentMethod();
        //   break;
        case "userSettingsApplicationPreferancesScreen":
          p.parentMethod();
          break;
        case "helpRequestScreen":
          if (p.headerType == false) {
            p.parentMethod();
          }
          break;
        default:
          break;
      }



      // this.setState({
      //   disableButton: false
      // });

    }

    props2 = p.props;

    const { container1, textInputStyle, } = styles1;

    if (this.props.hideBackImage) {
      //this.props.ClearSearchText();
    }

    // console.log(Actions);
    // console.log(this);

    

    this.props2 = {
      left: (
        (p.from == "StartScreen" ?
        null
        :
        (!this.props.hideBackImage ?
          <TouchableOpacity style={container.row} onPress={this._clickBack.bind(this)} > 
            <Image
              style={[styles1.imageStyle, { marginRight: 10 }]}
              source={require('../images/icons/geri.png')}
            />
            {/* <Text style={{ color: 'white', fontSize: 16 }}>{Localizations('Global.Back')}</Text> */}
          </TouchableOpacity>
          :
          // <TouchableOpacity onPress={Actions.wallScreen()}>
          <Image
            style={{ width: 60, height: 15, marginRight: 10 }}
            resizeMode="stretch"
            source={require('../images/icons/logo_k.png')}
          />
          // </TouchableOpacity>
        )
        )
      ),
      middle: (
        <TextInput
          style={textInputStyle}
          value={p.keyword}
          onChangeText={keyword => { onChangeText((keyword)) }}
          onBlur={() => onBlur()}
          onFocus={() => { onFocus() }}
          placeholder={Localizations('Header-Navigation.HeaderText')}
          keyboardType='default'
          onSubmitEditing={p.SearchSubmit}
          returnKeyType='search'
          onTouchStart={() => { onTouchStart() }}
          ref="TxtSearch"
        />
      ),
      right1: (
        <TouchableOpacity onPress={this.onPress}>
          <Image
            style={[styles1.imageStyle, { tintColor: 'white' }]}
            source={require('../images/icons/qrKimligim.png')}
          />
        </TouchableOpacity>
      ),
      right2: (
        <TouchableOpacity style={container.center} onPress={() => this._clickOutdoorMap()} >
          <Image
            style={[styles1.imageStyle, { tintColor: 'white' }]}
            source={require('../images/icons/adres.png')}
          />
        </TouchableOpacity>
      )
    };

    switch (p.rightButtonJumpPage) {
      case "postScreen":
        rightButtonLabel = Localizations('NewPost.Share') ;
        break;
      case "helpRequestScreen":
        rightButtonLabel = Localizations('HelpRequestScreen.Send');
        break;
      default:
        break;
    }

    // console.log(rightButtonLabel)

    if (p.headerType === true) {
      return (
        // <ImageBackground source={require('../images/signInBackground.png')} style={{ width: '100%', height: 45 }}>
        <View style={{ backgroundColor: '#ff585c', height: 45, width: '100%' }}>
          <View style={container1}>
            <View style={{}}>
              {this.props2.left}
            </View>

            <View style={[container.row, { flex: 1, height: 35, marginRight: 10, paddingRight: 10, backgroundColor: 'white' }]}>
              <View>
                <Image
                  style={[styles1.imageStyle, { margin: 10 }]}
                  source={require('../images/icons/search.png')}
                />
              </View>

              {this.props2.middle}

              {/* <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text style={{ fontSize: 24, color: '#c9c9c9' }}>|</Text>
              </View> */}

              {/* <View>
                {this.props.right1}
              </View> */}
            </View>

            {/* <View >
              {this.props2.right2}
            </View> */}
          </View>
          {/* </ImageBackground> */}
        </View>
      );
    } else if (p.headerType === false) {

      // console.log(p);

      return (
        // <ImageBackground source={require('../images/signInBackground.png')} style={{ width: '100%', height: 45 }}>
        <View style={{ backgroundColor: '#ff585c', height: 45, width: '100%' }}>

          <View style={container1}>
            <View style={{ width: 70 }}>
              {this.props2.left}
            </View>

            {p.user != null ?
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => Actions.userProfileScreen({ ID: p.user.UserID })}>
                  <View style={container.row}>
                    <View style={{ marginRight: 10 }}>
                      <Text style={{ color: 'white', fontSize: 16 }}>{p.user.Name + " " + p.user.Surname}</Text>
                    </View>

                    <LetterCircle
                      contrast={true}
                      photo={p.user.UserPhoto}
                      data={p.user.Name + " " + p.user.Surname}
                      circleSize={32} />
                  </View>
                </TouchableOpacity>
              </View>
              :
              <View style={container.center}>
                <Text style={{ color: 'white', fontSize: 16 }}>{p.title}</Text>
              </View>
            }

            <View style={{ width: 70, alignContent: 'flex-end', alignItems: 'flex-end' }}>
              {p.rightButtonJumpPage != undefined && p.rightButtonJumpPage != "" && p.rightButtonJumpPage != null &&
                <TouchableOpacity ref="SaveTouchable" disabled={this.state.disableButton} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => _clickJump(p.rightButtonJumpPage)} >
                  <Text style={{ color: 'white', fontSize: 16 }}>{rightButtonLabel}</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
          {/* </ImageBackground > */}
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    // console.log(this.props)
    return (
      this.Header1(this.props)
    )
  }
}

const mapStateToProps = ({ searchResultsScreenResponse, startScreenResponse }) => {
  const { res, keyword, selectedKeyword, searchType, loadingKeywordList, type, userToken } = searchResultsScreenResponse;
  const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
  return {
    res, keyword, searchType, selectedKeyword, loadingKeywordList, type, userToken, SwoqyUserToken, SwoqyUserData
  };
}

export default connect(mapStateToProps, { SearchResultsScreenData, ClickKeyword, SearchSubmit, SearchTypeChanged, ClearSearchText, ClearSearchData, ClearPostData /*, searchKeywordChanged, GetSearchType */ })(Header);

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
    padding: 3,
    color: 'red',
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    // tintColor: '#ff5a5d',
  },
});
