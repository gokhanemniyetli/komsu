import React from 'react';
import { View } from 'react-native';

const CardCircle = (props, { style }) => {
    return (
        <View style={[styles.container, { style }]}>
            {props.children}
        </View>
    );
};

const styles = {
    container: {
        backgroundColor: '#f0f0f4',
        marginVertical: 5,
        padding: 15,
        borderRadius: 10
    },
};

export { CardCircle };
