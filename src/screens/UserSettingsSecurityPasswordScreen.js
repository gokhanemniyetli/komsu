import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut } from '../actions';
import { Card, CardCircle, Spinner, ShowMessage, Link, GetSessionTicket, LetterCircle } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import SwitchSelector from "react-native-switch-selector";

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class UserSettingsSecurityPasswordScreen extends Component {
    state = {
        res: '', userAllData: '', textCurrent: 'lightgray', textNew: 'lightgray', textReNew: 'lightgray',
        accountStatus: 1, loadingSetSetting2: false
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        // debugger
        res = this.props.userAllData
        this.setState({
            accountStatus: res.AccountStatus,
        });
    }

    componentDidMount() {
        // this.myInput.focus();
        this.setState({currentPassword: ""});

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == "set_user_generalsettings_user_all_data") {
            // if (this.props.SwoqyUserToken) {
            //     Actions.userGeneralSettingsScreen();
            // }
            // else {
            //      Actions.userAddedScreen();
            // }
        }
    }
    //#endregion

    //#region click functions
    _clickSave = () => {
        // debugger
        if (this.props.userAllData.SocialMediaUser == 0 || this.props.userAllData.SocialMediaUser == undefined) {


            if (this.state.reNewPassword != this.state.newPassword) {
                alert(Localizations('Setting.SecurityPassword.WrongNewPassword'))
                return;
            }

            if (this.state.newPassword != undefined) {
                if (this.state.newPassword.length < 6) {
                    alert(Localizations('Setting.SecurityPassword.ShortPassword'))
                    return;
                }
            }


            
            if (this.props.SwoqyUserToken) {
                this.props.SetUserGeneralSettingsData({
                    accountStatus: this.state.accountStatus,
                    password: this.state.currentPassword,
                    newPassword: this.state.NewPassword,
                    OperationType: 2,
                    userToken: this.props.SwoqyUserToken,
                    socialMediaUser: this.props.SocialMediaUser,
                    latitude: 0.0,
                    longitude: 0.0 
                });
            }
            else {
                if (this.state.newPassword == undefined || this.state.newPassword == '') {
                    alert(Localizations('Setting.SecurityPassword.WrongNewPassword'))
                    return;
                }
                
                this.props.SetUserGeneralSettingsData({
                    accountStatus: this.state.accountStatus,
                    newPassword: this.state.NewPassword,
                    OperationType: 0,
                    name: this.props.userAllData.name,
                    surname: this.props.userAllData.surname,
                    phone: this.props.userAllData.phone,
                    email: this.props.userAllData.email,
                    BirthDate: this.props.userAllData.BirthDate,
                    selectedImage: this.props.userAllData.selectedImage,
                    socialMediaUser: this.props.SocialMediaUser,
                    eula1: this.props.userAllData.eula1,
                    eula2: this.props.userAllData.eula2,
                    latitude: this.props.SwoqyUserData ? this.props.SwoqyUserData.Latitude : 0.0,
                    longitude: this.props.SwoqyUserData ? this.props.SwoqyUserData.Longitude : 0.0,
                    deviceInfo: this.props.SwoqyUserData ? this.props.SwoqyUserData.DeviceInfo : "",
                    systemLanguage: this.props.userAllData.systemLanguage
                });

                //debugger;

                if (Platform.OS === "ios") {
                    this.props.SignOut();
                }
            }
        }
        else {
            if (this.props.SwoqyUserToken) {
                this.props.SetUserGeneralSettingsData({
                    accountStatus: this.state.accountStatus,
                    OperationType: 2,
                    userToken: this.props.SwoqyUserToken,
                    socialMediaUser: this.props.SocialMediaUser,
                    latitude: 0.0,
                    longitude: 0.0 
                });
            }
        }
    }

    _switchSelect = () => {
        // debugger;
        const options = [];
        options.push({ label: Localizations('Setting.SecurityPassword.option.Off'), value: 0 })
        options.push({ label: Localizations('Setting.SecurityPassword.option.On'), value: 1 })

        // console.log(this.state)
        return (
            <View style={container.center}>
                <SwitchSelector
                    style={{ alignSelf: 'flex-end', width: '100%' }}
                    initial={this.state.accountStatus}
                    onPress={value => this.setState({ accountStatus: value })}
                    textColor='#ff5a5c'
                    selectedColor='#ffffff'
                    buttonColor='#ff5a5c'
                    borderColor='#e9ebed'
                    hasPadding
                    fontSize={13}
                    options={options}
                />
            </View>
        )
    }
    //#endregion

    //#region render operations
    renderUserSecurityPasswordArea = () => {
        if (!this.props.loadingSetSetting2) {
            return (
                <View>
                    <KeyboardAvoidingView behavior="padding" >
                        {
                            (this.props.userAllData.SocialMediaUser == 0 || this.props.userAllData.SocialMediaUser == undefined) &&
                            <Card style={{ margin: 5 }}>
                                <View>
                                    {
                                        this.props.SwoqyUserToken != undefined ?
                                            <Text style={textStyle.settingStyle.general}>{Localizations('Setting.SecurityPassword.ChangePassword')}</Text>
                                            :
                                            <Text style={textStyle.settingStyle.general}>{Localizations('Setting.SecurityPassword.EnterNewPassword')}</Text>
                                    }
                                </View>

                                {this.props.SwoqyUserToken != undefined &&
                                    <View style={{ marginVertical: 5 }}>
                                        <View>
                                            <TextInput
                                                style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textInputName, borderBottomWidth: 1 }}
                                                onChangeText={(txt) => this.setState({ currentPassword: txt })}
                                                value={this.state.currentPassword}
                                                onFocus={() => this.setState({ textCurrent: '#ff585d' })}
                                                onBlur={() => this.setState({ textCurrent: 'lightgray' })}
                                                secureTextEntry
                                                placeholder={Localizations('Setting.SecurityPassword.CurrentPassword')}
                                                keyboardType='default'
                                                // ref={input => this.myInput = input}
                                            />
                                        </View>
                                    </View>
                                }

                                <View style={{ marginVertical: 5 }}>
                                    <View>
                                        <TextInput
                                            style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textNew, borderBottomWidth: 1 }}
                                            onChangeText={(txt) => this.setState({ newPassword: txt }, (this.state.reNewPassword == txt ? this.setState({ NewPassword: txt, textNew: 'green', textReNew: 'green' }) : this.setState({ textNew: '#ff585d', textReNew: '#ff585d' })))}
                                            value={this.state.newPassword}
                                            onFocus={() => this.state.newPassword == null ? this.setState({ textNew: '#ff585d' }) : null}
                                            secureTextEntry
                                            placeholder={Localizations('Setting.SecurityPassword.NewPassword')}
                                            keyboardType='default'
                                        // onBlur={() => this.setState({ textNew: '#lightgray' })}
                                        />
                                    </View>
                                </View>

                                <View style={{ marginVertical: 5 }}>
                                    <View>
                                        <TextInput
                                            style={{ padding: 4, margin: 4, fontSize: 18, borderColor: this.state.textReNew, borderBottomWidth: 1 }}
                                            onChangeText={(txt) => this.setState({ reNewPassword: txt }, (this.state.newPassword == txt ? this.setState({ NewPassword: txt, textNew: 'green', textReNew: 'green' }) : this.setState({ textNew: '#ff585d', textReNew: '#ff585d' })))}
                                            value={this.state.reNewPassword}
                                            onFocus={() => this.state.reNewPassword == null ? this.setState({ textReNew: '#ff585d' }) : null}
                                            secureTextEntry
                                            placeholder={Localizations('Setting.SecurityPassword.ReNewPassword')}
                                            keyboardType='default'
                                        // onBlur={() => this.setState({ textReNew: '#lightgray' })}
                                        />
                                    </View>
                                </View>
                            </Card>
                        }
                    </ KeyboardAvoidingView>

                    <View style={{ marginVertical: 10 }}>
                        <Card >
                            <View>
                                <Text style={textStyle.settingStyle.general}>{Localizations('Setting.SecurityPassword.AccountStatus')}</Text>
                            </View>
                            <View style={[container.row.sb, { marginVertical: 5 }]}>
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={textStyle.settingStyle.security}>{Localizations('Setting.SecurityPassword.explanation')}</Text>
                                </View>

                                {this._switchSelect()}
                            </View>
                        </Card>
                    </View>
                </View>
            );
        } else {
            return <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.UserSettingsSecurityPasswordScreen')} rightButtonJumpPage="userSettingsApplicationPreferancesScreen" parentMethod={this._clickSave} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 20, }}>

                    {this.renderUserSecurityPasswordArea()}

                </View>
            </View>
        );
    }
    //#endregion
}

const mapStateToProps = ({ userGeneralSettingsScreenResponse, startScreenResponse }) => {
    const { res, userAllData, loadingSetSetting2, type, userToken, connectionError, errorCode, errorMessage } = userGeneralSettingsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, userAllData, loadingSetSetting2, type, userToken, connectionError, errorCode, errorMessage, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut })(UserSettingsSecurityPasswordScreen);
