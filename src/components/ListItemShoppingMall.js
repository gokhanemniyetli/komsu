import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

const GLOBAL = require('../common/Globals');

const ListItemShoppingMall = (props) => {

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        res = nextProps.res;

        this.setState({
            shoppingMallID: res.ShoppingMallID,
            shoppingMallName: res.ShoppingMallName,
            shoppingMallLogo: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.OPPORTUNITY + '/' + res.ShoppingMallLogo,
            shoppingMallRewiewScore: res.ShoppingMallReviewScore,
            shoppingMallLReviewCount: res.ShoppingMallReviewCount,
            distance: res.GoogleDistance.Distance,
            arrivalTime: res.GoogleDistance.ArrivalTime,
        });
    }


    renderStars = (score) => {
        var fillStar = 0;
        var halfStar = 0;
        var emptyStar = 0;
        var halfCount = 0;

        halfCount = parseInt(score / 0.5);

        fillStar = parseInt(halfCount / 2);
        halfStar = halfCount - (fillStar * 2);
        emptyStar = 5 - fillStar - halfStar;

        var payments = [];

        for (let i = 0; i < fillStar; i++) {
            payments.push(<Image style={{ width: 20, height: 20, margin: 1 }} source={require('../images/icons/fillStar.png')} />)
        }

        for (let i = 0; i < halfStar; i++) {
            payments.push(<Image style={{ width: 20, height: 20, margin: 1 }} source={require('../images/icons/halfStar.png')} />)
        }

        for (let i = 0; i < emptyStar; i++) {
            payments.push(<Image style={{ width: 20, height: 20, margin: 1 }} source={require('../images/icons/emptyStar.png')} />)
        }

        return (
            <View style={{ flexDirection: 'row' }}>
                {payments}
            </View>
        )
    }

    _clickItemDetail = () => {
        Actions.shoppingMallScreen({ shoppingMallID: props.shoppingMall.shoppingMallID });
    }

    const { subcontainer_row, centerStyle, maintextStyle, textStyle } = styles;

    return (

        <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress={this._clickItemDetail.bind(this)}>
                <View style={{
                    flexDirection: 'row', alignItems: 'space-between',
                }} >
                    <View styles={{alignSelf: 'flex-start',}}>
                        <Image
                            style={{
                                height: 100,
                                borderRadius: 50,
                                width: 100
                            }}
                            source={{
                                uri:
                                    props.shoppingMall.ShoppingMallLogo,
                            }}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={maintextStyle}>{props.shoppingMall.ShoppingMallName} - {props.shoppingMall.BrandName}</Text>
                        </View>
                        <View style={subcontainer_row}>

                            {this.renderStars(props.shoppingMall.ShoppingMallReviewScore)}

                            <View>
                                <Text style={{ marginLeft: 5, fontSize: 18 }}>
                                    ({props.shoppingMall.ShoppingMallReviewCount})
                                    </Text>
                            </View>
                        </View>
                        <View style={subcontainer_row}>
                            <Text style={textStyle}>{props.shoppingMall.GoogleDistance} - {props.shoppingMall.GoogleDistance}</Text>
                        </View>
                    </View>

                    <View style={{alignSelf:'flex-end'}}>
                        <TouchableOpacity style={centerStyle} onPress={() => this._clickOutdoorMap(props.shoppingMall.ShoppingMallID)}>
                            <View>
                                {/* <Image
                                    style={{ height: 50, width: 50, tintColor: 'red' }}
                                    source={require('../images/icons/direction2_512.png')}
                                /> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ListItemShoppingMall;

const styles = {
    subcontainer_row: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    centerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    maintextStyle: {
        margin: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textStyle: {
        alignItems: 'center',
        fontSize: 14,
    },
    brandimageStyle: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    imageStyle: {
        width: 20,
        height: 20,
        margin: 5,
        resizeMode: 'contain',
    },
    subimageStyle: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        tintColor: 'red',
    },
    style_ShoppingMalls: {
        borderBottomWidth: 0
    },
    style_Opportunities: {
        borderColor: 'red',
        borderBottomWidth: 5
    }
};