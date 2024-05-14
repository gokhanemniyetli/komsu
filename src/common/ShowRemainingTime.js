import React from 'react';
import { Text, View } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';

const ShowRemainingTime = ({ totalTime }) => {

    var remainingTime = " ";
    if (totalTime > 0) {
        if (totalTime < 60) {
            remainingTime = totalTime + " " + (totalTime > 1 ? Localizations('Global.Minutes') : Localizations('Global.Minute'));
        }
        else if (totalTime < 1440) {
            remainingTime = Math.floor(totalTime / 60) + " " + (Math.floor(totalTime / 60) > 1 ? Localizations('Global.Hours') : Localizations('Global.Hour'));
        }
        else if (totalTime < 10080) {
            remainingTime = Math.floor(totalTime / 1440) + " " + (Math.floor(totalTime / 1440) > 1 ? Localizations('Global.Days') : Localizations('Global.Day'));
        }
        else if (totalTime < 43200) {
            remainingTime = Math.floor(totalTime / 10080) + " " + (Math.floor(totalTime / 10080) > 1 ? Localizations('Global.Weeks') : Localizations('Global.Week'));
        }
        else if (totalTime < 525600) {
            remainingTime = Math.floor(totalTime / 43200) + " " + (Math.floor(totalTime / 43200) > 1 ? Localizations('Global.Months'): Localizations('Global.Month'));
        }
        else if (totalTime >= 525600) {
            remainingTime = Math.floor(totalTime / 525600) + " " + (Math.floor(totalTime / 525600) > 1 ? Localizations('Global.Minutes') : Localizations('Global.Minute'));
        }
    }

    const { bgStyle, txtStyle } = styles;
    return (
     totalTime !== undefined ? 
        totalTime > 0 &&
            <View style={bgStyle}  >
                <Text style={txtStyle}> {Localizations('WallScreen.RemainingTime')}: {remainingTime} </Text>
            </View>
        :
        null
    )
};


const styles = {
    bgStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    txtStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 12
    }
};

export { ShowRemainingTime };
