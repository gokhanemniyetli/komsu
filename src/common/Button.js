import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}> {children} </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        
        margin: 5
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#ff585c',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'lightgray',
        height:40,
        justifyContent:'center'
    }
};

export { Button };
