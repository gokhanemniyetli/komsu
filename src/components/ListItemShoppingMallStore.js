import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import { SelectedSeperatorTitleChange } from '../actions';

import { CardSection, Star } from '../common';
var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

_clickStore = (storeID) => {
    Actions.storeScreen({ storeID: storeID });
}


const ListItemStores = (props) => {
    // console.log(props.store)
    return (
        <View style={{ margin: 10, marginBottom: 0, padding: 10, }}>
            <TouchableOpacity style={container.center} onPress={this._clickStore.bind(this, props.store.StoreID)} >
                <View style={container.row}>
                    <View>
                        {(props.store.StoreLogo) ?
                            <Image
                                style={imageStyle.logoStyle.md} source={{ uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.BRAND_LOGO + '/' + props.store.StoreLogo }}
                            /> : <Text></Text>}
                    </View>

                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <View >
                            <Text style={textStyle.logoStyle.sm}>{props.store.StoreName}</Text>
                        </View>
                        <Star size='sm' score={props.store.StoreReviewScore} />
                    </View>
                    <View>
                        <Text style={textStyle.reviewCountStyle.sm}>({props.store.StoreReviewCount})</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

class ListItemShoppingMallStore extends Component {

    _clickItemDetail = () => {
        var item = '';
        if (this.props.seperatorTitle != this.props.selectedSeperatorTitle) {
            item = this.props.seperatorTitle;
        }
        this.props.SelectedSeperatorTitleChange(item)
    }
    render() {
        // console.log(props.stores);
        return (
            <CardSection>
                <TouchableOpacity style={{ flex: 1, }} onPress={this._clickItemDetail.bind(this)}>

                    <View style={[container.row, { justifyContent: 'space-between', }]}>
                        {/* <View >
                            <Image style={imageStyle.logoStyle.lg} source={{uri:GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.OPPORTUNITY + '/' + props.shoppingMallStore.StoreCategoryLogo}}
                            />
                        </View> */}
                        <View style={{ flex: 1, margin: 20 }}>
                            <Text style={textStyle.logoStyle.md}>{this.props.seperatorTitle}</Text>
                        </View>
                        <View style={{ marginRight: 15 }}>
                            <Image style={imageStyle.iconStyle}
                                source={(this.props.selectedSeperatorTitle == this.props.seperatorTitle) ? require('../images/icons/arrow_up.png') : require('../images/icons/arrow_down.png')}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ marginLeft: 20 }}>
                    {
                        (this.props.selectedSeperatorTitle == this.props.seperatorTitle) ?
                            <View>
                                <View style={{ borderBottomColor: '#eaeaea', borderBottomWidth: 1, marginRight: 5 }} />
                                <FlatList
                                    data={this.props.stores}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={() => (
                                        <View style={{ borderBottomColor: '#eaeaea', borderBottomWidth: 1, marginLeft: 20, marginRight: 5 }} />
                                    )}
                                    renderItem={info => (
                                        <ListItemStores
                                            store={info.item}
                                        />
                                    )}
                                />
                            </View>
                            :
                            <View></View>
                    }
                </View>
            </CardSection>
        )
    }

}

const mapStateToProps = ({ shoppingMallScreenResponse, startScreenResponse }) => {
    const { selectedSeperatorTitle } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        selectedSeperatorTitle, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SelectedSeperatorTitleChange })(ListItemShoppingMallStore);