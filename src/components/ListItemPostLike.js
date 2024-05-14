import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, LetterCircle, Spinner, ShowRemainingTime } from '../common'; 
import { connect } from 'react-redux';
import { Localizations, FormatDate } from '../../locales/i18n';
import { SetAdStatus } from '../actions';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');
var dateFormat = require('dateformat');

 
class ListItemPostLike extends Component {
    // console.log(props.photos)

    // _clickItemDetail = () => {
    //     this.props.SetAdStatus({ AdStatus: 'play' }); 
    //     Actions.userProfileScreen({ ID: this.props.likes.User.UserID });
    // }


    UNSAFE_componentWillMount()  {
        this.setState({
            confirmationResult: 0,
            actionType: 0
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // debugger;

        switch (nextProps.type) {
            case 'set_like_confirmation_data_success':
                // debugger
                if (nextProps.likeID == this.props.likes.PostLikeID)
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
        if (this.props.likes) {
            return (
                (this.state.confirmationResult == 2) ?
                    null
                    :
                    <View style={{ flex: 1, backgroundColor: '#f2f3f5', borderWidth:1, borderColor: '#e4e6ea', padding: 5, borderRadius: 10, borderTopLeftRadius: 0, }}>
                        <View style={container.row}>
                            <LetterCircle
                                photo={this.props.likes.User.UserPhoto}
                                data={this.props.likes.User.Name + " " + this.props.likes.User.Surname}
                                circleSize={30}
                            />

                            <View style={[container, { flex: 1, marginHorizontal: 5, }]}>
                                <TouchableOpacity style={{ flex: 1, }} 
                                // onPress={this._clickItemDetail.bind(this)}
                                onPress={() => {this.props.SetAdStatus({ AdStatus: 'play' }); Actions.userProfileScreen({ ID: this.props.likes.User.UserID })}}
                                >
                                    <Text style={[textStyle.logoStyle.sm, { fontWeight: 'bold' }]}>{this.props.likes.User.Name + " " + this.props.likes.User.Surname}</Text>
                                </TouchableOpacity>

                                {/* <Text style={[textStyle.logoStyle.xs, { color: 'gray', fontWeight: '500' }]}>{FormatDate(this.props.reviews.ReviewDate, "dd.MM.yyyy HH:mm")}</Text> */}
                                <Text style={[textStyle.logoStyle.xs, { color: 'gray', fontWeight: '500' }]}>{FormatDate(this.props.likes.LikeDate, "dd.MM.yyyy")}</Text>
                            </View>
                        </View>

                        
                    </View>
            )
        }
        return <Spinner size="large" />;
    }
}
// export default ListItemPostReview;



const mapStateToProps = ({ postScreenResponse, startScreenResponse }) => {
    const { userResponse, likeID, confirmationResult, loadingLikeConfirmation, type, connectionError } = postScreenResponse;
    const { SwoqyUserToken, SwoqyUserData, adStatus } = startScreenResponse;
    return {
        userResponse, likeID, confirmationResult, loadingLikeConfirmation, type, connectionError, SwoqyUserToken, SwoqyUserData, adStatus
    };
}

export default connect(mapStateToProps, {  SetAdStatus })(ListItemPostLike);
