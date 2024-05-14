import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserGeneralSettingsScreenData, SignOut } from '../actions';
import { Card, CardSection, Spinner, ShowMessage, Link, GetSessionTicket, LetterCircle } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class AboutSwoqyScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 3, flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={textStyle.settingStyle.general}>{Localizations('Setting.AboutSwoqy.AppVersion')}:</Text>
                    <Text style={textStyle.settingStyle.general}>{GLOBAL.VERSION}</Text>
                </View>
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <TouchableOpacity style={container.center.center} onPress={() => Linking.openURL("https://komsuapp.com/")}>
                        <View>
                            <Text style={textStyle.settingStyle.general}>www.komsuapp.com</Text>
                        </View>
                    </TouchableOpacity>

                        <View>
                            <Text style={textStyle.settingStyle.general}>info@komsuapp.com</Text>
                        </View>
                </View>

            </View>
        );
    }
    //#endregion
}

const mapStateToProps = ({ startScreenResponse }) => {
    const { SwoqyUserToken } = startScreenResponse;
    return {
        SwoqyUserToken
    };
}

export default connect(mapStateToProps, {})(AboutSwoqyScreen);
