import React, { Component } from 'react';
import { Text, Button, View, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SignInControl, SignOut } from '../actions';


import { IsSignIn, SetSessionTicket, ClearSessionTicket } from '../common';

import { LoginManager } from 'react-native-fbsdk';

import { Spinner } from '../common';

import firebase from 'react-native-firebase'

// Burası AdMob için açılacak
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'



const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class StartScreen extends Component {
    constructor(props) {
        super(props);

        //console.log("burdayım2")
        //  console.log(props)
    }



    //// Burası AdMob için açılacak

    UNSAFE_componentWillMount() {


        // Interstatial Start
        //______________________________________________________________________________________________________________________
        //this.props.SetAdStatus({ AdStatus: '' });

        AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/9119878094' : 'ca-app-pub-2031837306819302/9751155601');

        // AdMobInterstitial.removeAllListeners();

        AdMobInterstitial.requestAd()
            .then(() => {
                AdMobInterstitial.showAd();
            })
            .catch(error => {
              //  console.log("REKLAM çağırılırken hata oldu");

                console.warn(error)
            });


        AdMobInterstitial.addEventListener('adLoaded', (x) => {
            //console.log("REKLAM yüklendi");
            //this.props.SetAdStatus({ AdStatus: 'adLoaded' });

        });

        AdMobInterstitial.addEventListener('adFailedToLoad', error => {
            //console.log("REKLAM yüklenirken hata oldu");
            //this.props.SetAdStatus({ AdStatus: 'adFailedToLoad' });
        }
        );

        AdMobInterstitial.addEventListener('adOpened', () => {
            //console.log("REKLAM açıldı");
            //this.props.SetAdStatus({ AdStatus: 'adOpened' });
        }
        );

        AdMobInterstitial.addEventListener('adClosed', () => {
            {
                //  console.log("REKLAM kapatıldı");

                //this.props.SetAdStatus({ AdStatus: 'adClosed' });
                //AdMobInterstitial.requestAd().catch(error => console.warn(error));
            }
        });

        AdMobInterstitial.addEventListener('adLeftApplication', () => {
            //console.log("REKLAM dan ayrıldı");
            //this.props.SetAdStatus({ AdStatus: 'adLeftApplication' });
        });


        // const messaging = firebase.messaging();

        // messaging.hasPermission()
        //     .then((enabled) => {
        //         // debugger
        //         if (enabled) {
        //             messaging.getToken()
        //                 .then(token => {
        //                     console.log(token);
        //                     this.props.SignInControl(token);
        //                 })
        //                 .catch(error => {
        //                     console.log("error #1")
        //                     this.props.SignInControl();
        //                 })
        //         } else {
        //             messaging.requestPermission()
        //                 .then(() => {
        //                     console.log("permission xxx")
        //                     this.props.SignInControl();
        //                 })
        //                 .catch(error => {
        //                     console.log("error #2");
        //                     this.props.SignInControl();
        //                 })
        //         }
        //     })
        //     .catch(error => { console.log("error #3" + error) });

    }

    componentWillUnmount() {
        AdMobInterstitial.removeAllListeners();

    }

    showInterstitial() {
        //console.log("reklam gösterilmeye çalışılıyor.")
    //    AdMobInterstitial.showAd().catch(error => { console.warn(error) });
    }





    // UNSAFE_componentWillMount()  {
    //     // debugger
    //             const messaging = firebase.messaging();

    //             messaging.hasPermission()
    //                 .then((enabled) => {
    //                     // debugger
    //                     if (enabled) {
    //                         messaging.getToken()
    //                             .then(token => {
    //                                 console.log(token);
    //                                 this.props.SignInControl(token);
    //                             })
    //                             .catch(error => {
    //                                 console.log("error #1")
    //                                 this.props.SignInControl();
    //                             })
    //                     } else {
    //                         messaging.requestPermission()
    //                             .then(() => {
    //                                 console.log("permission xxx")
    //                                 this.props.SignInControl();
    //                             })
    //                             .catch(error => {
    //                                 console.log("error #2");
    //                                 this.props.SignInControl();
    //                             })
    //                     }
    //                 })
    //                 .catch(error => { console.log("error #3" + error) });
    //         }







    _entry = () => {

        // this.props.SetAdStatus({ AdStatus: 'play' });

        const messaging = firebase.messaging();

        messaging.hasPermission()
            .then((enabled) => {
                // debugger
                if (enabled) {
                    messaging.getToken()
                        .then(token => {
                           // console.log(token);
                            this.props.SignInControl(token);
                        })
                        .catch(error => {
                          //  console.log("error #1")
                            this.props.SignInControl();
                        })
                } else {
                    messaging.requestPermission()
                        .then(() => {
                          //  console.log("permission xxx")
                            this.props.SignInControl();
                        })
                        .catch(error => {
                          //  console.log("error #2");
                            this.props.SignInControl();
                        })
                }
            })
            .catch(error => { console.log("error #3" + error) });
    }



    render() {
        // debugger
        const { navigation } = this.props;
        const otherParam = navigation.getParam('otherParam', 'some default value');
        const imageSize = screenWidth * 0.6;

        if (otherParam == 'logOut') {
            //debugger;
            if (this.props.SignOut()) {
                LoginManager.logOut();
            }
        }

        // // Burası AdMob için açılacak
        // if (this.props.adStatus == 'play') {
        //     this.props.SetAdStatus('');
        //     this.showInterstitial();
        // }


        //Burası AdMob için açılacak
        //debugger
        // if (this.props.adStatus == '') {
            return (
                <View style={{ flex: 1, backgroundColor: '#ff585c', alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity onPress={() => this._entry()}>
                        <Image
                            //style={imageStyle.registeredStyle}
                            source={require('../images/logo.png')}
                        />
                        <Text style={{ fontSize: 30, color: 'white' }}></Text>
                        <Text style={{ fontSize: 30, color: 'white' }}>Giriş için dokunun</Text>
                    </TouchableOpacity>
                </View>
            );
        // }
        // return (
        //     <View style={{ flex: 1, backgroundColor: '#ff585c', alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
        //         <Spinner size="large" />
        //     </View>
        // );
    }
}

const mapStateToProps = ({ startScreenResponse }) => {
    const { loading, SwoqyUserToken} = startScreenResponse;
    return { loading, SwoqyUserToken};
};

export default connect(mapStateToProps, { SignInControl})(StartScreen)