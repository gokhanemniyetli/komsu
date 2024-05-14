import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { GetMessagesData } from '../../actions';
import { Spinner, ShowMessage, LetterCircle, DateFormat, ShowNumber} from '../../common';
import { Localizations, FormatDate } from '../../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../../common/HF';

// import ListItemMesageList from '../../components/Communication/ListItemMesageList';


// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     PublisherBanner,
//     AdMobRewarded,
// } from 'react-native-admob'



var { LoginControl } = require('../../common/GlobalFunctions');

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../../styles/SwoqyStyles');


var selectedUserID = 0;

_clickUserProfile = (userID) => {
    Actions.userProfileScreen({ ID: userID });
}
_clickChatMessage = (userID, messageVideoBanner) => {

    selectedUserID = userID;
// debugger
    // if (messageVideoBanner == true) {
    //     this.showRewarded();
    // }
    // else {
        Actions.messageViewScreen({ ID: selectedUserID });
    // }
}


// showRewarded = () => {
//     AdMobRewarded.showAd().catch(error => console.warn(error));

// }



const ListItemMessageList = (props) => {
// debugger
    if (props.messageList) {
        return (
            <TouchableOpacity style={[container.row.sb, { flex: 1, margin: 5 }]} onPress={() => _clickChatMessage(props.messageList.User.UserID, props.messageVideoBanner)}>
                <TouchableOpacity style={[container.row, { margin: 5 }]} onPress={() => _clickUserProfile(props.messageList.User.UserID)}>
                    <LetterCircle
                        photo={props.messageList.User.UserPhoto}
                        data={props.messageList.User.Name + " " + props.messageList.User.Surname}
                        circleSize={40}
                    />

                    <View style={{ justifyContent: 'center', marginHorizontal: 15 }}>
                        <Text style={[textStyle.logoStyle.md, { fontWeight: 'bold' }]}>{props.messageList.User.Name} {props.messageList.User.Surname}</Text>

                        {(props.messageList.RequestDate != null) &&
                            DateFormat(props.messageList.RequestDate)
                        }
                    </View>
                </TouchableOpacity>

                <View style={container.row} >
                    {props.messageList.MessageCount != 0 ?
                        <ShowNumber numberStyle="2" number={props.messageList.MessageCount} circleSize={25} /> : null
                    }

                    <Image
                        style={[imageStyle.logoStyle.xs, { tintColor: 'lightgray' }]}
                        source={require('../../images/icons/arrow_right.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return <Spinner size="large" />;
}




class MessageListScreen extends Component {
    state = {
        res: '', type: '', userToken: '', connectionError: false, searchFriend: '', messageVideoBanner: false
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        if (LoginControl(this.props.SwoqyUserToken)) {
            this.props.GetMessagesData({
                maxRowID: 0, count: 20, userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        res = nextProps.res;

        if ((nextProps.type == 'get_messages_data_success')) {
            
            this.setState({
                messageList: res.Messages,
                searchMessageList: res.Messages,
                messageVideoBanner: res.MessageVideoBanner
            });
        }
    }

    componentDidMount() {
        // //AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
        // AdMobRewarded.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/2131487205' : 'ca-app-pub-2031837306819302/5725933075')

        // AdMobRewarded.addEventListener('rewarded', reward =>
        //     console.log('AdMobRewarded => rewarded', reward),
        // );
        // AdMobRewarded.addEventListener('adLoaded', () =>
        //     console.log('AdMobRewarded => adLoaded'),
        // );
        // AdMobRewarded.addEventListener('adFailedToLoad', error =>
        //     console.warn(error),
        // );
        // AdMobRewarded.addEventListener('adOpened', () =>
        //     console.log('AdMobRewarded => adOpened'),
        // );
        // AdMobRewarded.addEventListener('videoStarted', () =>
        //     console.log('AdMobRewarded => videoStarted'),
        // );
        // AdMobRewarded.addEventListener('adClosed', () => {
        //     console.log('AdMobRewarded => adClosed');
        //     AdMobRewarded.requestAd().catch(error => console.warn(error));
        // });
        // AdMobRewarded.addEventListener('videoCompleted', () => {
        //     console.log('AdMobRewarded => videoCompleted');

        //     Actions.messageViewScreen({ ID: selectedUserID });

        // });
        // AdMobRewarded.addEventListener('adLeftApplication', () =>
        //     console.log('AdMobRewarded => adLeftApplication'),
        // );

        // AdMobRewarded.requestAd().catch(error => console.warn(error));

    }

    componentWillUnmount() {
        // AdMobRewarded.removeAllListeners();
    }

    //#endregion




    //#region click functions
    // _clickUserProfile = () => {
    //     Actions.userProfileScreen({ ID: props.messageList.User.UserID });
    // }
    // _clickChatMessage = () => {
    //     // önce reklam sonra mesaj ekranı
    //     this.showRewarded();


    //     //        Actions.messageViewScreen({ ID: props.messageList.User.UserID });
    // }

    searchFriend = (search) => {
        //console.log(search);
        if (this.state.messageList != '') {
            this.setState({
                searchFriend: search,
                searchMessageList: sortJsonArray(this.state.messageList.filter(x => String(x.User.Name.toLowerCase() + ' ' + x.User.Surname.toLowerCase()).includes(search.toLowerCase())), 'Name', 'asc')
            })
        }
    }
    //#endregion

    renderMessageListArea = () => {
        if (!this.props.loadingGetMessages) {
            if (this.state.messageList != '' && this.state.messageList != undefined && this.state.messageList != null) {
                var oObject = sortJsonArray(this.state.searchMessageList, 'RequestDate', 'des')

                return (
                    <View style={{ flex: 1, margin: 10, marginHorizontal: 20 }}>
                        <FlatList
                            data={oObject}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={() => (<View style={{ margin: 5, borderBottomWidth: 0.5, borderColor: '#ff585c' }} />)}
                            renderItem={info => (
                                <ListItemMessageList
                                    messageList={info.item}
                                    messageVideoBanner={this.state.messageVideoBanner}
                                />
                            )}
                        />
                    </View>
                )
            }
        }
        else
            return <Spinner size="large" />
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
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={{ height: 40 }}>
                            <HF_01 title={Localizations('Screen.MessageListScreen')} />
                        </View>

                        <View style={[container.row, { width: '90%', marginTop: 10, alignSelf: 'center', justifyContent: 'flex-end' }]}>
                            <TextInput
                                style={[textStyle.logoStyle.lg, { flex: 1, backgroundColor: '#f0f1f4', borderRadius: 10, padding: 10, paddingRight: 30 }]}
                                onChangeText={search => this.searchFriend(search)}
                                value={this.state.searchFriend}
                            />

                            <TouchableOpacity style={{ position: 'absolute', margin: 5 }} onPress={() => this.searchFriend('')} >
                                <Image
                                    style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: 'lightgray', margin: 10 }}
                                    source={require('../../images/icons/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        {this.renderMessageListArea()}
                    </View>
                )
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

const mapStateToProps = ({ communicationScreenResponse, startScreenResponse }) => {
    const { res, loadingGetMessages, type, userToken, connectionError } = communicationScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, loadingGetMessages, type, userToken, SwoqyUserToken, SwoqyUserData, connectionError
    };
}

export default connect(mapStateToProps, { GetMessagesData })(MessageListScreen);
