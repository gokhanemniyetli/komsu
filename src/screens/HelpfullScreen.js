import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { SearchHelpRequestData, CitiesData } from '../actions';

import ListItemSort from '../components/ListItemSort';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
var dateFormat = require('dateformat');

var { LoginControl } = require('../common/GlobalFunctions');


var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class HelpfullScreen extends Component {
    state = {
        txtSearch: '',
        connectionError: false,
        userFullList: '',
        disableSaveButton: false
    };

    UNSAFE_componentWillMount()  {
        // console.log("wilMount")
        if (LoginControl(this.props.SwoqyUserToken)) {
            this.props.CitiesData({ userToken: this.props.SwoqyUserToken });

            this.props.SearchHelpRequestData({ NearMe: 1, userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude });

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'search_help_request_data_success') {
            res = nextProps.resSearchHelpRequest;
            this.setState({
                helpRequests: res.HelpRequests
            });
        } else if (nextProps.type == 'cities_data_success') {
            const cities = [{ value: 0, label: 'TÜM TÜRKİYE' }];
            nextProps.resCities.map(item =>
                cities.push({ value: item.CityID, label: item.CityName })
            )
            this.setState({
                cities: cities
            })
        }
    }

    _clickMyPreviousHelps() {
        Actions.myPreviousHelpsScreen();
    }

    _clickHelpRequestDetail = (helpRequestID) => {
        Actions.helpRequestDetailScreen({ "HelpRequestID": helpRequestID, "Who": "guest" });
    }

    _clickNearMe = () => {
        this.props.SearchHelpRequestData({ NearMe: 1, userToken: this.props.SwoqyUserToken ,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude});
    }



    _chooseCity() {
        this.props.SearchHelpRequestData({ CityID: 0, userToken: this.props.SwoqyUserToken });
    }


    setCity = (itemID) => {
        this.setState({
            city: itemID
        })

        this.props.SearchHelpRequestData({ CityID: itemID, userToken: this.props.SwoqyUserToken });

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

            <View style={{ flexDirection: 'row', padding: 5, height:40,  margin: 1, alignItems: 'center', borderBottomColor:'lightgray', borderBottomWidth:1  }}>
                <Text style={{ width: 80 }}>{dateFormat(item.RequestDate.toString(), "dd.mm.yyyy")}</Text>
                <Text style={{ flex: 1 }}>{item.Request.substring(0, 25)}...</Text>
                <Text style={{ width: 60 }}>{
                    (item.Status == 0) ? Localizations('MyPreviousHelpsScreen.Open')
                        : (item.Status == 1 || item.Status == 3 || item.Status == 4) ? Localizations('MyPreviousHelpsScreen.Processing')
                            : (item.Status == 2) ? Localizations('MyPreviousHelpsScreen.Helped')
                                : (item.Status == 5) ? Localizations('MyPreviousHelpsScreen.Cloesed')
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
                            <HF_01 title={Localizations('Global.HelpfullScreen')} />
                        </View>
                        {
                            (!this.props.loadingHelpRequest) ?
                                <View style={{ margin: 10, flex: 1 }}>


                                    <View style={{ margin: 10, }}>
                                        <Card >
                                            <TouchableOpacity
                                                style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 4, padding: 5, marginTop: 5, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}
                                                onPress={this._clickMyPreviousHelps}>
                                                <Text style={[textStyle.logoStyle.xs, { color: 'white', fontWeight: 'bold' }]}>{Localizations('HelpfullScreen.MyPreviousHelps')}</Text>
                                            </TouchableOpacity>
                                        </Card>
                                    </View>


                                    <View style={{ flexDirection: 'row',  margin: 10 }}>
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            <TouchableOpacity onPress={this._clickNearMe}>
                                                <Text style={{ height: 25 }}>{Localizations('HelpfullScreen.NearMe')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <TouchableOpacity style={{}}>
                                                <Dropdown
                                                    style={{ height: 30 }}
                                                    ref={this.dropdownCity}
                                                    placeholder={Localizations('HelpfullScreen.Choose')}
                                                    data={this.state.cities}
                                                    inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                                    value={this.state.city}
                                                    onChangeText={this.setCity}
                                                    fontSize={12}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>



                                    {
                                        (!this.props.loadingSearchHelpRequest) ?
                                            <View style={{ flex: 1, margin: 10, }}>

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
    const { loadingSearchHelpRequest, type, resSearchHelpRequest, resCities,  } = helpRequestScreenResponse;

    return { SwoqyUserToken, SwoqyUserData, loadingSearchHelpRequest, type, resSearchHelpRequest, resCities };
}

export default connect(mapStateToProps, { SearchHelpRequestData, CitiesData })(HelpfullScreen);
