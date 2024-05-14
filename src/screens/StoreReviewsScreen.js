import _ from 'lodash'
import React, { Component, Animated } from 'react';
import { Text, TextInput, View, ScrollView, Image, TouchableOpacity, FlatList, Picker,  Alert, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StoreReviewsScreenData, StoreNewReviewSendData } from '../actions';
import { Card, CardSection, Button, Spinner, Scoring, Link, GetSessionTicket, ShowMessage, Slang, LetterCircle,  } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import ListItemReview from '../components/ListItemReview';
import { Rating, AirbnbRating } from 'react-native-ratings';
import SwitchSelector from "react-native-switch-selector";
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

const GLOBAL = require('../common/Globals');
var { LoginControl } = require('../common/GlobalFunctions');

const { container, imageStyle, textStyle, textInputStyle, buttonStyle } = require('../styles/SwoqyStyles');
var sortJsonArray = require('sort-json-array');

class StoreReviewsScreen extends Component {
    state = { res: '', selectedListItem: '0', loadingStoreReviews: false, type: '', userToken: '', newReview: false, txtTitle: '', txtReview: '', point: 4 };

    //#region Component operations
    UNSAFE_componentWillMount()  {
        if (this.props.newReview == true) {
            this.setState({
                newReview: true
            })
        }

        this.props.StoreReviewsScreenData({ storeID: this.props.storeID, userToken: this.props.SwoqyUserToken });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        res = nextProps.res;

        if (nextProps.type == 'store_newreview_screen_data') {
            this.setState({
                point: 0,
                txtTitle: '',
                txtReview: '',
                newReview: false
            });
        } else if (nextProps.type == 'store_reviews_screen_data_success') {
            this.setState({
                storeID: res.StoreID,
                storeName: res.StoreName,
                shoppingMallName: res.ShoppingMallName,
                storeReviewScore: res.StoreReviewScore,
                storeReviewCount: res.StoreReviewCount,
                storeReviews: res.StoreReviews,
                starCount: res.StarCounts,
                user: res.User,
            });
        }
    }
    //#endregion

    titleChanged = (strTitle) => {
        this.setState({
            txtTitle: strTitle
        })
    }

    reviewChanged = (strReview) => {
        this.setState({
            txtReview: strReview
        })
    }

    ratingCompleted(rating) {
        this.setState({
            point: rating
        })
    }

    _ratingChanged = (rating) => {
        this.setState({
            txtReview: strReview
        })
    }
    //#region click functions
    _clickNewReview = () => {
        if (LoginControl(this.props.SwoqyUserToken)) {
            this.setState({
                newReview: true
            })
        }
    }

    _changeListType = (item) => {
        this.setState({
            selectedListItem: item
        })

    }

    _clickBtnCancel = () => {
        this.setState({
            newReview: false
        })
    }

    _clickBtnSave = () => {
        if (LoginControl(this.props.SwoqyUserToken)) {

            if (this.state.txtReview == '' || this.state.txtReview == undefined) {
                alert(Localizations('Global.NotEnteredComments'));
            }
            else if (this.state.slang) {
                Slang('', 2)
            }
            else {
                this.props.StoreNewReviewSendData({
                    storeID: this.state.storeID,
                    userToken: this.props.SwoqyUserToken,
                    point: this.state.point,
                    txtTitle: this.state.txtTitle,
                    txtReview: this.state.txtReview
                }),
                    Actions.refresh({ key: Actions.currentScene })
            }
        }
    }
    //#endregion


    //#region render operations

    renderReviewsArea = () => {
        if (!this.props.loadingStoreReviews) {

            var oObject = this.state.storeReviews;
            if (oObject) {
                switch (this.state.selectedListItem) {
                    case '0':
                        oObject = sortJsonArray(oObject.filter(x => x.UserID >= 0), 'ReviewDate', 'des');
                        break;
                    case '1':
                        oObject = sortJsonArray(oObject.filter(x => x.UserID >= 0), 'Point', 'des');
                        break;
                }
            }

            const options = [];
            options.push({ label: Localizations('Reviews.Newest'), value: '0' })
            options.push({ label: Localizations('Reviews.Rating'), value: '1' })

            return (
                <View style={{ marginTop: 10 }}>
                    <View style={[container.row.sb, { marginBottom: 5 }]}>
                        <View style={{ alignItems: 'center', width: '70%' }}>
                            <SwitchSelector
                                style={{ width: '80%', margin: 5 }}
                                initial={0}
                                onPress={value => this._changeListType(value)}
                                textColor='#ff5a5c'
                                selectedColor='#ffffff'
                                buttonColor='#ff5a5c'
                                borderColor='#e9ebed'
                                hasPadding
                                options={options}
                            />
                        </View>
                        <View  >
                            <TouchableOpacity style={container.center} onPress={() => this._clickNewReview(this.state.res.storeID)}>
                                <View >
                                    <Image style={imageStyle.subStyle} source={require('../images/icons/yorumYaz.png')} />
                                </View>
                                <View >
                                    <Text style={textStyle.subStyle}>{Localizations('Store.WriteReview')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={oObject}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={info => (
                                <ListItemReview
                                    review={info.item}
                                    from='Store'
                                />
                            )}
                        />
                    </View>
                </View>
            )
        }
    }

    renderNewReviewArea = () => {
        //  console.log("newReview")
        // debugger
        return (
            <View style={{ flex: 1, margin: 10, }}>
                {this.state.user &&
                    <View style={container.row}>
                        <View >
                            <LetterCircle
                                photo={this.state.user.UserPhoto}
                                data={this.state.user.Name + " " + this.state.user.Surname}
                                circleSize={40}
                            />

                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <View>
                                <Text style={textStyle.commentStyle.name}>{this.state.user.Name + " " + this.state.user.Surname}</Text>
                            </View>
                            <View>
                                <Rating
                                    startingValue={4}
                                    imageSize={24}
                                    onFinishRating={this.ratingCompleted.bind(this)}
                                />
                            </View>
                        </View>
                    </View>
                }

                <View style={{ marginRight: 20 }}>
                    <TouchableOpacity style={container.center}>
                        <Text style={{ fontSize: 11, color: '#9b9b9b', alignItems: 'center', }} numberOfLines={3}>{Localizations('Reviews.Info')}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TextInput
                        value={this.state.txtReview}
                        onChangeText={txtReview => (this.reviewChanged(txtReview), (Slang(txtReview, 1) ? this.setState({ slang: true }) : this.setState({ slang: false })))}
                        style={[textInputStyle, { height: 100 }]}
                        placeholder={Localizations('Reviews.Comments')}
                        multiline={true}
                        autoGrow={true}
                        maxLength={500}
                    />
                </View>

                <View style={[container.row, { justifyContent: 'flex-end' }]}>
                    <View style={{ margin: 3 }}>
                        <TouchableOpacity
                            style={buttonStyle.buttonStyle.md}
                            onPress={() => this._clickBtnCancel(this)}>
                            <Text style={buttonStyle.buttonTextStyle.md}>{Localizations('Reviews.Cancel')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 3 }}>
                        <TouchableOpacity
                            style={buttonStyle.buttonStyle.md}
                            onPress={() => this._clickBtnSave(this)} >
                            <Text style={buttonStyle.buttonTextStyle.md}>{Localizations('Reviews.Send')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )

    }

    renderStoreReviewArea = () => {
        // console.log("içerde");

        if (!this.props.loadingStoreReviews) {
            //console.log(this.state.storeReviewScore);

            return (
                <View style={{ flex: 1, backgroundColor: 'white', marginBottom: 5 }}>
                    <View>
                        <Text style={textStyle.reviewCountStyle.up}>{this.state.storeName} - {this.state.shoppingMallName}</Text>
                    </View>

                    <View style={container.row.sb}>
                        <View style={{ alignItems: 'center', }}>
                            <View>
                                <Text style={textStyle.reviewCountStyle._xl}>{this.state.storeReviewScore}</Text>
                            </View>
                            <View>
                                <Text style={textStyle.reviewCountStyle.down}>{Localizations('Reviews.OutOf')}</Text>
                            </View>
                        </View>

                        <View style={{ alignItems: 'flex-end' }}>
                            <View style={container.center}>
                                <Scoring data={this.state.starCount} />
                            </View>
                            <View>
                                <Text style={textStyle.reviewCountStyle.down}>{this.state.storeReviewCount} {Localizations('Reviews.CommentCount')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return <Spinner size="large" />;

    }

    render() {
        if (!this.props.connectionError) {
            return (
                <View style={{ flex: 1 }}>
                    {/* <View style={{ height: 40 }}>
                        <HF_01 title={Localizations('Global.StoreReviewsScreen')} />
                    </View> */}
                    <View style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
                            <KeyboardAvoidingView keyboardVerticalOffset={45} behavior="padding">
                                {this.renderStoreReviewArea()}
                                {(this.state.newReview) ? this.renderNewReviewArea() : this.renderReviewsArea()}
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
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

const mapStateToProps = ({ storeReviewsScreenResponse, startScreenResponse }) => {
    const { res, loadingStoreReviews, type, userToken } = storeReviewsScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;

    return {
        res, loadingStoreReviews, type, userToken, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { StoreReviewsScreenData, StoreNewReviewSendData })(StoreReviewsScreen);
