import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import { SelectedSeperatorTitleChange } from '../actions';

import { CardSection, Star } from '../common';
var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ListItemBrandStore extends Component {

    _clickStore = (storeID) => {
        Actions.storeScreen({ storeID: this.props.stores.StoreID });
    }

    render() {
        return (

            <CardSection>
                <TouchableOpacity style={container.center} onPress={this._clickStore.bind(this, this.props.stores.StoreID)} >
                    <View style={container.row}>
                        <View>
                            {this.props.stores.StoreLogo != null ?
                                <Image style={imageStyle.logoStyle.lg}
                                    source={{
                                        uri:
                                            GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + (((this.props.from == 'favorites') || (this.props.from == 'wall')  || (this.props.from == 'search')) ?
                                                GLOBAL.IMAGE_PATHS.BRAND_LOGO :
                                                GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO)
                                            + '/' + this.props.stores.StoreLogo
                                    }}
                                />
                                :
                                <Image style={imageStyle.logoStyle.lg}
                                    source={{
                                        uri: this.props.brandLogo
                                    }}
                                />
                            }
                        </View>

                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <View >
                                <View >
                                    <Text style={textStyle.logoStyle.sm}>{this.props.stores.StoreName}</Text>
                                </View>

                                <View>
                                    {this.props.stores.ShoppingMallID != 0 ?
                                        <View>
                                            <Text style={textStyle.logoStyle.sm}>{this.props.stores.ShoppingMallName}</Text>
                                        </View>
                                        :
                                        null}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Star size='sm' score={this.props.stores.StoreReviewScore} />

                                <Text style={[textStyle.logoStyle.sm, { padding: 3, color: 'gray' }]}>({this.props.stores.StoreReviewCount})</Text>

                                {this.props.stores.GoogleDistance &&
                                    <Text style={[textStyle.logoStyle.sm, { padding: 3, color: 'gray' }]}>
                                        {this.props.stores.GoogleDistance.Distance == 99999999 ?
                                            " - !!! "
                                            :
                                            this.props.stores.GoogleDistance.Distance < 1000 ?
                                                " - " + this.props.stores.GoogleDistance.Distance.toFixed(0) + " m"
                                                :
                                                " - " + (this.props.stores.GoogleDistance.Distance / 1000).toFixed(1) + " km"
                                        }
                                    </Text>
                                }
                            </View>

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

export default connect(mapStateToProps, {})(ListItemBrandStore);
