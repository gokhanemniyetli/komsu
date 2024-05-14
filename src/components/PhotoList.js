import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ShoppingMallPhotoListData } from '../actions';
import ListItemShoppingMallStore from './ListItemShoppingMallStore';
import SwitchSelector from "react-native-switch-selector";
import { Card, CardSection, Spinner } from '../common';

import ListItemPhoto from './ListItemPhoto';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class PhotoList extends Component {
    state = { res: '', loadingPhotoList: false, photoList: '', selectedListItem: 0 };

    UNSAFE_componentWillMount()  {

        this.props.ShoppingMallPhotoListData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        res = nextProps.res;

        // console.log("props");
        // console.log(nextProps);

        this.setState({
            photoList: nextProps.photoList

        });
    }

    _changeListType = (item) => {
        this.setState({
            selectedListItem: item
        })

    }

    renderContentArea = () => {
        
        if (!this.state.loadingPhotoList && this.state.photoList != '' && this.state.photoList != undefined && this.state.photoList != null) {


            var oObject = this.state.photoList.LstShoppingMallPhotosDTO;


            oObject = groupBy(sortJsonArray(this.state.photoList.LstShoppingMallPhotosDTO, 'ShoppingMallPhotoCategoryID', 'asc'), ['ShoppingMallPhotoCategoryName'])


            const arrGroups = [];
            for (strName in oObject) {
                arrGroups.push(strName);
            }

            var i = 0;
            const options = [];
            arrGroups.forEach(item => {
                options.push({ label: item, value: item })

                if (i == 0 && this.state.selectedListItem == '') {
                    // console.log("sıfır işlemi yapılacak")
                    this.setState({ selectedListItem: item });
                }
                i++;
            });

            filteredObject = this.state.photoList.LstShoppingMallPhotosDTO.filter(x => x.ShoppingMallPhotoCategoryName.includes(this.state.selectedListItem));

            // debugger
            if (options.length > 0) {
                return (
                    <View style={{ flex: 1 }}>
                        <View>
                            <View style={{ alignItems: 'center' }}>
                                <SwitchSelector
                                    style={{ width: '95%', margin: 5, marginTop: 13 }}
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
                                data={filteredObject}
                                keyExtractor={(item, index) => index.toString()}
                                // horizontal={true}
                                renderItem={info => (
                                    <ListItemPhoto
                                        allPhotos={filteredObject}
                                        photo={info.item.ImageName}
                                        userID={1}
                                        from="ShoppingMallPhotos"
                                    />
                                )}
                            />

                        </View>
                    </View>
                )
            } else {
                return <View></View>
            }
        }
        return <Spinner size="large" />;
    }


    render() {
        return (this.renderContentArea());

    }
}

const mapStateToProps = ({ shoppingMallScreenResponse, startScreenResponse }) => {
    const { res, photoList, loadingPhotoList } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, photoList, loadingPhotoList, SwoqyUserToken
    };
}


export default connect(mapStateToProps, { ShoppingMallPhotoListData })(PhotoList);





