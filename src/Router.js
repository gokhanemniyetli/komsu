import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, ImageBackground } from 'react-native';
import { Scene, Router, Actions, Stack, Tabs, Drawer, Overlay, Modal, Lightbox } from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';

import { Localizations, FormatDate } from '../locales/i18n';
import MenuIcon from './images/menu_burger.png';
import DrawerContent from './components/drawer/DrawerContent';

// import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ModalScreen from './screens/ModalScreen';
import StartScreen from './screens/StartScreen';
import OutdoorMapScreen from './screens/OutdoorMapScreen';
import SignInScreen from './screens/SignInScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import StoreScreen from './screens/StoreScreen';
import ShoppingMallScreen from './screens/ShoppingMallScreen';
import BrandDetailScreen from './screens/BrandDetailScreen';
import BrandReviewsScreen from './screens/BrandReviewsScreen';
import ShoppingMallReviewsScreen from './screens/ShoppingMallReviewsScreen';
import StoreReviewsScreen from './screens/StoreReviewsScreen';
// import StoreFloorPlanScreen from './screens/StoreReviewsScreen';
import ReviewsOfUserScreen from './screens/ReviewsOfUserScreen';
import NewReviewForShoppingMallScreen from './screens/NewReviewForShoppingMallScreen';
import OpportunityDetailScreen from './screens/OpportunityDetailScreen';
import HelpRequestScreen from './screens/HelpRequestScreen';
import HelpRequestDetailScreen from './screens/HelpRequestDetailScreen';
import MyHelpRequestScreen from './screens/MyHelpRequestScreen';
import HelpScreen from './screens/HelpScreen';
import HelpfullScreen from './screens/HelpfullScreen';
import MyPreviousHelpsScreen from './screens/MyPreviousHelpsScreen';
// import UserSettingsScreen from './screens/UserSettingsScreen';
import AboutSwoqyScreen from './screens/AboutSwoqyScreen';
import UserGeneralSettingsScreen from './screens/UserGeneralSettingsScreen';
import UserSettingsPersonalInformationScreen from './screens/UserSettingsPersonalInformationScreen';
import UserSettingsSecurityPasswordScreen from './screens/UserSettingsSecurityPasswordScreen';
import UserSettingsApplicationPreferencesScreen from './screens/UserSettingsApplicationPreferencesScreen';
import UserSettingsPrivacyScreen from './screens/UserSettingsPrivacyScreen';
import SearchInBlockedUsersScreen from './screens/SearchInBlockedUsersScreen';
import UserAddedScreen from './screens/UserAddedScreen';


import UserReviewsScreen from './screens/UserReviewsScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import UserSortScreen from './screens/UserSortScreen';
import CameraScreen from './screens/CameraScreen';
import PostAllReviewsScreen from './screens/PostAllReviewsScreen';
import PostAllLikesScreen from './screens/PostAllLikesScreen';
import SpecialToMeScreen from './screens/SpecialToMeScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen';


import SearchBarComponent from './components/SearchBarComponent';

import Header from './common/Header';
import { HF_11, HF_10, HF_01, HF_00 } from './common/HF';

import Post from './screens/Post';
import PostPrivacyScreen from './screens/PostPrivacyScreen';
import PostPrivacySpecificFriendsScreen from './screens/PostPrivacySpecificFriendsScreen';
import PostPhotoScreen from './screens/PostPhotoScreen';
import PostLocationScreen from './screens/PostLocationScreen';
import PostSurveyScreen from './screens/PostSurveyScreen';
import PostQuestionScreen from './screens/PostQuestionScreen';
import PostPurchaseScreen from './screens/PostPurchaseScreen';
import BrandSearchScreen from './screens/BrandSearchScreen';
import WallScreen from './screens/WallScreen';

import QuestionResultScreen from './screens/QuestionResultScreen';
import SurveyResultScreen from './screens/SurveyResultScreen';

import EULAScreen from './screens/EULAScreen';
import KVKKScreen from './screens/KVKKScreen';
import ElectronicMessageScreen from './screens/ElectronicMessageScreen';

import FriendRequestsScreen from './screens/CommunicationScreens/FriendRequestsScreen';
import MessageListScreen from './screens/CommunicationScreens/MessageListScreen';
import MessageViewScreen from './screens/CommunicationScreens/MessageViewScreen';




// Push Notification Start
import firebase from 'react-native-firebase'
// import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");



firebase.notifications().onNotification((notification) => {
    // console.log("firebase notification çalışacak")
    // const { title, body } = notification;


    // PushNotification.localNotification({
    //     title: "title",
    //     message: body,
    // });
});



PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        
    //    console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {

    //    console.log("NOTIFICATION:", notification);

 
        if (!notification.userInteraction) { 
            
            try { 
                PushNotification.localNotification({
                    title: notification.data.title,
                    message: notification.data.message,
                });
                
            } catch (error) {
                PushNotification.localNotification({
                    title: notification.title,
                    message: notification.message,
                });
              
            }
             
        }
        else {
            Actions.messageListScreen();
        }
        //Actions.messageListScreen();
        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    senderID: "951563317761",
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
});

// Push notification End



// yellowbox mesajlarını kapatma
console.disableYellowBox = true;




const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',

    },
    touchStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    imageStyle: {
        height: 24,
        width: 24,
        margin: 2,
        resizeMode: 'contain',
        tintColor: '#ff585c'
    },
    imageTintStyle: {
        height: 24,
        width: 24,
        margin: 2,
        resizeMode: 'contain',
        tintColor: 'gray'
    },
    imageLargeStyle: {
        height: 32,
        width: 32,
        margin: 2,
        resizeMode: 'contain',
        tintColor: '#ff585c'
    },
    imagelargeTintStyle: {
        height: 32,
        width: 32,
        margin: 2,
        resizeMode: 'contain',
        tintColor: 'gray'
    },
    textStyle: {
        // fontWeight: 'normal',
        fontSize: 11,
        color: '#ff585c'
    },
    textTintStyle: {
        // fontWeight: 'normal',
        fontSize: 11,
        color: 'gray'
    },
    scene: {
        backgroundColor: 'white',

        shadowOpacity: 1,
        shadowRadius: 3,

    },
    tabBarStyle: {
        backgroundColor: 'transparent',
        //bottom:-34,

    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    }
});


const TabIcon = ({ keyTitle, focused }) => {



    const { container, touchStyle, textStyle, textTintStyle, imageStyle, imageTintStyle, imageLargeStyle, imagelargeTintStyle, viewStyle } = styles;
    this.props = {
        stream: (
            <TouchableOpacity style={touchStyle} onPress={() => Actions.wallScreen()} >
                <Image source={require('./images/icons/home.png')} style={focused ? imageStyle : imageTintStyle} />
                <Text style={focused ? textStyle : textTintStyle} >{Localizations('Header-Navigation.Stream')}</Text>
            </TouchableOpacity>

            // <View style={viewStyle} >
            //     <Image source={require('./images/icons/stream.png')} style={focused ? imageStyle : imageTintStyle} />
            //     <Text style={focused ? textStyle : textTintStyle} >{Localizations('Header-Navigation.Stream')}</Text>
            // </View>

            // <TouchableOpacity style={touchStyle} onPress={() => Actions.wallScreen()} >
            //     <Image source={require('./images/icons/stream.png')} style={imageStyle} />
            //     <Text style={textStyle}>{Localizations('Header-Navigation.Stream')}</Text>
            // </TouchableOpacity>
        ),
        request: (
            <TouchableOpacity style={touchStyle} onPress={() => Actions.userSortScreen({ ID: this.props.ID, requestType: 'friends', title: Localizations('Screen.FriendScreen') })} >
                <Image source={require('./images/icons/myFriends.png')} style={focused ? imageStyle : imageTintStyle} />
                <Text style={focused ? textStyle : textTintStyle}>{Localizations('Header-Navigation.Friends')}</Text>
            </TouchableOpacity>
        ),
        newPost: (
            <TouchableOpacity style={touchStyle} onPress={() => Actions.post()} >
                <Image source={require('./images/icons/newPost.png')} style={focused ? imageLargeStyle : imagelargeTintStyle} />
                <Text style={focused ? textStyle : textTintStyle}>{Localizations('Header-Navigation.NewPost')}</Text>
            </TouchableOpacity>
        ),
        help: (
            <TouchableOpacity style={touchStyle} onPress={() => Actions.helpScreen()} >
                <Image source={require('./images/icons/heartAktif.png')} style={focused ? imageStyle : imageTintStyle} />
                <Text style={focused ? textStyle : textTintStyle}>{Localizations('Header-Navigation.Help')}</Text>
            </TouchableOpacity>
        ),
        profile: (
            <TouchableOpacity style={touchStyle} onPress={() => Actions.myProfileScreen()} >
                <Image source={require('./images/icons/hesabim.png')} style={focused ? imageStyle : imageTintStyle} />
                <Text style={focused ? textStyle : textTintStyle}>{Localizations('Header-Navigation.Account')}</Text>
            </TouchableOpacity>
        )
    }


    return (

        (keyTitle == 'stream') ? this.props.stream :
            (keyTitle == 'request') ? this.props.request :
                (keyTitle == 'newPost') ? this.props.newPost :
                    (keyTitle == 'help') ? this.props.help :
                        (keyTitle == 'profile') ? this.props.profile : null


    );
}



// Actions.refresh({key: Math.random()})
////////////////////////////



const stateHandler = (prevState, newState, action) => {
    // console.log('onStateChange: ACTION:', action);
    // console.log(prevState);
    // console.log(newState);
    // if(action.key =='stream' && action.type == 'Navigation/POP_TO_TOP') {
    //     Actions.wallScreen();
    // }
};

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

const RouterComponent = () => {
    return (
        // <Router navBar={HF_11} navigationBarStyle={{ flex: 1 }}>
        // <Router navigationBarStyle={{ flex: 1 }}

        // onStateChange={() => navStore.setScene(Actions.currentScene)}

        // onStateChange={(args) => {
        //     // if (Actions.currentScene == "wallScreen") {
        //     //     Actions.refresh({ key: Math.random() })
        //     // }
        //     // console.log(args);
        //     // console.log(Actions.currentScene);
        //     //  if (Actions.currentScene == "wallScreen" && args.routes[0].isTransitioning == false && args.index == 0 ) {
        //     //     // if (Actions.currentScene == "wallScreen") {
        //     //      debugger;
        //     //      Actions.push("wallScreen", { key: Math.random() })
        //     //     //ctions.refresh({ key: Math.random() });
        //     // }
        // }}
        // >


        <Router
            onStateChange={stateHandler}
            sceneStyle={styles.scene}
            uriPrefix={prefix}
            navBar={HF_11}

        >


            <Stack key="root" hideNavBar>
                <Tabs
                    key="tabbar"
                    routeName="tabbar"
                    onTabOnPress={() => {
                        console.log('Back to initial and also print this');
                    }}
                    showLabel={false}
                    tabBarStyle={styles.tabBarStyle}
                    activeBackgroundColor='white'
                // inactiveBackgroundColor='transparent'
                >

                    <Stack key="stream" keyTitle="stream"
                        // inactiveBackgroundColor="#FFF"
                        // activeBackgroundColor="#DDD"
                        icon={TabIcon}
                        // navigationBarStyle={{ backgroundColor: 'blue' }}
                        titleStyle={{ color: 'white', alignSelf: 'center' }}
                    >
                        <Scene key="wallScreen" component={WallScreen} title="WallScreen" hideBackImage={true} panHandlers={null}
                        //onEnter={() => {
                        // console.log('enter yapildi');
                        //}}
                        //type='reset' 
                        />
                        <Scene key="searchResultsScreen" component={SearchResultsScreen} contentScreen={true} />
                        <Scene key="userProfileScreen" component={UserProfileScreen} title={Localizations('Global.UserProfileScreen')} contentScreen={true} />
                        <Scene key="postAllReviewsScreen" component={PostAllReviewsScreen} title={Localizations('Global.PostAllReviewsScreen')} contentScreen={true} />
                        <Scene key="postAllLikesScreen" component={PostAllLikesScreen} title={Localizations('Global.PostAllLikesScreen')} contentScreen={true} />
                        <Scene key="questionResultScreen" component={QuestionResultScreen} title={Localizations('Global.QuestionResultScreen')} contentScreen={true} />
                        <Scene key="surveyResultScreen" component={SurveyResultScreen} title={Localizations('Global.SurveyResultScreen')} contentScreen={true} />
                        <Scene key="signInScreen" component={SignInScreen} title="SignIn Screen" hideNavBar hideTabBar />
                        <Scene key="startScreen" component={StartScreen} hideNavBar hideTabBar initial />
                    </Stack>

                    <Stack key="request" keyTitle="request" icon={TabIcon} hideNavBar>

                        <Scene key="messageListScreen" component={MessageListScreen} title={Localizations('Screen.MessageListScreen')} contentScreen={true}
                            type="reset"
                        />
                        <Scene key="friendRequestsScreen" component={FriendRequestsScreen} title={Localizations('Screen.FriendRequestScreen')} contentScreen={true} />

                        <Scene key="messageViewScreen" component={MessageViewScreen} title="Message Screen" hideNavBar />
                        <Scene key="userSortScreen" component={UserSortScreen} title={Localizations('Global.UserShortScreen')} contentScreen={true} />

                    </Stack>

                    <Scene key="newPost" keyTitle="newPost" icon={TabIcon} >
                        <Scene key="post" component={Post} title="Post Screen" hideNavBar />
                        <Scene key="postPrivacyScreen" component={PostPrivacyScreen} title={Localizations('Global.PostPrivacyScreen')} contentScreen={true} />
                        <Scene key="postPrivacySpecificFriendsScreen" component={PostPrivacySpecificFriendsScreen} title={Localizations('Global.PostPrivacySpecificFriendsScreen')} hideNavBar />
                        <Scene key="postPhotoScreen" component={PostPhotoScreen} title={Localizations('Global.PostPhotoScreen')} contentScreen={true} />
                        <Scene key="postLocationScreen" component={PostLocationScreen} title={Localizations('Global.PostLocationScreen')} contentScreen={true} />
                        <Scene key="postSurvey" component={PostSurveyScreen} title="Post Survey Screen" hideNavBar />
                        <Scene key="postQuestionScreen" component={PostQuestionScreen} title="Post Question Screen" hideNavBar />
                        <Scene key="postPurchaseScreen" component={PostPurchaseScreen} title="Post Purchase Screen" hideNavBar />
                        <Scene key="cameraScreen" component={CameraScreen} title="Camera Screen" hideNavBar />
                    </Scene>

                    <Stack key="help" keyTitle="help" icon={TabIcon} >
                        <Scene key="helpScreen" component={HelpScreen} title={Localizations('Global.HelpScreen')} hideNavBar
                            type="reset"
                        />
                        <Scene key="helpRequestScreen" component={HelpRequestScreen} title={Localizations('Global.HelpScreen')} hideNavBar />
                        <Scene key="myHelpRequestScreen" component={MyHelpRequestScreen} title={Localizations('Global.MyHelpScreen')} hideNavBar />
                        <Scene key="helpRequestDetailScreen" component={HelpRequestDetailScreen} title={Localizations('Global.MyHelpScreen')} hideNavBar />
                        <Scene key="helpfullScreen" component={HelpfullScreen} title={Localizations('Global.HelpfullScreen')} hideNavBar />
                        <Scene key="myPreviousHelpsScreen" component={MyPreviousHelpsScreen} title={Localizations('Global.MyPreviousHelpsScreen')} hideNavBar />
                    </Stack>

                    <Stack key="profile" keyTitle="profile" icon={TabIcon}  >

                        <Scene key="myProfileScreen" component={MyProfileScreen} title={Localizations('Global.UserProfileScreen')} contentScreen={true} type="reset" />

                        <Scene key="userReviewsScreen" component={UserReviewsScreen} title={Localizations('Global.UserReviewsScreen')} contentScreen={true} />


                        {/* <Scene key="userSettingsScreen" component={UserSettingsScreen} title="User Settings Screen" /> */}
                        <Scene key="userGeneralSettingsScreen" component={UserGeneralSettingsScreen} title={Localizations('Global.UserAccountSettingsScreen')} contentScreen={true} />
                        <Scene key="userSettingsPersonalInformationScreen" component={UserSettingsPersonalInformationScreen} title="Personal Information" hideNavBar />
                        <Scene key="userSettingsSecurityPasswordScreen" component={UserSettingsSecurityPasswordScreen} title="Security and Password" hideNavBar />
                        <Scene key="userSettingsApplicationPreferencesScreen" component={UserSettingsApplicationPreferencesScreen} title="Application Preferences" hideNavBar />
                        <Scene key="userSettingsPrivacyScreen" component={UserSettingsPrivacyScreen} title="Privacy" hideNavBar />
                        <Scene key="searchInBlockedUsersScreen" component={SearchInBlockedUsersScreen} title={Localizations('Global.SearchInBlockedUsersScreen')} contentScreen={true} />
                        <Scene key="aboutSwoqyScreen" component={AboutSwoqyScreen} title={Localizations('Global.AboutSwoqyScreen')} contentScreen={true} />
                        <Scene key="forgotPasswordScreen" component={ForgotPasswordScreen} title={Localizations('Global.ForgotPasswordScreen')} contentScreen={true} />
                        <Scene key="eulaScreen" component={EULAScreen} title={Localizations('Global.EULAScreen')} contentScreen={true} />
                        <Scene key="kvkkScreen" component={KVKKScreen} title={Localizations('Global.KVKKScreen')} contentScreen={true} />
                        <Scene key="electronicMessageScreen" component={ElectronicMessageScreen} title={Localizations('Global.ElectronicMessageScreen')} contentScreen={true} />
                    </Stack>


                    {/* <Scene key="storeScreen" component={StoreScreen} title={Localizations('Global.StoreScreen')} contentScreen={true} />
                    <Scene key="storeReviewsScreen" component={StoreReviewsScreen} title={Localizations('Global.StoreReviewsScreen')} contentScreen={true} />
                    <Scene key="shoppingMallScreen" component={ShoppingMallScreen} title={Localizations('Global.ShoppingMallScreen')} contentScreen={true} />
                    <Scene key="shoppingMallReviewsScreen" component={ShoppingMallReviewsScreen} title={Localizations('Global.ShoppingMallReviewsScreen')} contentScreen={true} />
                    <Scene key="brandDetailScreen" component={BrandDetailScreen} title={Localizations('Global.BrandDetailScreen')} contentScreen={true} />
                    <Scene key="brandReviewsScreen" component={BrandReviewsScreen} title={Localizations('Global.BrandReviewsScreen')} contentScreen={true} /> */}
                    {/* <Scene key="outdoorMapScreen" component={OutdoorMapScreen} title={Localizations('Global.OutdoorMapScreen')} contentScreen={true} /> */}
                    {/* <Scene key="storeFloorPlanScreen" component={StoreFloorPlanScreen} title="Store Floor Plan Screen" /> */}
                    {/* <Scene key="opportunityDetailScreen" component={OpportunityDetailScreen} title={Localizations('Global.OpportunityDetailScreen')} contentScreen={true} /> */}
                    {/* <Scene key="accountScreen" component={AccountScreen} title="Account Screen" hideNavBar /> */}
                    {/* <Scene key="favoritesScreen" component={FavoritesScreen} title={Localizations('Global.FavoritesScreen')} contentScreen={true} /> */}
                    {/* <Scene key="specialToMeScreen" component={SpecialToMeScreen} title={Localizations('Global.SpecialToMeScreen')} contentScreen={true} /> */}
                    {/* <Scene key="activityDetailScreen" component={ActivityDetailScreen} title={Localizations('Global.ActivityDetailScreen')} contentScreen={true} /> */}
                    {/* <Scene key="brandSearchScreen" component={BrandSearchScreen} title="Brand Search" hideNavBar /> */}


                </Tabs>

            </Stack>

        </Router >
    );
};

export default RouterComponent;
