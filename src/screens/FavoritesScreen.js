import _ from 'lodash'
import React, { Component } from 'react';
import { Dimensions, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, FlatList, Linking,  Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { FavoritesScreenData } from '../actions';
import { Card, ShowMessage, CardSection, Spinner, Star, Link, GetSessionTicket } from '../common';
import ListItemOpportunity from '../components/ListItemOpportunity';
import ListItemShoppingMall from '../components/ListItemShoppingMall';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import BrandStoreList from '../components/BrandStoreList';
import FavoriteBrandList from '../components/FavoriteBrandList';
import BrandOpportunityList from '../components/BrandOpportunityList';
import FavoriteShoppingMallList from '../components/FavoriteShoppingMallList';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';


const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class FavoritesScreen extends Component {
    state = { res: '', loadingBrand: false, loadingFavorites: false, type: '', userToken: '', buttonOpSM: false /* false: Opportunities, true: Stores */ };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") {
            Actions.signInScreen();
        }
        else {
            this.props.FavoritesScreenData({ userToken: this.props.SwoqyUserToken, latitude: '', longitude: '' });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
// console.log("Burası Favoriler");
// console.log(nextProps);
// console.log(this.props);
        res = nextProps.res;

        if (nextProps.type == 'favorites_screen_data_success') {

            this.setState({

                stores: res.Stores,
                brands: res.Brands,
                shoppingMalls: res.ShoppingMalls,
                opportunities: res.Opportunities,
                products: res.Products,
            });

        }

    }
    //#endregion

    //#region click functions


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
    //#endregion


    //#region render operations
    renderFavoriteItemsArea = () => {

        return (
            <View style={{ height: Dimensions.get('window').height-100 }}>

                <ScrollableTabView
                    style={{ backgroundColor: '#fafafb', }}
                    // prerenderingSiblingsNumber={0}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarBackgroundColor='white'
                    tabBarTextStyle={{ fontSize: 15, color: '#ff5a5d' }}
                    tabBarUnderlineStyle={{ backgroundColor: '#ff5a5d' }}
                    ref={(tabView) => { this.tabView = tabView }}
                    onChangeTab={this._clickBrandItem}>

                    <BrandStoreList tabView={this.tabView} tabName="store" tabLabel={Localizations('Favorites.Stores')} from='favorites' stores={this.state.stores} />
                    <FavoriteBrandList tabView={this.tabView} tabName="brand" tabLabel={Localizations('Favorites.Brands')}  from='favorites' brands={this.state.brands} />
                    <FavoriteShoppingMallList tabView={this.tabView} tabName="shoppingMall" tabLabel={Localizations('Favorites.ShoppingMalls')} shoppingMalls={this.state.shoppingMalls} />
                    <BrandOpportunityList tabView={this.tabView} tabName="opportunities" tabLabel={Localizations('Favorites.Opportunities')} from='favorites' opportunities={this.state.opportunities} />
                    {/* <Products tabView={this.tabView} tabName="products" tabLabel={Localizations('Favorites.Produts').toUpperCase()} products={this.state.products} /> */}
                </ScrollableTabView>
            </View>
        )

    }

    render() {
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") {
            return (
                <ShowMessage backgroundStyle="bgStyle"
                    textStyle="txtStyle" text={Localizations('Global.RequireUserLoginAlertMessage')}
                />
            );
            Actions.signInScreen();
        } else {
            /// Server kaynaklı sorun olduğunda görüntülenecek.
            if (!this.props.connectionError) {
                return (
                    <ScrollView 
                scrollEnabled={false}>
                        {/* <View style={{ height: 40 }}>
                            <HF_01 title={Localizations('Global.FavoritesScreen')} />
                        </View> */}
                        {/* <ScrollView style={{  flex: 1 }}> */}
                            <Card>

                                <View style={{ marginHorizontal: -20, flex: 1 }}>
                                    {this.renderFavoriteItemsArea()}
                                </View>
                            </Card>
                        {/* </ScrollView> */}
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
    }
    //#endregion
}

const mapStateToProps = ({ favoritesScreenResponse, startScreenResponse }) => {
    const { res, loadingFavorites, type, userToken } = favoritesScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, loadingFavorites, type, userToken, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { FavoritesScreenData })(FavoritesScreen);
