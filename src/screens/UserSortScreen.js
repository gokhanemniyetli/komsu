import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { SearchInFriendsFollowersFollowings } from '../actions';

import ListItemSort from '../components/ListItemSort';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class UserSortScreen extends Component {
    state = {
        txtSearch: '',
        connectionError: false,
        userFullList: ''
    };

    //#region click functions
    searchFriend = (search) => {
        if (this.state.userFullList != '') {
            this.setState({
                txtSearch: search,
                userList: sortJsonArray(this.state.userFullList.filter(x => String(x.Name.toLowerCase() + ' ' + x.Surname.toLowerCase()).includes(search.toLowerCase())), 'Name', 'asc')
            })
        }
    }

    UNSAFE_componentWillMount()  {
        //debugger
        this.setState
        this.props.SearchInFriendsFollowersFollowings({ ID: this.props.ID, requestType: this.props.requestType, keyword: null, latitude: '', longitude: '', userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.type == 'user_sort_screen_data_success') {
            this.setState({
                userList: nextProps.res.Users,
                userFullList: nextProps.res.Users
            });
        }
    }

    //#endregion

    //#region render operations
    renderSortArea = () => {

        return (
            <View style={{ height: Dimensions.get('window').height-150 }}>
                <View>
                    <TextInput
                        value={this.state.txtSearch}
                        onChangeText={search => this.searchFriend(search)}
                        style={[textInputStyle, { fontSize: 16, justifyContent: 'center' }]}
                        placeholder={Localizations('NewPost.SearchFriend')}
                    />
                </View>

                <FlatList
                    data={this.state.userList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ margin: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }} />
                    )}
                    renderItem={info => (
                        <ListItemSort
                            userList={info.item}
                        />
                    )}
                />
            </View >
        )
    }

    render() {
        // console.log(this.state.userList)
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ height: 40 }}>
                        <HF_01 title={this.props.title} />
                    </View>
                    <Card>
                        {this.renderSortArea()}
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
}
//#endregion

const mapStateToProps = ({ startScreenResponse, userSortScreenResponse }) => {
    const { SwoqyUserToken } = startScreenResponse;
    const { res, loadingUserSort, type } = userSortScreenResponse;

    return { SwoqyUserToken, res, loadingUserSort, type };
}

export default connect(mapStateToProps, { SearchInFriendsFollowersFollowings })(UserSortScreen);
