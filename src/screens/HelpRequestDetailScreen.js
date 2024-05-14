import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { HelpRequestDetailScreenData, HelpRequestActionData } from '../actions';

import ListItemSort from '../components/ListItemSort';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var dateFormat = require('dateformat');

var { LoginControl } = require('../common/GlobalFunctions');


var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');





const styles = StyleSheet.create({
    title: {
        margin: 1,
        padding: 5,
        flex: 1,
        
    },
    content: {
        margin: 1,
        padding: 5,
        flex: 2,
    },
    requestTitle: {
        marginTop: 1,
        marginLeft: 1,
        marginRight: 1,
        padding: 5,
    },
    requestContent: {
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 1,
        padding: 5,
    }


});


class HelpRequestDetailScreen extends Component {
    state = {
        txtSearch: '',
        connectionError: false,
        userFullList: '',
        disableSaveButton: false
    };


    UNSAFE_componentWillMount() {
        // console.log("wilMount")
        if (LoginControl(this.props.SwoqyUserToken)) {
            this.props.HelpRequestDetailScreenData({ helpRequestID: this.props.HelpRequestID, userToken: this.props.SwoqyUserToken });

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'help_request_detail_screen_data_success') {
            //debugger;

            res = nextProps.resHelpRequestDetailScreen;
            this.setState({
                data: res
            });
        } 
        // else if (nextProps.type == 'send_help_request_data_success') {
        //     res = nextProps.resSendHelpRequest;

        //     alert("Yardım talebiniz alındı.");
        //     setTimeout(() => {
        //         Actions.wallScreen();
        //     }, 2000);
        // }
    }

    _clickMyHelpRequest() {
        Actions.myHelpRequestScreen();
    }

    _clicHelpRequestAction = (action) => {
        this.props.HelpRequestActionData({
            userToken: this.props.SwoqyUserToken,
            ID: this.state.data.RequestID,
            action: action
        });

        alert("İletildi.");

        Actions.wallScreen();
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
                            <HF_01 title={Localizations('Global.HelpRequestDetilScreen')} />
                        </View>
                        {
                            (!this.props.loadingHelpRequestDetailScreen) ?
                                (this.state.data != undefined && this.state.data != null) ?
                                    <ScrollView style={{}}>

                                        {this.props.Who == "owner" &&
                                            <View style={{ margin: 10 }}>
                                                <Card >
                                                    <View>
                                                        <Text style={textStyle.settingStyle.general}>{Localizations('HelpRequestDetailScreen.Info')}</Text>
                                                    </View>
                                                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                                            <Text style={textStyle.settingStyle.privacy}>{Localizations('HelpRequestDetailScreen.InfoDetail')}</Text>
                                                        </View>
                                                    </View>
                                                </Card>
                                            </View>
                                        }

                                        <View style={{}}>
                                            <Card>
                                                {(this.props.Who == "owner" || this.props.Who == "helpfull") &&
                                                    <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                        <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.NameSurname')}: </Text>
                                                        <Text style={styles.content}>{this.state.data.NameSurname}</Text>
                                                    </View>
                                                }

                                                <View>
                                                    <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                        <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.RequestDate')}: </Text>
                                                        <Text style={styles.content}>{dateFormat(this.state.data.RequestDate.toString(), "dd.mm.yyyy")}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'column', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                        <Text style={styles.requestTitle}>{Localizations('HelpRequestDetailScreen.Request')}: </Text>
                                                        <Text style={styles.requestContent}>{this.state.data.Request}</Text>
                                                    </View>
                                                </View>

                                                {(this.props.Who == "owner" || this.props.Who == "helpfull") &&
                                                    <View>
                                                        <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                            <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.Phone')}: </Text>
                                                            <Text style={styles.content}>{this.state.data.Phone}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                            <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.Email')}: </Text>
                                                            <Text style={styles.content}>{this.state.data.Email}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                            <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.Address')}: </Text>
                                                            <Text style={styles.content}>{this.state.data.Address}</Text>
                                                        </View>
                                                    </View>
                                                }

                                                <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                    <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.Status')}: </Text>
                                                    <Text style={styles.content}>{
                                                        (this.state.data.Status == 0) ? Localizations('HelpRequestDetailScreen.Open')
                                                            : (this.state.data.Status == 1) ? Localizations('HelpRequestDetailScreen.Processing')
                                                                : (this.state.data.Status == 2) ? Localizations('HelpRequestDetailScreen.Helped')
                                                                    : (this.state.data.Status == 3) ? Localizations('HelpRequestDetailScreen.Closed')
                                                                        : null
                                                    }</Text>
                                                </View>

                                                {(this.props.Who == "owner" || this.props.Who == "helpfull") &&
                                                    <View>
                                                        <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                            <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.HelpfullName')}: </Text>
                                                            <Text style={styles.content}>{this.state.data.HelpfullNameSurname}</Text>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', borderBottomColor:'lightgray', borderBottomWidth:1}}>
                                                            <Text style={styles.title}>{Localizations('HelpRequestDetailScreen.ClosingDate')}: </Text>
                                                            <Text style={styles.content}>{this.state.data.CloseDate}</Text>
                                                        </View>
                                                    </View>
                                                }
                                            </Card>
                                        </View>

                                        {this.props.Who == "guest" &&
                                            <View style={{ margin: 10, }}>
                                                <Card >
                                                    <TouchableOpacity style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 4, padding: 5, marginTop: 5, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}
                                                        onPress={() => this._clicHelpRequestAction(1)}>
                                                        <Text style={[textStyle.logoStyle.xs, { color: 'white', fontWeight: 'bold' }]}>{Localizations('HelpRequestDetailScreen.OfferHelp')}</Text>
                                                    </TouchableOpacity>
                                                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                                            <Text style={textStyle.settingStyle.privacy}>{Localizations('HelpRequestDetailScreen.OfferHelpDetail')}</Text>
                                                        </View>
                                                    </View>
                                                </Card>
                                            </View>
                                        }

                                        {this.props.Who == "helpfull" &&
                                            <View style={{ margin: 10, }}>
                                                <Card >
                                                    <TouchableOpacity style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 4, padding: 5, marginTop: 5, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}
                                                        onPress={() =>this._clicHelpRequestAction(2)}>
                                                        <Text style={[textStyle.logoStyle.xs, { color: 'white', fontWeight: 'bold' }]}>{Localizations('HelpRequestDetailScreen.IHelped')}</Text>
                                                    </TouchableOpacity>
                                                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                                            <Text style={textStyle.settingStyle.privacy}>{Localizations('HelpRequestDetailScreen.IHelpedDetail')}</Text>
                                                        </View>
                                                    </View>
                                                </Card>
                                            </View>
                                        }

                                        {(this.props.Who == "owner" && this.state.data.Status < 3) &&
                                            <View style={{ margin: 10, }}>
                                                <Card >
                                                    <TouchableOpacity style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 4, padding: 5, marginTop: 5, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }}
                                                        onPress={() => this._clicHelpRequestAction(3)}>
                                                        <Text style={[textStyle.logoStyle.xs, { color: 'white', fontWeight: 'bold' }]}>{Localizations('HelpRequestDetailScreen.IGotHelp')}</Text>
                                                    </TouchableOpacity>
                                                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                                            <Text style={textStyle.settingStyle.privacy}>{Localizations('HelpRequestDetailScreen.IGotHelpDetail')}</Text>
                                                        </View>
                                                    </View>
                                                </Card>
                                            </View>
                                        }



                                    </ScrollView>
                                    :
                                    null

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
    const { loadingHelpRequestDetailScreen, type, resHelpRequestDetailScreen, resSendHelpRequest, resHelpRequestAction, loadingHelpRequestAction } = helpRequestScreenResponse;

    return { SwoqyUserToken, SwoqyUserData, loadingHelpRequestDetailScreen, type, resHelpRequestDetailScreen, resSendHelpRequest, resHelpRequestAction, loadingHelpRequestAction };
}

export default connect(mapStateToProps, { HelpRequestDetailScreenData, HelpRequestActionData })(HelpRequestDetailScreen);
