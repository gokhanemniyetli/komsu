import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ListView, SafeAreaView, Platform, BackHandler, Alert, Modal, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { WallUserScreenData, WallPostsScreenData, SetAdStatus } from '../actions';
import { Spinner, NoContent, ShowNumber, ShowMessage, LetterCircle, Card } from '../common';
import { Localizations } from '../../locales/i18n';

import ListItemPost from '../components/ListItemPost';
import Slider from '@react-native-community/slider';

import Share from 'react-native-share';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'
import { ScrollView } from 'react-native-gesture-handler';


import { enablePromise } from 'react-native-sqlite-storage';



var { LoginControl } = require('../common/GlobalFunctions');


// const checkIfPackageIsInstalled = async () => {


//     //console.log(userNameSurname);
//     const shareOptions = { 
//         title: userNameSurname + 'Swoqy`de seninle birşeyler paylaşmak istiyor.',
//         //subject: userNameSurname + 'Swoqy`de seninle birşeyler paylaşmak istiyor.',
//         showAppsToView: true,
//         message: 'Merhaba, ' + userNameSurname + ' seni Swoqy`ye katılmaya devat ediyor. Seninle harika içerikler paylaşacağına inanıyoruz. Swoqy`yi cebine indir, trendi yakala.',
//         url: 'https://www.swoqy.com/ads/swoqy.html'
//     };

//     Share.open(shareOptions)
//         .then((res) => { console.log(res) })
//         .catch((err) => { err && console.log(err); });

// }


const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');


const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 1000;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};






// // adMobBanners  "IOS", "Android" 
const adMobIOS = [];
adMobIOS.push("ca-app-pub-2031837306819302/4764344856"); // banner reklamı
adMobIOS.push("ca-app-pub-2031837306819302/9450343097"); // IOS 2
adMobIOS.push("ca-app-pub-2031837306819302/8384673430"); // IOS 3
adMobIOS.push("ca-app-pub-2031837306819302/6824179752"); // IOS 4
adMobIOS.push("ca-app-pub-2031837306819302/4249987303"); // IOS 5
adMobIOS.push("ca-app-pub-2031837306819302/1056847755"); // IOS 6
adMobIOS.push("ca-app-pub-2031837306819302/3539540868"); // IOS 7
adMobIOS.push("ca-app-pub-2031837306819302/5650698888"); // IOS 8
adMobIOS.push("ca-app-pub-2031837306819302/1013805090"); // IOS 9
adMobIOS.push("ca-app-pub-2031837306819302/4761478412"); // IOS 10

const adMobAndroid = [];
adMobAndroid.push("ca-app-pub-2031837306819302/4851835105"); // A 1
adMobAndroid.push("ca-app-pub-2031837306819302/2586626238"); // A 2
adMobAndroid.push("ca-app-pub-2031837306819302/7286426750"); // A 3
adMobAndroid.push("ca-app-pub-2031837306819302/7426027559"); // A 4
adMobAndroid.push("ca-app-pub-2031837306819302/3291341421"); // A 5
adMobAndroid.push("ca-app-pub-2031837306819302/9721018407"); // A 6
adMobAndroid.push("ca-app-pub-2031837306819302/8538146283"); // A 7
adMobAndroid.push("ca-app-pub-2031837306819302/4690400617"); // A 8
adMobAndroid.push("ca-app-pub-2031837306819302/4799864211"); // A 9
adMobAndroid.push("ca-app-pub-2031837306819302/9860619203"); // A 10



class WallScreen extends Component {
    constructor(props) {
        super(props);

        state = {
            res: '',
            type: '',
            userToken: '',
            connectionError: false,
            maxActionID: 0,
            distanceValue: 2
        };

        // // Display an interstitial
        //AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        //AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        //AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

        //    // Display a rewarded ad
        // AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
        // AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());


    }

    backAction = () => {
        if (Actions.currentScene == "wallScreen") {
            BackHandler.exitApp()
        }
        else {
            Actions.pop();
        }
        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }


    // getNotification() {
    //     PushNotification.localNotification({
    //         /* Android Only Properties */
    //         // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //         // ticker: "My Notification Ticker", // (optional)
    //         // autoCancel: true, // (optional) default: true
    //         // largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    //         // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    //         // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    //         // subText: "This is a subText", // (optional) default: none
    //         // color: "red", // (optional) default: system default
    //         // vibrate: true, // (optional) default: true
    //         // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //         // tag: "some_tag", // (optional) add tag to message
    //         // group: "group", // (optional) add group to message
    //         // ongoing: false, // (optional) set whether this is an "ongoing" notification
    //         // priority: "high", // (optional) set notification priority, default: high
    //         // visibility: "private", // (optional) set notification visibility, default: private
    //         // importance: "high", // (optional) set notification importance, default: high
    //         // allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    //         // ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

    //         // /* iOS only properties */
    //         // alertAction: "view", // (optional) default: view
    //         // category: "", // (optional) default: empty string
    //         // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)

    //         /* iOS and Android properties */
    //         title: "My Notification Title", // (optional)
    //         message: "My Notification Message", // (required)
    //         // playSound: false, // (optional) default: true
    //         // soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //         // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //         // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    //         // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    //     });

    // }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        //AdMobInterstitial.removeAllListeners();
    }


    showInterstitial() {
        //AdMobInterstitial.showAd().catch(error => console.warn(error));
    }

    


    //#region Component operations
    UNSAFE_componentWillMount() {

        this.setState({
            messageModalVisible: false,
            showStartScreenAd: this.props.fromStartScreen,
            askNewVersion: false
        })





        // // Interstatial Start
        // //______________________________________________________________________________________________________________________
        // this.props.SetAdStatus({ AdStatus: '' });

        // AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/9119878094' : 'ca-app-pub-2031837306819302/5725933075');

        // AdMobInterstitial.requestAd().catch(error => console.warn(error));

        // AdMobInterstitial.addEventListener('adLoaded', (x) => {
        //     this.props.SetAdStatus({ AdStatus: 'adLoaded' });
        // });

        // AdMobInterstitial.addEventListener('adFailedToLoad', error => {
        //     this.props.SetAdStatus({ AdStatus: 'adFailedToLoad' });
        // }
        // );

        // AdMobInterstitial.addEventListener('adOpened', () => {
        //     this.props.SetAdStatus({ AdStatus: 'adOpened' });
        // }
        // );

        // AdMobInterstitial.addEventListener('adClosed', () => {
        //     {
        //         this.props.SetAdStatus({ AdStatus: 'adClosed' });
        //         AdMobInterstitial.requestAd().catch(error => console.warn(error));
        //     }
        // });

        // AdMobInterstitial.addEventListener('adLeftApplication', () => {
        //     this.props.SetAdStatus({ AdStatus: 'adLeftApplication' });
        // });

        // //______________________________________________________________________________________________________________________
        // // Interstatial END









        if (LoginControl(this.props.SwoqyUserToken)) {

            if (this.props.SwoqyUserData != "" && this.props.SwoqyUserData != undefined) {
                this.setState({
                    //userID: res.UserID,
                    userNameSurname: this.props.SwoqyUserData.UserNameSurname,
                    userPhoto: this.props.SwoqyUserData.UserPhoto,
                    friendRequestCount: 0,
                    messageCount: 0,
                    opportunityCount: 0,
                });
            }


            //console.log(this.props.SwoqyUserData);

            this.props.WallUserScreenData({
                userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude,
            });

            this.props.WallPostsScreenData({
                userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
        }
    }



    promptUser = () => {
        const title = 'Yeni versiyon yayında!';
        const message = 'Lütfen yeni versiyonu yükleyiniz.';
        const buttons = [
            {
                text: 'Vazgeç', type: 'cancel', onPress: () => {
                    Linking.openURL('https://play.google.com/store/apps/details?id=com.komsuapp');
                    BackHandler.exitApp();
                }
            },
            {
                text: 'Yükle', onPress: () => {
                    Linking.openURL('https://play.google.com/store/apps/details?id=com.komsuapp');
                    BackHandler.exitApp();
                }
            }
        ];
        Alert.alert(title, message, buttons);

        this.setState({ askNewVersion: true })
    }



    UNSAFE_componentWillReceiveProps(nextProps) {

        // console.log(this.props)
        // console.log(nextProps)

        //   console.log(nextProps)
        //    debugger
        // // console.log("wallScreen * receiveProps")
        // console.log(nextProps);
        // debugger

        // debugger;


        if (nextProps.type == 'wall_user_screen_data_success') {
            //  debugger;
            res = nextProps.resUser;
            this.setState({
                userID: res.UserID,
                // userNameSurname: res.UserNameSurname,
                // userPhoto: res.UserPhoto,
                friendList: res.FriendList,
                friendCount: res.FriendCount,
                followerCount: res.FollowerCount,
                followingCount: res.FollowingCount,
                friendRequestCount: res.FriendRequestCount,
                messageCount: res.MessageCount,
                opportunityCount: res.OpportunityCount,
                registered: res.Registered,
                wallContentBanner: res.WallContentBanner,
                contentBanner: res.ContentBanner,
                commentBanner: this.refs.CommmentBanner,
                messageModalVisible: (res.MessageModalVisible == undefined ? false : res.MessageModalVisible)
            });


            // if (this.state.showStartScreenAd == 1 && nextProps.resUser.CommentBanner == true && this.state.askNewVersion == false) {
            //     if (Platform.OS != 'ios') {
            //         this.promptUser()
            //     }
            // }



            // if (this.state.showStartScreenAd == 1 && nextProps.resUser.CommentBanner == true)
            // { 
            // setTimeout(() => {
            //     //  // Display an interstitial
            //     // AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/9119878094' : 'ca-app-pub-2031837306819302/7453241503');
            //     // // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            //     // AdMobInterstitial.requestAd().then(() => {AdMobInterstitial.showAd(); console.log("wallscreen: 7453241503" )});

            //     if (this.props.adStatus == 'play') {
            //         this.props.SetAdStatus('');
            //         this.showInterstitial();

            //     }
            //   }, 3000);

            //     this.setState({
            //         showStartScreenAd: 0
            //     })
            // }
        }

        if ((nextProps.type == 'wall_posts_screen_data_success') || (nextProps.type == 'extra_data_success')) {
            // debugger;
            res = nextProps.resPosts;

            if (this.state.maxActionID) {
                //console.log(comments);
                this.setState(x => {
                    let copy = Array.from(x.postList);
                    res.PostList.map(item =>
                        copy.push(item)
                    )
                    return { postList: copy }
                });
            }
            else {
                // debugger
                this.setState({
                    postList: res.PostList,
                    distanceValue: res.Distance
                });
            }


        }



    }


    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps);
        // console.log(nextState);
        // console.log(this.state);

        if (nextState.postList === this.state.postList) {
            // console.log("post list değiştiği için render etmedi")
            return false    //"postList" state i değişmediyse componenti tekrar render etme
        }
        else {
            // // console.log("render etti")
            // console.log("1");
            // console.log(nextState.postList)
            // console.log(2)
            // console.log(this.state.postList)
            // console.log(3)
            return true
        }
    }
    //#endregion

    _reloadScreen = (val) => {
        // debugger
        this.props.WallPostsScreenData({
            userToken: this.props.SwoqyUserToken, distance: val,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude
        });
        this.setState({
            distanceValue: val,
            maxActionID: undefined,
            oldMaxActionID: 0
        });
    }

    //#region click functions

    _clickNewPost() {
        // console.log(tiklandi)
        Actions.post()
    }

    _clickFriendRequests() {
        Actions.friendRequestsScreen()
    }

    _clickMessages() {
        Actions.messageListScreen()
    }

    _clickOpportunities() {
        return;
    }

    _clickModalClose() {
        this.setState({
            messageModalVisible: false
        })
    }

    _clickInviteAndClose() {
        this._clickModalClose();

        setTimeout(() => {
            this._clickInvite();
        }, 1000);
    }

    _clickInvite() {
        //checkIfPackageIsInstalled({ userNameSurname: this.props.userNameSurname, userPhoto: this.props.userPhoto });

        //console.log(userNameSurname);
        const shareOptions = {
            title: this.state.userNameSurname + ' sana bir davetiye gönderdi.',
            subject: this.state.userNameSurname + ' sana bir davetiye gönderdi.',
            showAppsToView: true,
            message: this.state.userNameSurname + ' sana Komşu uygulamasına giriş davetiyesi gönderdi. Komşu uygulamasını kullanarak hem ' + this.state.userNameSurname + ' hem de etrafındaki diğer kişilerin paylaşımlarını görebilir, onlarla tanışabilir ve paylaşımda bulunabilirsin.',
            url: 'https://www.komsuapp.com/ads/komsu.html'
        };

        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }

    oldMaxActionID = 0;
    maxActionID = 0;
    _clickMore() {
        //console.log(this.state)
        //debugger
        if (this.state.postList) {

            // this.state.postList.map(item => {

            //     if (item.ActionID < this.maxActionID) {
            //         this.maxActionID = item.ActionID;
            //     }
            // }
            // )

            if (this.state.postList.length > 0) {
                if (this.state.postList[this.state.postList.length - 1].ActionID) {
                    this.maxActionID = this.state.postList[this.state.postList.length - 1].ActionID;
                }
            }
        }

        if (this.oldMaxActionID != this.maxActionID || this.maxActionID == 0) {
            this.setState({
                maxActionID: this.maxActionID
            })

            this.props.WallPostsScreenData({
                userToken: this.props.SwoqyUserToken, maxActionID: this.maxActionID, distance: this.state.distanceValue,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
        }

        this.oldMaxActionID = this.maxActionID;
    }

    // endregion

    renderUserInfoArea() {
        // console.log(this.state);
        //debugger;


        return (
            <View>
                <View style={{
                    backgroundColor: 'white', padding: 15,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 2,
                    shadowOpacity: 0.2,
                    elevation: 5,
                }}>

                    {(this.props.SwoqyUserToken != null && this.props.SwoqyUserToken && this.state.userNameSurname) ?
                        <View>
                            <View style={container.row}>
                                <LetterCircle
                                    photo={this.state.userPhoto}
                                    data={this.state.userNameSurname}
                                    circleSize={60}
                                />

                                <View style={[container.left, { marginLeft: 10, flex: 1, flexDirection: 'column' }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 3, flexDirection: 'column' }}>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={textStyle.userProfileStyle.name.xl}>{this.state.userNameSurname}</Text>

                                                {
                                                    this.state.registered &&
                                                    <Image
                                                        style={imageStyle.registeredStyle}
                                                        source={require('../images/icons/registered.png')}
                                                    />
                                                }
                                            </View>


                                        </View>

                                        <View style={{ flex: 1, alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end', }}>
                                            <View style={{ alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end', }}>
                                                {
                                                    this.state.friendRequestCount != 0 &&
                                                    <TouchableOpacity style={[container.row]} onPress={this._clickFriendRequests}>
                                                        <Image source={require('../images/icons/FriendRequest_1.png')} style={imageStyle.iconStylePink} />
                                                        <View>
                                                            <ShowNumber numberStyle="2" number={this.state.friendRequestCount} circleSize={20} />
                                                        </View>
                                                    </TouchableOpacity>
                                                }

                                                <TouchableOpacity style={[container.row]} onPress={this._clickMessages}>
                                                    <Image source={require('../images/icons/message.png')} style={this.state.messageCount != 0 ? imageStyle.iconStylePink : imageStyle.iconStyle} />
                                                    {
                                                        this.state.messageCount != 0 &&
                                                        <View>
                                                            <ShowNumber numberStyle="2" number={this.state.messageCount} circleSize={20} />
                                                        </View>
                                                    }
                                                </TouchableOpacity>

                                                {/* {
                                        this.state.opportunityCount != 0 &&

                                        <TouchableOpacity style={[container.row]} onPress={() => this._clickOpportunities()}>
                                            <Image source={require('../images/icons/banaOzel.png')} style={imageStyle.iconStyle} />
                                            <View>
                                                <ShowNumber numberStyle="2" number={this.state.opportunityCount} circleSize={20} />
                                            </View>
                                        </TouchableOpacity>
                                    } */}


                                                {/* <TouchableOpacity onPress={this.getNotification}><Text>Notification</Text></TouchableOpacity> */}

                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity style={{ height: 38, backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }} onPress={this._clickNewPost}>
                                                <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('WallScreen.ShareSomething')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }} onPress={() => this._clickInvite()}>
                                                <Image source={require('../images/icons/invite.png')} style={imageStyle.iconStyleMiddleWhite} />
                                                <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('WallScreen.Invite')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </View>

                        :

                        <View style={{ margin: 10, padding: 10, borderColor: 'gray', borderWidth: 1, }}>

                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[textStyle.logoStyle.md, { color: 'black', fontWeight: 'bold' }]}>{Localizations('WallScreen.FollowTrend')}</Text>
                            </View>

                            <TouchableOpacity onPress={Actions.signInScreen()}>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={[textStyle.logoStyle.md, { color: '#ff585c', fontWeight: 'bold' }]}>{Localizations('WallScreen.ShareSomethingYou')}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    }

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'white', padding: 5, margin: 5, width: '100%' }}>
                    <Text>{Localizations('WallScreen.Region')}</Text>
                    <Slider
                        style={{ width: 150, height: 40, marginLeft: 10, marginRight: 10 }}
                        minimumValue={0}
                        maximumValue={3}
                        minimumTrackTintColor="gray"
                        maximumTrackTintColor="lightgray"
                        value={this.state.distanceValue}
                        onValueChange={val => this._reloadScreen(val)}
                        step={1}
                        thumbTintColor={'#ff585c'}
                    // thumbImage={require('../images/icons/FriendRequest_1.png')}
                    />
                    <Text style={{ width: 100, }}>{this.state.distanceValue == 0 ? Localizations('WallScreen.Building') :
                        this.state.distanceValue == 1 ? Localizations('WallScreen.Sites') :
                            this.state.distanceValue == 2 ? Localizations('WallScreen.Street') :
                                Localizations('WallScreen.District')}</Text>
                </View>
            </View>
        )

    }


    _renderItem = (item, index) => (
        <View>

            <ListItemPost
                posts={item}
                userID={this.state.userID}
                userNameSurname={this.state.userNameSurname}
                userPhoto={this.state.userPhoto}
                index={index}
            />

            {
                this.state.wallContentBanner == true &&
                // ((index % 10) == 0) &&
                ((index % 6) == 0 && index != 0) &&
                <View style={{
                    backgroundColor: 'white', marginTop: 15, borderRadius: 0, padding: 5,
                    shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, shadowOpacity: 0.2,
                    elevation: 3, alignContent: 'center', alignItems: 'center', alignItems: 'center'

                }}>
                    <AdMobBanner
                        adSize={index % 4 == 0 ? "banner" :
                            index % 4 == 1 ? "largeBanner" :
                                index % 4 == 2 ? "mediumRectangle" : "smartBannerPortrait"
                        }

                        //adUnitID="ca-app-pub-2031837306819302/9271879150"
                        adUnitID={Platform.OS === "ios" ? adMobIOS[index % 10] : adMobAndroid[index % 10]}
                    // testDevices={[AdMobBanner.simulatorId]}
                    //  onAdFailedToLoad={error => alert(error)}
                    // onAdLoaded={load => alert("yüklendi")}
                    // didFailToReceiveAdWithError={this.bannerError}
                    />


                </View>
            }
        </View>
    );



    renderListFooter() {

        return (
            <View style={container.center}>
                {(!this.props.loadingExtraData) ?
                    <TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: 'white', borderWidth: 0.5, borderRadius: 10, borderColor: 'lightgray' }} onPress={() => this._clickMore()}>
                        <Text>{Localizations('WallScreen.More')}</Text>
                    </TouchableOpacity>
                    :
                    <Spinner size="large" />
                }
            </View>
        )
    }

    renderPostsArea() {
        //     debugger

        // console.log(this.props.loadingWallPosts) 
        return (
            // this.props.loadingWallPosts == false && this.state.postList != undefined ?
            //     this.state.postList.length > 0 ?
            <View>
                <FlatList
                    ListHeaderComponent={this.renderUserInfoArea()}
                    // ListFooterComponent={this.renderListFooter()}
                    // onScroll={({ nativeEvent }) => { isCloseToBottom(nativeEvent) && this._clickMore() }}
                    // scrollEventThrottle={400}
                    onMomentumScrollBegin={({ nativeEvent }) => { this._clickMore() }}
                    onEndReachedThreshold={0, 5}

                    data={this.state.postList}
                    extraData={this.state.postList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 15 }} />
                    )}

                    ListEmptyComponent={() => (
                        this.state.postList != undefined ?
                            this.state.postList.length == 0 ?
                                <NoContent />
                                :
                                <Spinner size="large" />
                            :
                            <Spinner size="large" />

                    )}

                    // initialNumToRender={1}

                    // getItemLayout={(data, index) => (
                    //     { length: 40, offset: 40 * index, index }
                    // )}

                    renderItem={info => (
                        this._renderItem(info.item, info.index)
                        // <ListItemPost
                        //     posts={info.item}
                        //     userID={this.state.userID}
                        //     userNameSurname={this.state.userNameSurname}
                        //     userPhoto={this.state.userPhoto}
                        // />
                    )
                    }
                />


            </View >
            //     :
            //     <View style={{ flex: 1, backgroundColor: '#ff585c', padding: 1, margin: 30 }}>
            //         <Card >
            //             <Text >{Localizations('WallScreen.NoSharing')}</Text>
            //             <TouchableOpacity style={{ height: 38, backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 20, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'center' }} onPress={this._clickNewPost}>
            //                 <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('WallScreen.ShareSomething')}</Text>
            //             </TouchableOpacity>
            //         </Card>
            //     </View>
            // :
            // <View style={{ height: 300 }}>
            //     <Spinner size="large" />
            // </View>
        )


    }

    render() {
        if (this.props.adStatus == 'play') {
            this.props.SetAdStatus('');
            this.showInterstitial();

        }


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
                    <View
                        // showsVerticalScrollIndicator={false}
                        // onScroll={({ nativeEvent }) => { isCloseToBottom(nativeEvent) && this._clickMore() }}
                        // scrollEventThrottle={400}
                        style={{ backgroundColor: 'lightgray', flex: 1 }}
                    >

                        {this.renderPostsArea()}


                        <Modal animationType="slide" transparent={true} visible={this.state.messageModalVisible} >

                            <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center' }}>

                                <View style={{ padding: 20, margin: 20, borderRadius: 10, backgroundColor: 'white', borderRadius: 8, alignItems: 'center' }}>
                                    <View >

                                        <Image source={require('../images/komsu_pembe_logo.png')}
                                            style={{ alignSelf: 'center', margin: 5 }}
                                        />

                                        <Text style={{ marginTop: 30, fontSize: 25, alignSelf: 'center' }}>
                                            {Localizations('WallScreen.Welcome')}
                                        </Text>

                                        <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 20 }}>
                                            {Localizations('WallScreen.ExpandSocialNetwork')}
                                        </Text>

                                        <TouchableOpacity onPress={() => this._clickInviteAndClose()} style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                                            <Image source={require('../images/icons/invite.png')} style={imageStyle.iconStyleMiddleWhite} />
                                            <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('WallScreen.Invite')}</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity
                                            style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 8, padding: 5, marginTop: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}
                                            onPress={() => this._clickModalClose()}>
                                            <Text style={[textStyle.logoStyle.md, { color: 'white', fontWeight: 'bold' }]}>{Localizations('WallScreen.Close')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            }
            else
                return (
                    <ShowMessage backgroundStyle="bgStyle"
                        textStyle="txtStyle"
                        text={Localizations('Global.ConnectionError')}
                    />
                );
        }
    }
}

const mapStateToProps = ({ wallScreenResponse, startScreenResponse }) => {


    const { res, resUser, resPosts, loadingWallUser, loadingWallPosts, loadingExtraData, loadingFriends, loadingFollowers, loadingPosts, type, userToken, connectionError } = wallScreenResponse;
    const { SwoqyUserToken, SwoqyUserData, adStatus } = startScreenResponse;
    return {
        res, resUser, resPosts, loadingWallUser, loadingWallPosts, loadingExtraData, loadingFriends, loadingFollowers, loadingPosts, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData, adStatus
    };
}

export default connect(mapStateToProps, { WallUserScreenData, WallPostsScreenData, SetAdStatus })(WallScreen);
