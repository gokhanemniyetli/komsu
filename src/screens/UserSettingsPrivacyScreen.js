import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut } from '../actions';
import { Card, CardSection, Spinner, ShowMessage, Link, GetSessionTicket, LetterCircle } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import { Dropdown } from 'react-native-material-dropdown';


import SwitchSelector from "react-native-switch-selector";

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class UserSettingsPrivacyScreen extends Component {
    state = {
        res: '',
        userAllData: '',
        profileViewer: 1, postAccess: 1, s3: true, s4: true, whoFriend: 1, s6: true, s7: true, s8: true, s9: true, s10: true, s11: true
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        // debugger;
        res = this.props.userAllData
        this.setState({
            profileViewer: res.ProfileViewer,
            postAccess: res.PostAccess,
            whoFriend: res.WhoFriend,

            s4: res.PostCommentAutoPublish,
            // s10: res.ForwardEventsNearMe,
            // s11: res.ForwardEventsMostNearMe,
            s7: res.FriendMessage,
            // s8: res.FollowerMessage,
            // s9: res.FollowingMessage,

        });
    }

    componentDidMount() {
        // this.setDropdown(this.state.profileViewer, "dropdown_seeProfile");
        // this.setDropdown(this.state.postAccess, "dropdown_seePost");
        // this.setDropdown(this.state.whoFriend, "dropdown_sendFriendRequest"); 
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.type == "set_user_generalsettings_user_all_data") {
            //Actions.userGeneralSettingsScreen();
        }
    }
    //#endregion

    //#region click functions
    _clickSave = () => {
        // debugger
        // this.props.SetUserGeneralSettingsData({ profileViewer: this.state.s1, postAccess: this.state.s2, postCommentAutoPublish: this.state.s4, forwardEventsNearMe: this.state.s10, forwardEventsMostNearMe: this.state.s11, whoFriend: this.state.s5, friendMessage: this.state.s7, followerMessage: this.state.s8, followingMessage: this.state.s9, OperationType: 4, userToken: this.props.SwoqyUserToken });
        this.props.SetUserGeneralSettingsData({
            profileViewer: this.state.profileViewer, postAccess: this.state.postAccess, postCommentAutoPublish: this.state.s4,
            whoFriend: this.state.whoFriend, friendMessage: this.state.s7,
            OperationType: 4, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude 
        });


        // if (this.props.SwoqyUserToken) {
        //     Actions.userGeneralSettingsScreen();
        // }
        // else {
        //     Actions.userSettingsPrivacyScreen();
        // }
    }

    _switchSelect = (data, iValue) => {

        // console.log(data + " : " + iValue )
        const options = [];
        options.push({ label: Localizations('Setting.Privacy.option.No'), value: false })
        options.push({ label: Localizations('Setting.Privacy.option.Yes'), value: true })
        //debugger
        return (
            <View style={container.center}>
                <SwitchSelector
                fontSize={12}
                    style={{ alignSelf: 'flex-end', width: '100%' }}
                    initial={iValue ? 1 : 0}
                    onPress={value =>
                        // data == 's3' ?
                        //     this.setState({ s3: value }) :
                        (data == 's4' ?
                            this.setState({ s4: value }) :
                            // (data == 's10' ?
                            //     this.setState({ s10: value }) :
                            //     (data == 's11' ?
                            //         this.setState({ s11: value }) :
                            (data == 's7' ?
                                this.setState({ s7: value }) :
                                // (data == 's8' ?
                                //     this.setState({ s8: value }) :
                                //     (data == 's9' ?
                                //         this.setState({ s9: value }) :
                                null)
                        )
                        // ))))
                    }
                    textColor='#ff5a5c'
                    selectedColor='#ffffff'
                    buttonColor='#ff5a5c'
                    borderColor='#e9ebed'
                    hasPadding
                    options={options}
                />
            </View>
        )
    }



    setProfileViewer = (itemID) => {
        this.setState({
            profileViewer: itemID
        })
    }



    setPostAccess = (itemID) => {
        this.setState({
            postAccess: itemID
        })
    }



    setWhoFriend = (itemID) => {
        this.setState({
            whoFriend: itemID
        })
    }

    //#endregion

    //#region dropdown
    _dropdown = (ref, onSelect) => {
        const obj = [];
        switch (onSelect) {
            case 's1':
                obj.push({ 'ID': 1, 'Name': Localizations('Setting.Privacy.option.Everyone') });
                obj.push({ 'ID': 2, 'Name': Localizations('Setting.Privacy.option.Friend') });
                obj.push({ 'ID': 3, 'Name': Localizations('Setting.Privacy.option.FriendOfFriend') });
                break;

            case 's2':
                obj.push({ 'ID': 1, 'Name': Localizations('Setting.Privacy.option.Everyone') });
                obj.push({ 'ID': 2, 'Name': Localizations('Setting.Privacy.option.Friend') });
                break;

            case 's5':
                // case 's6':
                obj.push({ 'ID': 0, 'Name': Localizations('Setting.Privacy.option.Everyone') });
                obj.push({ 'ID': 1, 'Name': Localizations('Setting.Privacy.option.FriendOfFriend') });
                // obj.push({ 'ID': 4, 'Name': Localizations('Setting.Privacy.option.Noone') });
                break;

            default:
                break;
        }


        const initial = 1;
        switch (onSelect == 's1') {
            case 's1':
                initial = this.props.userAllData.ProfileViewer;
                break;

            case 's2':
                initial = this.props.userAllData.PostAccess;
                break;

            case 's5':
                initial = this.props.userAllData.WhoFriend;
                break;

            // case 's6':
            //     initial = this.prop.userAllData.PostAccess;
            //     break;

            default:
                break;
        }

        return (
            <View style={{ flex: 1 }}>
                {/* <ModalDropdown
                    initial={initial}
                    style={{ width: '100%', alignSelf: 'flex-end', borderWidth: 1, borderRadius: 10, padding: 10, fontSize: 14, justifyContent: 'center' }}
                    ref={ref}
                    dropdownStyle={{ height: 100, width: 120, margin: 10, backgroundColor: 'white' }}
                    options={obj}
                    renderButtonText={(rowData) => `${rowData.Name}`}
                    renderRow={(rowData) => (<TouchableHighlight underlayColor='cornflowerblue'><View><Text>{rowData.Name}</Text></View></TouchableHighlight>)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (<View style={{ backgroundColor: 'gray', margin: 3, height: 1 }} />)}
                    onSelect={(indx, rowData) =>
                        onSelect == 's1' ?
                            this.setState({ s1: (indx, rowData).ID }) :
                            (onSelect == 's2' ?
                                this.setState({ s2: (indx, rowData).ID }) :
                                (onSelect == 's5' ?
                                    this.setState({ s5: (indx, rowData).ID })
                                    :
                                    null
                                    // (onSelect == 's6' ?
                                    //     this.setState({ s6: (indx, rowData).ID }) :
                                    //     null)

                                ))
                    }
                /> */}

            </View>
        )
    }

    _getIndex = (value, arr, prop) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    setDropdown = (ID, ref) => {
        var _index = this._getIndex(ID, this.refs[ref].props.options, 'ID');
        this.refs[ref].select(_index);

        ref == 'dropdown_seeProfile' ?
            this.setState({ s1: ID }) :
            (ref == 'dropdown_seePost' ?
                this.setState({ s2: ID }) :
                (ref == 'dropdown_sendFriendRequest' ?
                    this.setState({ s5: ID })
                    :
                    null

                    // (ref == 'dropdown_whoFollow' ?
                    //     this.setState({ s6: ID }) :
                    //     null)


                ))
    }
    //#endregion

    //#region render operations
    renderUserPrivacyArea = () => {


        const profileViewerOptions = [
            { value: 1, label: Localizations('Setting.Privacy.option.Everyone') },
            { value: 2, label: Localizations('Setting.Privacy.option.Friend') },
            { value: 3, label: Localizations('Setting.Privacy.option.FriendOfFriend') }
        ];


        const postAccessOptions = [
            { value: 1, label: Localizations('Setting.Privacy.option.Everyone') },
            { value: 2, label: Localizations('Setting.Privacy.option.Friend') }
        ];


        const whoFriendOptions = [
            { value: 0, label: Localizations('Setting.Privacy.option.Everyone') },
            { value: 1, label: Localizations('Setting.Privacy.option.FriendOfFriend') }
        ];


        if (!this.props.loadingUserGeneralSettings) {
            return (
                <View>
                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2,  marginTop:20,  justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.whoCanSeeProfile')}</Text>
                        </View>

                        {/* {this._dropdown("dropdown_seeProfile", "s1")} */}
                        <View style={{ flex: 1, }}>

                            <Dropdown
                                ref={this.dropdown_profileViewer}
                                placeholder={Localizations('Global.Choose')}
                                data={profileViewerOptions}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                value={this.state.profileViewer}
                                onChangeText={this.setProfileViewer}
                                fontSize={12}
                            />
                        </View>
                    </View>

                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2,  marginTop:20,  justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.whoCanSeeFuturePost')}</Text>
                        </View>

                        {/* {this._dropdown("dropdown_seePost", "s2")} */}
                        <View style={{ flex: 1, }}>

                            <Dropdown
                                ref={this.dropdown_postAccess}
                                placeholder={Localizations('Global.Choose')}
                                data={postAccessOptions}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                value={this.state.postAccess}
                                onChangeText={this.setPostAccess}
                                fontSize={12}
                            />
                        </View>
                    </View>

                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.reviewComment')}</Text>
                        </View>

                        {this._switchSelect('s4', this.state.s4)}
                    </View>



                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2, marginTop:20, justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.whoCanSendFriendRequest')}</Text>
                        </View>

                        {/* {this._dropdown("dropdown_sendFriendRequest", "s5")} */}
                        <View style={{ flex: 1, }}>

                            <Dropdown
                                ref={this.dropdown_whoFriend}
                                placeholder={Localizations('Global.Choose')}
                                data={whoFriendOptions}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                value={this.state.whoFriend}
                                onChangeText={this.setWhoFriend}
                                fontSize={12}
                                alignSelf='center'
                            />
                        </View>

                    </View>



                    <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.canFriendSendMessage')}</Text>
                        </View>

                        {this._switchSelect('s7', this.state.s7)}
                    </View>

                    {/* <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.canFollowerSendMessage')}</Text>
                        </View>

                        {this._switchSelect('s8', this.state.s8)}
                    </View> */}

                    {/* <View style={[container.row.sb, { marginVertical: 5 }]}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.canFollowingSendMessage')}</Text>
                        </View>

                        {this._switchSelect('s9', this.state.s9)}
                    </View> */}

                    <TouchableOpacity style={{ marginVertical: 5 }} onPress={() => Actions.searchInBlockedUsersScreen()}>
                        <Text style={textStyle.settingStyle.privacy}>{Localizations('Setting.Privacy.blockUser')}</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>;
        }
    }

    render() {
        if (!this.props.loadingUserGeneralSettings) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.UserSettingsPrivacyScreen')} rightButtonJumpPage="userSettingsApplicationPreferancesScreen" parentMethod={this._clickSave} />
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', padding: 20, }}>
                        {this.renderUserPrivacyArea()}
                    </View>
                </View>
            );
        }
        return <View style={{ flex: 1, backgroundColor: 'white' }}><Spinner style="large" /></View>;
    }
    //#endregion
}

const mapStateToProps = ({ userGeneralSettingsScreenResponse, startScreenResponse }) => {
    const { res, userAllData, type, loadingUserGeneralSettings, userToken, connectionError } = userGeneralSettingsScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, userAllData, type, loadingUserGeneralSettings, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { UserGeneralSettingsScreenData, SetUserGeneralSettingsData, SignOut })(UserSettingsPrivacyScreen);
