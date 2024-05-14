import React from 'react';
import { View, Image, Text, } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';

var dateFormat = require('dateformat');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');

const DateFormat = (date, serverDate) => {
    // var date = new Date().getDate(); //Current Date
    // var month = new Date().getMonth() + 1; //Current Month
    // var year = new Date().getFullYear(); //Current Year
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    // var currentDate = date + '.' + month + '.' + year + ' ' + hours + ':' + min + ':' + sec;

    if (serverDate != undefined && serverDate != null && serverDate != '') {
        var now = serverDate;
    }
    else {
        var now = new Date();
    }
    var _now = new Date(now);
    var _date = new Date(date);
//debugger


    if (_now >= _date) {
        if (_now.getFullYear() > _date.getFullYear()) {
            // return (<View><Text style={textStyle.logoStyle.xs}>{dateFormat(date, "dd.MM.yyyy")}</Text></View>)
            return (<View><Text style={textStyle.logoStyle.xs}>{_now.getFullYear() - _date.getFullYear()} {Localizations('Time.YearsAgo')}</Text></View>)
        }
        else if (_now.getMonth() > _date.getMonth()) {
            return (<View><Text style={textStyle.logoStyle.xs}>{_now.getMonth() - _date.getMonth()} {Localizations('Time.MonthsAgo')}</Text></View>)
        }
        else if (_now.getDay() > _date.getDay()) {
            return (<View><Text style={textStyle.logoStyle.xs}>{_now.getDay() - _date.getDay()} {Localizations('Time.DaysAgo')}</Text></View>)
        }
        else if (_now.getHours() > _date.getHours()) {
            return (<View><Text style={textStyle.logoStyle.xs}>{_now.getHours() - _date.getHours()} {Localizations('Time.HoursAgo')}</Text></View>)
        }
        else if (_now.getMinutes() > _date.getMinutes()) {
            return (<View><Text style={textStyle.logoStyle.xs}>{_now.getMinutes() - _date.getMinutes()} {Localizations('Time.MinutesAgo')}</Text></View>)
        }
        else if (_now.getSeconds() > _date.getSeconds()) {
            return (<View><Text style={textStyle.logoStyle.xs}>{Localizations('Time.SecondsAgo')}</Text></View>)
        }
       
    }
    
}


// if ((date + '.' + month + '.' + year) == dateFormat(date, "dd.MM.yyyy HH:mm:ss")) {
//     // return <View><Text style={textStyle.logoStyle.xs}>{dateFormat(date, "HH:mm")}</Text></View>
//     return <View><Text style={textStyle.logoStyle.xs}>{date + '.' + month + '.' + year}</Text></View>
// }
// else {
//     // return <View><Text style={textStyle.logoStyle.xs}>{dateFormat(date, "dd.MM.yyyy")}</Text></View>
//     return <View><Text style={textStyle.logoStyle.xs}>{date + '.' + month + '.' + year}</Text></View>
// }


export { DateFormat }
