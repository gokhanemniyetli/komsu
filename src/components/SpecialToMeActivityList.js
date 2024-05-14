import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { SpecialToMeActivityListData } from '../actions';
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
        // debugger;
        Actions.activityDetailScreen({ activity: props.activity });
    }
    // debugger
    // console.log(GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.ACTIVITY + '/' + props.activity.ImageName);
    return (
        <View >
            {/* <TouchableOpacity style={{height:20, backgroundColor:'lightblue'}}
            onPress={this._clickStore.bind(this, props.store.StoreID)}
            >
                <Text>{ props.store.StoreName}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={{ height: 180, marginTop: 5, marginBottom: 5 }}
                onPress={this._clickActivity.bind(this)}
            >
                <Image
                    style={{
                        flex: 1,
                        width: undefined,
                        height: undefined,
                        resizeMode: 'cover'
                    }}
                    source={{
                        uri:
                            GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.ACTIVITY + '/' + props.activity.ImageName
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}




class ActivityList extends Component {
    state = { res: '', loadingActivityList: false, activityList: '' };

    UNSAFE_componentWillMount()  {

        this.props.SpecialToMeActivityListData({ userToken: this.props.SwoqyUserToken })

    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        // res = nextProps.res;

        // this.setState({
        //     activityList: nextProps.activityList

        // });
        // debugger

        if (nextProps.type == 'special_to_me_activity_data_success') {
            this.setState({
                loadingSpecialToMeActivityList: nextProps.loadingSpecialToMeActivityList,
                activityList: nextProps.res.LstShoppingMallActivitiesDTO,
            });
        }
    }

    renderContentArea = () => {
        //debugger
        if (this.state.activityList != '' && this.state.activityList != undefined && this.state.activityList != null) {
            if (!this.state.loadingSpecialToMeActivityList && this.state.activityList != '' && this.state.activityList != undefined && this.state.activityList != null) {
                return (
                    <View style={{ flex: 1 }}>

                        <View>
                            <TouchableOpacity style={{
                                justifyContent: 'space-between',
                                margin: 12,
                                borderWidth: 0.1,
                                backgroundColor: 'white',
                            }}>
                                <FlatList
                                    data={sortJsonArray(this.state.activityList, 'StartDate', 'des')}
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
                    </View>
                )
            }
            else {
                return <Spinner size="large" />;
            }
        }
        else {
            return null;
        }
    }


    render() {
        return (this.renderContentArea());

    }
}

const mapStateToProps = ({ specialToMeScreenResponse, startScreenResponse }) => {
    const { res, type, loadingSpecialToMeActivityList, userToken } = specialToMeScreenResponse;

    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, SwoqyUserToken, type, loadingSpecialToMeActivityList, userToken
    };
}


export default connect(mapStateToProps, { SpecialToMeActivityListData })(ActivityList);
