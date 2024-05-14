import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { GetFriendRequestsData, SetFriendResponseData, SetAdStatus } from '../../actions';
import { DateFormat, Spinner, ShowNumber, ShowMessage, LetterCircle } from '../../common';
import { Localizations, FormatDate } from '../../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../../common/HF';
// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     PublisherBanner,
//     // AdMobRewarded,
// } from 'react-native-admob'

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../../styles/SwoqyStyles');

class FriendRequestsScreen extends Component {
    state = {
        res: '', type: '', userToken: '', responseID: '', connectionError: false,
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        // this.props.SetAdStatus({ AdStatus: '' });

        // AdMobInterstitial.setAdUnitID(Platform.OS === "ios" ? 'ca-app-pub-2031837306819302/8369592492' : 'ca-app-pub-2031837306819302/5725933075');

        // AdMobInterstitial.requestAd().catch(error => console.warn(error));


        this.props.GetFriendRequestsData({
            minRequestID: 0, count: 20, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude
        });
    }

    componentWillUnmount() {
        // AdMobInterstitial.removeAllListeners();

    }

    showInterstitial() {
        // AdMobInterstitial.showAd().catch(error => console.warn(error));
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        res = nextProps.res;

        if ((nextProps.type == 'get_friend_requests_data_success')) {
            this.setState({
                friendRequestList: res,
            });
        } else if (nextProps.type == 'set_friend_response_data_success') {
            for (let i = 0; i < this.state.friendRequestList.length; i++) {
                this.state.friendRequestList[i].FriendRequestID == this.state.responseID ?
                    this.setState((state) => ({
                        friendRequestList: [...state.friendRequestList, state.friendRequestList[i].ResponseType = res.IsFriend]
                    })) : null
            }
            //  console.log(this.state)
        }
    }
    //#endregion

    //#region click functions
    _clickItemDetail = (userID) => {
        this.props.SetAdStatus({ AdStatus: 'play' });
        Actions.userProfileScreen({ ID: userID });
    }
    _clickMessage = (userID) => {
        this.props.SetAdStatus({ AdStatus: 'play' });
        Actions.messageViewScreen({ ID: userID });
    }
    _clickResponse = (ID, parameter) => {
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
            this.props.SetFriendResponseData({
                ID: ID, intParameter: parameter, userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude
            });
            this.setState({ responseID: ID });
        }
    }
    // endregion

    renderListItemFriendRequest = (request) => {
        return (
            <TouchableOpacity style={[container.row, { flex: 1, margin: 5 }]} onPress={() => this._clickItemDetail(request.User.UserID)}>
                <LetterCircle
                    photo={request.User.UserPhoto}
                    data={request.User.Name + " " + request.User.Surname}
                    circleSize={40}
                />

                <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 15 }}>
                    <Text style={[textStyle.logoStyle.md, { fontWeight: 'bold' }]}>{request.User.Name} {request.User.Surname}</Text>
                    {request.ResponseType == 4 &&
                        <Text style={{color:'red'}}>{Localizations('Global.Help')}</Text>
                    }
                    {DateFormat(request.RequestDate)}
                </View>

                {
                    (request.ResponseType == 3 || request.ResponseType == 4) ?
                        <View style={container.row}>
                            <TouchableOpacity style={[container.center.center, { marginHorizontal: 3 }]} onPress={() => this._clickResponse(request.FriendRequestID, 2)}>
                                <Image source={require('../../images/icons/cancel.png')} style={imageStyle.iconStyle} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[container.center.center, { marginHorizontal: 3 }]} onPress={() => this._clickResponse(request.FriendRequestID, 1)}>
                                <Image source={require('../../images/icons/approval.png')} style={imageStyle.iconStyle} />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ alignSelf: 'flex-end' }}>
                            {
                                request.ResponseType == 1 ?
                                    <TouchableOpacity style={[container.center, { borderWidth: 0.5, borderRadius: 8, padding: 5 }]} onPress={() => this._clickMessage(request.User.UserID)}>
                                        <Text>{Localizations('UserProfileScreen.SendMessage')}</Text>
                                    </TouchableOpacity>
                                    : <Text>{Localizations('Global.Denied')}</Text>
                            }
                        </View>
                }
            </TouchableOpacity>
        )
    }

    renderFriendRequestArea = () => {
        if (this.state.friendRequestList != '' && this.state.friendRequestList != undefined && this.state.friendRequestList != null) {
            var oObject = this.state.friendRequestList;
            oObject = sortJsonArray(oObject, 'FriendRequestID', 'asc')

            return (
                <View style={{ flex: 1, margin: 10, marginHorizontal: 20 }}>
                    <FlatList
                        data={oObject.filter(x => x.FriendRequestID >= 0)}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => (<View style={{ margin: 5, borderBottomWidth: 0.5, borderColor: '#ff585c' }} />)}
                        renderItem={info => (this.renderListItemFriendRequest(info.item)
                        )}
                    />
                </View>
            )
        }
        else
            return <Spinner size="large" />
    }

    render() {

        //console.log("adStatus : " + this.props.adStatus);
        if (this.props.adStatus == 'play') {
            this.props.SetAdStatus('');
            this.showInterstitial();
            
        }

        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Screen.FriendRequestScreen')} />
                    </View>

                    {this.renderFriendRequestArea()}
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

const mapStateToProps = ({ communicationScreenResponse, startScreenResponse }) => {
    const { res, loadingFriendRequests, loadingSetFriendResponse, type, userToken, connectionError } = communicationScreenResponse;
    const { SwoqyUserToken, SwoqyUserData, adStatus } = startScreenResponse;
    return {
        res, loadingFriendRequests, loadingSetFriendResponse, type, userToken, SwoqyUserToken, SwoqyUserData, connectionError, adStatus
    };
}

export default connect(mapStateToProps, { GetFriendRequestsData, SetFriendResponseData, SetAdStatus })(FriendRequestsScreen);
