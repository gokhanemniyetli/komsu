import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const ListItemProduct = (props) => {
    //  console.log("içerde");
    //  console.log(props.opportunity)

    _clickItemDetail = () => {
        Actions.opportunityDetailScreen({ StoreProductID: props.product.StoreProductID });
    }
    return (
        <CardSection>
            <TouchableOpacity style={{ flex: 1, }} onPress={this._clickItemDetail.bind(this)}>

                <View style={[container.row, { justifyContent: 'space-between', }]}>
                    <View >
                        <Image style={imageStyle.logoStyle.xl}
                            source={{ uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.PRODUCT + '/' + props.product.ProductImage }}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <View>
                            <Text style={textStyle.logoStyle}>{props.product.ProductName}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color: '#898383' }}>{props.product.ProductPrice}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </CardSection>
    )
}

export default ListItemProduct;