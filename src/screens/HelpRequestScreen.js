import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';


import { HelpRequestScreenData, SendHelpRequestData, CitiesData } from '../actions';

import ListItemSort from '../components/ListItemSort';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var { LoginControl } = require('../common/GlobalFunctions');


var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class HelpRequestScreen extends Component {
    state = {
        txtSearch: '',
        connectionError: false,
        userFullList: '',
        disableSaveButton: false
    };



    UNSAFE_componentWillMount() {
        // console.log("wilMount")
        if (LoginControl(this.props.SwoqyUserToken)) {
            this.props.CitiesData({ userToken: this.props.SwoqyUserToken });

            this.props.HelpRequestScreenData({ userToken: this.props.SwoqyUserToken });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'help_request_screen_data_success') {
            res = nextProps.resHelpRequest;
            this.setState({
                nameSurname: res.NameSurname,
                phone: res.Phone,
                email: res.Email,
                address: res.Address
            });
        } else if (nextProps.type == 'send_help_request_data_success') {
            res = nextProps.resSendHelpRequest;

            alert(Localizations('HelpRequestScreen.ReceiveRequest'));
            setTimeout(() => {
                Actions.wallScreen();
            }, 2000);
        } else if (nextProps.type == 'cities_data_success') {
            const cities = [];
            nextProps.resCities.map(item =>
                cities.push({ value: item.CityID, label: item.CityName })
            )
            this.setState({
                cities: cities
            })
        }
    }

    _clickMyHelpRequest() {
        Actions.myHelpRequestScreen();
    }

    _clickSave = () => {
        //debugger
        // console.log("KAYDETME İŞLEMİ BAŞLAYACAK")
        if (!this.state.disableSaveButton) {
            if (this.state.nameSurname == "" || this.state.nameSurname == undefined || this.state.nameSurname == null ||
                this.state.phone == "" || this.state.phone == undefined || this.state.phone == null ||
                this.state.city == "" || this.state.city == undefined || this.state.city == null || this.state.city == 0 || 
                this.state.request == "" || this.state.request == undefined || this.state.request == null) {
                alert(Localizations('HelpRequestScreen.Control'));
                return;
            }

            this.props.SendHelpRequestData({
                userToken: this.props.SwoqyUserToken,
                nameSurname: this.state.nameSurname,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address,
                city: this.state.city,
                request: this.state.request,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });

            this.setState({ disableSaveButton: true });
        }
    }


    setCity = (itemID) => {
        this.setState({
            city: itemID
        })
    }


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
                            <HF_01 title={Localizations('Global.HelpRequestScreen')} rightButtonJumpPage="helpRequestScreen" parentMethod={this._clickSave} />
                        </View>
                        {
                            (!this.props.loadingHelpRequest) ?
                                <View style={{ margin: 10, }}>

                                    <KeyboardAwareScrollView style={{}}>

                                        <View style={{ margin: 10, }}>
                                            <Card >
                                                <TouchableOpacity style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 4, padding: 5, marginTop: 5, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} onPress={this._clickMyHelpRequest}>
                                                    <Text style={[textStyle.logoStyle.xs, { color: 'white', fontWeight: 'bold' }]}>{Localizations('MyPreviousHelpsScreen.MyPreviousHelpRequests')}</Text>
                                                </TouchableOpacity>
                                            </Card>
                                        </View>

                                        <View style={{ margin: 10 }}>
                                            <Card >
                                                <View>
                                                    <Text style={textStyle.settingStyle.general}>{Localizations('HelpRequestScreen.Info')}</Text>
                                                </View>
                                                <View style={[container.row.sb, { marginVertical: 5 }]}>
                                                    <View style={{ flex: 2, justifyContent: 'center' }}>
                                                        <Text style={textStyle.settingStyle.privacy}>{Localizations('HelpRequestScreen.InfoDetail')}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ margin: 5 }}>
                                                    <View>
                                                        <Text>{Localizations('HelpRequestScreen.NameSurname')}</Text>
                                                        <TextInput
                                                            style={{ padding: 4, margin: 4, fontSize: 16, borderColor: '#ff585c', borderWidth: 1 }}
                                                            onChangeText={(txt) => this.setState({ nameSurname: txt })}
                                                            value={this.state.nameSurname}
                                                            onFocus={() => this.setState({ textCurrent: '#ff585c' })}
                                                            onBlur={() => this.setState({ textCurrent: 'lightgray' })}
                                                            placeholder={Localizations('HelpRequestScreen.NameSurname')}
                                                            keyboardType='default'
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ margin: 5 }}>
                                                    <View>
                                                        <Text>{Localizations('HelpRequestScreen.Phone')}</Text>
                                                        <TextInput
                                                            style={{ padding: 4, margin: 4, fontSize: 16, borderColor: '#ff585c', borderWidth: 1 }}
                                                            onChangeText={(txt) => this.setState({ phone: txt })}
                                                            value={this.state.phone}
                                                            onFocus={() => this.setState({ textCurrent: '#ff585c' })}
                                                            onBlur={() => this.setState({ textCurrent: 'lightgray' })}
                                                            placeholder={Localizations('HelpRequestScreen.Phone')}
                                                            keyboardType='default'
                                                        />

                                                    </View>
                                                </View>
                                                <View style={{ margin: 5 }}>
                                                    <View>
                                                        <Text>{Localizations('HelpRequestScreen.Email')}</Text>
                                                        <TextInput
                                                            style={{ padding: 4, margin: 4, fontSize: 16, borderColor: 'gray', borderWidth: 1 }}
                                                            onChangeText={(txt) => this.setState({ email: txt })}
                                                            value={this.state.email}
                                                            onFocus={() => this.setState({ textCurrent: '#ff585c' })}
                                                            onBlur={() => this.setState({ textCurrent: 'lightgray' })}
                                                            placeholder={Localizations('HelpRequestScreen.Email')}
                                                            keyboardType='default'
                                                            multiline
                                                        />

                                                    </View>
                                                </View>
                                                <View style={{ margin: 5 }}>
                                                    <View>
                                                        <Text>{Localizations('HelpRequestScreen.Address')}</Text>
                                                        <TextInput
                                                            style={{ padding: 4, margin: 4, fontSize: 16, borderColor: 'gray', borderWidth: 1, height: 50 }}
                                                            onChangeText={(txt) => this.setState({ address: txt })}
                                                            value={this.state.address}
                                                            onFocus={() => this.setState({ textCurrent: '#ff585c' })}
                                                            onBlur={() => this.setState({ textCurrent: 'lightgray' })}
                                                            placeholder={Localizations('HelpRequestScreen.Address')}
                                                            //keyboardType='default'
                                                            scrollEnabled={false}
                                                            multiline
                                                        />

                                                    </View>
                                                </View>

                                                <View style={{ margin: 5 }}>
                                                    <View>
                                                        <Text>{Localizations('HelpRequestScreen.City')}</Text>
                                                        <Dropdown
                                                            style={{ height: 30, marginTop:-20, borderColor:'#ff585c', borderWidth:1 }}
                                                            ref={this.dropdownCity}
                                                            placeholder={Localizations('HelpfullScreen.Choose')}
                                                            data={this.state.cities}
                                                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                                            value={this.state.city}
                                                            onChangeText={this.setCity}
                                                            fontSize={16}
                                                        />

                                                    </View>
                                                </View>

                                                <View style={{ margin: 5, marginBottom:40 }}>
                                                    <Text>{Localizations('HelpRequestScreen.Request')}</Text>
                                                    <View>
                                                        <TextInput
                                                            style={{ padding: 4, margin: 4, fontSize: 16, borderColor: '#ff585c', borderWidth: 1, height: 70 }}
                                                            onChangeText={(txt) => this.setState({ request: txt })}
                                                            value={this.state.request}
                                                            onFocus={() => this.setState({ textCurrent: '#ff585c' })}
                                                            onBlur={() => this.setState({ textCurrent: 'lightgray' })}
                                                            placeholder={Localizations('HelpRequestScreen.Request')}
                                                            // keyboardType='default'
                                                            scrollEnabled={false}
                                                            multiline
                                                        />

                                                    </View>
                                                </View>
                                            </Card>
                                        </View>
                                    </KeyboardAwareScrollView>
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
    const { loadingHelpRequest, type, resHelpRequest, resSendHelpRequest, resCities } = helpRequestScreenResponse;

    return { SwoqyUserToken, SwoqyUserData, loadingHelpRequest, type, resHelpRequest, resSendHelpRequest, resCities  };
}

export default connect(mapStateToProps, { HelpRequestScreenData, SendHelpRequestData, CitiesData })(HelpRequestScreen);
