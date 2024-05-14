import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
//import { ShoppingMallStoreListData } from '../actions';
import ListItemBrandStore from './ListItemBrandStore';
import SwitchSelector from "react-native-switch-selector";
import { Localizations, FormatDate } from '../../locales/i18n';

import { Card, CardSection, Spinner } from '../common';

// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class StoreList extends Component {
    state = { res: '', loadingStoreList: false, storeList: '', selectedListType: '0' };

    UNSAFE_componentWillMount() {
        this.setState({
            stores: this.props.stores,
            from: this.props.from,
            brandLogo: this.props.brandLogo
        })
        //this.props.ShoppingMallStoreListData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        this.setState({
            storeList: nextProps.storeList
        });
    }

    _changeListType = (listType) => {
        this.setState({
            selectedListType: listType
        })
    }

    renderContentArea = () => {
        if (this.props.stores != null) {
            const options = [];
            options.push({ label: Localizations('BrandDetail.ShoppingMall'), value: '0' })
            if (this.props.from != 'favorites') {
                options.push({ label: Localizations('BrandDetail.Favourite'), value: '1' })
            }
            options.push({ label: Localizations('BrandDetail.All'), value: '2' })

            return (
                <View style={{ flex: 1, backgroundColor:'white' }}>
                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <SwitchSelector
                                style={{ width: '80%', margin: 5, marginTop: 13 }}
                                initial={0}
                                onPress={value => this._changeListType(value)}
                                textColor='#ff5a5c'
                                selectedColor='#ffffff'
                                buttonColor='#ff5a5c'
                                borderColor='#e9ebed'
                                hasPadding
                                options={options}
                            />
                        </View>
                    </View>

                    <View style={{ paddingBottom: 100, }}>
                        <FlatList
                            data={
                                (this.state.selectedListType == '0') ?
                                    this.props.stores.filter(x => x.ShoppingMallName != null)
                                    : (this.state.selectedListType == '1') ?
                                        this.props.stores.filter(x => x.Favorite == true)
                                        :
                                        sortJsonArray(this.props.stores, 'ShoppingMallName', 'asc').filter(x => x.StoreID > 0)
                            }
                            keyExtractor={(item, index) => index.toString()}
                            //scrollEnabled={true}
                            renderItem={info => (
                                <ListItemBrandStore
                                    from={this.state.from}
                                    stores={info.item}
                                    brandLogo={this.state.brandLogo}
                                />
                            )}
                        />
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        return (this.renderContentArea());

    }
}

const mapStateToProps = ({ startScreenResponse }) => {
    // const { res, storeList, loadingStoreList } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        SwoqyUserToken
    };
}

export default connect(mapStateToProps, {})(StoreList);





