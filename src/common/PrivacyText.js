import React from 'react';
import { Text } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';

const PrivacyText = (data) => {
    if (data == "1") {
        return <Text>{Localizations('NewPost.Public')}</Text>
    }
    else if (data == "2") {
        return <Text>{Localizations('NewPost.Friends')}</Text>
    }
    else if (data == "3") {
        return <Text>{Localizations('NewPost.SpecificFriends')}</Text>
    }
}

export { PrivacyText };
