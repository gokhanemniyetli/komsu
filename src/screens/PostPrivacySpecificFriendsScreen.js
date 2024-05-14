import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { SearchInMyFirends } from '../actions';
import { Actions } from 'react-native-router-flux';
import ListItemFriends from '../components/ListItemFriends';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class PostPrivacySpecificFriendsScreen extends Component {
    state = {
        res: '',
        loadingPostPrivacySpecificFriends: false,
        txtsearchFriend: '',
        type: '', userToken: '', connectionError: false,
        friendList: ''
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.setState
        // console.log("1");
        this.props.SearchInMyFirends({ keyword: null, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude  });
        // console.log(2);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // res = nextProps.res;
        // console.log(nextProps);

        if (nextProps.type == 'search_in_my_friends_success') {
            this.setState({
                friendList: nextProps.friendList
            });
        }
    }
    //#endregion

    //#region click functions
    searchFriend = (srcFriend) => {
        this.setState({
            txtsearchFriend: srcFriend
        })

        if (this.props.friendList != undefined) {
            this.setState({
                friendList: sortJsonArray(this.props.friendList.filter(x => String(x.Name.toLowerCase() + ' ' + x.Surname.toLowerCase()).includes(srcFriend.toLowerCase())) , 'Name', 'des')
            })

        }
    }
    //#endregion

    //#region render operations
    renderChooseFriendArea = () => {
        //  console.log("newReview")
// console.log(this.props)
        if (!this.props.loadingPostPrivacySpecificFriends) {
            return (
                <View style={{ height: Dimensions.get('window').height }}>
                    <View>
                        <TextInput
                            value={this.state.txtsearchFriend}
                            onChangeText={search => this.searchFriend(search)}
                            style={[textInputStyle, { fontSize: 16, justifyContent: 'center' }]}
                            placeholder={Localizations('NewPost.SearchFriend')}
                        />
                    </View>

                    <ScrollView>

                        {this.state.friendList != undefined ?
                            <FlatList
                                data={this.state.friendList}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={false}
                                renderItem={info => (
                                    <ListItemFriends
                                        users={info.item}
                                    />
                                )}
                            />
                            :
                            <View></View>
                        }
                    </ScrollView>
                </View >
            )
        }
        return <Spinner size="large" />;
    }

    render() {
        // console.log(this.state.friendList)
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.PostPrivacySpecificFriendsScreen')} rightButtonJumpPage="postPrivacySpecificFriendsScreen" />
                    </View>
                    <Card>
                        {this.renderChooseFriendArea()}
                    </Card>
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
    //#endregion
}


const mapStateToProps = ({ postResponse, startScreenResponse }) => {
    const { accessTypeID, friendList, loadingPostPrivacySpecificFriends, type, connectionError } = postResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        accessTypeID, friendList, loadingPostPrivacySpecificFriends, type, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { SearchInMyFirends })(PostPrivacySpecificFriendsScreen);
