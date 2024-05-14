//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';
import { GetLocale } from '../../locales/i18n';


//#region Storage Operation
getMyValue = async (key) => {

    // const keys = await AsyncStorage.getAllKeys();
    // const result = await AsyncStorage.multiGet(keys);
    //console.log(result);

    // debugger;
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.log("getMyValue Error for " + key)
    }
    //console.log('getMyValue Done.')
}


setValue = async (key, value) => {
    // debugger;
    try {
        await AsyncStorage.setItem(key, value)
        // debugger;
    } catch (e) {
        console.log("setValue Error for " + key + " : " + value);
        // debugger
    }
    
    // const keys = await AsyncStorage.getAllKeys();
    // const result = await AsyncStorage.multiGet(keys);
    // console.log(result);

    // console.log('setValue Done.')
    // debugger
}


removeValue = async (key) => {
    //debugger;
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("removeValue Error for " + key)
    }
    //console.log('removeValue Done.')
}

getAllKeys = async () => {
    //let keys = []
    try {
        return await AsyncStorage.getAllKeys()
    } catch (e) {
        console.log("getAllKeys Error")
    }
    //console.log('getAllKeys Done.')
    //console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
}

clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log("clearAll Error")
    }
    //console.log('clearAll Done.')
}
//#endregion








export function serializeKey(data) {
    var fromBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        fromBody = fromBody.join("&");
        return fromBody;
    }
}

export async function IsSignIn() {
    //ClearSessionTicket();
    //  debugger;
    // var session = AsyncStorage.getItem("sessionTicket");
    // var session = await AsyncStorage.getItem("sessionTicket");
    var session = await getMyValue('@sessionTicket')



    if (session != null && session != '') {
        //debugger
        return session;
    }
    else {
        //debugger
        return null;
    }
    //debugger
}


export async function SignOutUser() {
    var result = false;
    try {
        ClearSessionTicket();
        ClearSessionLanguage();
        result = true;
    } catch (error) {
        // result = false;
    }

    return result;
}


export async function SetSessionTicket(ticket) {

    // AsyncStorage.setItem("sessionTicket", ticket);
    setValue('@sessionTicket', ticket);
}


export async function SetSessionLanguage(language) {

    AsyncStorage.setItem('@sessionLanguage', language)
        .then(data => {
            // console.log(GetLocale());
            // console.log(language)
            // debugger;

            if (GetLocale() != language) {
                RNRestart.Restart();
            }
        })
        .catch(err => {
            //debugger
            console.log("err");
        });

}

// export async function GetSessionTicket() {
//     var sessionTicket = await AsyncStorage.getItem("sessionTicket");
//     return sessionTicket;
// }

export async function ClearSessionTicket() {
    // AsyncStorage.setItem("sessionTicket", "");

    removeValue('@sessionTicket')
}

export async function ClearSessionLanguage() {
    // AsyncStorage.setItem("sessionLanguage", "");

    removeValue('@sessionLanguage')

}



export async function GetSessionLanguage() {
    //debugger;
    // AsyncStorage.getItem("sessionLanguage");

    return await getMyValue('@sessionLanguage')
}