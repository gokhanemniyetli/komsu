import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity, TouchableHighlight, FlatList, Modal, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { LetterCircle, Spinner, ShowNumber, Slang } from '../common';
import { Localizations } from '../../locales/i18n';
import { RatingOfQuestionData, SetPostLike, SetPostReview, SetPostShare, DelPost, SetUserBansData, SendInappropriateContent, SetAdStatus } from '../actions';

import ListItemPhoto from './ListItemPhoto';
import ListItemPost2 from './ListItemPost2';
import ListItemPostReview from './ListItemPostReview';

import Share from 'react-native-share';

var sortJsonArray = require('sort-json-array');
var { LoginControl } = require('../common/GlobalFunctions');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
import { WallActionItem } from '../common/WallActionItem';

import Dialog from "react-native-dialog";
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

import {
    AdMobBanner,
    AdMobInterstitial,
    AdMobRewarded,
    PublisherBanner,
} from 'react-native-admob';



var reviewInserted = false;
var images = [];
//_______________________________________________________

const checkIfPackageIsInstalled = async ({ userNameSurname, userPhoto }) => {
    //console.log(userNameSurname);
    const shareOptions = {
        title: userNameSurname + 'Swoqy`de seninle birşeyler paylaşmak istiyor.',
        subject: userNameSurname + 'Swoqy`de seninle birşeyler paylaşmak istiyor.',
        showAppsToView: true,
        message: 'Merhaba, ' + userNameSurname + ' seni Swoqy`ye katılmaya devat ediyor. Seninle harika içerikler paylaşacağına inanıyoruz. Swoqy`yi cebine indir, trendi yakala.',
        url: 'https://www.swoqy.com/ads/swoqy.html'
    };

    Share.open(shareOptions)
        .then((res) => { console.log(res) })
        .catch((err) => { err && console.log(err); });
}

// var props;
// const ListItemPost = (props) => {
class ListItemPost extends Component {
    state = ({
        //Modal 
        
        imageModalVisible: false,
        questionRating: 0,
        likeCount: '',
        changingPostID: '',
        userLike: '',
        showReviewBox: false,
        reviewText: '',
        reviewCount: '',
        itemType: '',
        arrItem: [],
        maxActionID: 0,
        dialogVisible: false,
        dialogValue: 0,
        dialogInputValue: '',
        slang: false,
        DialogDescription: '',
        DialogCancel: '',
        DialogTitle: '',
        DialogButton: '',
        DialogOk: '',
        point: 4,
    })

    UNSAFE_componentWillMount()  {
        this.setState;

        // if( this.props.index > 29 && this.props.index % 30 == 0) {
        //     // Display an interstitial

        //     // console.log("this.props.index: " + this.props.index)
        //     // AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/9050485517' : 'ca-app-pub-2031837306819302/4181302216');
        //     // AdMobInterstitial.requestAd().then(() => {AdMobInterstitial.showAd(); console.log("listitempost: 4181302216" )});
           
        // }
    }

    componentDidMount() {

        // if (Platform.OS != "ios") {
        //     // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        //     AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/8369592492' : 'ca-app-pub-2031837306819302/8025977564');

        //     AdMobInterstitial.addEventListener('adLoaded');
        //     AdMobInterstitial.addEventListener('adFailedToLoad');
        //     AdMobInterstitial.addEventListener('adOpened');
        //     AdMobInterstitial.addEventListener('adClosed', () => {
        //         AdMobInterstitial.requestAd().catch(error => console.warn(error));
        //     });
        //     AdMobInterstitial.addEventListener('adLeftApplication');

        //     AdMobInterstitial.requestAd().catch(error => console.warn(error));
        // }
    }

    componentWillUnmount() {
        // if (Platform.OS != "ios") {
        //     AdMobInterstitial.removeAllListeners();
        // }
    }

    // showInterstitial() {
    //     if (Platform.OS != "ios") {
    //         AdMobInterstitial.showAd().catch(error => console.warn(error));
    //     } 
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //debugger;
        // console.log(nextProps.type);
        this.setState({
            itemType: nextProps.type
        })
        // console.log(nextProps.loadingSetUserBans)


        // Kullanıcı walscreen ekranında bloklandığında alert çıkmalı. Ancak Banlama işlemi başka bir class içinde yapılıyor.
        // onun state'inin type'ını alamadığımız için daha doğrusu zaten bir type aldığımız için 2 tane type olunca hata çıkıyor.
        // Çözüm için banlama işlemi yapılırken reducer'a BanType adına yeni bir type eklenip bu incelenerek alert çıkarılması sağlanılabilir.
        // bununla birlikte nextProps.bannedPostID değerinin 0 ya da bir sayı olması durumuna göre de işlem yapılabir.
        // 
        if (!nextProps.loadingSetUserBans &&
            nextProps.type == undefined &&
            nextProps.bannedPostID != 0 &&
            nextProps.bannedPostID == this.props.posts.PostID) {
            // debugger

            //if (Actions.currentScene !== "userGeneralSettingsScreen") {
            this.setState({ dialogVisible: false }, () => {
                setTimeout(() => {
                    Alert.alert(Localizations('WallScreen.UserBlocked'));
                }, 510);
            });
            //}

            Actions.refresh({ key: Math.random() })
        }

        switch (nextProps.type) {
            case 'set_post_like_data_success':
                this.setState({
                    changingPostID: nextProps.changingPostID,
                    likeCount: nextProps.likeCount,
                    userLike: nextProps.userLike,
                });
                break;
            case 'set_post_review_data_success':
                //debugger;
                this.setState({
                    changingPostID: nextProps.changingPostID,
                    reviewCount: nextProps.reviewCount,
                    arrItem: nextProps.posts.PostReviewList
                });
                break;
            case 'del_post_data_success':
                // if (this.props.posts.PostID == nextProps.inappropriatedPostID) {
                // this.setState({ dialogVisible: false }, () => {
                //     setTimeout(() => {
                //         Alert.alert('Gönderi silme', 'Gönderiniz kalıcı olarak silinmiştir.');
                //     }, 510);
                // });
                // }
                break;
            case 'send_inappropriate_content_data_success':
                if (this.props.posts.PostID == nextProps.inappropriatedPostID) {
                    // this.setState({ dialogVisible: false }, () => {
                    //     setTimeout(() => {
                    //         Alert.alert('Uygunsuz içerik', 'Şikayetiniz ilgili birime iletilmiştir.');
                    //     }, 510);
                    // });
                }
                break;
            case 'set_user_bans_data_success':
                //debugger
                if (nextProps.bannedUserID) {
                    // this.setState({ dialogVisible: false }, () => {
                    //     setTimeout(() => {
                    //         Alert.alert(Localizations('WallScreen.UserBlocked'));
                    //     }, 1510);
                    // });
                }
                // this.setState({ dialogVisible: false }, () => {
                //     setTimeout(() => {
                Actions.wallScreen();//({ key: Math.random() });
                // }, 1510);
                // });
                break;
            default:
                break;
        }
    }

    // #region popup modal
    showDialog() {
        this.setState({ dialogVisible: true });
    };
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };
    handleOK = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
        // debugger
        switch (this.state.dialogValue) {
            case 0:
                if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {

                    Alert.alert(
                        Localizations('BrandDetail.UserLogin'),
                        Localizations('BrandDetail.FavoriteAlertMessage'),
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
                    // debugger
                    this.props.DelPost({ PostID: this.props.posts.PostID, userToken: this.props.SwoqyUserToken });

                    //Actions.refresh({ key: Math.random() })
                }
                break;

            case 1:

                if (this.state.dialogInputValue == '') {
                    this.setState({ dialogVisible: false }, () => {
                        setTimeout(() => {
                            Alert.alert(Localizations('WallScreen.NoInappropriate'));
                        }, 510);
                    });
                }
                else {
                    this.props.SendInappropriateContent({
                        postID: this.props.posts.PostID, messageText: this.state.dialogInputValue, userToken: this.props.SwoqyUserToken,
                        latitude: this.props.SwoqyUserData.Latitude,
                        longitude: this.props.SwoqyUserData.Longitude
                    });
                    this.setState({
                        dialogInputValue: ''
                    })
                }

                break;
            case 2:
                if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {

                    Alert.alert(
                        Localizations('BrandDetail.UserLogin'),
                        Localizations('BrandDetail.FavoriteAlertMessage'),
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
                    // debugger
                    this.props.SetUserBansData({ ID: this.props.posts.User.UserID, PostID: this.props.posts.PostID, userToken: this.props.SwoqyUserToken });

                    //Actions.refresh({ key: Math.random() })
                }
                break;

            case 3:
                // setTimeout(() => {
                //     checkIfPackageIsInstalled();
                // }, 510);
                break;

            case 4:
                if (this.state.dialogInputValue == '') {
                    this.setState({ dialogVisible: false }, () => {
                        setTimeout(() => {
                            Alert.alert(Localizations('Global.NotEnteredComments'));
                        }, 510);
                    });
                }
                else {
                    reviewInserted = false;
                    //debugger


                // Display an interstitial
                // yorum reklamı
            //    AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/6033236673' : 'ca-app-pub-2031837306819302/8025977564');
                // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            //    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());




                    this.props.SetPostReview({
                        postID: this.props.posts.PostID, reviewText: this.state.dialogInputValue, userToken: this.props.SwoqyUserToken,
                        latitude: this.props.SwoqyUserData.Latitude,
                        longitude: this.props.SwoqyUserData.Longitude
                    });
                    // this.hideReviewBox();


                    this.setState({
                        dialogInputValue: ''
                    })
                }

                break;
            default:
                break;
        }
    };

    _clickOperations = (value) => {

        var noAlert = false;
        // debugger
        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            noAlert = true;
            this.setState({ dialogVisible: false }, () => {
                setTimeout(() => {
                    Alert.alert(
                        Localizations('Global.UserLogin'),
                        Localizations('Global.RequireUserLoginAlertMessage'),
                        [

                            { text: Localizations('BrandDetail.Ok'), onPress: () => Actions.signInScreen() },
                        ],
                        { cancelable: false },
                    );
                }, 510);
            });
        } else {
            switch (value) {
                case 0:
                    this.setState({
                        DialogTitle: Localizations('WallScreen.DeletePost'),
                        DialogDescription: Localizations('WallScreen.DeletePostDetail'),
                        DialogCancel: Localizations('Global.Cancel'),
                        DialogOk: Localizations('WallScreen.DeletePost')
                    });
                    break;
                case 1:
                    this.setState({
                        DialogTitle: Localizations('WallScreen.InappropriateContent'),
                        DialogDescription: Localizations('WallScreen.ReasonOfInappropriateContent'),
                        DialogCancel: Localizations('Global.Cancel'),
                        DialogOk: Localizations('WallScreen.Send'),
                        DialogPlaceHolder: Localizations('WallScreen.InappropriateContentDescription')
                    });
                    break;
                case 2:
                    this.setState({
                        DialogTitle: Localizations('WallScreen.BlockUser'),
                        DialogDescription: Localizations('WallScreen.BlockUserMessage'),
                        DialogCancel: Localizations('Global.Cancel'),
                        DialogOk: Localizations('WallScreen.Block')
                    });
                    break;
                case 3:
                    // this.setState({
                    //     DialogTitle: Localizations('WallScreen.Share'),
                    //     DialogDescription: Localizations('WallScreen.ShareFriends'),
                    //     DialogCancel: Localizations('Global.Cancel'),
                    //     DialogOk: Localizations('WallScreen.Share')
                    // });

                    noAlert = true;
                    setTimeout(() => {
                        checkIfPackageIsInstalled({ userNameSurname: this.props.userNameSurname, userPhoto: this.props.userPhoto });
                    }, 200);
                    break;
                case 4:
                    this.setState({
                        DialogTitle: Localizations('NewPost.Comment'), //Yorum yap
                        DialogCancel: Localizations('Global.Cancel'),
                        DialogOk: Localizations('WallScreen.Send'),
                        DialogPlaceHolder: Localizations('Global.WriteAComment') // yorumunuz...
                    });
                    break;
                default:
                    break;
            }
        }

        if (!noAlert) {
            this.setState({
                dialogValue: value,
                dialogVisible: true
            });
        }
    }
    // #endregion

    hideReviewBox() {
        this.setState({
            showReviewBox: false
        })
    }

    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({ imageModalVisible: visible });
        console.log(imageUrl);
        images = [{ url: imageUrl }];
    }
    _clickQuestionResult = (questionID, userID) => {
        Actions.questionResultScreen({ ID: questionID, UserID: userID })
    }
    _clickLike = (postID) => {
        if (LoginControl(this.props.SwoqyUserToken)) {

            // Display an interstitial
             // Like reklamı
         //    AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/4092580996' : 'ca-app-pub-2031837306819302/4729562160');
             // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
         //    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());




            this.props.SetPostLike({
                postID: postID, userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
        }
    }
    _clickReview = (postID) => {

        if (LoginControl(this.props.SwoqyUserToken)) {
            this.setState({
                itemType: '',
                reviewText: '',
                showReviewBox: true
            })
        }
    }
    _clickReviewCancel() {
        this.hideReviewBox();
    }
    _clickReviewSend = (postID) => {
        if (LoginControl(this.props.SwoqyUserToken)) {
            if (this.state.reviewText == '') {
                alert(Localizations('Global.NotEnteredComments'));
            }
            else if (this.state.slang) {
                Slang('', 2)
            }
            else {
                reviewInserted = false;
                //debugger
                this.props.SetPostReview({
                    postID: postID, reviewText: this.state.reviewText, userToken: this.props.SwoqyUserToken,
                    latitude: this.props.SwoqyUserData.Latitude,
                    longitude: this.props.SwoqyUserData.Longitude
                });
                this.hideReviewBox();
            }
        }
    }
    _clickShare = (postID) => {
        if (LoginControl(this.props.SwoqyUserToken)) {
            //  debugger;
            Actions.post({ RePostID: postID })
        }
    }
    _clickPostAllReviews = (postID) => {
        // console.log(1);
        Actions.postAllReviewsScreen({ postID: postID })
    }
    _clickPostAllLikes = (postID) => {
        // console.log(1);
        Actions.postAllLikesScreen({ postID: postID })
    }
    _clickItemDetail = () => {
        // debugger;
        this.props.SetAdStatus({ AdStatus: 'play' }); 
        Actions.userProfileScreen({ ID: this.props.posts.User.UserID });
    }
    _clickUserDetail = (userID) => {
        // debugger;
        this.props.SetAdStatus({ AdStatus: 'play' }); 
        Actions.userProfileScreen({ ID: userID });
    }
    _clickItemPlace() {
        if (this.props.posts.Place.Type == 1) {
            Actions.shoppingMallScreen({ shoppingMallID: this.props.posts.Place.ID });
        }
        else {
            Actions.storeScreen({ storeID: this.props.posts.Place.ID });
        }
    }
    _clickItemBrand = (brandID) => {
        // console.log(brandID);
        if (brandID != 0) {
            Actions.brandDetailScreen({ brandID: brandID });
        }
    }

    ratingCompleted = (r) => {
        var qID = this.props.posts.Question.QuestionID;

        // console.log(r + " puan verdiniz.");
        Alert.alert(
            Localizations('WallScreen.SubmittingSelection'),
            Localizations('WallScreen.ScoreBeForwarded'),
            [
                {
                    text: Localizations('Store.Cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: Localizations('Store.Ok'), onPress: () => {
                        this.props.RatingOfQuestionData({
                            questionID: qID, rating: r, userToken: this.props.SwoqyUserToken,
                            latitude: this.props.SwoqyUserData.Latitude,
                            longitude: this.props.SwoqyUserData.Longitude
                        });
                        //console.log(this.props);
                        this.props.posts.Question.Rating = r;
                    }
                },
            ],
            { cancelable: false },
        );
    }

    // #region post
    postAction() {
        //console.log(this.props.posts)
        return (
            (this.props.posts.ActionID != undefined) ?
                (this.props.posts.ActionTypeID != 10) &&
                <View>
                    <TouchableOpacity onPress={() => this._clickUserDetail(this.props.posts.ActionUserID)} style={container.row}>
                        <LetterCircle
                            photo={this.props.posts.ActionUserPhoto}
                            data={this.props.posts.ActionUserNameSurname}
                            circleSize={30}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <View style={[container.row]}>
                                <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold' }]}>{this.props.posts.ActionUserNameSurname}</Text>
                                {
                                    this.props.posts.ActionUserRegistered &&
                                    <Image
                                        style={imageStyle.registeredTinyStyle}
                                        source={require('../images/icons/registered.png')}
                                    />
                                }
                                <Text style={[textStyle.logoStyle.sm]}> {this.props.posts.ActionTypeName}</Text>
                            </View>
                            <View style={[container.row]}>
                                <Text style={textStyle.logoStyle.xs}>
                                    {this.props.posts.ActionDateDiff > 0 ? this.props.posts.ActionDateDiff : null} {
                                        this.props.posts.ActionDateDiff == 1 ?
                                            Localizations('WallScreen.TimeType.' + this.props.posts.ActionDateDiffType.toString())
                                            :
                                            Localizations('WallScreen.TimeTypes.' + this.props.posts.ActionDateDiffType.toString())
                                    }
                                </Text>

                                {(this.props.posts.GoogleDistance && !this.props.posts.FakeDistance) &&
                                    <Text style={[textStyle.logoStyle.sm, { padding: 3, color: 'gray' }]}>
                                        {this.props.posts.GoogleDistance.Distance == 99999999 ?
                                            " - !!! "
                                            :
                                            this.props.posts.GoogleDistance.Distance < 1000 ?
                                                " - " + this.props.posts.GoogleDistance.Distance.toFixed(0) + " m "
                                                :
                                                " - " + (this.props.posts.GoogleDistance.Distance / 1000).toFixed(1) + " km "
                                        }
                                        {Localizations('WallScreen.Near')}
                                    </Text>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ height: 1, backgroundColor: 'lightgray', marginVertical: 5 }}></View>
                </View>
                :
                null
        )
    }
    postMenu() {
        // console.log(this.props)
        // console.log(this.props.userID)
        return (
            <Menu
                renderer={renderers.SlideInMenu}
                onSelect={value => this._clickOperations(value)}

                style={{ alignSelf: 'flex-start' }}>

                <MenuTrigger style={{ height: 40 }} >
                    <Image
                        style={imageStyle.iconStyleDot}
                        source={require('../images/icons/3dot.png')}
                    />
                </MenuTrigger>

                <MenuOptions
                    style={{
                        flex: 1,
                        backgroundColor: '#f2f3f5',
                        // borderWidth: 3,
                        // marginTop: 10,
                        // borderTopColor: 'grey',
                        borderLeftColor: '#f2f3f5',
                        borderRightColor: '#f2f3f5',
                        borderBottomColor: '#f2f3f5',
                    }}
                    optionsContainerStyle={{ marginTop: 0 }} >
                    {/* <ImageBackground source={require('../images/signInBackground.png')} style={{ width: '100%', flex: 1, }}> */}
                    <View style={{ backgroundColor: '#ff585c', flex: 1, width: '100%' }}>

                        {
                            (this.props.posts.User.UserID == this.props.userID) ?

                                <MenuOption
                                    value={0}
                                    disabled={this.props.posts.User.UserID != this.props.userID ? true : false}
                                    style={this.props.posts.User.UserID != this.props.userID && { backgroundColor: '#df5c4b' }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: 50 }}>
                                            <Image
                                                style={imageStyle.iconStyleLargeWhite}
                                                source={require('../images/icons/deletePost.png')}
                                            />
                                        </View>
                                        <View>
                                            <Text style={textStyle.settingStyle.generalWhite}>{Localizations('WallScreen.DeletePost')}</Text>
                                            <Text style={textStyle.settingStyle.securityWhite}>{Localizations('WallScreen.DeletePostDetail')}</Text>
                                        </View>
                                    </View>
                                </MenuOption>
                                :
                                null
                        }


                        <View style={{ marginVertical: 5, }} />
                        <MenuOption
                            value={1}
                            disabled={this.props.posts.User.UserID == this.props.userID ? true : false}
                            style={this.props.posts.User.UserID == this.props.userID && { backgroundColor: '#df5c4b' }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: 50 }}>
                                    <Image
                                        style={imageStyle.iconStyleLargeWhite}
                                        source={require('../images/icons/uygunsuz_icerik.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.settingStyle.generalWhite}>{Localizations('WallScreen.ReportInappropriateContent')}</Text>
                                    <Text style={textStyle.settingStyle.securityWhite}>{Localizations('WallScreen.ReportInappropriateContentDetail')}</Text>
                                </View>
                            </View>
                        </MenuOption>

                        <View style={{ borderWidth: 0.5, borderColor: 'lightgray', marginVertical: 5 }} />

                        <MenuOption
                            value={2}
                            disabled={this.props.posts.User.UserID == this.props.userID ? true : false}
                            style={this.props.posts.User.UserID == this.props.userID && { backgroundColor: '#df5c4b' }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Image
                                        style={imageStyle.iconStyleLargeWhite}
                                        source={require('../images/icons/engelle.png')}
                                    />
                                </View>
                                <View>
                                    <Text style={textStyle.settingStyle.generalWhite}>{Localizations('WallScreen.BlockPostQwner')}</Text>
                                    <Text style={textStyle.settingStyle.securityWhite}>{Localizations('WallScreen.BlockThisUser')}</Text>
                                </View>
                            </View>
                        </MenuOption>


                        <View style={{ marginVertical: 5 }} />
                        {/* </ImageBackground> */}
                    </View>
                </MenuOptions>
            </Menu>
        )
    }
    postText() {
        return (
            this.props.posts.PostText != null &&
            <View style={{ marginVertical: 5 }}>
                <Text style={textStyle.logoStyle.md}>{this.props.posts.PostText}</Text>
            </View>
        )
    }
    postImage() {
        // debugger
        return (
            this.props.posts.PostImageList.length > 0 &&
            <View style={{ backgroundColor: '#f9fafb', borderRadius: 0, marginVertical: 0, marginHorizontal: -10, }}>
                <FlatList
                    data={this.props.posts.PostImageList}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    renderItem={info => (
                        <ListItemPhoto
                            allPhotos={this.props.posts.PostImageList}
                            photo={info.item}
                            userID={this.props.posts.User.UserID}
                            imageCount={this.props.posts.PostImageList.length}
                        />
                    )}
                />
            </View>
        )
    }


    rePost() {
        return (
            this.props.posts.RePost != null &&
            <View>
                <ListItemPost2
                    posts={this.props.posts.RePost}
                    repost="1"
                />
            </View>)
    }

    postButton() {
        return (
            (this.props.repost != "1") &&
            <View>
                <View style={{ marginHorizontal: -10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row', paddingBottom: 7, paddingTop: 7 }} >
                            <TouchableHighlight
                                style={[{ paddingLeft: 7, paddingBottom: 7, paddingTop: 7, alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }]}
                                underlayColor={'#ff8a8d'}
                                onPress={() => this._clickLike(this.props.posts.PostID)}>
                                <View style={{}}>
                                    {this.props.posts.UserLike == 1 ?
                                        <Text style={[textStyle.logoStyle.md, { color: '#ff585c', fontWeight: 'bold' }]}>{Localizations('NewPost.Like')}</Text>
                                        :
                                        <Text style={textStyle.logoStyle.md}>{Localizations('NewPost.Like')}</Text>
                                    }
                                </View>
                            </TouchableHighlight>
                            
                            <View style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._clickPostAllLikes(this.props.posts.PostID)}>
                                    <View>
                                        <ShowNumber numberStyle="1" number={this.props.posts.PostLikeCount} type="like" circleSize={30} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 7, paddingTop: 7 }} >
                            <TouchableHighlight
                                style={[{ paddingLeft: 7, paddingBottom: 7, paddingTop: 7, alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }]}
                                underlayColor={'#ff8a8d'}
                                onPress={() => {
                                    // this.showInterstitial();
                                    this._clickOperations(4, this.props.posts.PostID)
                                }
                                }>

                                <View>
                                    <Text style={textStyle.logoStyle.md}>{Localizations('NewPost.Comment')}</Text>
                                </View>
                            </TouchableHighlight>
                            <View style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this._clickPostAllReviews(this.props.posts.PostID)}>
                                    <View>
                                        <ShowNumber numberStyle="1" number={this.props.posts.PostReviewCount} type="review" circleSize={30} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 7, paddingTop: 7, alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end', justifyContent: 'flex-end' }} >
                            <TouchableHighlight
                                style={[{ paddingright: 7, paddingBottom: 7, paddingTop: 7, alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end', justifyContent: 'flex-end' }]}
                                underlayColor={'#ff8a8d'}
                                onPress={() => this._clickShare(this.props.posts.RePost ? this.props.posts.RePost.PostID : this.props.posts.PostID)}>
                                <View style={container.row} >
                                    <View>
                                        <Text style={textStyle.logoStyle.md}>{Localizations('NewPost.Share')}</Text>
                                    </View>
                                    <View>
                                        <ShowNumber numberStyle="1" number={this.props.posts.PostSharingCount} circleSize={30} />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                {this.state.showReviewBox == true &&
                    <View style={{ flex: 1, backgroundColor: '#f2f3f5', borderRadius: 10, padding: 5, paddingBottom: 0, marginBottom: 10 }}>
                        <View>

                            <TextInput
                                style={{ padding: 5, height: 60, borderColor: 'lightgray', borderRadius: 10, borderWidth: 1 }}
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={(reviewText) => (this.setState({ reviewText }), (Slang(reviewText, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                                value={this.state.reviewText}
                                placeholder={Localizations('Global.WriteAComment')}
                            />
                        </View>
                        <View style={[container.row.sb, { marginHorizontal: -5 }]}>
                            <TouchableHighlight
                                style={[container.center, { padding: 8, borderBottomLeftRadius: 10 }]}
                                underlayColor={'#ff8a8d'}
                                onPress={() => this._clickReviewCancel()}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{Localizations('NewPost.Cancel')}</Text>
                            </TouchableHighlight>


                            <TouchableOpacity style={[container.center, { padding: 8, borderBottomRightRadius: 10 }]}
                                underlayColor={'#ff8a8d'}
                                onPress={() => this._clickReviewSend(this.props.posts.PostID)}>
                                {
                                    (this.props.loadingSetPostReview) ?
                                        <Spinner size="small" />
                                        :
                                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{Localizations('NewPost.Send')}</Text>
                                }
                            </TouchableOpacity>


                        </View>
                    </View>
                }
            </View>
        )
    }
    postReview() {
        return (
            (this.props.posts.PostReviewList.length > 0) && (this.props.repost != "1") ?
                <View style={{ flex: 1, marginBottom: 10, marginLeft: 30 }}>
                    <FlatList
                        data={sortJsonArray(this.props.posts.PostReviewList.filter(x => x.PostReviewID > 0), 'ReviewDate', 'des')}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => (<View style={{ height: 10 }} />)}
                        renderItem={info => (
                            <ListItemPostReview
                                reviews={info.item}
                                userID={this.props.posts.User.UserID}
                            />
                        )}
                    />
                </View>
                :
                null
        )
    }
    // #endregion

    render() {
        //console.log(this.props.posts);
        //debugger
        //console.log(this.state.changingPostID + "   -  " + this.props.posts.PostID)
        if (this.state.changingPostID == this.props.posts.PostID) {

            // Like
            if (this.state.itemType == 'set_post_like_data_success') {
                this.props.posts.PostLikeCount = this.state.likeCount;
                this.props.posts.UserLike = this.state.userLike;
            }
            ////debugger;
            // review
            if (this.state.itemType == 'set_post_review_data_success' && reviewInserted == false) {
                reviewInserted = true;
                this.props.posts.PostReviewCount = this.state.reviewCount;

                // var c = this.props.posts.PostReviewList[0];
                // this.props.posts.PostReviewList = [];
                if (this.props.review != null) {
                    //debugger
                    this.props.posts.PostReviewList.push(this.props.review);
                }
                this.props.review = '';
            }
        }

        if (this.props.posts) {
            //debugger
            if (
                (this.props.posts.ActionTypeID >= 30 && this.props.posts.ActionTypeID < 40)
                ||
                (this.props.posts.ActionTypeID == 20 && this.props.userID == 0)
            ) {
                return (
                    <WallActionItem posts={this.props.posts} />
                );
            }

            else
                return (
                    <View style={{
                        backgroundColor: 'white', padding: 10, paddingBottom: 0, borderRadius: 0,
                        shadowOffset: { width: 0, height: 2 }, shadowRadius: 2, shadowOpacity: 0.2,
                        elevation: 3,
                    }}>

                        {this.postAction()}

                        <View style={container.row}>
                            <LetterCircle
                                photo={this.props.posts.User.UserPhoto}
                                data={this.props.posts.User.Name + " " + this.props.posts.User.Surname}
                                circleSize={40} />

                            <View style={[container.row.sb, { flex: 1, marginLeft: 10, }]}>
                                <TouchableOpacity onPress={this._clickItemDetail.bind(this)}>
                                    <View >


                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold' }]}>{this.props.posts.User.Name + " " + this.props.posts.User.Surname}</Text>

                                            {
                                                this.props.posts.User.Registered &&
                                                <Image
                                                    style={imageStyle.registeredTinyStyle}
                                                    source={require('../images/icons/registered.png')}
                                                />
                                            }
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            {/* <Text style={[textStyle.logoStyle.xs, { color: 'gray', fontWeight: '500' }]}>
                                                {FormatDate(this.props.posts.PostDate, "dd.MM.yyyy HH:mm")}

                                            </Text> */}

                                            {/* {DateFormat(this.props.posts.PostDate)} */}

                                            <View>
                                                <Text style={textStyle.logoStyle.xs}>
                                                    {this.props.posts.PostDateDiff > 0 ? this.props.posts.PostDateDiff : null} {
                                                        this.props.posts.PostDateDiff == 1 ?
                                                            Localizations('WallScreen.TimeType.' + this.props.posts.PostDateDiffType.toString())
                                                            :
                                                            Localizations('WallScreen.TimeTypes.' + this.props.posts.PostDateDiffType.toString())
                                                    }
                                                </Text>
                                            </View>


                                            {(this.props.posts.PostGoogleDistance && !this.props.posts.FakeDistance) &&
                                                <Text style={textStyle.logoStyle.xs}>
                                                    {this.props.posts.PostGoogleDistance.Distance == 99999999 ?
                                                        " - !!! "
                                                        :
                                                        this.props.posts.PostGoogleDistance.Distance < 1000 ?
                                                            " - " + this.props.posts.PostGoogleDistance.Distance.toFixed(0) + " m "
                                                            :
                                                            " - " + (this.props.posts.PostGoogleDistance.Distance / 1000).toFixed(1) + " km "
                                                    }
                                                    {Localizations('WallScreen.Near')}
                                                </Text>
                                            }

                                        </View>
                                    </View>
                                </TouchableOpacity>

                                {this.postMenu()}
                            </View>
                        </View>

                        {this.postText()}
                        {this.postImage()}
                        {/*                         
                        {this.postPlace()}
                        {this.postPurchased()}
                        {this.postQuestion()}
                        {this.postSurvey()} */}

                        {this.rePost()}
                        {this.postButton()}
                        {this.postReview()}

                        {/* Modal */}
                        <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                            <ImageViewer
                                imageUrls={images}
                                enableSwipeDown={true}
                                saveToLocalByLongPress={false}
                                onCancel={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                                onClick={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                            />
                        </Modal>





                        {/* Dialog Modal */}

                        <View>
                            <Dialog.Container visible={this.state.dialogVisible}>
                                <Dialog.Title>{this.state.DialogTitle}</Dialog.Title>
                                <Dialog.Description>
                                    {this.state.DialogDescription}
                                </Dialog.Description>
                                {(this.state.dialogValue == 1 || this.state.dialogValue == 4) &&
                                    <Dialog.Input
                                        multiline={true}
                                        numberOfLines={2}
                                        placeholder={this.state.DialogPlaceHolder}
                                        onChangeText={(dialogInputValue) => { this.setState({ dialogInputValue: dialogInputValue }) }}
                                        value={this.state.dialogInputValue}
                                    />
                                }
                                <Dialog.Button label={this.state.DialogCancel} onPress={this.handleCancel} />
                                <Dialog.Button label={this.state.DialogOk} onPress={this.handleOK} />
                            </Dialog.Container>
                        </View>
                    </View>
                )
        }
        return <Spinner size="large" />;
    }
}

const mapStateToProps = ({ postScreenResponse, startScreenResponse, userProfileScreenResponse }) => {
    const { inappropriatedPostID, userResponse, selected, loadingDelPost, loadingSetPostReview, loadingSendInappropriateContent, loadingRaitingOfQuestion, userToken, connectionError, changingPostID, likeCount, userLike, reviewCount, review, type } = postScreenResponse;
    const { SwoqyUserToken, SwoqyUserData, adStatus } = startScreenResponse;
    const { bannedPostID, loadingSetUserBans } = userProfileScreenResponse;

    return {
        bannedPostID, inappropriatedPostID, userResponse, selected, loadingDelPost, loadingSetPostReview, loadingSendInappropriateContent, loadingRaitingOfQuestion, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData, adStatus, changingPostID, likeCount, userLike, reviewCount, review, loadingSetUserBans
    };
}

export default connect(mapStateToProps, { RatingOfQuestionData, SetPostLike, SetPostReview, SetPostShare, DelPost, SetUserBansData, SendInappropriateContent, SetAdStatus })(ListItemPost);
