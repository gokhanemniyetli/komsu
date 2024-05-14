import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { HelpRequestScreenData, SendHelpRequestData } from '../actions';

import ListItemSort from '../components/ListItemSort';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var { LoginControl } = require('../common/GlobalFunctions');


var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class HelpScreen extends Component {
    UNSAFE_componentWillMount() {
        this.setState

        if (LoginControl(this.props.SwoqyUserToken)) {
           
        }
    }

    _clickHelpRequest() {
        Actions.helpRequestScreen();
    }

    _clickHelpYourNeighbors() {
        Actions.helpfullScreen();
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
                            <HF_01 title={Localizations('Global.HelpScreen')} />
                        </View>
                        <View style={{ margin: 10, padding: 10 }}>
                            <View style={{ margin: 10 }}>
                                <Card >
                                    <TouchableOpacity style={{ height: 38, backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 20, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}
                                        onPress={this._clickHelpRequest}>
                                      <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('HelpScreen.AskForHelp')}</Text>
                                    </TouchableOpacity>

                                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                            <Text style={textStyle.settingStyle.security}>{Localizations('HelpScreen.AskForHelpInfo')}</Text>
                                        </View>

                                    </View>
                                </Card>
                            </View>

                            <View style={{ margin: 10 }}>
                                <Card >
                                    <TouchableOpacity style={{ height: 38, backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 20, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}
                                        onPress={this._clickHelpYourNeighbors}>
                                        <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('HelpScreen.HelpYourNeighbors')}</Text>
                                    </TouchableOpacity>

                                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                            <Text style={textStyle.settingStyle.security}>{Localizations('HelpScreen.HelpYourNeighborsInfo')}</Text>
                                        </View>

                                    </View>
                                </Card>
                            </View>
                        </View>

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

    return { SwoqyUserToken, SwoqyUserData };
}

export default connect(mapStateToProps, {  })(HelpScreen);
