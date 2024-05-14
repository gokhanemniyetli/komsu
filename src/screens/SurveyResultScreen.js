import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, FlatList, Linking,  Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SurveyResultScreenData } from '../actions';
import { Card, CardSection, Spinner, Star, Link, GetSessionTicket, ShowMessage, ShowRemainingTime } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import SwitchSelector from "react-native-switch-selector";
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

import ListItemSurvey from '../components/ListItemSurvey';
import ListItemUserResult from '../components/ListItemUserResult';

var sortJsonArray = require('sort-json-array');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');


class SurveyResultScreen extends Component {
    state = {
        res: '', selectedListItem: 0, type: '', userToken: '', connectionError: false
    };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        //debugger;
        this.setState
        this.props.SurveyResultScreenData({ surveyID: this.props.ID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;
        // console.log(nextProps)

        if (nextProps.type == 'survey_result_screen_data_success') {
            this.setState({
                surveyID: res.Survey.QuestionID,
                surveyItemList: res.Survey.SurveyItemList,
                endDate: res.Survey.EndDate,
                remainingTime: res.Survey.RemainingTime,
                ownerViewing: res.Survey.OwnerViewing,
                finished: res.Survey.Finished,
                userResponse: res.Survey.UserResponse,
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
    //#endregion

    //#region render operations
    renderCommentArea = () => {
        if (this.state.userList != '' && this.state.userList != undefined && this.state.userList != null) {
            if (!this.props.loadingSurveyResult) {
                var oObject = this.state.userList;
                // debugger
                switch (this.state.selectedListItem) {
                    case '0':
                        oObject = sortJsonArray(oObject, 'Result', 'des')
                        break;
                    case this.state.surveyItemList[0].SurveyItemID:
                    case this.state.surveyItemList[1].SurveyItemID:
                        oObject = sortJsonArray(oObject, 'Name', 'asc')
                        break;
                }

                const options = [];
                options.push({ label: Localizations('WallScreen.All'), value: '0' })
                for (let i = 0; i < this.state.surveyItemList.length; i++) {
                    options.push({ label: i + 1, value: this.state.surveyItemList[i].SurveyItemID })
                }

                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center' }}>
                            <SwitchSelector
                                style={{ width: '80%', margin: 5, marginTop: 13 }}
                                initial={this.props.index ? this.props.index : 0}
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

    renderSurveyArea = () => {
        return (
            <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, padding: 5 }}>
                <View style={container.center}>
                    <FlatList
                        data={this.state.surveyItemList}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        ItemSeparatorComponent={() => (<View style={{ margin: 5 }} />)}
                        renderItem={info => (
                            <ListItemSurvey
                                surveys={info.item}
                                index={info.index + 1}
                                resultPage={true}
                                userID={this.props.userID}
                                userSurveyItemResponse={this.state.userResponse}
                                finished={this.state.finished}
                                ownerViewing={this.state.ownerViewing}
                            />
                        )}
                    />
                </View>

                {(this.state.remainingTime > 0) &&
                    <ShowRemainingTime totalTime={this.state.remainingTime}></ShowRemainingTime>
                }
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.SurveyResultScreen')} />
                </View> */}
                <ScrollView>
                    <Card>
                        {this.renderSurveyArea()}
                    </Card>

                    {this.renderCommentArea()}
                </ScrollView>

            </View>
        )
    }

}
//#endregion


const mapStateToProps = ({ surveyResultScreenResponse, startScreenResponse }) => {
    const { res, loadingSurveyResult, type, userToken, connectionError } = surveyResultScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, loadingSurveyResult, type, userToken, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SurveyResultScreenData })(SurveyResultScreen);
