import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ShoppingMallScreenData, SetShoppingMallFavoriteData, ShoppingMallActivityList } from '../actions';
import { Card, Spinner, Star, Link, GetSessionTicket, ShowMessage } from '../common';
import Favorite from '../common/Favorite';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_01 } from '../common/HF';

import ListItemOpportunity from '../components/ListItemOpportunity';
import StoreList from '../components/StoreList';
import ActivityList from '../components/ActivityList';
import ServiceList from '../components/ServiceList';
import FloorPlanList from '../components/FloorPlanList';
import PhotoList from '../components/PhotoList';
import OpportunityList from '../components/OpportunityList';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ShoppingMallScreen extends Component {
    state = {
        res: '',
        loadingShoppingMall: false, loadingOpportunity: false, loadingSetShoppingMallFavorite: false, detailScreenLoading: true,
        type: '', userToken: '', connectionError: false,
        selectedItem: '0', selectedStoreCategory: ''
    };

    //#region Component operations
    UNSAFE_componentWillMount() {

        this.setState({
            floor: '',
            storeID: 0
        })

        if (this.props.storeID) {
            this.setState({
                floor: this.props.floor,
                storeID: this.props.storeID
            })
        }

        this.props.ShoppingMallScreenData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        if (nextProps.type == 'shoppingmall_screen_data_success') {
            this.setState({
                email: res.Email,
                url: res.Url,
                phone: res.Phone,
                address: res.Address,
                openningTime: res.OpeningTime,
                parkingInformation: res.ParkingInformation,
                storeCount: res.StoreCount,
                shoppingMallType: res.ShoppingMallType,
                shoppingMallID: res.ShoppingMallID,
                shoppingMallName: res.ShoppingMallName,
                googleDistance: res.GoogleDistance,
                shoppingMallLogo: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + res.ShoppingMallLogo,
                shoppingMallReviewScore: res.ShoppingMallReviewScore,
                shoppingMallReviewCount: res.ShoppingMallReviewCount,
                distance: res.Distance,
                arrivalTime: res.ArrivalTime,
                brandOpportunities: res.BrandOpportunities,
                favorite: res.Favorite,
                registered: res.Registered,
                userID: res.UserID
            });
        } else if (nextProps.type == 'set_shoppingmall_favorite_data_success') {
            this.setState({
                favorite: res
            });
        }

    }
    //#endregion

    //#region click functions

    _clickOutdoorMap = (shoppingMallID) => {
        Actions.outdoorMapScreen({ ID: shoppingMallID, OperationType: 0 });
    }

    _clickReviews = (shoppingMallID) => {

        Actions.shoppingMallReviewsScreen({ shoppingMallID: shoppingMallID, newReview: false });

    }

    _clickNewReview = (shoppingMallID) => {
        Actions.shoppingMallReviewsScreen({ shoppingMallID: shoppingMallID, newReview: true });
    }

    _clickFloorPlan = (shoppingMallID) => {
        //Actions.shoppingMallFloorPlanScreen({ ShoppingMallID: shoppingMallID });
    }

    _clickShoppingMallDetail = () => {
        this.setState({
            selectedItem: ''
        });
    }

    _clickShoppingMallDetailButton = (selectedItem) => {
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

    _clickShoppingMallItem = (item) => {
        this.setState({
            selectedItem: item.ref.props.tabName
        });
    }

    propertyControl(item) {
        var result = false;
        if (item !== '' && item !== null && item !== undefined) {
            result = true;
        }
        return result;
    }

    //#endregion

    //#region render operations

    // ShoppingMall /mağazalar / etkinlikler / .....
    renderShoppingMallItemsArea = () => {
        return (
            <ScrollableTabView
                style={{ backgroundColor: '#fafafb', height: Dimensions.get('window').height - 200 }}
                // prerenderingSiblingsNumber={0}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarBackgroundColor='white'
                tabBarTextStyle={{ fontSize: 15, color: '#ff5a5d' }}
                tabBarUnderlineStyle={{ backgroundColor: '#ff5a5d' }}
                initialPage={(this.state.storeID != 0 ? 3 : 0)}
                onChangeTab={this._clickShoppingMallItem}>

                <OpportunityList tabName="opportunities" tabLabel={Localizations('ShoppingMall.Opportunities')} shoppingMallID={this.props.shoppingMallID} />
                <StoreList tabName="store" tabLabel={Localizations('ShoppingMall.Stores')} shoppingMallID={this.props.shoppingMallID} />
                <ActivityList tabName="activity" tabLabel={Localizations('ShoppingMall.Activities')} shoppingMallID={this.props.shoppingMallID} />
                <FloorPlanList tabName="floorPlan" tabLabel={Localizations('ShoppingMall.FloorPlan')} shoppingMallID={this.props.shoppingMallID} storeID={this.state.storeID} floor={this.state.floor} />
                <PhotoList tabName="photos" tabLabel={Localizations('ShoppingMall.Photos')} shoppingMallID={this.props.shoppingMallID} />
                <ServiceList tabName="services" tabLabel={Localizations('ShoppingMall.Services')} shoppingMallID={this.props.shoppingMallID} />
            </ScrollableTabView>
        )
    }

    renderShoppingMallDetailButton = () => {
        return (
            <View style={{ backgroundColor: '#fafafb', height: 15, marginHorizontal: -20, }}>
                <TouchableOpacity style={container.center} onPress={() => this._clickShoppingMallDetailButton(this.state.selectedItem)}>
                    <Image
                        style={{ resizeMode: 'stretch', tintColor: '#ff585c' }}
                        source={(this.state.selectedItem == '') ? require('../images/icons/arrow_up.png') : require('../images/icons/arrow_down.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    // ShoppingMall detaylı tanıtımı
    renderShoppingMallDetailArea = () => {
        if (!this.props.loadingShoppingMall) {
            // debugger
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

                        {this.propertyControl(this.state.oppeningTime) &&
                            <View style={container.row}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/calismaSaatleri.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.iconStyle}>{this.state.oppeningTime}</Text>
                                </View>
                            </View>
                        }

                        {this.propertyControl(this.state.parkingInformation) &&
                            <View style={container.row}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/park.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.iconStyle}>{this.state.parkingInformation}</Text>
                                </View>
                            </View>
                        }

                        {this.propertyControl(this.state.storeCount) &&
                            <View style={container.row}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/store_black.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.iconStyle}>{this.state.storeCount + " " + Localizations('ShoppingMall.StoreCount')}</Text>
                                </View>
                            </View>
                        }

                        {this.propertyControl(this.state.shoppingMallType) &&
                            <View style={container.row}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyle}
                                        source={require('../images/icons/shopping_mall_black.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.iconStyle}>{this.state.shoppingMallType}</Text>
                                </View>
                            </View>
                        }
                    </View>

                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, right: 0, }}>
                        <View >
                            <TouchableOpacity style={container.center} onPress={() => this._clickReviews(this.state.shoppingMallID)}>
                                <Image
                                    style={imageStyle.subStyle}
                                    source={require('../images/icons/yorumlar.png')}
                                />
                                <Text style={textStyle.subStyle}>{Localizations('ShoppingMall.Reviews')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={[container.center, { marginLeft: 10 }]} onPress={() => this._clickNewReview(this.state.shoppingMallID)}>
                                <Image
                                    style={imageStyle.subStyle}
                                    source={require('../images/icons/yorumYaz.png')}
                                />
                                <Text style={textStyle.subStyle}>{Localizations('ShoppingMall.WriteReview')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    // ShoppingMall kısa tanıtımı
    renderShoppingMallArea = () => {
        if (!this.props.loadingShoppingMall) {
            return (
                <View style={[container.row.sb, { flex: 1, paddingHorizontal: 10 }]} >
                    <View>
                        <TouchableOpacity style={container.center} onPress={() => this._clickShoppingMallDetail(this.state.shoppingMallID)}>
                            <Image
                                style={imageStyle.logoStyle.xl}
                                source={{
                                    uri:
                                        this.state.shoppingMallLogo,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <View style={container.row}>
                            <TouchableOpacity style={container.row} onPress={() => this.state.userID != null && Actions.userProfileScreen({ ID: this.state.userID })}>
                                <Text style={textStyle.logoStyle.xl}>{this.state.shoppingMallName}</Text>
                                {
                                    this.state.registered &&
                                    <Image
                                        style={imageStyle.registeredStyle}
                                        source={require('../images/icons/registered.png')}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={container.row} onPress={() => this._clickReviews(this.state.shoppingMallID)}>
                            <View style={container.row}>
                                <Star score={this.state.shoppingMallReviewScore} />
                                <Text style={textStyle.reviewCountStyle.md}>({this.state.shoppingMallReviewCount})</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Favorite
                            favoriteType={3}
                            ID={this.state.shoppingMallID}
                            isFavorite={this.state.favorite}
                        />

                        <TouchableOpacity style={container.center} onPress={() => this._clickOutdoorMap(this.state.shoppingMallID)}>
                            <Image
                                style={[imageStyle.logoStyle.sm, { tintColor: '#ff585c' }]}
                                source={require('../images/icons/yolTarifi.png')}
                            />

                            {/* <View style={{ alignItems: 'center', marginTop: 5 }}>
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
                        {/* <View style={{ height: 40 }}>
                                        <HF_01 title={Localizations('Global.ShoppingMallScreen')} />
                                    </View> */}

                    {this.renderShoppingMallArea()}

                    <Card>
                        {this.state.selectedItem == '' ?
                            this.renderShoppingMallDetailArea() : null
                        }

                        <View >
                            {this.renderShoppingMallDetailButton()}
                        </View>

                        <View style={{ marginHorizontal: -20, }}>
                            {this.renderShoppingMallItemsArea()}
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

const mapStateToProps = ({ shoppingMallScreenResponse, startScreenResponse }) => {
    const { res, loadingShoppingMall, loadingOpportunity, type, userToken, connectionError, loadingSetShoppingMallFavorite } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, loadingShoppingMall, loadingOpportunity, type, userToken, connectionError, loadingSetShoppingMallFavorite, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { ShoppingMallScreenData, SetShoppingMallFavoriteData, ShoppingMallActivityList })(ShoppingMallScreen);
