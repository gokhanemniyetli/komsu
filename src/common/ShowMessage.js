import React from 'react';
import { Text, View } from 'react-native';

const ShowMessage = ({ text, backgroundStyle, textStyle }) => {
    const { bgStyle, txtStyle } = styles;
    return (
        <View style={bgStyle}  >
            <Text style={txtStyle}> {text} </Text> 
        </View>
    )
};


const styles = {
    bgStyle: {
        flex:1, 
        alignItems:'center', 
        justifyContent: 'center', 
        backgroundColor:'#ff585c'
    },
    txtStyle: {
        alignItems:'center', 
        justifyContent: 'center', 
        color:'white', 
        fontWeight: 'bold', 
        fontSize: 20
    }
};

export { ShowMessage };
