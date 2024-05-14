import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ListView, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Reducer } from 'react-native-router-flux';
import { SetSelectedKeyword, SearchResultsUserListData } from '../actions';
import { Card, CardSection, Spinner, Star, LetterCircle } from '../common';
import ListItemFriends from '../components/ListItemFriends';
import { Localizations, FormatDate } from '../../locales/i18n';


// import { Localizations, FormatDate } from '../../locales/i18n';
// import { Actions } from 'react-native-router-flux';

var sortJsonArray = require('sort-json-array');

var dateFormat = require('dateformat');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const ListItemSearchResult = (props) => {


    _clickUser = (userID) => {

        Actions.userProfileScreen({ ID: userID });
    }


    return (

        <CardSection >
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => { this._clickUser(props.users.UserID) }}>

                <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                    <View >

                        {props.users.UserPhoto != null ?
                            <Image style={imageStyle.circle.md}
                                source={{
                                    uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.USER_PHOTO + '/' + props.users.UserPhoto
                                }}
                            />
                            :
                            <LetterCircle
                                data={props.users.Name + " " + props.users.Surname}
                                circleSize={40} />
                        }

                    </View>
                    <View style={{ margin: 3, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={[textStyle.logoStyle.md, { fontWeight: 'bold' }]}>{props.users.Name + " " + props.users.Surname}</Text>
                        {
                            props.users.Registered &&
                            <Image
                                style={imageStyle.registeredTinyStyle}
                                source={require('../images/icons/registered.png')}
                            />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </CardSection>

    )
}

class SearchResultsUserList extends Component {

    state = { res: '', loadingKeywordList: false, searchResults: '' };

    _clickItem = (keyword) => {
        this.props.SetSelectedKeyword({ selectedKeyword: keyword });
    }

    UNSAFE_componentWillMount()  {
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.type == 'search_results_users_data_success') {
            this.setState({
                userList: nextProps.res.Users
            });
        } else if (nextProps.type == 'clear_search_data') {
            this.setState({
                userList: nextProps.res,
            });
        } else {
            //debugger
            if (nextProps.keyword != '' &&
                nextProps.searchType == 1 &&
                nextProps.search &&
                !nextProps.showKeywordList &&
                (nextProps.type == 'set_selected_keyword' || nextProps.type == 'search_submit')
            ) {
                this.props.SearchResultsUserListData({ keyword: nextProps.keyword, search: true, searchType: nextProps.searchType, latitude: '', longitude: '', userToken: nextProps.SwoqyUserToken })
            }

            res = nextProps.res;
            this.setState({
                searchResults: nextProps.searchResults

            });
        }
    }

    renderContentArea = () => {
        if (!this.props.loadingUserList) {
            if (this.state.userList != null) {
                if (this.state.userList.length > 0) {
                    return (
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            {this.state.userList != undefined &&

                                <FlatList
                                    data={this.state.userList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={info => (
                                        <TouchableOpacity style={{ flex: 1 }} onPress={() => this._clickItem(info.item)} >
                                            <ListItemSearchResult
                                                users={info.item}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                        </View>

                    )
                } else {
                    return <View style={[container.topCenter, { backgroundColor: 'white' }]}>
                        <Text>{Localizations('Global.NotFound')}</Text>
                    </View>;
                }
            } else {
                return <View style={[container.topCenter, { backgroundColor: 'white' }]}>
                    <Text >{Localizations('Global.NotFound')}</Text>
                </View>;
            }
        }
        else {
            return <Spinner style={{ backgroundColor: 'white' }} size="large" />;
        }
    }

    render() {
        return (this.renderContentArea());
    }
}

const mapStateToProps = ({ searchResultsScreenResponse, startScreenResponse }) => {
    const { res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingUserList, loadingKeywordList, type, userToken } = searchResultsScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, keyword, search, selectedKeyword, showKeywordList, searchType, loadingUserList, loadingKeywordList, type, userToken, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SearchResultsUserListData, SetSelectedKeyword })(SearchResultsUserList);
