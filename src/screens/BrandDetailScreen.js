import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { BrandDetailScreenData, SetBrandFavoriteData } from '../actions';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket } from '../common';
import Favorite from '../common/Favorite';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { HF_01 } from '../common/HF';

import ListItemOpportunity from '../components/ListItemOpportunity';
import ListItemShoppingMall from '../components/ListItemShoppingMall';
import BrandStoreList from '../components/BrandStoreList';
import BrandOpportunityList from '../components/BrandOpportunityList';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class BrandDetailScreen extends Component {
  state = {
    res: '',
    loadingBrand: false, loadingBrandDetail: false, loadingOpportunity: false, loadingShoppingMall: false, loadingSetBrandFavorite: false, selectedItem: '0',
    type: '', userToken: '', buttonOpSM: false /* false: Opportunities, true: Stores */
  };

  //#region Component operations
  UNSAFE_componentWillMount() {

    this.props.BrandDetailScreenData({ brandID: this.props.brandID, userToken: this.props.SwoqyUserToken });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    res = nextProps.res;

    if (nextProps.type == 'brand_detail_screen_data_success') {
      this.setState({
        brandID: res.BrandID,
        brandName: res.BrandName,
        brandLogo: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + res.BrandLogo,
        phone: res.Phone,
        email: res.Email,
        url: res.Url,
        brandReviewScore: res.BrandReviewScore,
        brandReviewCount: res.BrandReviewCount,
        brandOpportunities: res.BrandOpportunities,
        brandStores: res.BrandStores,
        favorite: res.Favorite,
        registered: res.Registered,
        userID: res.UserID
      });
      // } else if (nextProps.type == 'brand_detail_screen_data') {
      //   console.log(nextProps);
      //   this.setState({
      //     brandOpportunities: res.BrandOpportunities
      //   });
    } else if (nextProps.type == 'set_brand_favorite_data_success') {
      this.setState({
        favorite: res
      });
    }
  }
  //#endregion

  //#region click functions
  _clickReviews = (brandID) => {
    Actions.brandReviewsScreen({ brandID: brandID, newReview: false });
  }

  _clickNewReview = (brandID) => {
    Actions.brandReviewsScreen({ brandID: brandID, newReview: true });
  }

  _clickBrandItem = (item) => {
    if (!this.state.detailScreenLoading) {
      this.setState({
        selectedItem: item.ref.props.tabName
      });
    }
    else {
      this.setState({
        detailScreenLoading: false
      })
    }
  }

  _clickBrandDetail = () => {
    this.setState({
      selectedItem: ''
    });
  }
  _clickBrandDetailButton = (selectedItem) => {
    if (selectedItem == '') {
      this.setState({
        selectedItem: '0'
      });
    } else {
      this.setState({
        selectedItem: ''
      });
    }
  }
  //#endregion


  propertyControl(item) {
    var result = false;
    if (item !== '' && item !== null && item !== undefined) {
      result = true;
    }
    return result;
  }

  //#region render operations
  renderBrandItemsArea = () => {
    if (!this.props.loadingOpportunity) {
      return (

        <ScrollableTabView
          style={{ backgroundColor: '#fafafb', height: Dimensions.get('window').height - 200 }}
          // prerenderingSiblingsNumber={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarBackgroundColor='white'
          tabBarTextStyle={{ fontSize: 15, color: '#ff5a5d' }}
          tabBarUnderlineStyle={{ backgroundColor: '#ff5a5d' }}
          ref={(tabView) => { this.tabView = tabView }}
          onChangeTab={this._clickBrandItem}>

          <BrandOpportunityList tabView={this.tabView} tabName="opportunities" tabLabel={Localizations('BrandDetail.Opportunities').toUpperCase()} opportunities={this.state.brandOpportunities} />
          <BrandStoreList tabView={this.tabView} tabName="store" tabLabel={Localizations('BrandDetail.Stores').toUpperCase()} stores={this.state.brandStores} brandLogo={this.state.brandLogo} />
          {/* <StoreList tabView={this.tabView} tabName="products" tabLabel="ÜRÜNLER" brandID={this.props.brandID} /> */}
        </ScrollableTabView>
      )
    }
  }

  renderBrandDetailButton = () => {
    return (
      <View style={{ backgroundColor: '#fafafb', height: 15, marginHorizontal: -20, }}>
        <TouchableOpacity style={container.center} onPress={() => this._clickBrandDetailButton(this.state.selectedItem)}>
          <Image
            style={{ resizeMode: 'stretch', tintColor: '#ff585c' }}
            source={(this.state.selectedItem == '') ? require('../images/icons/arrow_up.png') : require('../images/icons/arrow_down.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderBrandDetailArea = () => {

    if (!this.props.loadingBrandDetail) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 5 }}>

            {this.propertyControl(this.state.phone) &&
              <View style={container.row}>
                <View>
                  <Image
                    style={imageStyle.iconStyle}
                    source={require('../images/icons/telefon.png')}
                  />
                </View>
                <View>
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${this.state.phone}`)}>
                    <Text style={textStyle.iconStyle}>{this.state.phone}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }

            {this.propertyControl(this.state.url) &&
              <View style={container.row}>
                <View>
                  <Image
                    style={imageStyle.iconStyle}
                    source={require('../images/icons/websitesi.png')}
                  />
                </View>
                <View>
                  <TouchableOpacity onPress={() => Linking.openURL(this.state.url)}>
                    <Text style={textStyle.iconStyle}>{this.state.url}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }

            {this.propertyControl(this.state.email) &&
              < View style={container.row}>
                <View>
                  <Image
                    style={imageStyle.iconStyle}
                    source={require('../images/icons/email.png')}
                  />
                </View>
                <View>
                  <TouchableOpacity onPress={() => Linking.openURL('mailto:' + this.state.email)}>
                    <Text style={textStyle.iconStyle}>{this.state.email}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View >
              <TouchableOpacity style={container.center} onPress={() => this._clickReviews(this.state.brandID)}>
                <View>
                  <Image
                    style={imageStyle.subStyle}
                    source={require('../images/icons/yorumlar.png')}
                  />
                </View>
                <View>
                  <Text style={textStyle.subStyle}>{Localizations('Store.Reviews')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={[container.center, { marginLeft: 10 }]} onPress={() => this._clickNewReview(this.state.brandID)}>
                <View>
                  <Image
                    style={imageStyle.subStyle}
                    source={require('../images/icons/yorumYaz.png')}
                  />
                </View>
                <View>
                  <Text style={textStyle.subStyle}>{Localizations('Store.WriteReview')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      )
    }
    return <Spinner size="large" />;

  }

  renderBrandArea = () => {

    if (!this.props.loadingBrand) {
      return (
        <View style={[container.row.sb, { flex: 1, paddingHorizontal: 20 }]} >
          <View >
            <TouchableOpacity style={container.center} onPress={() => this._clickBrandDetail()}>
              <Image
                style={imageStyle.logoStyle.xl}
                source={{
                  uri:
                    this.state.brandLogo,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <View style={container.row}>
              <TouchableOpacity style={container.row} onPress={() => this.state.userID != null && Actions.userProfileScreen({ ID: this.state.userID })}>
                <Text style={textStyle.logoStyle.xl}>{this.state.brandName}</Text>
                {
                  this.state.registered &&
                  <Image
                    style={imageStyle.registeredStyle}
                    source={require('../images/icons/registered.png')}
                  />
                }
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={container.row} onPress={() => this._clickReviews(this.state.brandID)}>
                <Star score={this.state.brandReviewScore} />

                <View>
                  <Text style={textStyle.reviewCountStyle.md}>
                    ({this.state.brandReviewCount})
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Favorite
              favoriteType={2}
              ID={this.state.brandID}
              isFavorite={this.state.favorite}
            />
          </View>
        </View>
      )
    }
    return <Spinner size="large" />;
  }

  render() {
    /// Server kaynaklı sorun olduğunda görüntülenecek.
    if (!this.props.connectionError) {
      return (
        <ScrollView
          scrollEnabled={false}
          style={{ flex: 1, backgroundColor: 'white' }}>
          {/* <View style={{ height: 40 }}>
            <HF_01 title={Localizations('Global.BrandDetailScreen')} />
          </View> */}
          {this.renderBrandArea()}

          <Card>
            {this.state.selectedItem == '' ?
              this.renderBrandDetailArea() : null
            }

            <View >
              {this.renderBrandDetailButton()}
            </View>

            <View style={{ marginHorizontal: -20, }}>
              {this.renderBrandItemsArea()}
            </View>
          </Card>
        </ScrollView>
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

const mapStateToProps = ({ brandDetailScreenResponse, startScreenResponse }) => {
  const { res, loadingBrand, loadingBrandDetail, loadingOpportunity, loadingShoppingMall, loadingSetBrandFavorite, type, userToken } = brandDetailScreenResponse;
  const { SwoqyUserToken } = startScreenResponse;
  return {
    res, loadingBrand, loadingBrandDetail, loadingOpportunity, loadingShoppingMall, loadingSetBrandFavorite, type, userToken, SwoqyUserToken
  };
}

export default connect(mapStateToProps, { BrandDetailScreenData, SetBrandFavoriteData })(BrandDetailScreen);
