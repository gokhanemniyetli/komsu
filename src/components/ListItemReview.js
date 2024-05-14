import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardCircle, Star, LetterCircle } from '../common';
import { SetStoreReviewLike, SetBrandReviewLike, SetShoppingMallReviewLike } from '../actions';
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');
var dateFormat = require('dateformat');

// const ListItemReview = (props) => {
class ListItemReview extends Component {
    state = ({ likeCount: '', changingReviewID: '' })

    _clickItemDetail = () => {
        Actions.userReviewsScreen({ userID: this.props.review.UserID });
    }

    _clickShare = () => {

    }

    UNSAFE_componentWillMount()  {


    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            nextProps.type == 'set_store_review_like_data_success' ||
            nextProps.type == 'set_brand_review_like_data_success' ||
            nextProps.type == 'set_shoppingmall_review_like_data_success'
        ) {
            this.setState({
                changingReviewID: nextProps.changingReviewID,
                likeCount: nextProps.likeCount
            });

        }
    }

    _clickLike = (reviewID) => {

        // console.log(this.props);
        if (this.props.SwoqyUserToken === '' || this.props.SwoqyUserToken === null || this.props.SwoqyUserToken === undefined) {
            Alert.alert(
                Localizations('Store.UserLogin'),
                Localizations('Store.FavoriteAlertMessage'),
                [
                    {
                        text: Localizations('Store.Cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: Localizations('Store.Ok'), onPress: () => Actions.signInScreen() },
                ],
                { cancelable: false },
            );
        } else {

            if (this.props.from == 'Store') {
                this.props.SetStoreReviewLike({ reviewID: reviewID, userToken: this.props.SwoqyUserToken });
            } else if (this.props.from == 'Brand') {
                this.props.SetBrandReviewLike({ reviewID: reviewID, userToken: this.props.SwoqyUserToken});
            } else if (this.props.from == 'ShoppingMall') {
                this.props.SetShoppingMallReviewLike({ reviewID: reviewID, userToken: this.props.SwoqyUserToken });
            }
        }
    }

    render() {
        if (this.props.from == 'Store') {
            if (this.state.changingReviewID == this.props.review.StoreReviewID) {
                this.props.review.ReviewLikeCount = this.state.likeCount
            }
        } else if (this.props.from == 'Brand') {
            if (this.state.changingReviewID == this.props.review.BrandReviewID) {
                this.props.review.ReviewLikeCount = this.state.likeCount
            }
        } else if (this.props.from == 'ShoppingMall') {
            if (this.state.changingReviewID == this.props.review.ShoppingMallReviewID) {
                this.props.review.ReviewLikeCount = this.state.likeCount
            }
        }
        return (
            <CardCircle>
                <TouchableOpacity style={{ flex: 1 }} onPress={this._clickItemDetail.bind(this)}>
                    <View style={container.row}>
                        <LetterCircle
                            photo={this.props.review.UserPhoto}
                            data={this.props.review.UserNameSurname}
                            circleSize={40}
                        />

                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={[container.row.sb]}>
                                <View>
                                    <Text style={textStyle.commentStyle.name}>{this.props.review.UserNameSurname}</Text>
                                </View>
                                
                            </View>
                            <View style={[container.row.sb]}>
                                <View>
                                    <Star size='xs' score={this.props.review.Point} />
                                </View>
                                <View>
                                    <Text style={textStyle.commentStyle.date}>{FormatDate(this.props.review.ReviewDate, "dd.MM.yyyy")}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <Text style={textStyle.commentStyle.comment}>{this.props.review.ReviewText}</Text>
                    </View>

                    <View style={[container.row, { justifyContent: 'flex-end' }]}>
                        <TouchableOpacity style={[container.row, { marginHorizontal: 10 }]} onPress={() => this._clickLike(
                            (this.props.from == 'Store' ? this.props.review.StoreReviewID
                                : (this.props.from == 'Brand' ? this.props.review.BrandReviewID
                                    : this.props.review.ShoppingMallReviewID
                                )))}>
                            <Image style={imageStyle.reviewIconStyle} source={require('../images/icons/like_.png')} />
                            <Text style={textStyle.commentStyle.count}>{this.props.review.ReviewLikeCount}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={container.row} onPress={() => this._clickShare()}>
                            <Image style={imageStyle.reviewIconStyle} source={require('../images/icons/paylas.png')} />
                        </TouchableOpacity> */}
                    </View>
                </TouchableOpacity>
            </CardCircle >
        )
    }
}

const mapStateToProps = ({ storeReviewsScreenResponse, startScreenResponse }) => {
    const { res, type, userToken, connectionError, loadingSetReviewLike, changingReviewID, likeCount } = storeReviewsScreenResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        res, type, userToken, connectionError, SwoqyUserToken, loadingSetReviewLike, changingReviewID, likeCount
    };
}

export default connect(mapStateToProps, { SetStoreReviewLike, SetBrandReviewLike, SetShoppingMallReviewLike })(ListItemReview);
