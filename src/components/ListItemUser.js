import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { SetAdStatus } from '../actions';
import { CardSection, LetterCircle, Spinner } from '../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../locales/i18n';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

const ListItemUser = (props) => {
  
    if (props.users) {
        return (
            <TouchableOpacity style={{ flex: 1, marginHorizontal: 10, alignItems: 'center' }}  
            onPress={() => {props.SetAdStatus({ AdStatus: 'play' }); Actions.userProfileScreen({ ID: props.users.UserID })}}
            >
                <LetterCircle
                    photo={props.users.UserPhoto}
                    data={props.users.Name + " " + props.users.Surname}
                    circleSize={40}
                />

                {/* <View style={container.center}>
                    <Text style={textStyle.logoStyle.xs}>{props.users.Name}</Text>
                    <Text style={textStyle.logoStyle.xs}>{props.users.Surname}</Text>
                </View> */}
            </TouchableOpacity>
        )
    }
    return <Spinner size="large" />;
}

const mapStateToProps = ({ startScreenResponse }) => {
    const { adStatus } = startScreenResponse;
    return {
        adStatus
    };
}

export default connect(mapStateToProps, {  SetAdStatus })(ListItemUser);
