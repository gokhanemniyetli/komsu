import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Star } from '../common';

var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');



const ListItemFavoriteShoppingMall = (props) => {
    _clickItem = () => {
        Actions.shoppingMallScreen({ shoppingMallID: props.shoppingMalls.ShoppingMallID });
    }
    return (

        <CardSection>
            <TouchableOpacity style={container.center} onPress={this._clickItem.bind(this)} >
                <View style={container.row}>
                    <View>
                        {props.shoppingMalls.ShoppingMallLogo != null ?
                            <Image style={imageStyle.logoStyle.lg}
                                source={{ uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO + '/' + props.shoppingMalls.ShoppingMallLogo }}
                            />
                            : <Text style={{ width: 80, height: 80 }}></Text>
                        }
                    </View>

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <View style={container.row}>
                            <Text style={textStyle.logoStyle.sm}>{props.shoppingMalls.ShoppingMallName}</Text>
                            {
                                props.shoppingMalls.Registered &&
                                <Image
                                    style={imageStyle.registeredTinyStyle}
                                    source={require('../images/icons/registered.png')}
                                />
                            }
                        </View>
                        <Star size='sm' score={props.shoppingMalls.ShoppingMallReviewScore} />
                    </View>
                    <View>
                        <Text style={textStyle.reviewCountStyle.sm}>({props.shoppingMalls.ShoppingMallReviewCount})</Text>
                    </View>
                </View>
            </TouchableOpacity>

        </CardSection>
    )
}

export default ListItemFavoriteShoppingMall;
