import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    Image,
    Platform,
    Button,
    ScrollView
} from 'react-native';
import MapView, {
    Marker,
    Callout,
    CalloutSubview,
    ProviderPropType,
} from 'react-native-maps';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MapScreenData, SetShoppingMallFavoriteData, ShoppingMallActivityList } from '../actions';

import { Card, Spinner, Star, Link, GetSessionTicket, ShowMessage, } from '../common';
import CustomCallout from './CustomCallout';

import { Popup, showLocation } from 'react-native-map-link'
import { Localizations, FormatDate } from '../../locales/i18n';

import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';


const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');

import Geolocation from '@react-native-community/geolocation';

// get location data ---------------------
var lat = 0.0;
var long = 0.0;
// return new Promise(
//     (resolve, reject) => Geolocation.getCurrentPosition(resolve, reject)
//   )
// --------------------------



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 40.952663;
const LONGITUDE = 29.121791;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


const MarkerLogo = (props) => {
    return (
        <Image
            style={imageStyle.logoStyle.lg}
            source={{ uri: props.uri }}
        />
    )
}


const MarkerDirectionLogo = (props) => {
    return (
        <Image
            style={[imageStyle.logoStyle.sm, { marginBottom: -5, tintColor: '#ff585c' }]}
            source={require('../images/icons/yolTarifi.png')}
        />
    )
}


class OutdoorMapScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            navigationOptions: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                title: "",
                dialogTitle: Localizations('Outdoor.GetDirections'),
                dialogMessage: Localizations('Outdoor.SelectApp'),
                cancelText: Localizations('Outdoor.Cancel'),
            },
            cnt: 0,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markers: [],
            itemType: 0,
            focusedLocation: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * LATITUDE_DELTA
            }
        };
    }

    onPressZoomIn() {
        this.region = {
            latitude: this.state.focusedLocation.latitude,
            longitude: this.state.focusedLocation.longitude,
            latitudeDelta: this.state.focusedLocation.latitudeDelta * 10,
            longitudeDelta: this.state.focusedLocation.longitudeDelta * 10
        }

        this.setState({
            focusedLocation: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })
        this.map.animateToRegion(this.region, 100);
    }

    onPressZoomOut() {
        this.region = {
            latitude: this.state.focusedLocation.latitude,
            longitude: this.state.focusedLocation.longitude,
            latitudeDelta: this.state.focusedLocation.latitudeDelta / 10,
            longitudeDelta: this.state.focusedLocation.longitudeDelta / 10
        }
        this.setState({
            focusedLocation: {
                latitudeDelta: this.region.latitudeDelta,
                longitudeDelta: this.region.longitudeDelta,
                latitude: this.region.latitude,
                longitude: this.region.longitude
            }
        })
        this.map.animateToRegion(this.region, 100);
    }




    // onRegionChange(region, lastLat, lastLong) {
    //     this.region = {
    //         latitudeDelta: region.latitudeDelta,
    //         longitudeDelta: region.longitudeDelta,
    //         latitude: region.latitude, //|| region.latitude,
    //         longitude: region.longitude// || region.longitude
    //     }
    //     this.setState({
    //         focusedLocation: {
    //             latitudeDelta: this.region.latitudeDelta,
    //             longitudeDelta: this.region.longitudeDelta,
    //             latitude: this.region.latitude,
    //             longitude: this.region.longitude
    //         }
    //     })
    //     this.map.animateToRegion(this.region, 100);
    // }
    // }



    UNSAFE_componentWillMount()  {
        //debugger
        this.props.MapScreenData({ ID: this.props.ID, OperationType: this.props.OperationType, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        if (nextProps.type == 'map_screen_data_success') {

            this.setState({
                markers: res.MapListItems.filter(x => x.Latitude != null && x.Longitude != null),
                itemType: res.ItemType,
            });

            res.MapListItems.map((m, index) => {

                if (m.Selected == true) {
                    // console.log(m);
                    this.setState({
                        region: {
                            latitude: m.Latitude,
                            longitude: m.Longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        }
                    })

                }

            });
        }

    }

    componentDidUpdate() {

    }

    openNavigation(data) {
        this.setState({
            isVisible: true,
            navigationOptions: {
                latitude: data.latitude,
                longitude: data.longitude,
                title: data.name,
                dialogTitle: Localizations('Outdoor.GetDirections'),
                dialogMessage: Localizations('Outdoor.SelectApp'),
                cancelText: Localizations('Outdoor.Cancel'),
            }
        })
    }

    show() {
        this.selectedMarker.showCallout();
    }

    hide() {
        this.selectedMarker.hideCallout();
    }

    render() {

        const { region, markers } = this.state;
        //console.log(this.state.region);
        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.OutdoorMapScreen')} />
                </View> */}
                <View style={{ flex: 1 }}>
                    <Popup
                        isVisible={this.state.isVisible}
                        onCancelPressed={() => this.setState({ isVisible: false })}
                        onAppPressed={() => this.setState({ isVisible: false })}
                        onBackButtonPressed={() => this.setState({ isVisible: false })}
                        options={this.state.navigationOptions}
                    />
                    <MapView
                        provider={this.props.provider}
                        style={styles.map}
                        initialRegion={region}
                        showsUserLocation={true}
                        followsUserLocation={this.props.ID == 0 ? true : false}
                        region={region}
                        //region={this.state.focusedLocation}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                        //onRegionChangeComplete={this.onRegionChange.bind(this)}
                        zoomEnabled={true}
                    >
                        {
                            markers.map((markerItem, index) => {

                                return (
                                    <Marker
                                        key={index}
                                        coordinate={
                                            {
                                                latitude: markerItem.Latitude,
                                                longitude: markerItem.Longitude,
                                            }
                                        }
                                        calloutOffset={{ x: -8, y: 18 }}
                                        calloutAnchor={{ x: 0.5, y: 0.4 }}
                                        ref={ref => {
                                            this.selectedMarker = ref;
                                        }}
                                    >

                                        {
                                            markerItem.Selected == true || Platform.OS === "ios" ?
                                                <Image source={{
                                                    uri: this.state.itemType == 0 ?
                                                        GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + markerItem.Logo
                                                        :
                                                        GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + markerItem.Logo
                                                }}
                                                    style={{
                                                        height: 50, width: 50, backgroundColor: 'white', resizeMode: 'contain',
                                                        borderWidth: 1,
                                                        borderRadius: 2,
                                                        borderColor: markerItem.Selected == true ? 'red' : '#ddd',
                                                        borderBottomWidth: 0,
                                                        shadowColor: '#000',
                                                        shadowOffset: { width: 2, height: 2 },
                                                        shadowOpacity: 0.8,
                                                        shadowRadius: 2,
                                                    }} />
                                                :
                                                null
                                        }


                                        <Callout
                                            alphaHitTest
                                            tooltip={false}
                                            style={styles.customView}
                                            onPress={() =>
                                                Platform.OS != "ios" ?
                                                    this.openNavigation({
                                                        latitude: markerItem.Latitude,
                                                        longitude: markerItem.Longitude,
                                                        name: markerItem.Name
                                                    })
                                                    :
                                                    null
                                            }
                                        >

                                            <View>
                                                <TouchableOpacity onPress={() =>
                                                    this.state.itemType == 0 ?
                                                        Actions.shoppingMallScreen({ shoppingMallID: markerItem.ID })
                                                        :
                                                        Actions.storeScreen({ storeID: markerItem.ID })
                                                }>
                                                    <View style={{ flexDirection: 'row', }}>

                                                        {
                                                            Platform.OS === "ios" &&
                                                            <View style={{ width: 70, marginLeft: 5, marginTop: 5, marginBottom: 5, alignSelf: 'flex-start', }}>
                                                                <MarkerLogo uri={
                                                                    this.state.itemType == 0 ?
                                                                        GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + markerItem.Logo
                                                                        :
                                                                        GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + markerItem.Logo
                                                                }
                                                                />
                                                            </View>
                                                        }

                                                        <View
                                                            style={{ width: Platform.OS === "ios" ? 130 : 200, marginTop: 5, marginBottom: 5, marginRight: 5 }}>
                                                            <View>
                                                                <Text >{markerItem.Name}</Text>
                                                            </View>
                                                            {Platform.OS === "ios" &&
                                                                <View style={container.row}>
                                                                    <Star score={markerItem.ReviewScore} size='xs' />
                                                                    <View>
                                                                        <Text style={textStyle.reviewCountStyle.md}>({markerItem.ReviewCount})</Text>
                                                                    </View>
                                                                </View>
                                                            }
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>

                                                {
                                                    Platform.OS === "ios" ?
                                                        <TouchableOpacity onPress={() => this.openNavigation({
                                                            latitude: markerItem.Latitude,
                                                            longitude: markerItem.Longitude,
                                                            name: markerItem.Name
                                                        })} >

                                                            <View style={{ alignContent: 'center', alignSelf: 'center', alignContent: 'center', }}>
                                                                <MarkerDirectionLogo />
                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        <View style={styles.goButtonStyle}>
                                                            <Text style={styles.goButtonTextStyle}>{Localizations('Outdoor.Go')}</Text>
                                                        </View>
                                                }
                                            </View>


                                        </Callout>
                                    </Marker>
                                );
                            })
                        }
                    </MapView>

                </View>
            </View>
        );
    }
}

OutdoorMapScreen.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    customView: {
        width: 200,
    },
    plainView: {
        width: 140,
        backgroundColor: 'green'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    calloutButton: {
        width: 'auto',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    }, 
    goButtonTextStyle: {
            alignSelf: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: '600', 
            margin: 5
        },
        goButtonStyle: {
            alignSelf: 'center',
            backgroundColor: '#ff585c',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'lightgray',
            width:100 
        } 

});




const mapStateToProps = ({ mapScreenResponse, startScreenResponse }) => {
    const { res, loadingMap, type, userToken, connectionError } = mapScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, loadingMap, type, userToken, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { MapScreenData })(OutdoorMapScreen);
