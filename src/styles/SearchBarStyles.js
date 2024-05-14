'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    searchBarContainer: {
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'cyan', 
    height:50, 
    padding: 0
    },
    searchText: { 
        backgroundColor: 'blue',
        flex: 5
    },
    searchButton: { 
        flex: 1,
        height:50, 
        color: 'yellow'
    },
    inputText: {
        backgroundColor: 'white', 
        height:50, 
        fontSize: 20,
        paddingLeft:10
    },





    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },

});