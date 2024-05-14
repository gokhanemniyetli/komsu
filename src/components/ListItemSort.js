import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LetterCircle, Spinner } from '../common';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

const ListItemSort = (props) => {
    _clickUserDetail = (userID) => {
        Actions.userProfileScreen({ ID: userID });
    }

    if (props.userList) {
        return (
            <TouchableOpacity style={[container.row, { flex: 1, margin: 5 }]} onPress={() => { this._clickUserDetail(props.userList.UserID) }}>
                <LetterCircle
                    photo={props.userList.UserPhoto}
                    uri={GLOBAL.WEB_SERVER_IMAGE_PATH + '/' + GLOBAL.IMAGE_PATHS.USER_PHOTO + '/' + props.userList.UserPhoto}
                    data={props.userList.Name + " " + props.userList.Surname}
                    circleSize={30}
                />
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{props.userList.Name + " " + props.userList.Surname}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return <Spinner size="large" />;
}

export default ListItemSort;
