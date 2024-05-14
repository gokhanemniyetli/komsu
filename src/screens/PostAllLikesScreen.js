import _ from 'lodash'
import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, NativeModules } from 'react-native';
import { ShowMessage, Spinner } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { GetPostAllLikes } from '../actions';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import ListItemPostLike from '../components/ListItemPostLike';

var sortJsonArray = require('sort-json-array');

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 1000;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

class PostAllLikesScreen extends Component {
    state = {
        res: '',
        type: '',
        userToken: '',
        connectionError: false,
        minPostLikeID: 0

    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        this.props.GetPostAllLikes({ postID: this.props.postID, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        if ((nextProps.type == 'get_post_all_likes_data_success') || (nextProps.type == 'get_post_all_likes_extra_data_success')) {
            if (this.state.minPostLikeID) {
                this.setState(x => {
                    let copy = Array.from(x.likeList); 
                    res.PostLikes.map(item =>
                        copy.push(item)
                    )

                    return { likeList: copy }
                });
            }
            else {
                this.setState({
                    userID: res.UserID,
                    userNameSurname: res.UserNameSurname,
                    userPhoto: res.UserPhoto,
                    likeList: res
                });
            }
        }
    }
    //#endregion

    //#region click functions
    oldMinPostLikeID = 0;
    minPostLikeID = 0;
    _clickMore = () => {
        // sortJsonArray(this.props.res.filter(x => x.PostReviewID > 0), 'ReviewDate', 'des')
// debugger
        if (this.state.likeList[this.state.likeList.length - 1].PostLikeID) {
            this.minPostLikeID = this.state.likeList[this.state.likeList.length - 1].PostLikeID;
        }

        if (this.oldMinPostLikeID != this.minPostLikeID || this.minPostLikeID == 0) {
            this.setState({
                minPostLikeID: this.minPostLikeID
            })
//debugger;
            this.props.GetPostAllLikes({ postID: this.props.postID, userToken: this.props.SwoqyUserToken,
                latitude: this.props.SwoqyUserData.Latitude,
                longitude: this.props.SwoqyUserData.Longitude, minPostLikeID: this.minPostLikeID });

        }

        this.oldMinPostLikeID = this.minPostLikeID;

    }
    // endregion

    render() {
        /// Server kaynaklı sorun olduğunda görüntülenecek.
        if (!this.props.connectionError) {
            if (!this.props.loadingPostAllLikes) {
                return (
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        {/* <View style={{ height: 40 }}>
                            <HF_01 title={Localizations('Global.PostAllReviewsScreen')} />
                        </View> */}
                        <ScrollView
                            style={{ backgroundColor: 'fafafa' }}
                            showsVerticalScrollIndicator={false}
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    this._clickMore();
                                }
                            }}
                            scrollEventThrottle={400} >

                            {this.state.likeList != undefined && this.state.likeList != '' ?
                                <View style={{ margin: 10, marginBottom: 70 }}>
                                    <FlatList
                                        scrollsToTop
                                        data={this.state.likeList}
                                        extraData={this.state.likeList}
                                        keyExtractor={(item, index) => index.toString()}
                                        ItemSeparatorComponent={() => (
                                            <View style={{ height: 15 }} />
                                        )}
                                        initialNumToRender={5}
                                        renderItem={info => (
                                            <ListItemPostLike
                                                likes={info.item}
                                            //userID={this.props.posts.User.UserID}
                                            />
                                        )}
                                    />
                                    <View style={container.center}>
                                        {(!this.props.loadingExtraData) ?
                                            <TouchableOpacity style={{ padding: 10, margin: 10, backgroundColor: 'white', borderWidth: 0.5, borderRadius: 10, borderColor: 'lightgray' }} onPress={() => this._clickMore()}>
                                                <Text>{Localizations('WallScreen.More')}</Text>
                                            </TouchableOpacity>
                                            :
                                            <Spinner size="large" />
                                        }
                                    </View>
                                </View>
                                :
                                null
                            }

                        </ScrollView>
                    </View>
                )
            }
            return <Spinner size="large" />;
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



const mapStateToProps = ({ postScreenResponse, startScreenResponse }) => {
    const { res, loadingPostAllLikes, loadingExtraData, loadingPostAllLikesExtra, userToken, connectionError, likes, type } = postScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, loadingPostAllLikes, loadingExtraData, loadingPostAllLikesExtra, userToken, connectionError, likes, type, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { GetPostAllLikes })(PostAllLikesScreen);
