import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, LetterCircle, Spinner, ShowRemainingTime } from '../common';
import { SetReviewConfirmation, SetAdStatus } from '../actions';
import { connect } from 'react-redux';
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');
var dateFormat = require('dateformat');


// const ListItemPostReview = (props) => {
class ListItemPostReview extends Component {
    // console.log(props.photos)

    _clickItemDetail = () => {
        this.props.SetAdStatus({ AdStatus: 'play' }); 
        Actions.userProfileScreen({ ID: this.props.reviews.User.UserID });
    }


    _clickReviewConfirmation = (action) => {
        // 0: sil
        // 1: onayla
        // debugger;
        this.props.SetReviewConfirmation({ reviewID: this.props.reviews.PostReviewID, reviewOwnerID: this.props.reviews.User.UserID, actionType: action, userToken: this.props.SwoqyUserToken,
            latitude: this.props.SwoqyUserData.Latitude,
            longitude: this.props.SwoqyUserData.Longitude });
        this.setState({
            actionType: action
        })

    }

    UNSAFE_componentWillMount() {
        this.setState({
            confirmationResult: 0,
            actionType: 0
        })

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // debugger;

        switch (nextProps.type) {
            case 'set_review_confirmation_data_success':
                // debugger
                if (nextProps.reviewID == this.props.reviews.PostReviewID)
                    this.setState({
                        confirmationResult: nextProps.confirmationResult
                    });
                break;

            default:
                break;
        }
    }


    //debugger
    render() {
         //debugger
        if (this.props.reviews) {
            return (
                (this.state.confirmationResult == 2) ?
                    null
                    :
                    <View style={{ flex: 1, backgroundColor: '#f2f3f5', borderWidth:1, borderColor: '#e4e6ea', padding: 5, borderRadius: 10, borderTopLeftRadius: 0, }}>
                        <View style={container.row}>
                            <LetterCircle
                                photo={this.props.reviews.User.UserPhoto}
                                data={this.props.reviews.User.Name + " " + this.props.reviews.User.Surname}
                                circleSize={30}
                            />

                            <View style={[container, { flex: 1, marginHorizontal: 5, }]}>
                                <TouchableOpacity style={{ flex: 1, }} onPress={ this._clickItemDetail.bind(this)}>
                                    <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold' }]}>{this.props.reviews.User.Name + " " + this.props.reviews.User.Surname}</Text>
                                </TouchableOpacity>

                                {/* <Text style={[textStyle.logoStyle.xs, { color: 'gray', fontWeight: '500' }]}>{FormatDate(this.props.reviews.ReviewDate, "dd.MM.yyyy HH:mm")}</Text> */}
                                <Text style={[textStyle.logoStyle.xs, { color: 'gray', fontWeight: '500' }]}>{FormatDate(this.props.reviews.ReviewDate, "dd.MM.yyyy")}</Text>
                            </View>
                        </View>

                        <View style={{ margin: 0 }}>
                            <Text style={textStyle.logoStyle.md}>{this.props.reviews.Review}</Text>
                        </View>
                        {
                            (this.props.reviews.ReviewActions != 0) &&

                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', alignContent: 'flex-end', alignSelf: 'flex-end' }}>
                                {
                                    (this.props.reviews.ReviewActions == 1) ?
                                        (this.state.confirmationResult == 1) ?
                                            <TouchableOpacity style={{ paddingRight: 20 }} >
                                                <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold', color: 'gray' }]}>{Localizations('NewPost.Sent')}</Text>
                                            </TouchableOpacity>
                                            :

                                            <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => this._clickReviewConfirmation(1)}>
                                                {
                                                    (this.props.loadingReviewConfirmation && this.state.actionType == 1) ?
                                                        <Spinner size="small" />
                                                        :
                                                        <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold', color: 'gray' }]}>{Localizations('NewPost.Send')}</Text>
                                                }
                                            </TouchableOpacity>

                                        :
                                        null
                                }

                                <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => this._clickReviewConfirmation(2)}>
                                    {
                                        (this.props.loadingReviewConfirmation && this.state.actionType == 2) ?
                                            <Spinner size="small" />
                                            :
                                            <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold', color: 'gray' }]}>{Localizations('NewPost.Delete')}</Text>
                                    }
                                </TouchableOpacity>

                            </View>
                        }
                    </View>
            )
        }
        return <Spinner size="large" />;
    }
}
// export default ListItemPostReview;



const mapStateToProps = ({ postScreenResponse, startScreenResponse }) => {
    const { userResponse, reviewID, confirmationResult, loadingReviewConfirmation, type, connectionError } = postScreenResponse;
    const { SwoqyUserToken, SwoqyUserData, adStatus } = startScreenResponse;
    return {
        userResponse, reviewID, confirmationResult, loadingReviewConfirmation, type, connectionError, SwoqyUserToken, SwoqyUserData, adStatus
    };
}

export default connect(mapStateToProps, { SetReviewConfirmation, SetAdStatus })(ListItemPostReview);
