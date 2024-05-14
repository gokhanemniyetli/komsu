'use strict';
var React = require('react-native');

module.exports = ({
  container: {
    row: {
      flexDirection: 'row', alignItems: 'center',
      sa: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
      sb: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
      se: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
    },
    column: {
      flexDirection: 'column', alignItems: 'center',
      sa: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' },
      sb: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
      se: { flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' },
    },
    center: {
      flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    topCenter: {
      flex: 1, alignItems: 'center', padding:20
    },
  },
  imageStyle: {
    logoStyle: {
      xl: { width: 80, height: 80, resizeMode: 'contain', },
      lg: { width: 60, height: 60, resizeMode: 'contain', },
      md: { width: 40, height: 40, resizeMode: 'contain', },
      sm: { width: 30, height: 30, resizeMode: 'contain', },
      xs: { width: 20, height: 20, resizeMode: 'contain', },
      xxs: { width: 15, height: 15, resizeMode: 'contain', },
    },
    registeredStyle: {
      width: 24,
      height: 24,
      marginLeft: 3,
      marginBottom:6,
      resizeMode: 'contain',
    },
    registeredTinyStyle: {
      width: 18,
      height: 18,
      margin: 1,
      resizeMode: 'contain',
    },
    subStyle: {
      width: 24,
      height: 24,
      margin: 5,
      tintColor: '#ff585c',
      //tintColor: '#f46e4f',
      resizeMode: 'contain',
    },
    favouriteStyle: {
      width: 24,
      height: 24,
      margin: 5,
      resizeMode: 'contain',
      tintColor: '#ff585c',
    },
    iconStyleDot: {
      height: 10,
      width: 20,
      margin: 5,
      tintColor: '#6c6c6c', // or '#5d5d5d'
      resizeMode: 'contain',
    },
    iconStyle: {
      height: 20,
      width: 20,
      margin: 5,
      tintColor: '#6c6c6c', // or '#5d5d5d'
      resizeMode: 'contain',
    },

    iconStylePink: {
      height: 20,
      width: 20,
      margin: 5,
      tintColor: '#ff585c', // or '#5d5d5d'
      resizeMode: 'contain',
    },

    iconStyleMiddlePink: {
      width: 30,
      height: 18,
      margin: 5,
      tintColor: '#ff585c', // or '#5d5d5d' 
      // resizeMode: 'contain',
    },
    iconStyleMiddleWhite: {
      width: 30,
      height: 18,
      margin: 5,
      tintColor: 'white', // or '#5d5d5d' 
      // resizeMode: 'contain',
    },
    iconStyleBlue: {
      height: 20,
      width: 20,
      margin: 5,
      tintColor: 'blue', // or '#5d5d5d'
      resizeMode: 'contain',
    },
    iconStyleWhite: {
      height: 20,
      width: 20,
      margin: 5,
      tintColor: 'white', // or '#5d5d5d'
      resizeMode: 'contain',
    },
    iconStyleLarge: {
      height: 40,
      width: 40,
      margin: 5,
      tintColor: '#6c6c6c', // or '#5d5d5d'
      resizeMode: 'contain',
    },
    iconStyleLargeWhite: {
      height: 40,
      width: 40,
      margin: 5,
      tintColor: 'white', // or '#5d5d5d'
      resizeMode: 'contain',
    },
    reviewIconStyle: {
      width: 24,
      height: 24,
      margin: 5,
      resizeMode: 'contain',
    },
    circle: {
      xl: { height: 80, aspectRatio: 1, borderRadius: 40, alignSelf: 'center', resizeMode: 'cover', },
      lg: { height: 60, aspectRatio: 1, borderRadius: 30, alignSelf: 'center', resizeMode: 'cover', },
      md: { height: 40, aspectRatio: 1, borderRadius: 20, alignSelf: 'center', resizeMode: 'cover', },
      sm: { height: 20, aspectRatio: 1, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover', },
    },
    post: {
      free: { aspectRatio: 1, borderRadius: 0,   alignSelf: 'center', },
      xl: { width: 130, aspectRatio: 1, borderRadius: 10, margin: 5, alignSelf: 'center', resizeMode: 'cover', },
      lgPlus: { height: 100, aspectRatio: 1, borderRadius: 30, alignSelf: 'center', resizeMode: 'cover', },
      lg: { height: 60, aspectRatio: 1, borderRadius: 30, alignSelf: 'center', resizeMode: 'cover', },
      md: { height: 40, aspectRatio: 1, borderRadius: 20, alignSelf: 'center', resizeMode: 'cover', },
      sm: { height: 20, aspectRatio: 1, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover', },
    },
  },
  textStyle: {
    logoStyle: {
      xl: { fontSize: 18, marginVertical: 2, },
      lg: { fontSize: 16, marginVertical: 2, },
      md: { fontSize: 14, marginVertical: 2, },
      sm: { fontSize: 13, marginVertical: 2, },
      xs: { fontSize: 12, marginVertical: 2, },
    },
    textStyleWhite: {
        xl: { fontSize: 18, marginVertical: 2, color:'white'},
        lg: { fontSize: 16, marginVertical: 2, color:'white'},
        md: { fontSize: 14, marginVertical: 2, color:'white'},
        sm: { fontSize: 13, marginVertical: 2, color:'white'},
        xs: { fontSize: 12, marginVertical: 2, color:'white'},
        xxs: { fontSize: 10, marginVertical: 2, color:'white'},
      },
    subStyle: {
      alignItems: 'center',
      fontSize: 11,
      color: '#f46e4f',
    },
    iconStyle: {
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 5,
      fontSize: 12,
      color: '#5d5d5d', // or '#6c6c6c'
    },
    reviewCountStyle: {
      up: { fontSize: 21, fontWeight: 'bold', color: '#949494', },
      down: { fontSize: 16, color: '#8e8e93', },
      _xl: { fontSize: 60, fontWeight: 'bold', color: '#4c4b50', },
      md: { fontSize: 14, marginLeft: 5, color: '#9b9b9b', },
      sm: { fontSize: 12, marginLeft: 5, color: '#9b9b9b', },
    },
    commentStyle: {
      name: { fontSize: 15, fontWeight: '700', margin: 2, },
      date: { fontSize: 15, color: '#9b9b9b', margin: 2, },
      comment: { fontSize: 16, },
      count: { fontSize: 13, color: '#9b9b9b', },
      info: { fontSize: 11, color: '#9b9b9b', alignItems: 'center', },
    },
    userProfileStyle: {
      name: {
        xl: { fontSize: 20, fontWeight: '700', marginBottom: 5, },
        lg: { fontSize: 16, fontWeight: '700', marginBottom: 10, },
      },
      number: { fontSize: 20, fontWeight: '700', margin: 1, },
      numberText: { alignItems: 'center', fontSize: 12, color: '#5d5d5d' },
      option: { fontSize: 15, textAlign: 'center', fontWeight: '500' },
      comment: { fontSize: 16, },
    },
    settingStyle: {
      general: { fontSize: 16, fontWeight: '600', margin: 5, color: '#5d5d5d' },
      generalWhite: { fontSize: 16, fontWeight: '600', margin: 5, color: 'white' },
      privacy: { fontSize: 14, margin: 5, color: '#5d5d5d' },
      security: { fontSize: 13, margin: 5, color: '#5d5d5d' },
      securityWhite: { fontSize: 13, margin: 5, color: 'white' },
      eula: { fontSize: 11,  color: '#5d5d5d' },
      eulaLink: { fontSize: 11,  color: '#3B99FC' },
    },
    //numberOfLines={1} -   text wrap
    //allowFontScaling={true}   -   font auto scale

  },
  buttonStyle: {
    buttonStyle: {
      lg: {margin: 10, backgroundColor: '#ff585c', borderRadius: 5, padding: 10, alignContent: 'center', alignSelf: 'center', alignItems: 'center' },
      md: {margin: 5, backgroundColor: '#ff585c', borderRadius: 5, padding: 5, alignContent: 'center', alignSelf: 'center', alignItems: 'center' },
    },
    buttonTextStyle: {
      lg: {color:'white', fontSize:15},
      md: {color:'white', fontSize:12},
    }
  },
  textInputStyle: {
    backgroundColor: '#f0f1f4',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  }
})

// module.exports = StyleSheet.create({
//   item1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 0,
//     borderColor: 'green',
//     borderWidth: 0,

//   },
//   item2: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 0,
//     width: '100%',
//     backgroundColor: 'white',
//     borderWidth: 0
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   inputText: {
//     backgroundColor: 'white',
//     textAlign: 'left',
//     color: '#333333',
//    
//     borderRadius: 0,
//     borderColor: '#cccaca',
//     height: 40,
//     width: '80%',
//     padding: 1,
//     margin: 2,
//   },
//   buttonFilledBox: {
//     alignItems: 'center',
//     borderWidth: 0,
//     borderRadius: 5,
//     height: 50,
//     width: '80%',
//     backgroundColor: '#e44e50',
//     justifyContent: 'center'
//   },
//   buttonText: {
//     width: '100%',
//     borderWidth: 0,
//     backgroundColor: '#e44e50',
//     alignItems: 'center',
//     textAlign: 'center',
//     justifyContent: 'center',
//     fontSize: 16,
//     color: 'white'
//   },
//   buttonEmptyBox: {
//     alignItems: 'center',
//     borderColor: '#d14648',
//     borderRadius: 5,
//     height: 50,
//     width: '80%',
//     backgroundColor: 'white',
//     justifyContent: 'center'
//   },
//   buttonOnlyText: {
//     width: '100%',
//     borderWidth: 0,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     fontSize: 16,
//     color: 'black',
//     justifyContent: 'center'
//   },
//   titleText: {
//     textAlign: 'left',
//     width: '80%',
//     padding: 0,
//     margin: 0,
//     borderWidth: 0,
//   },
//   itemWithTitle: {
//     textAlign: 'left',
//     width: '80%',
//     flex: 1,
//     padding: 0,
//     margin: 0,
//   },
// })
