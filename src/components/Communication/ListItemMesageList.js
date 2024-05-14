import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { } from '../../actions';
import { ShowNumber, LetterCircle, Spinner, DateFormat } from '../../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../../locales/i18n';

const GLOBAL = require('../../common/Globals');
const { container, textStyle, imageStyle, buttonStyle } = require('../../styles/SwoqyStyles');


const ListItemMessageList = (props) => {
    _clickUserProfile = () => {
        Actions.userProfileScreen({ ID: props.messageList.User.UserID });
    }
    _clickChatMessage = () => {
        Actions.messageViewScreen({ ID: props.messageList.User.UserID });
    }

    if (props.messageList) {
        return (
            <TouchableOpacity style={[container.row.sb, { flex: 1, margin: 5 }]} onPress={this._clickChatMessage.bind(this)}>
                <TouchableOpacity style={[container.row, { margin: 5 }]} onPress={this._clickUserProfile.bind(this)}>
                    <LetterCircle
                        photo={props.messageList.User.UserPhoto}
                        data={props.messageList.User.Name + " " + props.messageList.User.Surname}
                        circleSize={40}
                    />

                    <View style={{ justifyContent: 'center', marginHorizontal: 15 }}>
                        <Text style={[textStyle.logoStyle.md, { fontWeight: 'bold' }]}>{props.messageList.User.Name} {props.messageList.User.Surname}</Text>

                        {(props.messageList.RequestDate != null) &&
                            DateFormat(props.messageList.RequestDate)
                        }
                    </View>
                </TouchableOpacity>

                <View style={container.row} >
                    {props.messageList.MessageCount != 0 ?
                        <ShowNumber numberStyle="2" number={props.messageList.MessageCount} circleSize={25} /> : null
                    }

                    <Image
                        style={[imageStyle.logoStyle.xs, { tintColor: 'lightgray' }]}
                        source={require('../../images/icons/arrow_right.png')}
                    />
                </View>
            </TouchableOpacity>
        )
    }
    return <Spinner size="large" />;
}

export default ListItemMessageList;
