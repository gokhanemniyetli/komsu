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

class UserGeneralSettingsScreen extends Component {
    state = { res: '', userAllData: '' };

    //#region Component operations
    UNSAFE_componentWillMount()  {

        this.setState

        if (this.props.RedirectLoginPage == 1) {
            Actions.userSettingsPersonalInformationScreen();
        }
        if (this.props.userAllData != "") {
            if (this.props.userAllData.Email) {
                res = this.props.userAllData;
                this.setState({
                    data: res,
                    userName: res.Name,
                    userSurname: res.Surname,
                    selectedImage: res.SelectedImage,
                    registered: res.Registered
                });
                if (res.UserPhoto) {
                    this.setState({
                        userPhoto: res.UserPhoto.Name
                    })
                }
            }
            else {
                this.props.UserGeneralSettingsScreenData({
                    latitude: '', longitude: '', userToken: this.props.SwoqyUserToken,
                    latitude: this.props.SwoqyUserData.Latitude,
                    longitude: this.props.SwoqyUserData.Longitude
                });
            }

        }
        else {
            this.props.UserGeneralSettingsScreenData({
                latitude: '', longitude: '', userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
        }
    }


    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.userAllData) {
            if (nextProps.userAllData.Email || nextProps.userAllData.SocialMediaUser == 1) {
                res = nextProps.userAllData;

                if (nextProps.type == 'user_generalsettings_screen_data_success') {
                    //console.log(nextProps)
                    //debugger
                    this.setState({
                        data: res,
                        userName: res.Name,
                        userSurname: res.Surname,
                        registered: res.Registered,
                        socialMediaUser: res.SocialMediaUser
                    });
                    if (res.UserPhoto) {
                        this.setState({
                            userPhoto: res.UserPhoto.Name
                        })
                    }
                }
            }
        }
    }
    //#endregion

    //#region click functions
    _clickSignOut = () => {
        //debugger
        this.props.SignOut();
    }

    _clickProfile = (userID) => {
        // debugger
        Actions.userProfileScreen({ ID: userID });
    }

    _clickSecurityAndPassword() {
        if (this.props.userAllData.Email == null) {
            alert("Kullanıcı bilgileri doldurulmadı.");
        }
        else {
            Actions.userSettingsSecurityPasswordScreen();
        }
    }
    //#endregion

    //#region render operations
    renderUserSettingsArea = () => {
        if (!this.props.loadingUserGeneralSettings) {
            // console.log(this.state.socialMediaUser);
            // debugger
            return (
                <View style={container.center}>
                    <View style={{ flex: 3 }}>
                        {
                            (this.props.userAllData != '') &&
                                this.props.userAllData.Name ?
                                <View style={[container.row, { flex: 1, margin: 10 }]}>

                                    {
                                        this.props.userAllData.SelectedImage != null ?
                                            <LetterCircle
                                                uri={this.props.userAllData.SelectedImage.uri}
                                                data={this.props.userAllData.Name + " " + this.props.userAllData.Surname}
                                                circleSize={80}
                                            />
                                            :
                                            <LetterCircle
                                                photo={this.props.userAllData.UserPhoto && this.props.userAllData.UserPhoto.Name}
                                                data={this.props.userAllData.Name + " " + this.props.userAllData.Surname}
                                                circleSize={80}
                                            />
                                    }

                                    <View style={{ marginLeft: 20 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[textStyle.commentStyle.name, { fontSize: 20 }]}>{this.state.userName + " " + this.state.userSurname}</Text>
                                            {
                                                this.state.registered === true &&
                                                <Image
                                                    style={imageStyle.registeredStyle}
                                                    source={require('../images/icons/registered.png')}
                                                />
                                            }
                                        </View>

                                    </View>
                                </View>
                                :
                                <View style={container.center}>
                                    <TouchableOpacity style={container.center.center} onPress={() => this._clickSignOut()}>
                                        <View>
                                            <Text style={textStyle.settingStyle.general}>{Localizations('Setting.SignIn')}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>

                    <View style={{ flex: 7 }}>

                        {this.state.socialMediaUser != 1 &&
                            <View>
                                <TouchableOpacity style={container.center.center} onPress={() => Actions.userSettingsPersonalInformationScreen({ emailChange: false })}>
                                    <View>
                                        <Text style={textStyle.settingStyle.general}>{Localizations('Setting.PersonalInformation.title')}</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />
                            </View>
                        }

                        {this.state.socialMediaUser == 0 &&
                            <View>

                                <TouchableOpacity disabled={(!this.props.SwoqyUserToken && this.props.userAllData.Email == null) ? true : false} style={container.center.center} onPress={() => this._clickSecurityAndPassword()}>
                                    <View>
                                        <Text style={[(!this.props.SwoqyUserToken && this.props.userAllData.Email == null) && { opacity: 0.5 }, textStyle.settingStyle.general]}>{Localizations('Setting.SecurityPassword.title')}</Text>
                                    </View>
                                </TouchableOpacity>


                                <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />
                            </View>
                        }



                        <TouchableOpacity disabled={(!this.props.SwoqyUserToken && this.props.userAllData.NewPassword == null) ? true : false} style={container.center.center} onPress={() => Actions.userSettingsApplicationPreferencesScreen()}>
                            <View>
                                <Text style={[(!this.props.SwoqyUserToken && this.props.userAllData.NewPassword == null) && { opacity: 0.5 }, textStyle.settingStyle.general]}>{Localizations('Setting.ApplicationPreferences.title')}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />

                        <TouchableOpacity disabled={(!this.props.SwoqyUserToken && this.props.userAllData.NewPassword == null) ? true : false} style={container.center.center} onPress={() => Actions.userSettingsPrivacyScreen()}>
                            <View>
                                <Text style={[(!this.props.SwoqyUserToken && this.props.userAllData.NewPassword == null) && { opacity: 0.5 }, textStyle.settingStyle.general]}>{Localizations('Setting.Privacy.title')}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />

                        <TouchableOpacity style={container.center.center} onPress={() => Linking.openURL("https://www.komsuapp.com/kullanim-kosullari.html")}>
                            <View>
                                <Text style={textStyle.settingStyle.general}>{Localizations('Setting.LegalInformationPrinciples')}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />

                        <TouchableOpacity style={container.center.center} onPress={() => Linking.openURL("https://komsuapp.com/sss.html")}>
                            <View>
                                <Text style={textStyle.settingStyle.general}>{Localizations('Setting.HelpSupport')}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />

                        <TouchableOpacity onPress={() => Actions.aboutSwoqyScreen()}>
                            <View>
                                <Text style={textStyle.settingStyle.general}>{Localizations('Setting.AboutSwoqy.Title')}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ borderWidth: 0.5, borderColor: '#ff585c', marginVertical: 15, marginHorizontal: -15 }} />

                        {
                            this.props.SwoqyUserToken &&
                            <TouchableOpacity onPress={() => this._clickSignOut()}>
                                <View>
                                    <Text style={textStyle.settingStyle.general}>{Localizations('Setting.SignOut')}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        <View style={{ height: 40 }}></View>
                    </View>
                </View>
            );
        } else {
            return <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.UserAccountSettingsScreen')} />
                </View> */}
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    {this.renderUserSettingsArea()}
                </ScrollView>
            </View>
        );
    }
    //#endregion
}

const mapStateToProps = ({ userGeneralSettingsScreenResponse, startScreenResponse }) => {
    const { res, userAllData, loadingUserGeneralSettings, type, userToken, connectionError } = userGeneralSettingsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, userAllData, loadingUserGeneralSettings, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { UserGeneralSettingsScreenData, SignOut })(UserGeneralSettingsScreen);
