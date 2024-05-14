import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking, Alert, KeyboardAvoidingView, Platform, BackHandler, SafeAreaView, Button } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserProfileScreenData, SetUserFollowsData, SetUserBansData, SetUserFriendsData } from '../actions';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, LetterCircle } from '../common';
import ListItemUser from '../components/ListItemUser';
import ListItemPost from '../components/ListItemPost';
import { Localizations, FormatDate } from '../../locales/i18n';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 1000;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};
var { LoginControl } = require('../common/GlobalFunctions');

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);


        const adMobAndroid = [];
        adMobAndroid.push("ca-app-pub-2031837306819302/7475808957"); // Interstitial 1
        adMobAndroid.push("ca-app-pub-2031837306819302/1428457111"); // Interstitial 2
        adMobAndroid.push("ca-app-pub-2031837306819302/7156244758"); // Interstitial 3
        adMobAndroid.push("ca-app-pub-2031837306819302/3536563940"); // Interstitial 4
        adMobAndroid.push("ca-app-pub-2031837306819302/4530081412"); // Interstitial 5
        adMobAndroid.push("ca-app-pub-2031837306819302/5919749359"); // Interstitial 6
        adMobAndroid.push("ca-app-pub-2031837306819302/4841088519"); // Interstitial 7
        adMobAndroid.push("ca-app-pub-2031837306819302/4606667685"); // Interstitial 8
        adMobAndroid.push("ca-app-pub-2031837306819302/1236885429"); // Interstitial 9
        adMobAndroid.push("ca-app-pub-2031837306819302/8923803753"); // Interstitial 10
        

        let rndNumber = Math.floor(Math.random() * 10);
        // // Display an interstitial

        AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/8369592492' : adMobAndroid[rndNumber]);

        // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => {AdMobInterstitial.showAd(); });

    }

    state = {
        res: '',
        type: '',
        userToken: '',
        loadingSetUserFriends: false,
        loadingSetUserBans: false,
        loadingSetUserFollows: false,
        connectionError: false,
        maxPostID: 0,
        asStatus: ''
    };

    componentDidMount() {
        //AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        //AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

        //   AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
        // AdMobRewarded.setAdUnitID('ca-app-pub-2031837306819302/3338600932');



        // AdMobRewarded.addEventListener('rewarded', reward => {
        //     console.log('AdMobRewarded => rewarded', reward);


        //     this.setState({
        //         asStatus: 'rewarded'
        //     })

        //     console.log(this.state.asStatus);
        // }
        // );

        // AdMobRewarded.addEventListener('adLoaded', () => {
        //     console.log('AdMobRewarded => adLoaded');
        //     this.setState({
        //         asStatus: 'adLoaded'
        //     })
        //     console.log(this.state.asStatus);

        // }
        // );

        // AdMobRewarded.addEventListener('adFailedToLoad', error => {
        //     console.warn(error);
        //     this.setState({
        //         asStatus: 'adFailedToLoad'
        //     })
        //     console.log(this.state.asStatus);

        // }
        // );

        // AdMobRewarded.addEventListener('adOpened', () => {
        //     console.log('AdMobRewarded => adOpened');
        //     this.setState({
        //         asStatus: 'adOpened'
        //     })
        //     console.log(this.state.asStatus);

        // }
        // );

        // AdMobRewarded.addEventListener('videoStarted', () => {
        //     console.log('AdMobRewarded => videoStarted');

        //     this.setState({
        //         asStatus: 'videoStarted'
        //     })
        //     console.log(this.state.asStatus);
        // }
        // );

        // AdMobRewarded.addEventListener('adClosed', () => {
        //     console.log('AdMobRewarded => adClosed');
        //     this.setState({
        //         asStatus: 'adClosed'
        //     })
        //     console.log(this.state.asStatus);

        //     //AdMobRewarded.requestAd().catch(error => console.warn(error));
        // });

        // AdMobRewarded.addEventListener('adLeftApplication', () => {
        //     this.setState({
        //         asStatus: 'adLeftApplication'
        //     })

        //     console.log('AdMobRewarded => adLeftApplication')
        //     console.log(this.state.asStatus);

        // }
        // );

        // setTimeout(() => {
        //     AdMobRewarded.showAd()
        //     .then(() => {
        //         this.setState({
        //             asStatus: 'showed'
        //         })
        //     })
        //     .catch(error => {
        //         AdMobRewarded.requestAd()
        //             .then(() => {
        //                 AdMobRewarded.showAd()
        //                     .then(() => {
        //                         this.setState({
        //                             asStatus: 'showed'
        //                         })
        //                     })
        //                     .catch(error => {
        //                         this.setState({
        //                             asStatus: 'loadError2'
        //                         })
        //                     }
        //                     )
        //             })
        //             .catch(error => {
        //                 this.setState({
        //                     asStatus: 'loadError'
        //                 })
        //             }
        //             );
        //     }
        //     )
        // }, 1000);

        


    }


    //#region Component operations
    UNSAFE_componentWillMount() {

        // Interstatial Start
        //______________________________________________________________________________________________________________________
        // this.props.SetAdStatus({ AdStatus: '' });

        // AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/8369592492' : 'ca-app-pub-2031837306819302/5725933075');

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



        // AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/9119878094' : 'ca-app-pub-2031837306819302/5725933075');

        // // AdMobInterstitial.removeAllListeners();

        // AdMobInterstitial.requestAd()
        //     .then(() => {
        //         AdMobInterstitial.showAd();
        //     })
        //     .catch(error => {
        //         console.log("REKLAM çağırılırken hata oldu");

        //         console.warn(error)
        //     });


        // AdMobInterstitial.addEventListener('adLoaded', (x) => {
        //     //console.log("REKLAM yüklendi");
        //     //this.props.SetAdStatus({ AdStatus: 'adLoaded' });

        // });

        // AdMobInterstitial.addEventListener('adFailedToLoad', error => {
        //     //console.log("REKLAM yüklenirken hata oldu");
        //     //this.props.SetAdStatus({ AdStatus: 'adFailedToLoad' });
        // }
        // );

        // AdMobInterstitial.addEventListener('adOpened', () => {
        //     //console.log("REKLAM açıldı");
        //     //this.props.SetAdStatus({ AdStatus: 'adOpened' });
        // }
        // );

        // AdMobInterstitial.addEventListener('adClosed', () => {
        //     {
        //         //  console.log("REKLAM kapatıldı");

        //         //this.props.SetAdStatus({ AdStatus: 'adClosed' });
        //         //AdMobInterstitial.requestAd().catch(error => console.warn(error));
        //     }
        // });

        // AdMobInterstitial.addEventListener('adLeftApplication', () => {
        //     //console.log("REKLAM dan ayrıldı");
        //     //this.props.SetAdStatus({ AdStatus: 'adLeftApplication' });
        // });




        if (Actions.currentScene != "signInScreen") {
            if (LoginControl(this.props.SwoqyUserToken)) {
                this.props.UserProfileScreenData({
                    ID: this.props.ID, latitude: '', longitude: '', userToken: this.props.SwoqyUserToken,
                    latitude: this.props.SwoqyUserData.Latitude,
                    longitude: this.props.SwoqyUserData.Longitude
                });
            }
        }
    }

    componentWillUnmount() {
        //AdMobInterstitial.removeAllListeners();
        // AdMobRewarded.removeAllListeners();
        // AdMobInterstitial.removeAllListeners();
    }

    // showRewarded() {
    //     // AdMobRewarded.showAd().catch(error => console.warn(error));
    // }

    // showInterstitial() {
    //     //AdMobInterstitial.showAd().catch(error => console.warn(error));
    // }



    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        //debugger;
        if ((nextProps.type == 'userprofile_screen_data_success') || (nextProps.type == 'userprofile_extra_data_success')) {
            if ((nextProps.type == 'userprofile_extra_data_success') && this.state.maxPostID > 0) {
                // debugger
                this.setState(x => {
                    let copy = Array.from(x.postList);
                    res.PostList.map(item =>
                        copy.push(item)
                    )
                    return { postList: copy }
                });
            }
            else if (nextProps.type == 'userprofile_screen_data_success') {
                //debugger
                //console.log(res)

                this.setState({
                    userID: res.UserID,
                    userNameSurname: res.UserNameSurname,
                    userPhoto: res.UserPhoto,
                    registered: res.Registered,
                    brandID: res.BrandID,
                    shoppingMallID: res.ShoppingMallID,
                    ban: res.UserProfileActions.Ban,
                    follow: res.UserProfileActions.Follow,
                    friend: res.UserProfileActions.Friend,
                    sendMessage: res.UserProfileActions.SendMessage,
                    friendList: res.FriendList,
                    friendCount: res.FriendCount,
                    // followerList: res.FollowerList,
                    followerCount: res.FollowerCount,
                    // followingList: res.FollowingList,
                    followingCount: res.FollowingCount,
                    postList: res.PostList
                });
            }
        } else if (nextProps.type == 'set_favorite_data_success') {
            this.setState({
                favorite: res
            });
        } else if (nextProps.type == 'set_user_follows_data_success') {
            this.setState({
                follow: res
            });
        } else if (nextProps.type == 'set_user_bans_data_success') {
            //  debugger
            // kullanıcı block lanmışsa bu kullanıcıya mesaj gönderilemez, takip edilemez ve arkadaş olarak eklenemez
            this.setState({
                ban: res == true ? 1 : 0,
                friend: res && 0,
                sendMessage: res && 0,
                follow: res && 0
            });
            // Actions.refresh({ key: Actions.currentScene })
            Actions.userProfileScreen({ ID: this.props.ID });
        } else if (nextProps.type == 'set_user_friends_data_success') {
            this.setState({
                friend: res
            });
        }
    }
    //#endregion

    //#region click functions
    _clickFriend = () => {
        // debugger
        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('Global.UserLogin'),
                Localizations('Global.RequireUserLoginAlertMessage'),
                [
                    {
                        text: Localizations('BrandDetail.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('BrandDetail.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {
            this.props.SetUserFriendsData({ ID: this.state.userID, userToken: this.props.SwoqyUserToken });
        }
    }
    _clickMessage = () => {
        Actions.messageViewScreen({ ID: this.state.userID });
    }
    _clickBan = () => {
        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('Global.UserLogin'),
                Localizations('Global.RequireUserLoginAlertMessage'),
                [
                    {
                        text: Localizations('BrandDetail.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('BrandDetail.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {
            this.props.SetUserBansData({ ID: this.state.userID, userToken: this.props.SwoqyUserToken });
        }
    }
    _clickFollow = () => {

        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('Global.UserLogin'),
                Localizations('Global.RequireUserLoginAlertMessage'),
                [
                    {
                        text: Localizations('BrandDetail.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('BrandDetail.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {
            this.props.SetUserFollowsData({ ID: this.state.userID, userToken: this.props.SwoqyUserToken });
        }
    }

    oldMaxPostID = 0;
    maxPostID = 0;
    _clickMore = () => {
        if (this.state.postList.length > 0) {
            if (this.state.postList[this.state.postList.length - 1].PostID) {
                this.maxPostID = this.state.postList[this.state.postList.length - 1].PostID;
            }
        }

        if (this.oldMaxPostID != this.maxPostID || this.maxPostID == 0) {
            this.setState({
                maxPostID: this.maxPostID
            })
            this.props.UserProfileScreenData({
                ID: this.props.ID, latitude: '', longitude: '', userToken: this.props.SwoqyUserToken, maxPostID: this.maxPostID,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
        }
    }
    _clickLoadFriend = () => {
    }
    //#endregion

    renderUserInfoArea = () => {
        //console.log(this.state);
        return (
            <View>
                <View style={container.row}>
                    <LetterCircle
                        photo={this.state.userPhoto}
                        data={this.state.userNameSurname}
                        circleSize={80}
                    />

                    <View style={container.center}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={container.row} onPress={() =>
                                this.state.registered == true ?
                                    this.state.brandID > 0 ?
                                        Actions.brandDetailScreen({ brandID: this.state.brandID })
                                        :
                                        this.state.shoppingMallID > 0 ?
                                            Actions.shoppingMallScreen({ shoppingMallID: this.state.shoppingMallID })
                                            :
                                            null

                                    :
                                    null
                            }
                            >

                                <Text style={textStyle.userProfileStyle.name.xl}>{this.state.userNameSurname}</Text>

                                {
                                    this.state.registered === true &&
                                    <Image
                                        style={imageStyle.registeredStyle}
                                        source={require('../images/icons/registered.png')}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                        {(this.state.ban == 2) &&
                            <View>
                                <TouchableOpacity style={{ backgroundColor: '#ff585c', flexDirection: 'row', borderRadius: 4, padding: 5, marginTop: 5, alignContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start' }} onPress={() => Actions.userGeneralSettingsScreen()}>
                                    <Text style={[textStyle.logoStyle.xs, { color: 'white', fontWeight: 'bold' }]}>{Localizations('Global.UserAccountSettingsScreen')}</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {/* Takip edilme iptal edildi */}
                        {/* <View style={container.row}>
                            {this.renderFollowersArea()}
                            {this.renderFollowingArea()}
                        </View> */}
                    </View>
                </View>

                <View style={[container.row.sa, { marginVertical: 10 }]}>
                    {this.renderUserFriendArea()}
                    {/* {this.renderUserFollowArea()} */}
                    {this.renderUserMessageArea()}
                    {this.renderUserBanArea()}
                </View>

            </View>
        )
    }

    renderFriendsArea = () => {
        //debugger
        return (
            <View>
                <TouchableOpacity onPress={() => Actions.userSortScreen({ ID: this.props.ID, requestType: 'friend', title: Localizations('Screen.FriendScreen'), userList: this.state.friendList })}>
                    <Text style={textStyle.userProfileStyle.name.lg}>{Localizations('UserProfileScreen.Friends')} ({this.state.friendCount})</Text>
                </TouchableOpacity>

                <View style={container.row.sa}>
                    <FlatList
                        data={this.state.friendList}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        scrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={this.renderMoreButton()}
                        renderItem={info => (
                            <ListItemUser
                                users={info.item}
                            />
                        )}
                    />
                    {/* 
                    {this.state.friendCount <= 10 ?
                        null
                        :
                        <TouchableOpacity style={[container.center.center, { padding: 5, borderWidth: 0.5, borderRadius: 10, borderColor: 'lightgray' }]}
                            onPress={() =>
                                (this.state.ban == 2) ?
                                    Actions.messageListScreen()
                                    :
                                    Actions.userSortScreen({ ID: this.props.ID, requestType: 'friends', title: Localizations('Screen.FriendScreen') })}
                        >
                            <Text>{Localizations('UserProfileScreen.More')}</Text>
                        </TouchableOpacity>
                    } */}
                </View>
            </View>
        )
    }

    renderMoreButton() {

        return (
            this.state.friendCount <= 10 ?
                null
                :
                <TouchableOpacity style={[container.center.center, { padding: 5, borderWidth: 0.5, borderRadius: 10, borderColor: 'lightgray' }]}
                    onPress={() =>
                        (this.state.ban == 2) ?
                            Actions.messageListScreen()
                            :
                            Actions.userSortScreen({ ID: this.props.ID, requestType: 'friends', title: Localizations('Screen.FriendScreen') })}
                >
                    <Text>{Localizations('UserProfileScreen.More')}</Text>
                </TouchableOpacity>

        );
    }


    renderFollowersArea = () => {
        return (
            <TouchableOpacity style={container.center} onPress={() => Actions.userSortScreen({ ID: this.props.ID, requestType: 'follower', title: Localizations('Screen.FollowerScreen') })}>
                <Text style={textStyle.userProfileStyle.number}>{this.state.followerCount}</Text>
                <Text style={textStyle.userProfileStyle.numberText}>{Localizations('UserProfileScreen.Follower')}</Text>

                {/* <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <FlatList
                        data={this.state.followerList}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        renderItem={info => (
                            <ListItemUser
                                users={info.item}
                            />
                        )}
                    />
                </View>
                <View style={{}}>
                    <View>
                        <Text >Hepsini göster</Text>
                    </View>
                </View> */}
            </TouchableOpacity>
        )
    }

    renderFollowingArea = () => {
        return (
            <TouchableOpacity style={container.center} onPress={() => Actions.userSortScreen({ ID: this.props.ID, requestType: 'following', title: Localizations('Screen.FollowingScreen') })}>
                <Text style={textStyle.userProfileStyle.number}>{this.state.followingCount}</Text>
                <Text style={textStyle.userProfileStyle.numberText}>{Localizations('UserProfileScreen.Following')}</Text>

                {/* <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <FlatList
                        data={this.state.followingList}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        renderItem={info => (
                            <ListItemUser
                                users={info.item}
                            />
                        )}
                    />
                </View>
                <View style={{}}>
                    <View>
                        <Text >Hepsini göster</Text>
                    </View>
                </View> */}
            </TouchableOpacity>
        )
    }

    renderUserFriendArea = () => {
        if (!this.props.loadingSetUserFriends) {
            return (
                (this.state.friend == 0) ?
                    null
                    :
                    (this.state.ban != 3) ?
                        (this.state.friend == 3) ?
                            <View style={container.center}>
                                <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.FriendPending')}</Text>
                            </View>
                            :
                            <TouchableOpacity style={container.center} onPress={() => this._clickFriend()}>
                                {(this.state.friend == 2) ?
                                    <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.AddFriend')}</Text>
                                    :
                                    <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.Unfriend')}</Text>
                                }
                            </TouchableOpacity>
                        : null
            )
        }
        return <Spinner size="small" text={false} />;
    }

    renderUserFollowArea = () => {
        if (!this.props.loadingSetUserFollows) {
            //debugger;
            return (
                (this.state.follow == 0) ?
                    null
                    :
                    (this.state.ban != 3) ?
                        (this.state.follow == 3) ?
                            <View style={container.center}>
                                <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.FollowPending')}</Text>
                            </View>
                            :
                            <TouchableOpacity style={container.center} onPress={() => this._clickFollow()}>
                                {(this.state.follow == 2) ?
                                    <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.Follow')}</Text>
                                    :
                                    <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.Unfollow')}</Text>
                                }
                            </TouchableOpacity>
                        :
                        null
            )
        }
        return <Spinner size="small" text={false} />;
    }

    renderUserMessageArea = () => {
        return (
            (this.state.sendMessage == 0) ?
                null
                :
                (this.state.ban != 3) ?
                    <TouchableOpacity style={container.center} onPress={() => this._clickMessage()}>
                        <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.SendMessage')}</Text>
                    </TouchableOpacity>
                    :
                    null

        )
    }

    renderUserBanArea = () => {
        if (!this.props.loadingSetUserBans) {
            return (
                (this.state.ban == 2) ?
                    null
                    :
                    <TouchableOpacity style={container.center} onPress={() => this._clickBan()}>
                        {(this.state.ban == 3) ?
                            <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.Unblock')}</Text>
                            :
                            <Text style={textStyle.userProfileStyle.option}>{Localizations('UserProfileScreen.Block')}</Text>
                        }
                    </TouchableOpacity>
            )
        }
        return <Spinner size="small" text={false} />;
    }

    renderPostsArea = () => {
        return (
            <View>
                {/* <View>
                    <Text style={textStyle.userProfileStyle.name.lg}>{Localizations('UserProfileScreen.Post')}</Text>
                </View> */}

                <FlatList
                    scrollsToTop
                    data={this.state.postList}
                    extraData={this.state.postList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 15 }} />
                    )}
                    renderItem={info => (
                        <ListItemPost
                            posts={info.item}
                        />
                    )}
                />

                <View style={container.center}>
                    {(!this.props.loadingUserProfileExtraData) ?
                        <TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: 'white', borderWidth: 0.5, borderRadius: 10, borderColor: 'lightgray' }} onPress={() => this._clickMore()}>
                            <Text>{Localizations('UserProfileScreen.More')}</Text>
                        </TouchableOpacity>
                        :
                        <Spinner size="large" />
                    }
                </View>

            </View>
        )
    }

    render() {
        // console.log("adStatus : " + this.props.adStatus);




        // if (this.props.adStatus == 'play') {
        //     this.props.SetAdStatus('');
        //     this.showInterstitial();

        // }

        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1, backgroundColor: 'lightgray' }}>

                    {(this.state.ban == 1) ?
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Profili görüntüleme yetkiniz yok!</Text>
                        </View>
                        :
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            {/* <View style={{ height: 40 }}>
                                <HF_01 title={Localizations('Global.UserProfileScreen')} />
                            </View> */}
                            {
                                (!this.props.loadingUserProfile) ?

                                    <View
                                        showsVerticalScrollIndicator={false}
                                        onScroll={({ nativeEvent }) => {
                                            if (isCloseToBottom(nativeEvent)) {
                                                this._clickMore();
                                            }
                                        }}
                                        scrollEventThrottle={400}
                                        style={{ backgroundColor: 'fafafa' }}>

                                        <View style={{ marginBottom: 35 }}>
                                            <View style={{
                                                backgroundColor: 'white', padding: 5,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowRadius: 2,
                                                shadowOpacity: 0.2,
                                                elevation: 5,
                                                padding: 10
                                            }}>
                                                {this.renderUserInfoArea()}
                                                {this.renderFriendsArea()}
                                            </View>


{/* 
                                            <View style={{
                                                height: 300, alignContent: 'center', alignSelf: 'center', alignItems: 'center', padding: 5,
                                                shadowOffset: { width: 0, height: 2 },
                                                shadowRadius: 2,
                                                shadowOpacity: 0.2,
                                                elevation: 5,
                                                padding: 10
                                            }}>
                                                <AdMobBanner
                                                    adSize="mediumRectangle"
                                                    adUnitID="ca-app-pub-2031837306819302/4851835105"
                                                />
                                            </View>  */}

                                            <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                                                {this.renderPostsArea()}
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                                        <Spinner size="large" />
                                    </View>
                            }
                        </View>
                    }
                </View>
            )

        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ShowMessage backgroundStyle="bgStyle"
                    textStyle="txtStyle"
                    text={Localizations('Global.ConnectionError')}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ userProfileScreenResponse, startScreenResponse }) => {
    const { res, loadingUserProfile, loadingSetUserFollows, loadingSetUserFriends, loadingSetUserBans, loadingUserProfileExtraData, loadingFriends, loadingFollowers, loadingPosts, type, userToken, connectionError } = userProfileScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, loadingUserProfile, loadingSetUserFollows, loadingSetUserFriends, loadingSetUserBans, loadingUserProfileExtraData, loadingFriends, loadingFollowers, loadingPosts, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { UserProfileScreenData, SetUserFollowsData, SetUserBansData, SetUserFriendsData })(UserProfileScreen);
