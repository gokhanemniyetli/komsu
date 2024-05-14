import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, Favourite } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { connect } from 'react-redux';
import { SearchInBlockedUsersData } from '../actions';

import ListItemBlockedUser from '../components/ListItemBlockedUser'
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class SearchInBlockedUsersScreen extends Component {
    state = {
        txtSearch: '',
        connectionError: false,
    };

    //#region component operations
    UNSAFE_componentWillMount()  {
        this.setState
        this.props.SearchInBlockedUsersData({ userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude  });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        res = nextProps.res;

        if (nextProps.type == 'search_in_blocked_users_data_success') {
            this.setState({
                userList: res.Users,
                searchUserList: res.Users
            });
        }
    }
    //#endregion

    //#region functions
    searchBlockedUser = (search) => {
        if (this.state.searchUserList != '') {
            this.setState({
                txtSearch: search,
                userList: sortJsonArray(this.state.searchUserList.filter(x => String(x.Name.toLowerCase() + ' ' + x.Surname.toLowerCase()).includes(search.toLowerCase())), 'Name', 'asc')
            })
        }
    }
    //#endregion

    //#region render operations
    renderBlockedUsersArea = () => {
        return (
            <View style={{ height: Dimensions.get('window').height }}>
                <View>
                    <TextInput
                        value={this.state.txtSearch}
                        onChangeText={search => this.searchBlockedUser(search)}
                        style={[textInputStyle, { fontSize: 16, justifyContent: 'center' }]}
                    />
                </View>

                <FlatList
                    data={this.state.userList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={{ margin: 10, borderBottomWidth: 0.5, borderBottomColor: 'lightgray' }} />
                    )}
                    renderItem={info => (
                        <ListItemBlockedUser
                            userList={info.item}
                        />
                    )}
                />
            </View >
        )
    }

    render() {
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    {/* <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.SearchInBlockedUsersScreen')} />
                    </View> */}
                    <Card>
                        {this.renderBlockedUsersArea()}
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

const mapStateToProps = ({ startScreenResponse, userGeneralSettingsScreenResponse }) => {
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    const { res, loadingSearchInBlockedUsers, type } = userGeneralSettingsScreenResponse;

    return { SwoqyUserToken, SwoqyUserData, res, loadingSearchInBlockedUsers, type };
}

export default connect(mapStateToProps, { SearchInBlockedUsersData })(SearchInBlockedUsersScreen);
