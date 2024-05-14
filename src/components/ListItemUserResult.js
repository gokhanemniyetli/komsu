import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

const ListItemUserResult = (props) => {
    // console.log(props.users)

    _clickItemDetail = () => {
        Actions.userProfileScreen({ ID: props.users.UserID });
    }

    if (props.users) {
        return (
            <TouchableOpacity style={[container.row, { flex: 1, margin: 5}]} onPress={this._clickItemDetail.bind(this)}>
                <LetterCircle
                    photo={props.users.UserPhoto}
                    data={props.users.Name + " " + props.users.Surname}
                    circleSize={40}
                />

                <View style={{justifyContent:'center',marginHorizontal:10 }}>
                    <Text style={textStyle.logoStyle.xs}>{props.users.Name} {props.users.Surname}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return <Spinner size="large" />;
}

export default ListItemUserResult;