import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import { SelectedSeperatorTitleChange } from '../actions';

import { CardSection, Star } from '../common';

var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ListItemBrand extends Component {

    _clickItem = (brandID) => {

        Actions.brandDetailScreen({ brandID: this.props.brands.BrandID });
    }

    render() {
        return (
            <CardSection>
                <TouchableOpacity style={container.center} onPress={this._clickItem.bind(this)} >
                    <View style={container.row}>
                        <View>
                            {this.props.brands.BrandLogo != null ?
                                <Image
                                    style={imageStyle.logoStyle.lg}
                                    source={{
                                        uri:
                                            GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + (((this.props.from == 'favorites') || (this.props.from == 'wall')) ?
                                                GLOBAL.IMAGE_PATHS.BRAND_LOGO :
                                                GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO)
                                            + '/' + this.props.brands.BrandLogo
                                    }}
                                /> :
                                <Text style={{ width: 80, height: 80 }}></Text>
                            }
                        </View>

                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <View style={container.row}>
                                <Text style={textStyle.logoStyle.sm}>{this.props.brands.BrandName}</Text>
                                {
                                    this.props.brands.Registered &&
                                    <Image
                                        style={imageStyle.registeredTinyStyle}
                                        source={require('../images/icons/registered.png')}
                                    />
                                }
                            </View>
                            <Star size='sm' score={this.props.brands.BrandReviewScore} />
                        </View>
                        <View>
                            <Text style={textStyle.reviewCountStyle.sm}>({this.props.brands.BrandReviewCount})</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </CardSection>
        )
    }

}

const mapStateToProps = ({ startScreenResponse }) => {
    const { SwoqyUserToken } = startScreenResponse;
    return {
        SwoqyUserToken
    };
}

export default connect(mapStateToProps, {})(ListItemBrand);
