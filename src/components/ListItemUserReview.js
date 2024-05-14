import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardCircle, Star, LetterCircle } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { SetStoreReviewLike, SetBrandReviewLike, SetShoppingMallReviewLike } from '../actions';

var dateFormat = require('dateformat');

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ListItemUserReview extends Component {
    state = ({ likeCount: '', changingReviewID: '' })


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

    _clickItemDetail = () => {

        if (this.props.review.ReviewItemType == 0) {
            Actions.brandDetailScreen({ brandID: this.props.review.ID });
        }
        else if (this.props.review.ReviewItemType == 1) {
            Actions.storeScreen({ storeID: this.props.review.ID });
        }
        else if (this.props.review.ReviewItemType == 2) {
            Actions.shoppingMallScreen({ shoppingMallID: this.props.review.ID });
        }
    }

    _clickShare = () => {

    }

    _clickLike = (reviewID) => {
        // debugger;
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
                this.props.SetStoreReviewLike({ reviewID: reviewID, userToken: this.props.SwoqyUserToken});
            } else if (this.props.from == 'Brand') {
                this.props.SetBrandReviewLike({ reviewID: reviewID, userToken: this.props.SwoqyUserToken});
            } else if (this.props.from == 'ShoppingMall') {
                this.props.SetShoppingMallReviewLike({ reviewID: reviewID, userToken: this.props.SwoqyUserToken});
            }
        }
    }

    render() {
        if (this.state.changingReviewID == this.props.review.ReviewID) {
            this.props.review.ReviewLikeCount = this.state.likeCount
        }

        return (
            <CardCircle>
                <TouchableOpacity style={{ flex: 1 }} onPress={this._clickItemDetail.bind(this)}>
                    <View style={container.row}>
                        <LetterCircle
                            photo={this.props.review.Logo}
                            uri={GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + ((this.props.review.ReviewItemType == 2) ? GLOBAL.IMAGE_PATHS.SHOPPING_MALL_LOGO : GLOBAL.IMAGE_PATHS.BRAND_LOGO) + '/' + this.props.review.Logo}
                            data={this.props.review.Name}
                            circleSize={40}
                        />


                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={[container.row.sb]}>
                                <View>
                                    <Text style={textStyle.commentStyle.name}>{this.props.review.Name}</Text>
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
                            this.props.review.ReviewID)}>
                            <Image style={imageStyle.reviewIconStyle} source={require('../images/icons/like_.png')} />
                            <Text style={textStyle.commentStyle.count}>{this.props.review.ReviewLikeCount}</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={container.row} onPress={() => this._clickShare()}>
                            <Image style={imageStyle.reviewIconStyle} source={require('../images/icons/paylas.png')} />
                        </TouchableOpacity> */}
                    </View>
                </TouchableOpacity >
            </CardCircle>
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

export default connect(mapStateToProps, { SetStoreReviewLike, SetBrandReviewLike, SetShoppingMallReviewLike })(ListItemUserReview);
