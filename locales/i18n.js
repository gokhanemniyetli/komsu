import ReactNative from 'react-native';
import I18n from 'react-native-i18n';
import RNRestart from 'react-native-restart';

// Import all locales
import en from './en.json';
import tr from './tr.json';
import es from './es.json';
import it from './it.json';
import fr from './fr.json';
import zh from './zh.json';
import ja from './ja.json';
import hi from './hi.json';
import ru from './ru.json';
import pt from './pt.json';
import ar from './ar.json';
import de from './de.json';
import ko from './ko.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  tr,
  es,
  it,
  fr,
  zh,
  ja,
  hi,
  ru,
  pt,
  ar,
  de,
  ko
};

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;
//debugger;
// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function Localizations(name, params = {}) {
  return I18n.t(name, params);
};


export function SetLocale(locale) {

  if(locale.indexOf('he') === 0 || locale.indexOf('ar') === 0)
  {
    if (!ReactNative.I18nManager.isRTL) 
    {
      ReactNative.I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  }
  else 
  {
    if (ReactNative.I18nManager.isRTL) 
    {
      ReactNative.I18nManager.forceRTL(false);
      RNRestart.Restart();
    }
    
  }
  I18n.locale = locale;
};


export function GetLocale(locale) {
  //debugger
  return I18n.locale;
};


export function FormatDate(d, format, utc) {

//   var today = new Date(d);
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();
// var HH= today.getHours();
// var MM= today.getMinutes();


// today = mm + '/' + dd + '/' + yyyy + ' ' + HH + ':' + MM;
  
  
//    return today;

// var date = new Date(d);

//  debugger;
if (d != undefined)
{
  var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function ii(i, len) {
      var s = i + "";
      len = len || 2;
      while (s.length < len) s = "0" + s;
      return s;
  }

  var arrDateTime = d.split('T');
  
  var date = arrDateTime[0];
  var time = arrDateTime[1];

  var arrDate = date.split('-');
  var year = arrDate[0];
  var month = arrDate[1];
  var day = arrDate[2];

  var arrTime = time.split(':');
  var hour = arrTime[0];
  var minute = arrTime[1];
  var arrSecond = arrTime[2].split('.');

  var second = arrSecond[0];
  var milisecond = arrSecond[1];


  var y = year; // utc ? date.getUTCFullYear() : date.getFullYear();
  format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
  format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
  format = format.replace(/(^|[^\\])y/g, "$1" + y);
// debugger;
  var M = month; // (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
  format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
  format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
  format = format.replace(/(^|[^\\])M/g, "$1" + M);

  var d = day; // utc ? date.getUTCDate() : date.getDate();
  format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
  format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
  format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
  format = format.replace(/(^|[^\\])d/g, "$1" + d);

  var H = hour; // utc ? date.getUTCHours() : date.getHours();
  format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
  format = format.replace(/(^|[^\\])H/g, "$1" + H);

  var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
  format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
  format = format.replace(/(^|[^\\])h/g, "$1" + h);

  var m = minute; //  utc ? date.getUTCMinutes() : date.getMinutes();
  format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
  format = format.replace(/(^|[^\\])m/g, "$1" + m);

  var s = second; // utc ? date.getUTCSeconds() : date.getSeconds();
  format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
  format = format.replace(/(^|[^\\])s/g, "$1" + s);

  var f = milisecond; // utc ? date.getUTCMilliseconds() : date.getMilliseconds();
  format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
  f = Math.round(f / 10);
  format = format.replace(/(^|[^\\])f/g, "$1" + f);

  var T = H < 12 ? "AM" : "PM";
  format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
  format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

  var t = T.toLowerCase();
  format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
  format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

  // var tz = -date.getTimezoneOffset();
  // var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
  // if (!utc) {
  //     tz = Math.abs(tz);
  //     var tzHrs = Math.floor(tz / 60);
  //     var tzMin = tz % 60;
  //     K += ii(tzHrs) + ":" + ii(tzMin);
  // }
  // format = format.replace(/(^|[^\\])K/g, "$1" + K);

  // var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
  // format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
  // format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

  format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
  format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

  format = format.replace(/\\(.)/g, "$1");

  return format;
}
else{
  return d;
}
};


export default I18n;