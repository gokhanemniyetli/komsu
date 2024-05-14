import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';

var Filter = require('bad-words'),
    filter = new Filter();

const Slang = (text, control) => {
    return (
        control == undefined ? filter.clean(text) :
            control == 1 ? filter.isProfane(text) :
                control == 2 ?
                    Alert.alert(
                        Localizations('Common.Alert'),
                        Localizations('Common.Slang'),
                        [{ text: Localizations('Global.Ok') }],
                        { cancelable: false },
                    ) : null
    )
};

export { Slang };
