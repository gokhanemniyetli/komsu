import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StoreScreenData, SetStoreFavoriteData } from '../actions';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage } from '../common';
import Favorite from '../common/Favorite';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { HF_01 } from '../common/HF';


import ListItemOpportunity from '../components/ListItemOpportunity';
import BrandOpportunityList from '../components/BrandOpportunityList';
import ProductList from '../components/ProductList';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');


class StoreScreen extends Component {
    state = {
        res: '',
        loadingStore: false, loadingStoreDetail: false, loadingOpportunity: false, loadingSetStoreFavorite: false, selectedItem: '0',
        type: '', userToken: '', connectionError: false
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        this.props.StoreScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        // console.log(res);
        if (nextProps.type == 'store_screen_data_success') {
            this.setState({
                email: res.Email,
                url: res.Url,
                phone: res.Phone,
                storeID: res.StoreID,
                brandID: res.BrandID,
                shoppingMallID: res.ShoppingMallID,
                shoppingMallName: res.ShoppingMallName,
                storeName: res.StoreName,
                googleDistance: res.GoogleDistance,
                brandLogo: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + res.BrandLogo,
                shoppingMallLogo: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + res.ShoppingMallLogo,
                storeReviewScore: res.StoreReviewScore,
                storeReviewCount: res.StoreReviewCount,
                openingTime: res.OpeningTime + ' - ' + res.ClosingTime,
                distance: res.Distance,
                arrivalTime: res.ArrivalTime,
                brandOpportunities: res.BrandOpportunities,
                favorite: res.Favorite,
                address: res.Address,
                floor: res.Floor
            });
        } else if (nextProps.type == 'set_store_favorite_data_success') {
            this.setState({
                favorite: res
            });
        }
    }
    //#endregion

    //#region click functions
    _clickBrandDetail = (brandID) => {
        Actions.brandDetailScreen({ brandID: brandID });
    }

    _clickShoppingMallDetail = (ShoppingMallID) => {
        Actions.shoppingMallScreen({ shoppingMallID: ShoppingMallID });
    }

    _clickOutdoorMap = (storeID) => {
        Actions.outdoorMapScreen({ ID: storeID, OperationType: 1 });
    }

    _clickStoreDetailButton = (selectedItem) => {
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

    _clickStoreItem = (item) => {
        // if (!this.state.detailScreenLoading) {
        this.setState({
            selectedItem: item.ref.props.tabName
        });
        // }
        // else {
        //   this.setState({
        //     detailScreenLoading: false
        //   })
        // }
    }

    _clickReviews = (storeID) => {
        Actions.storeReviewsScreen({ storeID: storeID, newReview: false });
    }

    _clickNewReview = (storeID) => {
        Actions.storeReviewsScreen({ storeID: storeID, newReview: true });
    }

    _clickFloorPlan = (storeID, shoppingMallID, floor) => {
        Actions.shoppingMallScreen({ shoppingMallID: shoppingMallID, storeID: storeID, floor: floor });
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
    renderStoreItemsArea = () => {

        {/* <TouchableOpacity onPress={() => this._clickShoppingMallItem('store')}></TouchableOpacity> */ }
        if (!this.props.loadingStore) {
            return (
                <View >
                    <ScrollableTabView
                        style={{ backgroundColor: '#fafafb' }}
                        // prerenderingSiblingsNumber={0}
                        renderTabBar={() => <ScrollableTabBar />}
                        tabBarBackgroundColor='white'
                        tabBarTextStyle={{ fontSize: 15, color: '#ff5a5d' }}
                        tabBarUnderlineStyle={{ backgroundColor: '#ff5a5d' }}
                        onChangeTab={this._clickStoreItem}>

                        <BrandOpportunityList tabView={this.tabView} tabName="opportunities" tabLabel={Localizations('BrandDetail.Opportunities').toUpperCase()} opportunities={this.state.brandOpportunities} />
                        {/* <ProductList tabName="product" tabLabel={Localizations('Store.Products').toUpperCase()} shoppingMallID={this.props.shoppingMallID} /> */}
                    </ScrollableTabView>
                </View>
            )
        }
        // return <Spinner size="large" />;
    }

    renderStoreDetailButton = () => {
        return (
            <View style={{ backgroundColor: '#fafafb', height: 15, marginHorizontal: -20, }}>
                <TouchableOpacity style={container.center} onPress={() => this._clickStoreDetailButton(this.state.selectedItem)}>
                    <Image
                        style={{ resizeMode: 'stretch', tintColor: '#ff585c' }}
                        source={(this.state.selectedItem == '') ? require('../images/icons/arrow_up.png') : require('../images/icons/arrow_down.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderStoreDetailArea = () => {
        if (!this.props.loadingStoreDetail) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ marginVertical: 5 }}>
                        {this.propertyControl(this.state.address) &&
                            <View style={container.row}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/adres.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.iconStyle}>{this.state.address}</Text>
                                </View>
                            </View>
                        }

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
                            <View style={container.row}>
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

                        {this.propertyControl(this.state.openingTime) &&
                            <View style={container.row}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/calismaSaatleri.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.iconStyle}>{this.state.openingTime}</Text>
                                </View>
                            </View>
                        }
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {
                            (this.state.shoppingMallID > 0 ?
                                <View>
                                    <TouchableOpacity style={container.center} onPress={() => this._clickFloorPlan(this.state.storeID, this.state.shoppingMallID, this.state.floor)}>
                                        <View>
                                            <Image
                                                style={imageStyle.subStyle}
                                                source={require('../images/icons/katPlani.png')}
                                            />
                                        </View>
                                        <View>
                                            <Text style={textStyle.subStyle}>{Localizations('Store.FloorPlan')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                :
                                <View></View>
                            )
                        }
                        <View >
                            <TouchableOpacity style={[container.center, { marginLeft: 10 }]} onPress={() => this._clickReviews(this.state.storeID)}>
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
                            <TouchableOpacity style={[container.center, { marginLeft: 10 }]} onPress={() => this._clickNewReview(this.state.storeID)}>
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

    renderStoreArea = () => {
        if (!this.props.loadingStore) {
            return (
                <View style={[container.row.sb, { flex: 1, paddingHorizontal: 10 }]}>
                    <View >
                        <TouchableOpacity style={container.center} onPress={() => Actions.brandDetailScreen({ brandID: this.state.brandID })}>
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
                            <View>
                                <Text style={textStyle.logoStyle.xl}>{this.state.storeName}</Text>
                            </View>
                        </View>

                        {this.state.shoppingMallID != 0 ?
                            <View>
                                <TouchableOpacity onPress={() => Actions.shoppingMallScreen({ shoppingMallID: this.state.shoppingMallID })}>
                                    <Text style={[textStyle.logoStyle.md, { textDecorationLine: 'underline', textDecorationStyle: 'dotted', textDecorationColor: '#f46e4f' }]}>{this.state.shoppingMallName}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null}

                        <View >
                            <TouchableOpacity style={container.row} onPress={() => this._clickReviews(this.state.storeID)}>
                                <View style={container.row}>
                                    <Star size='sm' score={this.state.storeReviewScore} />
                                    <Text style={[textStyle.logoStyle.sm, { padding: 3, color: 'gray' }]}>({this.state.storeReviewCount})</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Favorite
                            favoriteType={1}
                            ID={this.state.storeID}
                            isFavorite={this.state.favorite}
                        />

                        <TouchableOpacity style={container.center} onPress={() => this._clickOutdoorMap(this.state.storeID)}>
                            <Image
                                style={[imageStyle.logoStyle.sm, { tintColor: '#ff585c' }]}
                                source={require('../images/icons/yolTarifi.png')}
                            />
                            {/*
                            <View style={{ alignItems: 'center', marginTop: 5 }}>
                                <Text style={[textStyle.iconStyle, { marginVertical: -1 }]}>{Localizations('Global.Navigation')}</Text>
                            </View>
			*/}
                            {this.state.googleDistance &&
                                <Text style={[textStyle.logoStyle.xs, { color: 'gray' }]}>
                                    {
                                        this.state.googleDistance.Distance < 1000
                                            ? this.state.googleDistance.Distance.toFixed(0) + " m"
                                            : (this.state.googleDistance.Distance / 1000).toFixed(1) + " km"
                                    }
                                </Text>
                            }
                        </TouchableOpacity>

                        {/* <View style={{ alignItems: 'center', marginTop: -10 }}>
                                <View>
                                    <Text style={[textStyle.iconStyle, { margin: 0, marginVertical: -1 }]}>{this.state.distance} km</Text>
                                </View>
                                <View>
                                    <Text style={[textStyle.iconStyle, { margin: 0, marginVertical: -1 }]}>{this.state.arrivalTime} dk</Text>
                                </View>
                            </View> */}
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
{/* 
                    <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.StoreScreen')} />
                    </View> */}

                    {this.renderStoreArea()}

                    <Card>
                        {this.state.selectedItem == '' ?
                            this.renderStoreDetailArea() : null
                        }

                        <View >
                            {this.renderStoreDetailButton()}
                        </View>

                        <View style={{ marginHorizontal: -20 }}>
                            {this.renderStoreItemsArea()}
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

const mapStateToProps = ({ storeScreenResponse, startScreenResponse }) => {
    const { res, loadingStore, loadingStoreDetail, loadingOpportunity, loadingSetStoreFavorite, type, userToken, connectionError } = storeScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, loadingStore, loadingStoreDetail, loadingOpportunity, loadingSetStoreFavorite, type, userToken, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { StoreScreenData, SetStoreFavoriteData })(StoreScreen);
