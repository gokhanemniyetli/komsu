import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
//import { ShoppingMallStoreListData } from '../actions';
import ListItemBrand from './ListItemBrand';
import SwitchSelector from "react-native-switch-selector";
import { Localizations, FormatDate } from '../../locales/i18n';

import { Card, CardSection, Spinner } from '../common';

// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

var i = 0;

class FavoriteBrandList extends Component {
    state = { res: '', loadingFavoriteBrandList: false, brandList: '', selectedListType: '0' };

    UNSAFE_componentWillMount() {
        this.setState({
            brands: this.props.brands,
            from: this.props.from

        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        this.setState({
            brandList: nextProps.brandList
        });
    }

    _changeListType = (listType) => {
        this.setState({
            selectedListType: listType
        })

    }

    renderContentArea = () => {
        if (this.state.brands != null) {

            const options = [];
           // options.push({ label: Localizations('BrandDetail.ShoppingMall'), value: '0' })
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

                    <View>
                        <FlatList
                            data={
                                (this.state.selectedListType == '0') ?
                                    this.state.brands.filter(x => x.BrandName != null)
                                    : 
                                      sortJsonArray(this.state.brands, 'ShoppingMallName', 'asc').filter(x => x.StoreID > 0)
                            }
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={info => (
                                <ListItemBrand
                                    from={this.state.from}
                                    brands={info.item}
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


export default connect(mapStateToProps, {})(FavoriteBrandList);
