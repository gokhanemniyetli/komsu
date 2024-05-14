import _ from 'lodash'
import React, { Component, Animated } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Picker,  Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserReviewsScreenData } from '../actions';
import { Card, CardSection, Spinner, Scoring, ShowMessage, LetterCircle } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import ListItemUserReview from '../components/ListItemUserReview';
import { Rating, AirbnbRating } from 'react-native-ratings';

import SwitchSelector from "react-native-switch-selector";
import { HF_01 } from '../common/HF';

var sortJsonArray = require('sort-json-array');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class UserReviewsScreen extends Component {
  state = { res: '', loadingUserReviews: false, type: '', userToken: '', selectedListItem: '0' };

  //#region Component operations
  UNSAFE_componentWillMount() {
    this.props.UserReviewsScreenData({ userID: this.props.userID, userToken: this.props.SwoqyUserToken });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    res = nextProps.res;

    // console.log(nextProps);

    if (nextProps.type == 'user_reviews_screen_data_success') {
      this.setState({
        userID: res.UserID,
        userNameSurname: res.UserNameSurname,
        shoppingMallName: res.ShoppingMallName,
        userPhoto: res.UserPhoto,
        userReviewCount: res.UserReviewCount,
        userReviews: res.UserReviews,
      });
    }
  }
  //#endregion


  //#region click functions

  _changeListType = (item) => {

    this.setState({
      selectedListItem: item
    })


  }
  //#endregion


  //#region render operations

  renderReviewsArea = () => {
    if (!this.props.loadingUserReviews) {
      var oObject = this.state.userReviews;
      var oFrom = '';

      if (oObject) {
        switch (this.state.selectedListItem) {
          case '0':
            oObject = sortJsonArray(oObject.filter(x => x.ReviewItemType == 0), 'ReviewDate', 'des');
            oFrom = "Brand";
            break;
          case '1':
            oObject = sortJsonArray(oObject.filter(x => x.ReviewItemType == 1), 'ReviewDate', 'des');
            oFrom = "Store";
            break;
          case '2':
            oObject = sortJsonArray(oObject.filter(x => x.ReviewItemType == 2), 'ReviewDate', 'des');
            oFrom = "ShoppingMall";
            break;
        }
      }

      const options = [];
      options.push({ label: Localizations('Global.Brand'), value: '0' })
      options.push({ label: Localizations('Global.Store'), value: '1' })
      options.push({ label: Localizations('Global.ShoppingMall'), value: '2' })
      // options.push({ label: 'Ürün', value: '3' })

      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ alignItems: 'center', }}>
            <SwitchSelector
              style={{ width: '90%', margin: 10 }}
              initial={0}
              onPress={value => this._changeListType(value)}
              textColor='#ff5a5c'
              selectedColor='#ffffff'
              buttonColor='#ff5a5c'
              borderColor='#e9ebed'
              hasPadding
              options={options}
            />
          </View>

          <FlatList
            data={oObject}
            keyExtractor={(item, index) => index.toString()}
            renderItem={info => (
              <ListItemUserReview
                review={info.item}
                from={oFrom}
              />
            )}
          />

        </View>
      )
    }
  }

  renderUserReviewArea = () => {
    if (!this.props.loadingUserReviews) {

      return (
        <View style={container.row}>
          <LetterCircle
            photo={this.state.userPhoto}
            data={this.state.userNameSurname}
            circleSize={80}
          />

          <View style={{ marginLeft: 20 }}>
            <View>
              <Text style={[textStyle.commentStyle.name, { fontSize: 20 }]}>{this.state.userNameSurname}</Text>
            </View>
            <View>
              <Text style={textStyle.reviewCountStyle.down}>({this.state.userReviewCount} {Localizations('Reviews.CommentCount')}) </Text>
            </View>
          </View>
        </View>
      )
    }
    return <Spinner size="large" />;
  }

  render() {
    if (!this.props.connectionError) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* <View style={{ height: 40 }}>
            <HF_01 title={Localizations('Global.UserReviewsScreen')} />
          </View> */}

          <ScrollView style={{ padding: 20, backgroundColor: 'white' }}>
            {this.renderUserReviewArea()}
            {this.renderReviewsArea()}
          </ScrollView>
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

const mapStateToProps = ({ userReviewsScreenResponse, startScreenResponse }) => {
  const { res, loadingUserReviews, type, userToken } = userReviewsScreenResponse;
  const { SwoqyUserToken } = startScreenResponse;

  return {
    res, loadingUserReviews, type, userToken, SwoqyUserToken
  };
}

export default connect(mapStateToProps, { UserReviewsScreenData })(UserReviewsScreen);