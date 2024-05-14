import React, { useState, useEffect, Component } from 'react';
import {
    Platform, StyleSheet, FlatList, Text, View, Image, TextInput, Alert,
    TouchableHighlight, TouchableOpacity, ImageBackground,
    Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, AppRegistry,

} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { connect } from 'react-redux';
import { emailChanged, passwordChanged, UserSignIn, FacebookUserSignIn, AppleUserSignIn, searchChanged, getData } from '../actions';
import { Button, Link, Card, CardSection, Spinner, ShowMessage, SetSessionTicket } from '../common';

import FBSDK, { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import Loading from '../common/Loading';
import { Localizations, FormatDate } from '../../locales/i18n';
import Data from '../providers/data'
import { Actions } from 'react-native-router-flux';
import { SignOut } from '../actions';
import { getLanguages } from 'react-native-i18n';

const GLOBAL = require('../common/Globals');

var { LocationDenied } = require('../common/GlobalFunctions');


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
        {children}
    </TouchableWithoutFeedback>
);


var dbService = new Data()


import appleAuth, {
    AppleButton,
    AppleAuthError,
    AppleAuthRequestScope,
    AppleAuthRealUserStatus,
    AppleAuthCredentialState,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

/**
 * You'd technically persist this somewhere for later use.
 */
let user = null;






class SignInScreen extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        // console.log(this)
    }

    state = { email: '', password: '', loadingSignIn: false, loadingForgotPassword: false, loadingNewAccount: false, loadingNoSignIn: false, systemLanguage: 'en' };

    _fbAuth() {

        // console.log(this.props); 

        var p = this.props;

        LoginManager.logInWithPermissions(['public_profile']).then(function (result) {
            if (result.isCancelled) {
                console.log("login was cancelled");
            } else {
                console.log('login was a success' + result.grantedPermissions.toString());

                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        //      console.log(data.accessToken.toString())
                        //    this._clickFacebookUserSignIn(data.accessToken.toString());

                        // console.log(data.accessToken.toString());
                        // console.log("sign in");
                        // console.log(this.props);
                        // debugger
                        if ((p.catchLocation != null) && (p.catchLocation != undefined)) {
                            LocationDenied(p.catchLocation);
                        }
                        else {
                            getLanguages().then(languages => {
                                p.FacebookUserSignIn({ token: data.accessToken.toString(), isSignOut: p.signOut, systemLanguage: (languages[0]).substring(0,2)});
                            });
                        }

                    }
                )

            }
        }, function (error) {
            console.log('an error occured:' + error)
        }
        )
    }

    /**
     * Starts the Sign In flow.
     */
    async onAppleButtonPress() {
        //console.warn('Beginning Apple Authentication'); 

        // start a login request
        if ((this.props.catchLocation != null) && (this.props.catchLocation != undefined)) {
            LocationDenied(this.props.catchLocation);
        }
        else {

            try {
                const appleAuthRequestResponse = await appleAuth.performRequest({
                    requestedOperation: AppleAuthRequestOperation.LOGIN,
                    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
                });

                //console.log('appleAuthRequestResponse', appleAuthRequestResponse);

                const {
                    user: newUser,
                    email,
                    identityToken,
                    fullName
                } = appleAuthRequestResponse;

                user = newUser;
                // console.log(identityToken);
                if (identityToken) {
                    this._clickAppleUserSignIn({ user: user, email: email, givenName: fullName.givenName, middleName: fullName.middleName, familyName: fullName.familyName, systemLanguage: this.state.systemLanguage });
                } else {
                    alert("Giriş yapılamadı.")
                }

            } catch (error) {
                if (error.code === AppleAuthError.CANCELED) {
                    console.warn('User canceled Apple Sign in.');
                } else {
                    console.error(error);
                }
            }
        }
    }

    UNSAFE_componentWillMount() {
        
        getLanguages().then(languages => {
            // console.log(languages); // ['en-US', 'en']

            this.setState({
                systemLanguage: (languages[0]).substring(0,2)
            })
            //debugger
          });


        if (this.props.signOut) {
            this._clickFacebookUserSignOut();
        }

        if (this.props.firstLoginEmail != undefined && this.props.firstLoginPassword != undefined) {
            // debugger

            this.firstSignIn(this.props.firstLoginEmail, this.props.firstLoginPassword);
        }
    }

    validate = (text) => {
        //console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            // console.log("Email is Correct");
        }
    }

    //#region Clicks
    _clickAppleUserSignIn(user, email, givenName, middleName, familyName, systemLanguage) {
        this.props.AppleUserSignIn({ user: user, email: email, givenName: givenName, middleName: middleName, familyName: familyName, systemLanguage: systemLanguage });
    }

    _clickFacebookUserSignIn(token) {
        // console.log(token);
        // console.log("sign in");
        if (this.props != undefined) {
            if ((this.props.catchLocation != null) && (this.props.catchLocation != undefined)) {
                LocationDenied(this.props.catchLocation);
            }
            else { 
                debugger
                this.props.FacebookUserSignIn({ token: token, isSignOut: this.props.signOut, systemLanguage: this.state.systemLanguage });
            }
        }
    }

    _clickFacebookUserSignOut() {
        LoginManager.logOut();
    }


    _clickSignIn(isSignOut) {
        // debugger
        if ((this.props.catchLocation != null) && (this.props.catchLocation != undefined)) {
            LocationDenied(this.props.catchLocation);
        }
        else {
            const { email, password } = this.props;
            this.props.UserSignIn({ email, password, isSignOut });
        }
    }


    firstSignIn(email, password) {
        // debugger
        if ((this.props.catchLocation != null) && (this.props.catchLocation != undefined)) {
            LocationDenied(this.props.catchLocation);
        }
        else {
            this.props.UserSignIn({ email, password, isSignOut: true });
        }
    }


    _clickForgotPassword() {
        if ((this.props.catchLocation != null) && (this.props.catchLocation != undefined)) {
            LocationDenied(this.props.catchLocation);
        }
        else {
            Actions.forgotPasswordScreen();
        }
    }

    _clickNewAccount() {
        // Actions.accountScreen();
        // Actions.userGeneralSettingsScreen({ RedirectLoginPage: 1 })
        if ((this.props.catchLocation != null) && (this.props.catchLocation != undefined)) {
            LocationDenied(this.props.catchLocation);
        }
        else {
            Actions.userSettingsPersonalInformationScreen({ from: 'StartScreen' })
        }
    }

    _clickNoSignIn() {
        Actions.wallScreen();
    }
    //#endregion

    //#region Renders
    renderSignInButton() {
        if (!this.props.loadingSignIn) {
            return <Button onPress={() => this._clickSignIn(this.props.signOut)}> {Localizations('SignIn.SignIn')} </Button>;
        }
        return <Spinner size="small" />;
    }

    renderForgotPasswordButton() {
        if (!this.props.loadingForgotPassword) {
            return <Link onPress={this._clickForgotPassword.bind(this)} > {Localizations('SignIn.ForgotPassword')} </Link>;
        }
        return <Spinner size="small" />;
    }

    renderNewAccountButton() {
        if (!this.props.loadingNewAccount) {
            //   return <Link onPress={this._clickNewAccount.bind(this)} > {Localizations('SignIn.NewAccount')} </Link>;
            return <TouchableOpacity onPress={this._clickNewAccount.bind(this)} style={{ alignContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}> {Localizations('SignIn.NewAccount')}</Text>
            </TouchableOpacity>
        }
        return <Spinner size="small" />;
    }

    renderAppleButton() {
        return <View style={styles.subItemWithoutLineStyle}>
            <AppleButton
                style={styles.appleButton}
                cornerRadius={5}
                buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                buttonType={AppleButton.Type.CONTINUE}
                onPress={() => this.onAppleButtonPress()}
            />
        </View>
    }

    renderFacebookButton() {
        const { inputStyle, fbButtonStyle } = styles;

        return <View style={styles.subItemWithoutLineStyle}>
            {/* <LoginButton
                style={fbButtonStyle}

                onLoginFinished={
                    (error, result) => {

                        console.log("log in")
                        if (error) {
                            console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    console.log(data.accessToken.toString())
                                    this._clickFacebookUserSignIn(data.accessToken.toString());
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => {
                    console.log("SignOut oldu");
                    this._clickFacebookUserSignOut()
                }} /> */}

            <TouchableOpacity onPress={() => this._fbAuth()} style={{
                flex: 1,
                backgroundColor: '#4267B2',
                borderRadius: 8,
                borderWidth: 1,

                borderColor: 'lightgray',
                height: 40,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',

            }}>
                <Image source={require('../images/icons/facebook.png')}
                    resizeMode={'center'}
                    // style={{borderRadius:12, width: 24, margin: 5, marginRight: 10 }}
                    style={{width:30,  height: 30, aspectRatio: 1, borderRadius: 15, alignSelf: 'center', resizeMode: 'cover', margin: 5, marginRight: 10  }}
                />
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                }}>{Localizations('SignIn.LoginWithFacebook')}</Text>
            </TouchableOpacity>


        </View>
    }

    renderNoSignInLink() {
        if (!this.props.loadingNoSignIn) {
            const { inputStyle, } = styles;
            //   return <Link onPress={this._clickNoSignIn.bind(this)} > {Localizations('SignIn.NoSignIn')} </Link>;
            return <TouchableOpacity onPress={this._clickNoSignIn.bind(this)} style={{}}>
                <Text style={{ color: 'red' }}> {Localizations('SignIn.NoSignIn')} </Text>
            </TouchableOpacity>
        }
        return <Spinner size="small" />;
    }

    renderUserSignInArea = () => {
        // debugger;
        if (this.state.SwoqyUserToken != null && this.state.SwoqyUserToken != '') {
            return (
                <ShowMessage backgroundStyle="bgStyle"
                    textStyle="txtStyle"
                    text="Zaten giriş yaptınız"
                />
            );
            Actions.wallScreen();
        } else {
            const { inputStyle, fbButtonStyle } = styles;

            return (

                <View style={{ flex: 1 }}>
                    <View style={{
                        flex: 6, alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image source={require('../images/logo.png')}
                            resizeMode={'contain'}
                            style={{ width: '50%' }} ></Image>
                    </View>
                    <View style={{ alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end', justifyContent: 'flex-end', marginBottom: 5, marginRight: 35 }}>
                        <Text style={{ fontSize: 10, color: 'white' }}>{GLOBAL.VERSION}</Text>
                    </View>
                    <SafeAreaView>
                        <View style={{

                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#fff',
                            marginRight: 25,
                            marginLeft: 25,
                            backgroundColor: 'white',
                            alignContent: 'center',
                            alignItems: 'center'
                        }}>

                            <View style={{
                                flexDirection: 'column',
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center'
                            }}>
                                <View style={styles.subItemStyle}>
                                    <TextInput
                                        placeholder={Localizations('SignIn.Email')}
                                        style={inputStyle}
                                        value={this.props.email}
                                        onChangeText={email => this.props.emailChanged(email)}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                </View>
                                <View style={styles.subItemStyle}>
                                    <TextInput
                                        secureTextEntry
                                        placeholder={Localizations('SignIn.Password')}
                                        style={inputStyle}
                                        value={this.props.password}
                                        onChangeText={password => this.props.passwordChanged(password)}
                                        keyboardType='default'
                                    />
                                </View>
                                <View style={styles.subItemWithoutLineStyle}>
                                    {this.renderSignInButton()}
                                </View>

                                <View style={{ height: 25, alignContent: 'flex-end', alignItems: 'flex-end' }}>
                                    {this.renderForgotPasswordButton()}
                                </View>

                                {/*                                     
                                    <View style={styles.noSignIn}>
                                        {this.renderNoSignInLink()}
                                    </View> */}

                                {this.renderFacebookButton()}

                                {appleAuth.isSupported &&
                                    this.renderAppleButton()
                                }

                            </View>

                        </View>
                        <View style={{ height: 25, marginTop: 20 }}>
                            {this.renderNewAccountButton()}
                        </View>
                    </SafeAreaView>
                    <View style={{ flex: 4 }}>

                    </View>

                </View>

            );
        }

    }


    render() {

        return (

            <View style={{ backgroundColor: '#ff585c', flex: 1 }}>
                <DismissKeyboard>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior="padding"
                    >
                        {this.renderUserSignInArea()}


                    </KeyboardAvoidingView>
                </DismissKeyboard>
            </View>

        );

    }
}

//#region Styles
const styles = {
    appleButton: {
        flex: 1,
        height: 40,

    },
    header: {
        margin: 10,
        marginTop: 30,
        fontSize: 18,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#282828',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 5,
        //paddingBottom: 10
    },
    linkStyle: {
        flex: 1,
        alignSelf: 'stretch',
        //backgroundColor: '#fff',
        //borderRadius: 5,
        //borderWidth: 1,
        //borderColor: '#007aff',
        marginLeft: 0,
        marginRight: 0
    },

    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16,
        flex: 1,
        backgroundColor: '#e5e9ed',
        height: 40,
    },
    fbButtonStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        //fontSize: 16,
        flex: 1,
        height: 40,
        borderRadius: 8,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    subItemStyle: {
        borderBottomWidth: 0,
        margin: 5,
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    subItemWithoutLineStyle: {
        height: 60,
        margin: 5,
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },
    noSignIn: {
        height: 30,
        margin: 5,
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },
    textStyle: {
        alignSelf: 'center',
        color: '#282828',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 5,
        //paddingBottom: 10
    },
    linkStyle: {
        flex: 1,
        alignSelf: 'stretch',
        //backgroundColor: '#fff',
        //borderRadius: 5,
        //borderWidth: 1,
        //borderColor: '#007aff',
        marginLeft: 0,
        marginRight: 0
    }
};
//#endregion


const mapStateToProps = ({ signInScreenResponse, startScreenResponse, userGeneralSettingsScreenResponse }) => {
    const { loadingSignIn, email, password, loadingForgotPassword, loadingNewAccount, loadingNoSignIn, search } = signInScreenResponse;
    const { userAllData } = userGeneralSettingsScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        SwoqyUserToken,
        userAllData,
        email,
        password,
        loadingSignIn, loadingForgotPassword, loadingNewAccount, loadingNoSignIn, search
    };
};



export default connect(mapStateToProps, { emailChanged, passwordChanged, UserSignIn, FacebookUserSignIn, AppleUserSignIn, searchChanged, getData, SignOut })(SignInScreen);
