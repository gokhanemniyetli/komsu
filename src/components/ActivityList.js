import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ShoppingMallActivityListData } from '../actions';
import SwitchSelector from "react-native-switch-selector";


import { Card, CardSection, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';

// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');
var groupBy = require('json-groupby')

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');



const ListItemActivities = (props) => {
    _clickActivity = () => {
        // Actions.activityDetailScreen(props.activity.ActivityID);
        Actions.activityDetailScreen({ activity: props.activity });
    }

    var image = GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.ACTIVITY + '/' + props.activity.ImageName;

    return (
        <View style={{ }}>
            {/* <TouchableOpacity style={{height:20, backgroundColor:'lightblue'}}
            onPress={this._clickStore.bind(this, props.store.StoreID)}
            >
                <Text>{ props.store.StoreName}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={{ height: 180, marginTop: 5, marginBottom: 5 }}
                onPress={this._clickActivity.bind(this)}
            >

                <Image
                    style={{height:180}}
                    source={{
                        uri: image
                    }}
                />

            </TouchableOpacity>
        </View>
    )
}




class ActivityList extends Component {
    state = { res: '', loadingActivityList: false, activityList: '' };

    UNSAFE_componentWillMount(){
        this.props.ShoppingMallActivityListData({ shoppingMallID: this.props.shoppingMallID, userToken: this.props.SwoqyUserToken })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        res = nextProps.res;
        //debugger
        this.setState({
            activityList: nextProps.activityList

        });
    }

    renderContentArea = () => {
        if (!this.state.loadingActivityList && this.state.activityList != '' && this.state.activityList != undefined && this.state.activityList != null) {
            var oObject = this.state.activityList;


            return (
                <View style={{ flex: 1 }}>

                    <TouchableOpacity style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        margin: 12,
                        borderWidth: 0.1,
                        backgroundColor: 'white',
                    }}>
                        <FlatList
                            data={sortJsonArray(this.state.activityList.LstShoppingMallActivitiesDTO, 'StartDate', 'des')}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={info => (
                                <ListItemActivities
                                    activity={info.item}
                                />
                            )}
                        />

                    </TouchableOpacity>

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
    const { res, activityList, loadingActivityList } = shoppingMallScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, activityList, loadingActivityList, SwoqyUserToken
    };
}


export default connect(mapStateToProps, { ShoppingMallActivityListData })(ActivityList);
