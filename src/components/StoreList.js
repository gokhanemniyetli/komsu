import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ShoppingMallStoreListData } from '../actions';
import ListItemShoppingMallStore from '../components/ListItemShoppingMallStore';
import SwitchSelector from "react-native-switch-selector";


import { Spinner } from '../common';

import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')


var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class StoreList extends Component {
    state = { res: '', loadingStoreList: false, storeList: '', selectedListType: '0' };

    UNSAFE_componentWillMount()  {

        this.props.ShoppingMallStoreListData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken })
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
        if (!this.state.loadingStoreList && this.state.storeList != '' && this.state.storeList != undefined && this.state.storeList != null) {

            var oObject;

            switch (this.state.selectedListType) {
                case '0':
                    oObject = groupBy(sortJsonArray(this.state.storeList.Store, 'StoreName', 'asc'), ['StoreCategoryName'])
                    break;
                case '1':
                    oObject = groupBy(sortJsonArray(this.state.storeList.Store, 'StoreName', 'asc'), ['Floor'])
                    break;
                case '2':
                    oObject = sortJsonArray(this.state.storeList.Store, 'StoreName', 'asc');
                    break;
            }

            const arrGroups = [];
            if (this.state.selectedListType == '2') {
                arrGroups.push('A - Z')
            }
            else   if (this.state.selectedListType == '1') {
                for (strName in oObject) {
                    arrGroups.push(Localizations('ShoppingMall.FloorNumbers') + strName);
                }
            }
            else {
                for (strName in oObject) {
                    arrGroups.push(strName);
                }
            }

            return (
                <View style={{ flex: 1 }}>
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
                            options={[
                                { label: Localizations('ShoppingMall.Category'), value: '0' },
                                { label: Localizations('ShoppingMall.Floor'), value: '1' },
                                { label: 'A - Z', value: '2' }
                                // { label: "Feminino", value: "f", imageIcon: images.feminino }, //images.feminino = require('./path_to/assets/img/feminino.png')
                                // { label: "Masculino", value: "m", imageIcon: images.masculino } //images.masculino = require('./path_to/assets/img/masculino.png')
                            ]}
                        />
                    </View>

                    <View style={{paddingBottom:100,}}>
                        {/* {console.log(this.state )} */}
                        <FlatList
                            data={arrGroups}
                            keyExtractor={(item, index) => index.toString()}
                            //scrollEnabled={false}
                            renderItem={info => (
                                <ListItemShoppingMallStore
                                    seperatorTitle={info.item}
                                    stores={
                                        (this.state.selectedListType == '0') ?
                                            this.state.storeList.Store.filter(x => x.StoreCategoryName.includes(info.item))
                                            :
                                            (this.state.selectedListType == '1') ?
                                                this.state.storeList.Store.filter(x => x.Floor == info.item.replace(Localizations('ShoppingMall.FloorNumbers'), ''))
                                                :
                                                this.state.storeList.Store
                                    }
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

const mapStateToProps = ({ shoppingMallScreenResponse, startScreenResponse }) => {
    const { res, storeList, loadingStoreList } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, storeList, loadingStoreList, SwoqyUserToken
    };
}


export default connect(mapStateToProps, { ShoppingMallStoreListData })(StoreList);





