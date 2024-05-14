import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { MyPreviousHelpsScreenData } from '../actions';

import ListItemSort from '../components/ListItemSort';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var { LoginControl } = require('../common/GlobalFunctions');

var dateFormat = require('dateformat');

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class MyPreviousHelpsScreen extends Component {
    state = {
        txtSearch: '',
        connectionError: false,
        userFullList: '',
        disableSaveButton: false
    };

    UNSAFE_componentWillMount() {
        if (LoginControl(this.props.SwoqyUserToken)) {
            this.props.MyPreviousHelpsScreenData({ userToken: this.props.SwoqyUserToken });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'my_previous_helps_screen_data_success') {
            // debugger;
            res = nextProps.resMyPreviousHelps;
            this.setState({
                helpRequests: res.HelpRequests
            });
        }
    }

    _clickHelpRequestDetail = (helpRequestID) => {
        Actions.helpRequestDetailScreen({ "HelpRequestID": helpRequestID, "Who" : "helpfull" });
    }



    renderHeaderArea() {
        return (
            <View style={{ flexDirection: 'row',  height: 40, padding: 5, alignItems: 'center', backgroundColor:'#ff585c' }}>
                <Text style={{ width: 80, fontWeight:'bold', color:'white'}}>{Localizations('MyPreviousHelpsScreen.Date')}</Text>
                <Text style={{ flex: 1, fontWeight:'bold', color:'white'}}>{Localizations('MyPreviousHelpsScreen.Request')}</Text>
                <Text style={{ width: 60, fontWeight:'bold', color:'white' }}>{Localizations('MyPreviousHelpsScreen.Status')}</Text>
            </View>
        )
    }

    renderItem = (item, index) => (
        <TouchableOpacity onPress={() => this._clickHelpRequestDetail(item.RequestID)}>

            <View style={{ flexDirection: 'row', padding: 5, height: 40, margin: 1, alignItems: 'center', borderBottomColor:'lightgray', borderBottomWidth:1   }}>
                <Text style={{ width: 80 }}>{dateFormat(item.RequestDate.toString(), "dd.mm.yyyy")}</Text>
                <Text style={{ flex: 1 }}>{item.Request.substring(0, 25)}...</Text>
                <Text style={{ width: 60 }}>{
                    (item.Status == 0) ? Localizations('MyPreviousHelpsScreen.Open')
                    : (item.Status == 1) ? Localizations('MyPreviousHelpsScreen.Processing')
                    : (item.Status == 2 ) ? Localizations('MyPreviousHelpsScreen.Helped') 
                    : (item.Status == 3 ) ? Localizations('MyPreviousHelpsScreen.Closed')
                    : null 
                }</Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        if (this.props.SwoqyUserToken == null || this.props.SwoqyUserToken == undefined || this.props.SwoqyUserToken == "") {
            return (
                <ShowMessage backgroundStyle="bgStyle"
                    textStyle="txtStyle" text={Localizations('Global.RequireUserLoginAlertMessage')}
                />
            );
            Actions.signInScreen();
        } else {
            if (!this.props.connectionError) {
                return (
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <View style={{ height: 40 }}>
                            <HF_01 title={Localizations('Global.MyPreviousHelpsScreen')} />
                        </View>
                        {
                            (!this.props.loadingMyPreviousHelps) ?
                                <View style={{ flex: 1, margin: 10, marginTop:20}}>

                                    <FlatList
                                        ListHeaderComponent={this.renderHeaderArea()}
                                        data={this.state.helpRequests}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={info => (
                                            this.renderItem(info.item, info.index)
                                        )
                                        }
                                    />
                                </View>
                                :
                                <View style={{ flex: 1, backgroundColor: 'white' }}>
                                    <Spinner size="large" />
                                </View>
                        }
                    </View>
                );

            }
            return (
                <ShowMessage backgroundStyle="bgStyle"
                    textStyle="txtStyle"
                    text={Localizations('Global.ConnectionError')}
                />
            );
        }
    }
}
//#endregion

const mapStateToProps = ({ helpRequestScreenResponse, startScreenResponse }) => {
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    const { loadingMyPreviousHelps, type, resMyPreviousHelps, resSendHelpRequest } = helpRequestScreenResponse;

    return { SwoqyUserToken, SwoqyUserData, loadingMyPreviousHelps, type, resMyPreviousHelps, resSendHelpRequest };
}

export default connect(mapStateToProps, { MyPreviousHelpsScreenData })(MyPreviousHelpsScreen);
