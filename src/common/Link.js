import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Link = ({ onPress, children }) => {
const { linkStyle, textStyle } = styles;
return (
    <TouchableOpacity onPress={onPress} style={linkStyle}>
        <Text style={textStyle}> {children} </Text>
    </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#282828',
        fontSize: 12,
        fontWeight: '600',
        paddingTop: 5,
        //paddingBottom: 10
    },
    linkStyle: {
        flex: 1,
        alignSelf: 'stretch',
        //backgroundColor: '#fff',
        //borderRadius: 5,
        //borderWidth: 1,
        //borderColor: '#007aff',
        marginLeft: 0,
        marginRight: 0
    }
};

export { Link };
