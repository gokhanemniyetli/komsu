import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SelectedFriends } from '../actions';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ListItemFriends extends Component {
    state = {
        checkboxIsChecked: false
    }

    UNSAFE_componentWillMount()  {
        var checkboxIsChecked = false;

        if (this.props.selectedFriendList.indexOf(this.props.users.UserID) != -1) {
            checkboxIsChecked = true;
        }

        this.setState({
            checkboxIsChecked: checkboxIsChecked
        })
    }

    _clickCheckbox = (userID) => {
        if (this.props.selectedFriendList.indexOf(userID) == -1) {
            this.props.selectedFriendList.push(userID);
            this.setState({
                checkboxIsChecked: true
            })
        } else {
            this.props.selectedFriendList.splice(this.props.selectedFriendList.indexOf(userID), 1);
            this.setState({
                checkboxIsChecked: false
            })
        }
    }

    render() {
        if (this.props.users) {
            return (
                <CardSection >
                    <TouchableOpacity style={{ flex: 1, flexDirection:'row'}} onPress={() => { this._clickCheckbox(this.props.users.UserID) }}>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View >

                                {this.props.users.UserPhoto != null ?
                                    <Image style={imageStyle.circle.md}
                                        source={{
                                            uri: GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.USER_PHOTO + '/' + this.props.users.UserPhoto
                                        }}
                                    />
                                    :
                                    <LetterCircle
                                        data={this.props.users.Name + " " + this.props.users.Surname}
                                        circleSize={40} />
                                }

                            </View>
                            <View style={{ margin: 3, paddingLeft:5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={textStyle.logoStyle.xs}>{this.props.users.Name + " " + this.props.users.Surname}</Text>
                            </View>
                        </View>

                        
                        <View style={{justifyContent: 'center', alignItems: 'center' }}>
                                <CheckBox
                                style={{justifyContent: 'center', alignItems: 'center' }}
                                    // style={{ flex: 1, marginRight: 15, }}
                                    onClick={() => { this._clickCheckbox(this.props.users.UserID) }}
                                    isChecked={this.state.checkboxIsChecked}
                                />
                            </View>

                    </TouchableOpacity>
                </CardSection>
            )
        }
        return <Spinner size="large" />;
    }

}

const mapStateToProps = ({ postResponse, startScreenResponse }) => {
    const { accessTypeID, selectedFriendList, loadingPostPrivacySpecificFriends, type, connectionError } = postResponse;
    const { SwoqyUserToken } = startScreenResponse;
    return {
        accessTypeID, selectedFriendList, loadingPostPrivacySpecificFriends, type, connectionError, SwoqyUserToken
    };
}

export default connect(mapStateToProps, { SelectedFriends })(ListItemFriends);
