import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { QuestionResultScreenData, RatingOfQuestionData } from '../actions';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, ShowRemainingTime } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import SwitchSelector from "react-native-switch-selector";
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import { Rating, AirbnbRating } from 'react-native-ratings';

import ListItemPhoto from '../components/ListItemPhoto';
import ListItemUserResult from '../components/ListItemUserResult';

var sortJsonArray = require('sort-json-array');
const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');


class QuestionResultScreen extends Component {
    state = {
        res: '', selectedListItem: 0, point: 4,
        loadingQuestionResult: false, type: '', userToken: '', connectionError: false
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        //debugger;
        this.setState
        this.props.QuestionResultScreenData({ questionID: this.props.ID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        // console.log(nextProps)

        if (nextProps.type == 'question_result_screen_data_success') {
            this.setState({
                questionID: res.Question.QuestionID,
                productID: res.Question.ProductID,
                brandID: res.Question.BrandID,
                brandName: res.Question.BrandName,
                questionText: res.Question.QuestionText,
                questionImageList: res.Question.QuestionImageList,
                averagePoint: res.Question.AveragePoint,
                rating: res.Question.Rating,
                ownerViewing: res.Question.OwnerViewing,
                price: res.Question.Price,
                currency: res.Question.Currency,
                remainingTime: res.Question.RemainingTime,
                finished: res.Question.Finished,
                userList: res.UserList
            });
        }
    }
    //#endregion

    //#region click functions
    _clickItemBrand = (brandID) => {
        // console.log(brandID);
        if (brandID != 0) {
            Actions.brandDetailScreen({ brandID: brandID });
        }
    }
    // ratingCompleted(rating) {
    //     this.setState({
    //         point: rating
    //     })
    // }

    ratingCompleted = (r) => {
        var qID = this.state.questionID;

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
                        this.props.RatingOfQuestionData({ questionID: qID, rating: r, userToken: this.props.SwoqyUserToken,
                            latitude: this.props.SwoqyUserData.Latitude,
                            longitude: this.props.SwoqyUserData.Longitude });i
                    }
                },
            ],
            { cancelable: false },
        );
    }
    //#endregion

    //#region render operations
    renderCommentArea = () => {

        if (this.state.averagePoint != null) {
            if (this.state.userList != '' && this.state.userList != undefined && this.state.userList != null) {

                var oObject = this.state.userList;
                // debugger
                switch (this.state.selectedListItem) {
                    case '0':
                        oObject = sortJsonArray(oObject, 'Result', 'des')
                        break;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                        oObject = sortJsonArray(oObject, 'Name', 'asc')
                        break;
                }

                const options = [];
                options.push({ label: Localizations('WallScreen.All'), value: '0' })
                options.push({ label: 1, value: '1' })
                options.push({ label: 2, value: '2' })
                options.push({ label: 3, value: '3' })
                options.push({ label: 4, value: '4' })
                options.push({ label: 5, value: '5' })

                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <SwitchSelector
                                style={{ width: '80%', margin: 5, marginTop: 13 }}
                                initial={0}
                                onPress={value => this.setState({ selectedListItem: value })}
                                textColor='#ff5a5c'
                                selectedColor='#ffffff'
                                buttonColor='#ff5a5c'
                                borderColor='#e9ebed'
                                hasPadding
                                options={options}
                            />
                        </View>

                        <View style={{ marginHorizontal: 20 }}>

                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Text>Oy sayısı: </Text>
                                <Text >
                                    {this.state.selectedListItem == 0 ?
                                        oObject.filter(x => x.Result >= 0).length
                                        :
                                        oObject.filter(x => x.Result == this.state.selectedListItem).length
                                    }</Text>
                            </View>
                            <FlatList
                                data={this.state.selectedListItem == 0 ? oObject.filter(x => x.Result >= 0) : oObject.filter(x => x.Result == this.state.selectedListItem)}
                                keyExtractor={(item, index) => index.toString()}
                                scrollEnabled={false}
                                ItemSeparatorComponent={() => (<View style={{ margin: 5, marginHorizontal: 10, borderBottomWidth: 0.5, borderColor: '#ff585c' }} />)}
                                renderItem={info => (
                                    <ListItemUserResult
                                        users={info.item}
                                    />
                                )}
                            />
                        </View>


                    </View>
                )
            }
            return <Spinner size="large" />;
        }
    }

    renderQuestionArea = () => {
        // console.log(this.state);
        return (
            <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, marginVertical: 5, padding: 5 }}>
                <View style={container.row}>
                    {
                        this.state.questionImageList != null ?
                            <View style={{ borderRadius: 10, marginVertical: 5, padding: 5 }}>
                                <FlatList
                                    data={this.state.questionImageList.slice(0, 1)}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    renderItem={info => (
                                        <ListItemPhoto
                                            allPhotos={this.state.questionImageList}
                                            photo={info.item}
                                            userID={this.props.UserID}
                                            from="Question"
                                        />
                                    )}
                                />
                            </View>
                            :
                            <View style={{ height: 100, width: 100, margin: 10, borderWidth: 1 }} />
                    }

                    <View >
                        <TouchableOpacity onPress={() => this._clickItemBrand(this.state.brandID)}>
                            <Text style={[textStyle.logoStyle.md, { fontWeight: '600' }]}>{this.state.brandName}</Text>
                        </TouchableOpacity>
                        <View style={{ marginVertical: 5 }}>
                            <Text style={textStyle.logoStyle.sm}>{this.state.questionText}</Text>
                        </View>
                        <View>
                            <Text style={[textStyle.logoStyle.xs, { fontWeight: '500' }]}>{this.state.price + ' ' + this.state.currency}</Text>
                        </View>


                        <View style={container.row}>
                            {(this.state.finished) ?
                                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                    {this.state.rating != 0 &&
                                        <View style={{ margin: 5, width: 70, backgroundColor: '#ff585c', borderRadius: 5, padding: 5, alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{this.state.rating}</Text>
                                            <Text style={{ color: 'white', }}>{Localizations('WallScreen.YourPoint')}</Text>
                                        </View>
                                    }

                                    <View style={{ margin: 5, width: 70, backgroundColor: '#ff585c', borderRadius: 5, padding: 5, alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{this.state.averagePoint != null ? this.state.averagePoint : "0"}</Text>
                                        <Text style={{ color: 'white' }}>{Localizations('WallScreen.Score')}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ marginLeft: 5 }}>
                                    {this.state.rating != 0 ?
                                        <View style={{ margin: 5, width: 70, backgroundColor: '#ff585c', borderRadius: 5, padding: 5, alignContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{this.state.rating}</Text>
                                            <Text style={{ color: 'white' }}>{Localizations('WallScreen.YourPoint')}</Text>
                                        </View>
                                        :
                                        <Rating
                                            startingValue={4}
                                            imageSize={20}
                                            onFinishRating={this.ratingCompleted.bind(this)}
                                        />
                                    }

                                </View>
                            }

                            {/* <View style={{}} >
                                {(this.state.rating != 0 || this.state.finished) ?
                                    (this.state.finished) ?
                                        <Star
                                            score={this.state.averagePoint} />
                                        :
                                        <Star score={this.state.rating} />

                                    :
                                    <Rating
                                        ratingCount={5}
                                        defaultRating={5}
                                        imageSize={20}
                                        onFinishRating={
                                            this.ratingCompleted.bind({ rating: this })
                                        }
                                    />
                                }
                            </View>
                            <View style={{ height:50}}>
                                {(this.state.finished) ?
                                    <View style={[container.center, { margin: 5, width: 100 }]}>
                                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'red' }}>{this.state.averagePoint}</Text>
                                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'orange' }}>{this.state.rating}</Text>
                                    </View>
                                    :
                                    <View style={[container.center, { margin: 5, width: 100 }]}>
                                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'orange' }}>{this.state.rating}</Text>
                                    </View>
                                }
                            </View> */}
                        </View>


                        {(this.state.remainingTime > 0) &&
                            <ShowRemainingTime totalTime={this.state.remainingTime}></ShowRemainingTime>
                        }

                    </View>

                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.QuestionResultScreen')} />
                </View> */}
                <ScrollView>
                    <Card>
                        {this.renderQuestionArea()}
                    </Card>

                    {this.renderCommentArea()}
                </ScrollView>

            </View>
        )
    }

}
//#endregion


const mapStateToProps = ({ questionResultScreenResponse, startScreenResponse }) => {
    const { res, loadingQuestionResult, type, userToken, connectionError } = questionResultScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        res, loadingQuestionResult, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { QuestionResultScreenData, RatingOfQuestionData })(QuestionResultScreen);
