import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { } from '../../actions';
import { ShowNumber, LetterCircle, Spinner } from '../../common';
var dateFormat = require('dateformat');
import { Localizations, FormatDate } from '../../../locales/i18n';

const GLOBAL = require('../../common/Globals');
const { container, textStyle, imageStyle, buttonStyle } = require('../../styles/SwoqyStyles');

const ListItemChatMessage = (props) => {
    // console.log(props)
    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>

            {props.date != props.oldDate &&
                <View style={styles.datingSortText}>
                    <Text style={textStyle.logoStyle.xs}>{FormatDate(props.messageList.MessageDate, "dd.MM.yyyy")}</Text>
                </View>
            }

            <View
                style={[styles.container,
                (props.whichUser ?
                    { alignSelf: 'flex-start', marginRight: 50, backgroundColor: '#ff9a9d' } : { alignSelf: 'flex-end', marginLeft: 50, backgroundColor: 'lightgray' })
                ]}>

                <Text style={textStyle.logoStyle.lg}>{props.messageList.Message}</Text>

                <View style={[container.row, (props.whichUser ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' })]} >
                    <Text
                        style={[styles.timeText,
                            // (props.messageList.MessageStatus == 1 ? { backgroundColor: 'lightgray' } : { backgroundColor: '#ff585c' })
                        ]}>
                        {FormatDate(props.messageList.MessageDate, "HH.mm")}
                    </Text>

                    {!props.whichUser &&
                        <Image
                            style={[imageStyle.logoStyle.xxs, { marginLeft: 10, alignItems: 'flex-end' }]}
                            source={props.messageList.MessageStatus == 1 ? require('../../images/icons/1dot.png') : require('../../images/icons/2dot.png')}
                        />}
                </View>
            </View>
        </View>
    )
}

export default ListItemChatMessage;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginVertical: 5, padding: 5,
        borderRadius: 10
    },
    datingSortText: {
        justifyContent: 'center', alignSelf: 'center',
        margin: 5, padding: 3,
        borderRadius: 10,
        backgroundColor: 'lightgray'
    },
    timeText: {
        fontSize: 11,
        color: '#606060'
    }
});
