import { Alert, Linking } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Actions } from 'react-native-router-flux';


export function LoginControl(SwoqyUserToken) {
    var result = false;
    if (SwoqyUserToken === '' || SwoqyUserToken === null || SwoqyUserToken === undefined) {
        Alert.alert(
            Localizations('Global.UserLogin'),
            Localizations('Global.RequireUserLoginAlertMessage'),
            [
                // {
                //     text: Localizations('Store.Cancel'),
                //     onPress: () => console.log('Cancel Pressed'),
                //     style: 'cancel',
                // },
                { text: Localizations('Store.Ok'), onPress: () => Actions.signInScreen() },
            ],
            { cancelable: false },
        );
        result = false;
    } else {
        result = true;
    }
    return result;
}


export function LocationDenied(catchLocation) {
 
    if (catchLocation == 2) {
        Actions.startScreen();
    } else {
        Alert.alert(
            Localizations('Global.LocationDeniedTitle'),
            Localizations('Global.LocationDenied'),
            [
                {
                    text: Localizations('Store.Cancel'),
                    onPress: () => {
                        console.log('Cancel Pressed');
                        // Actions.signInScreen({ catchLocation: 1 });
                        Actions.startScreen();
                    },
                    style: 'cancel',
                },
                {
                    text: Localizations('Store.Ok'), onPress: () => {
                        Linking.openSettings();

                        // Linking.openURL('app-settings://Permissions/Location') 
                       Actions.startScreen();



                        // Linking.openURL('app-settings:/Location');
                        //Actions.signInScreen({ catchLocation: 2 });
                    }
                },
            ],
            { cancelable: false },
        );
    }

    return false;
}

export function test() {
    alert('test')

}