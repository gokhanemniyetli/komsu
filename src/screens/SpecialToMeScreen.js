import _ from 'lodash'
import React, { Component } from 'react';
import { Dimensions, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, FlatList, Linking,  Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
// import { SpecialToMeScreenData } from '../actions';
import { Card, ShowMessage, CardSection, Spinner, Star, Link, GetSessionTicket } from '../common';
import ListItemOpportunity from '../components/ListItemOpportunity';
import ListItemShoppingMall from '../components/ListItemShoppingMall';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import SpecialToMeOpportunityList from '../components/SpecialToMeOpportunityList';
import SpecialToMeActivityList from '../components/SpecialToMeActivityList';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';



const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class SpecialToMeScreen extends Component {
    state = { res: '', loadingBrand: false, type: '', userToken: '', buttonOpSM: false /* false: Opportunities, true: Stores */ };

    //#region Component operations
    UNSAFE_componentWillMount() {
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") {
            Actions.signInScreen();
        }
        else {
            // this.props.SpecialToMeScreenData({ userToken: this.props.SwoqyUserToken, latitude: '', longitude: '' });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        // res = nextProps.res;

        // if (nextProps.type == 'favorites_screen_data_success') {

        //     this.setState({

        //         stores: res.Stores,
        //         brands: res.Brands,
        //         shoppingMalls: res.ShoppingMalls,
        //         opportunities: res.Opportunities,
        //         products: res.Products,
        //     });

        // }

    }
    //#endregion

    //#region click functions


    _clickTabItem = (item) => {
        // console.log(item)
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

<SpecialToMeOpportunityList tabView={this.tabView} tabName="opportunities" tabLabel={Localizations('SpecialToMe.Opportunities')} from='favorites' />

<SpecialToMeActivityList tabView={this.tabView} tabName="activities" tabLabel={Localizations('SpecialToMe.Activities')} />
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
                    <View style={{ flex: 1 }}>
                        {/* <View style={{ height: 40 }}>
                            <HF_01 title={Localizations('Global.SpecialToMeScreen')} />
                        </View> */}
                        <ScrollView style={{ flex: 1 }}>
                            <Card>

                                <View style={{ marginHorizontal: -20, flex: 1 }}>
                                    {this.renderFavoriteItemsArea()}
                                </View>
                            </Card>
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
    }
    //#endregion
}

const mapStateToProps = ({ favoritesScreenResponse, startScreenResponse }) => {
    const { res, type, userToken } = favoritesScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, type, userToken, SwoqyUserToken
    };
}

export default connect(mapStateToProps, {})(SpecialToMeScreen);
