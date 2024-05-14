import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, LetterCircle, Spinner, Star, ShowNumber } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { RatingOfQuestionData } from '../actions';
import { Rating, AirbnbRating } from 'react-native-ratings';

var dateFormat = require('dateformat');
import ListItemPhoto from './ListItemPhoto';
import ListItemSurvey from './ListItemSurvey';
import ListItemPost from './ListItemPost';
import ListItemPostReview from './ListItemPostReview';

// Modal
import ImageViewer from 'react-native-image-zoom-viewer';
var images = [];
//_______________________________________________________

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

// var props;
// const ListItemPost = (props) => {
class ListItemPost2 extends Component {
    state = ({
        //Modal 
        imageModalVisible: false,
        questionRating: 0
    })
    UNSAFE_componentWillMount() {
        // debugger;
        this.setState;
    }

    // Modal
    setImageModalVisible(visible, imageUrl) {
        this.setState({ imageModalVisible: visible });
        images = [{ url: imageUrl }];
    }

    _clickItemDetail = () => {
        Actions.userProfileScreen({ ID: this.props.posts.User.UserID });
    }

    _clickItemPlace = () => {
        if (this.props.posts.Place.Type == 0) {
            Actions.shoppingMallScreen({ shoppingMallID: this.props.posts.Place.ID });
        }
        else {
            Actions.storeScreen({ storeID: this.props.posts.Place.ID });
        }
    }

    _clickItemBrand = (brandID) => {
        //console.log(brandID);
        if (brandID != 0) {
            Actions.brandDetailScreen({ brandID: brandID });
        }
    }

    ratingCompleted = (r) => {
        var qID = this.props.posts.Question.QuestionID;

        // console.log(r + " puan verdiniz.");
        Alert.alert(
            "Seçiminizi göndermek üzereyiz.",
            "Onayınızla verdiğiniz puan iletilecektir.",
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
                            longitude: this.props.SwoqyUserData.Longitude });
                        // console.log(this.props);
                        this.props.posts.Question.Rating = r;
                    }
                },
            ],
            { cancelable: false },
        );
    }

    // #region post
    postText = () => {
        return (
            this.props.posts.PostText != null ?
                <View style={{ marginVertical: 10 }}>
                    <Text style={textStyle.logoStyle.md}>{this.props.posts.PostText}</Text>
                </View>
                :
                null
        )
    }
    postImage = () => {
        return (
            this.props.posts.PostImageList.length > 0 ?
                <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, marginVertical: 5, padding: 5 }}>
                    <FlatList
                        data={this.props.posts.PostImageList}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        renderItem={info => (
                            <ListItemPhoto
                                allPhotos={this.props.posts.PostImageList}
                                photo={info.item}
                                userID={this.props.posts.User.UserID}
                            />
                        )}
                    />
                </View>
                :
                null
        )
    }
    postPlace = () => {
        return (
            this.props.posts.Place != null ?
                <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, marginVertical: 5, padding: 5 }}>
                    <TouchableOpacity style={container.row} onPress={this._clickItemPlace.bind(this)}>
                        {(this.props.posts.Place.Type == 0) ?
                            <View>
                                <Image
                                    style={imageStyle.iconStyle}
                                    source={require('../images/icons/acikHavaAVMsi.png')}
                                />
                            </View>
                            :
                            <View>
                                <Image
                                    style={imageStyle.iconStyle}
                                    source={require('../images/icons/magazaSayisi.png')}
                                />
                            </View>
                        }

                        <View>
                            <Text style={[textStyle.logoStyle.xs, { fontWeight: 'bold' }]}>{this.props.posts.Place.PlaceName}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                null
        )
    }
    postPurchased = () => {
        return (
            this.props.posts.Purchased != null ?
                <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, marginVertical: 5, padding: 5 }}>
                    <View>
                        <Text style={[textStyle.logoStyle.xs, { fontWeight: 'bold' }]}>{Localizations('NewPost.Purchased')}</Text>
                    </View>
                    <View style={container.row}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setImageModalVisible(
                                    true,
                                    GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.posts.User.UserID + '/' + this.props.posts.Purchased.PurchaseImage
                                );
                            }}>
                            <Image style={imageStyle.post.xl}
                                source={{
                                    uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.posts.User.UserID + '/' + this.props.posts.Purchased.PurchaseImage
                                }}
                            />
                        </TouchableOpacity>

                        <View style={{ margin: 10 }}>
                            <TouchableOpacity onPress={() => this._clickItemBrand(this.props.posts.Purchased.BrandID)}>
                                <Text style={[textStyle.logoStyle.md, { fontWeight: '600' }]}>{this.props.posts.Purchased.BrandName}</Text>
                            </TouchableOpacity>
                            <View style={{ marginVertical: 5 }}>
                                <Text style={textStyle.logoStyle.sm}>{this.props.posts.Purchased.PurchaseText}</Text>
                            </View>
                            <View>
                                <Text style={[textStyle.logoStyle.xs, { fontWeight: '500' }]}>{this.props.posts.Purchased.Price + ' ' + this.props.posts.Purchased.Currency}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                :
                null
        )
    }
    postQuestion = () => {
        return (
            this.props.posts.Question != null ?
                <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, marginVertical: 5, padding: 5 }}>
                    <View>
                        <Text style={[textStyle.logoStyle.xs, { fontWeight: 'bold' }]}>{Localizations('NewPost.Question')}</Text>
                    </View>
                    <View style={container.row}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setImageModalVisible(
                                    true,
                                    GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.posts.User.UserID + '/' + this.props.posts.Question.QuestionImage
                                );
                            }}>
                            <Image style={imageStyle.post.xl}
                                source={{
                                    uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.POST_PHOTOS + '/' + this.props.posts.User.UserID + '/' + this.props.posts.Question.QuestionImage
                                }}
                            />
                        </TouchableOpacity>

                        <View >
                            <TouchableOpacity onPress={() => this._clickItemBrand(this.props.posts.Question.BrandID)}>
                                <Text style={[textStyle.logoStyle.md, { fontWeight: '600' }]}>{this.props.posts.Question.BrandName}</Text>
                            </TouchableOpacity>
                            <View style={{ marginVertical: 5 }}>
                                <Text style={textStyle.logoStyle.sm}>{this.props.posts.Question.QuestionText}</Text>
                            </View>
                            <View>
                                <Text style={[textStyle.logoStyle.xs, { fontWeight: '500' }]}>{this.props.posts.Question.Price + ' ' + this.props.posts.Question.Currency}</Text>
                            </View>
                            <View style={container.row}>
                                <View >
                                    {this.props.posts.Question.Rating != 0 ?
                                        <Star score={this.props.posts.Question.Rating} />
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
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={{ fontSize: 48, fontWeight: 'bold', color: 'orange' }}>{this.props.posts.Question.Rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                :
                null
        )
    }
    postSurvey = () => {
        return (
            (this.props.posts.Survey != null) && (this.props.posts.Survey != undefined) ?
                <View style={{ backgroundColor: '#f9fafb', borderRadius: 10, marginVertical: 5, padding: 5 }}>
                    {/* {console.log(this.props.posts)} */}
                    <View>
                        <Text style={[textStyle.logoStyle.xs, { fontWeight: 'bold' }]}>{Localizations('NewPost.Survey')}</Text>
                    </View>
                    <View style={container.center}>
                        <FlatList
                            data={this.props.posts.Survey.SurveyItemList}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                            ItemSeparatorComponent={() => (<View style={{ flex: 1 }} />)}
                            renderItem={info => (
                                <ListItemSurvey
                                    surveys={info.item}
                                    index={info.index + 1}
                                    resultPage={false}
                                    userID={this.props.posts.User.UserID}
                                    userSurveyItemResponse={this.props.posts.Survey.UserResponse}
                                    readOnly={this.props.readOnly}
                                />
                            )}
                        />
                    </View>
                </View>
                :
                null
        )
    }
    post = () => {
        return (
            this.props.posts.RePost != null ?
                <View>
                    <ListItemPost
                        posts={this.props.posts.RePost}
                        repost="1"
                    />
                </View>
                :
                null
        )
    }
    postButton = () => {
        return (
            (this.props.repost != "1") ?
                <View style={[container.row, { backgroundColor: 'white', margin: 10 }]}>
                    <View style={container.center}>
                        <TouchableOpacity style={container.row} onPress={() => this._clickLike(this.props.posts.PostID)}>
                            <View>
                                {this.props.posts.UserLike == 1 ?
                                    <Text style={[textStyle.logoStyle.md, { color: '#ff585c', fontWeight: 'bold' }]}>{Localizations('NewPost.Like')}</Text>
                                    :
                                    <Text style={textStyle.logoStyle.xl}>{Localizations('NewPost.Like')}</Text>
                                }
                            </View>
                        </TouchableOpacity>
                        <View>
                            <ShowNumber numberStyle="1" number={this.props.posts.PostLikeCount} circleSize={30} />
                        </View>
                    </View>

                    <View style={[container.center, { flexDirection: 'row' }]}>
                        <TouchableOpacity onPress={() => this._clickReview(this.props.posts.PostID)}>
                            <View>
                                <Text style={textStyle.logoStyle.md}>{Localizations('NewPost.Comment')}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this._clickPostAllReviews(this.props.posts.PostID)}>
                            <View>
                                <ShowNumber numberStyle="1" number={this.props.posts.PostReviewCount} circleSize={30} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={container.center}>
                        <TouchableOpacity style={container.row} onPress={() => this._clickShare(this.props.posts.PostID)}>
                            <View>
                                <Text style={textStyle.logoStyle.md}>{Localizations('NewPost.Share')}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <ShowNumber numberStyle="1" number={this.props.posts.PostSharingCount} circleSize={30} />
                        </View>
                    </View>
                </View>
                :
                null
        )
    }
    postReview = () => {
        return (
            ((this.props.posts.PostReviewList != null) && (this.props.repost != "1")) ?
                <View style={{ flex: 1, marginTop: 5, borderWidth: 1, borderColor: 'red' }}>
                    <FlatList
                        data={this.props.posts.PostReviewList}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 10 }} />
                        )}
                        renderItem={info => (
                            <ListItemPostReview
                                reviews={info.item}
                                userID={this.props.posts.User.UserID}
                            />
                        )}
                    />
                </View>
                :
                null
        )
    }
    // #endregion

    render() {
        if (this.props.posts) {
            return (
                <View style={{ backgroundColor: '#e9ebee', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                    <View style={container.row}>
                        <LetterCircle
                            photo={this.props.posts.User.UserPhoto}
                            data={this.props.posts.User.Name + " " + this.props.posts.User.Surname}
                            circleSize={40} />

                        <View style={[container.row.sb, { flex: 1, marginLeft: 10, }]}>
                            <TouchableOpacity onPress={this._clickItemDetail.bind(this)}>
                                <View>
                                    <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold' }]}>{this.props.posts.User.Name + " " + this.props.posts.User.Surname}</Text>
                                </View>
                            </TouchableOpacity>

                            <View>
                                <Text style={[textStyle.logoStyle.xs, { color: 'gray', fontWeight: '500' }]}>{FormatDate(this.props.posts.PostDate, "dd.MM.yyyy HH:mm")}</Text>
                            </View>
                        </View>
                    </View>

                    {this.postText()}
                    {this.postImage()}
                    {this.postPlace()}
                    {this.postPurchased()}
                    {this.postQuestion()}
                    {this.postSurvey()}
                    {this.post()}
                    {this.postButton()}
                    {this.postReview()}

                    {/* Modal */}
                    <Modal animationType="slide" transparent={true} visible={this.state.imageModalVisible}>
                        <ImageViewer
                            imageUrls={images}
                            enableSwipeDown={true}
                            saveToLocalByLongPress={false}
                            onCancel={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                            onClick={() => { this.setImageModalVisible(!this.state.imageModalVisible); }}
                        />
                    </Modal>
                </View>
            )
        }
        return <Spinner size="large" />;
    }
}


const mapStateToProps = ({ postScreenResponse, startScreenResponse }) => {
    const { userResponse, selected, loadingRaitingOfQuestion, type, userToken, connectionError } = postScreenResponse;
    const { SwoqyUserToken, SwoqyUserData } = startScreenResponse;
    return {
        userResponse, selected, loadingRaitingOfQuestion, type, userToken, connectionError, SwoqyUserToken, SwoqyUserData
    };
}

export default connect(mapStateToProps, { RatingOfQuestionData })(ListItemPost2);
